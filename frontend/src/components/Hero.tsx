import { Button } from "./Button";
import { AppIcon } from "./Brand";
import { whatsappUrl } from "../lib/whatsapp";

export function Hero({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="grid-blueprint relative overflow-hidden bg-aco text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-5 font-mono text-xs text-betao">Vila Flor · Bragança · desde 2001</p>
          <h1 className="font-display text-[clamp(3.25rem,13vw,11rem)] font-black uppercase leading-[.85]">Material<br /><span className="text-fermat">firme.</span></h1>
          <p className="mt-8 max-w-md text-lg text-white/75">Bloco, tijolo, cofragem, ladrilhos, sanitários e tintas. Diga-nos o que a obra pede. Nós levamos.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#catalogo" variant="red">Ver catálogo</Button>
            <Button href={whatsappUrl()} variant="ghost">Falar no WhatsApp</Button>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-px bg-white/15 text-left">
            {[["Entrega", "em obra"], ["Preço", "no próprio dia"], ["Clientes", "profissionais e particulares"]].map(([label, value]) => (
              <div key={label} className="bg-aco py-4 pr-3"><dt className="font-mono text-[11px] text-betao">{label}</dt><dd className="mt-1 font-display text-xl font-bold leading-tight">{value}</dd></div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <AppIcon className="absolute inset-0 h-full w-full" bg="none" fg="#C8102E" animate />
          <div className="absolute inset-0 border border-white/15" />
        </div>
      </div>
      <button onClick={onQuote} className="sr-only focus:not-sr-only">Pedir orçamento</button>
    </section>
  );
}
