import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium tracking-wide transition-all duration-300 ease-premium focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-bg px-8 py-4 text-sm sm:text-base shadow-gold hover:bg-gold-soft hover:shadow-[0_0_56px_-6px_rgba(200,162,92,0.55)] hover:-translate-y-0.5",
  ghost:
    "border border-gold/40 text-ivory px-7 py-3.5 text-sm hover:border-gold hover:bg-gold/10",
};

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type CommonProps = {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = "primary", loading, children, className, as, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (as === "a") {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {loading && <Spinner />}
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} disabled={loading || buttonProps.disabled} {...buttonProps}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
