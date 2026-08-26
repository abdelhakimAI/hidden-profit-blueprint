import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { brand, brandClosing } from "@/data/content";

export function BrandClosing() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section id="closing" ref={ref} className="relative py-28 sm:py-40">
      <Container className="flex flex-col items-center text-center">
        <h2 data-reveal className="font-display text-3xl leading-tight text-ivory sm:text-5xl">
          {brandClosing.statementLine1}
          <br />
          <span className="text-gold-gradient">{brandClosing.statementLine2}</span>
        </h2>

        <div data-reveal className="mt-14 flex flex-col items-center gap-1">
          <p className="font-display text-xl text-ivory sm:text-2xl">{brand.name}</p>
          <p className="max-w-sm text-sm text-sand-muted">{brand.tagline}</p>
        </div>

        <a
          data-reveal
          href={brandClosing.exploreChannelHref}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gold-soft transition-colors hover:text-gold"
        >
          {brandClosing.exploreChannel}
          <span aria-hidden="true">→</span>
        </a>
      </Container>
    </section>
  );
}
