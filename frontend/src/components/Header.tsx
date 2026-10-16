import { useState } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "./Brand";

const links = [["Quem somos", "/#quem-somos"], ["A marca", "/#historia-marca"], ["Produtos", "/catalogo"], ["Obra grossa", "/catalogo?grupo=Obra grossa"], ["Obra fina", "/catalogo?grupo=Obra fina"], ["Contactos", "/#contactos"]];

function NavItem({ href, className, onClick, children }: { href: string; className: string; onClick?: () => void; children: string }) {
  if (!href) return <span aria-disabled="true" className={`${className} cursor-default`}>{children}</span>;
  return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header id="topo" className="sticky top-0 z-40 border-b border-white/10 bg-aco/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
        <Wordmark light />
        <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex" aria-label="Principal">
          {links.map(([label, href]) => <NavItem key={label} href={href} className="hover:text-white">{label}</NavItem>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/formulario" className="hidden bg-fermat px-5 py-2.5 font-display text-base font-bold uppercase tracking-wider text-white hover:bg-white hover:text-fermat sm:block">Pedir orçamento</Link>
          <button className="p-2 text-white lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 12h18M3 17h18"} /></svg>
          </button>
        </div>
      </div>
      {open && <nav className="grid border-t border-white/10 bg-aco px-5 pb-4 lg:hidden">{links.map(([label, href]) => <NavItem key={label} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-white/90">{label}</NavItem>)}</nav>}
    </header>
  );
}
