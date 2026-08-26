import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { whatsInside } from "@/data/content";

export function WhatsInside() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-28 sm:py-36">
      <Container>
        <div className="flex flex-col items-center text-center">
          <div data-reveal>
            <Eyebrow className="mb-5">{whatsInside.kicker}</Eyebrow>
          </div>
          <h2 data-reveal className="font-display text-3xl text-ivory sm:text-5xl">
            {whatsInside.headline}
          </h2>
          <p data-reveal className="mt-5 max-w-lg text-sm text-sand sm:text-base">
            {whatsInside.subhead}
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatsInside.chapters.map((chapter) => (
            <GlassCard key={chapter.number} data-reveal className="p-7 transition-transform duration-500 ease-premium hover:-translate-y-1.5">
              <span className="font-display text-3xl text-gold/70">{chapter.number}</span>
              <h3 className="mt-4 font-display text-xl text-ivory">{chapter.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand">{chapter.description}</p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
