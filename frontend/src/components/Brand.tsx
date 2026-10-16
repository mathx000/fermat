import { Link } from "react-router-dom";

const BLOCKS = [[0, 0, 14], [15, 0, 17], [0, 7, 8], [9, 7, 13], [0, 14, 14], [0, 21, 8], [9, 21, 6]];

export function Mark({ className = "h-10", animate = false, color = "#C8102E" }: { className?: string; animate?: boolean; color?: string }) {
  return (
    <svg viewBox="0 0 32 27" className={className} role="img" aria-label="Fermat">
      {BLOCKS.map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={6} fill={color} className={animate ? "brick" : ""} style={animate ? { animationDelay: `${i * 110}ms` } : undefined} />
      ))}
    </svg>
  );
}

const ICON_BLOCKS = [[26, 24, 44], [75, 24, 46], [26, 49, 21], [26, 75, 45], [75, 75, 26], [26, 100, 21]];

export function AppIcon({ className = "h-10 w-10", bg = "#C8102E", fg = "#fff", animate = false }: { className?: string; bg?: string; fg?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 149 148" className={className} role="img" aria-label="Fermat">
      {bg !== "none" && <rect width="149" height="148" fill={bg} />}
      {ICON_BLOCKS.map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={20} fill={fg} className={animate ? "brick" : ""} style={animate ? { animationDelay: `${i * 110}ms` } : undefined} />
      ))}
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/#topo" className={`flex items-center gap-3 ${light ? "text-white" : "text-aco"}`} aria-label="Fermat, Irmãos Fernandes">
      <AppIcon className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span className="block font-display text-3xl font-black tracking-wide">FERMAT</span>
        <span className="block font-mono text-[10px] tracking-[.28em] text-betao">IRMÃOS FERNANDES</span>
      </span>
    </Link>
  );
}
