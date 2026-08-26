import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { KitForm } from "@/integrations/kit/KitForm";
import { emailCapture, footer } from "@/data/content";

export function EmailCapture() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section id="email-capture" ref={ref} className="relative py-28 sm:py-36">
      <Container className="flex flex-col items-center text-center">
        <h2 data-reveal className="max-w-xl font-display text-3xl leading-tight text-ivory sm:text-5xl">
          {emailCapture.headline}
        </h2>
        <p data-reveal className="mt-5 max-w-md text-sm text-sand sm:text-base">
          {emailCapture.subhead}
        </p>

        <div data-reveal className="relative mt-10 w-full max-w-xl">
          <KitForm />
        </div>

        <p data-reveal className="mt-6 max-w-md text-xs text-sand-muted">
          {emailCapture.microcopy}
        </p>
        <p data-reveal className="mt-2 max-w-md text-[11px] text-sand-muted/80">
          {footer.privacyNotice}{" "}
          <a href={footer.privacyHref} className="underline decoration-sand-muted/50 underline-offset-2 hover:text-gold-soft">
            {footer.privacyLabel}
          </a>
        </p>
      </Container>
    </section>
  );
}
