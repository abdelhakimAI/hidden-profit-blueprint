import { useSectionReveal } from "@/animations/useSectionReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { blueprintShowcase } from "@/data/content";
import { brandConfig } from "@/config/brand.config";
import { trackEvent } from "@/integrations/analytics/analytics";

export function BlueprintShowcase() {
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-28 sm:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
        <div data-reveal className="order-2 flex flex-col items-start text-left lg:order-1">
          <Eyebrow className="mb-5">{blueprintShowcase.kicker}</Eyebrow>
          <h2 className="font-display text-3xl leading-tight text-ivory sm:text-5xl">
            {blueprintShowcase.headline}
          </h2>
          <p className="mt-6 max-w-md text-sm text-sand sm:text-base">{blueprintShowcase.body}</p>
          <Button
            className="mt-9"
            as="a"
            href="#email-capture"
            onClick={() => trackEvent("cta_click", { location: "blueprint_showcase" })}
          >
            {blueprintShowcase.cta}
          </Button>
        </div>

        <div data-reveal className="order-1 flex justify-center lg:order-2" style={{ perspective: "1400px" }}>
          <div className="relative w-[220px] sm:w-[280px]">
            <img
              src={brandConfig.blueprintCoverAsset}
              alt="Cover of The Faceless YouTube Profit Blueprint"
              width={600}
              height={800}
              loading="lazy"
              className="w-full animate-float rounded-xl shadow-[0_50px_100px_-30px_rgba(0,0,0,0.75)]"
              style={{ transformStyle: "preserve-3d" }}
            />
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-gold/10 blur-3xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
