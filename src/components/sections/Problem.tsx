import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { problem } from "@/data/content";

const CHAOS_TRANSFORMS = [
  "rotate-[-6deg] translate-y-1",
  "rotate-[4deg] -translate-y-2",
  "rotate-[-2deg] translate-y-3",
  "rotate-[7deg] translate-y-0",
  "rotate-[-5deg] -translate-y-1",
];

export function Problem() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-28 sm:py-36">
      <Container className="flex flex-col items-center text-center">
        <div data-reveal>
          <Eyebrow className="mb-5">{problem.kicker}</Eyebrow>
        </div>

        <h2
          data-reveal
          className="whitespace-pre-line max-w-2xl font-display text-3xl leading-tight text-ivory sm:text-5xl"
        >
          {problem.headline}
        </h2>

        <p data-reveal className="mt-6 max-w-xl text-sm text-sand sm:text-base">
          {problem.body}
        </p>

        <div className="mt-16 flex w-full max-w-3xl flex-col items-center gap-10">
          {/* Scattered state */}
          <div data-reveal className="flex flex-wrap items-center justify-center gap-3">
            {problem.chaosLabels.map((label, i) => (
              <span
                key={label}
                className={`rounded-md border border-hairline bg-bg-elevated/60 px-4 py-2 text-xs text-sand-muted ${
                  CHAOS_TRANSFORMS[i % CHAOS_TRANSFORMS.length]
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <span aria-hidden="true" className="h-10 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />

          {/* Organized state */}
          <div data-reveal className="flex flex-wrap items-center justify-center gap-4">
            {problem.systemLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-gold/40 bg-gold/[0.06] px-5 py-2.5 text-xs uppercase tracking-widest2 text-gold-soft"
              >
                {label}
              </span>
            ))}
          </div>

          <p data-reveal className="text-xs text-sand-muted">
            {problem.systemCaption}
          </p>
        </div>
      </Container>
    </section>
  );
}
