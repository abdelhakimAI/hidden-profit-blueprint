import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function GlassCard({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass-panel rounded-2xl shadow-card", className)} {...rest} />;
}
