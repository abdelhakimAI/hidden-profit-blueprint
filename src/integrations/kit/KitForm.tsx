import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { emailCapture } from "@/data/content";
import { useKitForm } from "./useKitForm";

export function KitForm() {
  const { status, errorMessage, submit, reset, handleFocus } = useKitForm();
  const [email, setEmail] = useState("");
  const emailId = useId();
  const statusId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const honeypot = (formEl.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    void submit(email, honeypot);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="glass-panel flex flex-col items-center gap-3 rounded-2xl px-8 py-12 text-center shadow-card animate-fade-up"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#C8A25C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-ivory">{emailCapture.successHeadline}</h3>
        <p className="max-w-sm text-sm text-sand">{emailCapture.successBody}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 text-xs uppercase tracking-widest2 text-gold-soft/80 underline-offset-4 hover:text-gold hover:underline"
        >
          {emailCapture.successReset}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-panel relative flex flex-col gap-4 rounded-2xl p-6 shadow-card sm:flex-row sm:items-start sm:p-3 sm:pl-6"
      aria-describedby={statusId}
    >
      <label htmlFor={emailId} className="sr-only">
        Email address
      </label>
      <input
        id={emailId}
        name="email_address"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder={emailCapture.placeholder}
        value={email}
        onFocus={handleFocus}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full flex-1 bg-transparent py-3 font-body text-base text-ivory placeholder:text-sand-muted focus:outline-none sm:py-4"
      />

      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <Button type="submit" loading={status === "loading"} className="w-full shrink-0 sm:w-auto">
        {status === "loading" ? emailCapture.ctaLoading : emailCapture.cta}
      </Button>

      <div id={statusId} aria-live="assertive" className="sr-only">
        {status === "error" &&
          (errorMessage === "invalid_email" ? emailCapture.errorInvalidEmail : emailCapture.errorBody)}
      </div>
      {status === "error" && (
        <p className="basis-full text-sm text-gold-soft sm:absolute sm:-bottom-7 sm:left-0" role="alert">
          {errorMessage === "invalid_email" ? emailCapture.errorInvalidEmail : emailCapture.errorBody}
        </p>
      )}
    </form>
  );
}
