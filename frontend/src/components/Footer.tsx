import { Wordmark } from "./Brand";

const ICONS: Record<string, JSX.Element> = {
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z" />,
  Telefone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  Email: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></>,
  Endereço: <><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
};

export function Footer() {
  return (
    <footer className="bg-aco pb-14 text-white sm:pb-0">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10"><Wordmark light />
        <p className="font-display text-3xl font-bold uppercase text-fermat">Fermat, material firme.</p></div>
      <div className="mx-auto grid max-w-7xl gap-px bg-white/10 px-0 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Instagram", "@fermat", "https://www.instagram.com/"],
          ["Facebook", "Fermat · Irmãos Fernandes", "https://www.facebook.com/"],
          ["Telefone", "278 516 520 · 919 312 138", "tel:+351278516520"],
          ["Email", "geral@fermat.pt", "mailto:geral@fermat.pt"],
          ["Endereço", "EN 220, Quinta de Vale d'Afonso, 5360-316 Vila Flor", "https://www.google.com/maps/search/?api=1&query=EN+220+Quinta+de+Vale+d'Afonso+5360-316+Vila+Flor"],
        ].map(([label, value, href]) => (
          <div key={label} className="flex items-start gap-3 bg-aco p-5">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-fermat" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[label]}</svg>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[.2em] text-betao">{label}</p>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-1 block text-sm text-white/85 hover:text-white">{value}</a>
            </div>
          </div>
        ))}
      </div>
      <p className="border-t border-white/10 px-5 py-4 text-center font-mono text-xs text-betao">© 2026 Irmãos Mário & Jorge Fernandes, Lda. · Vila Flor</p>
    </footer>
  );
}
