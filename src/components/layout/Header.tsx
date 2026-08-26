import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { brand, nav } from "@/data/content";
import { trackEvent } from "@/integrations/analytics/analytics";
import { cn } from "@/utils/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-hairline bg-bg/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="font-display text-lg text-ivory sm:text-xl">
          {brand.wordmark}
          <span className="ml-1.5 hidden text-sm font-normal text-sand sm:inline">{brand.wordmarkSuffix}</span>
        </a>

        <nav className="flex items-center gap-6">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden font-body text-sm text-sand transition-colors hover:text-ivory sm:inline-block"
            >
              {link.label}
            </a>
          ))}
          <Button
            as="a"
            href="#email-capture"
            variant="ghost"
            className="!px-5 !py-2.5 text-xs sm:text-sm"
            onClick={() => trackEvent("cta_click", { location: "header" })}
          >
            {nav.cta}
          </Button>
        </nav>
      </Container>
    </header>
  );
}
