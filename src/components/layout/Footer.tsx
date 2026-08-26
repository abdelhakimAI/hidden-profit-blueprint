import { Container } from "@/components/ui/Container";
import { footer } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline py-8">
      <Container className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-sand-muted">{footer.copyright}</p>
        <nav className="flex items-center gap-5">
          <a href={footer.privacyHref} className="text-xs text-sand-muted transition-colors hover:text-gold-soft">
            {footer.privacyLabel}
          </a>
          <a href={footer.termsHref} className="text-xs text-sand-muted transition-colors hover:text-gold-soft">
            {footer.termsLabel}
          </a>
        </nav>
      </Container>
    </footer>
  );
}
