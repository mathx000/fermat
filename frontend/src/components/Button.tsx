import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "red" | "dark" | "ghost";
  children: ReactNode;
};

export function Button({ href, onClick, variant = "red", children }: ButtonProps) {
  const className = "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wider transition-colors " +
    { red: "bg-fermat text-white hover:bg-white hover:text-fermat", dark: "bg-aco text-white hover:bg-fermat", ghost: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-aco" }[variant];
  if (href?.startsWith("/") && !href.startsWith("/#")) return <Link to={href} className={className}>{children}</Link>;
  return href
    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={className}>{children}</a>
    : <button onClick={onClick} className={className}>{children}</button>;
}
