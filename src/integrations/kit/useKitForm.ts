import { useCallback, useRef, useState } from "react";
import { kitConfig } from "@/config/kit.config";
import { trackEvent } from "@/integrations/analytics/analytics";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useKitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  const handleFocus = useCallback(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("form_started");
    }
  }, []);

  const submit = useCallback(async (email: string, honeypot: string) => {
    setErrorMessage(null);

    // Silently succeed on honeypot fill — never tell a bot it was caught.
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("invalid_email");
      return;
    }

    setStatus("loading");
    trackEvent("form_submitted");

    try {
      const formData = new FormData();
      formData.append(kitConfig.EMAIL_FIELD_NAME, email);
      for (const [key, value] of Object.entries(kitConfig.HIDDEN_FIELDS)) {
        formData.append(key, value);
      }

      const response = await fetch(kitConfig.FORM_ACTION_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("request_failed");

      // Kit returns JSON on success; we don't need to inspect its shape —
      // a 2xx response means the subscription request was accepted, and
      // Kit's own automation (configured in your Kit account) takes it
      // from there. We deliberately treat any 2xx as success rather than
      // gating the UI on a specific response shape that could change.
      await response.json().catch(() => null);

      setStatus("success");
      trackEvent("form_success");
    } catch {
      setStatus("error");
      setErrorMessage("network_error");
      trackEvent("form_error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setErrorMessage(null);
    hasStartedRef.current = false;
  }, []);

  return { status, errorMessage, submit, reset, handleFocus };
}
