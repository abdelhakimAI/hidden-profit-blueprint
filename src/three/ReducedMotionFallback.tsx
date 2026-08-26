import { colors } from "@/config/theme";

/**
 * No animation, no WebGL — just a still, cinematic gold-on-charcoal
 * composition so the page never looks broken or empty for visitors who
 * can't or don't want the 3D layer.
 */
export function ReducedMotionFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: `radial-gradient(60% 50% at 50% 38%, ${colors.goldDeep}22 0%, transparent 70%), radial-gradient(80% 60% at 50% 100%, ${colors.bgElevated} 0%, ${colors.bgDeep} 100%)`,
      }}
    >
      <svg
        className="absolute left-1/2 top-[32%] h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 opacity-70"
        viewBox="0 0 400 400"
        fill="none"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="200"
            rx={40 + i * 24}
            ry={16 + i * 9}
            stroke={colors.gold}
            strokeOpacity={0.22 - i * 0.02}
            strokeWidth={1}
            transform={`rotate(${i * 25} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="3" fill={colors.goldSoft} />
      </svg>
    </div>
  );
}
