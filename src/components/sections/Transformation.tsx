import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { transformation } from "@/data/content";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Transformation() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-28 sm:py-36">
      <Container>
        <div className="flex flex-col items-center text-center">
          <div data-reveal>
            <Eyebrow className="mb-5">{transformation.kicker}</Eyebrow>
          </div>
          <h2 data-reveal className="max-w-2xl font-display text-3xl text-ivory sm:text-5xl">
            {transformation.headline}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <GlassCard data-reveal className="p-8 opacity-90">
            <p className="text-xs uppercase tracking-widest2 text-sand-muted">{transformation.from.label}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {transformation.from.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sand">
                  <DashIcon className="shrink-0 text-sand-muted" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard data-reveal className="border-gold/30 p-8 shadow-gold">
            <p className="text-xs uppercase tracking-widest2 text-gold-soft">{transformation.to.label}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {transformation.to.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ivory">
                  <CheckIcon className="shrink-0 text-gold" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
