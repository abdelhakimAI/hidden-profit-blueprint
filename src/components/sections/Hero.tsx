import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero } from "@/data/content";
import { trackEvent } from "@/integrations/analytics/analytics";

export function Hero() {
  const ref = useSectionReveal<HTMLElement>({ start: "top 100%" });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center pt-24 sm:pt-16">
      <Container className="flex flex-col items-center text-center">
        <div data-reveal>
          <Eyebrow className="mb-6">{hero.eyebrow}</Eyebrow>
        </div>

        <h1
          data-reveal
          className="max-w-4xl font-display text-4xl leading-[1.1] text-ivory sm:text-6xl lg:text-7xl"
        >
          {hero.headline}
        </h1>

        <p data-reveal className="mt-7 max-w-xl text-balance text-base text-sand sm:text-lg">
          {hero.subhead}
        </p>

        <div data-reveal className="mt-10 flex flex-col items-center gap-3">
          <Button as="a" href="#email-capture" onClick={() => trackEvent("cta_click", { location: "hero" })}>
            {hero.ctaPrimary}
          </Button>
          <p className="text-xs text-sand-muted">{hero.ctaMicrocopy}</p>
        </div>
      </Container>

      <div
        data-reveal
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[11px] uppercase tracking-widest2 text-sand-muted">{hero.scrollHint}</span>
        <span className="h-8 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
