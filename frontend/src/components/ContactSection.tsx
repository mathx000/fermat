import { Button } from "./Button";
import { whatsappUrl } from "../lib/whatsapp";

export function ContactSection() {
  return (
    <section id="contactos" className="grid-blueprint relative scroll-mt-16 overflow-hidden bg-aco text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-5 font-mono text-xs text-betao">Contactos · Vila Flor</p>
          <h2 className="font-display text-5xl font-black uppercase leading-[.9] md:text-7xl">Fale com<br /><span className="text-fermat">a Fermat.</span></h2>
          <p className="mt-6 max-w-md text-lg text-white/75">Peça preço, mande a sua lista de material ou visite-nos. Nós fazemos as contas.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/formulario" variant="red">Pedir orçamento</Button>
            <Button href={whatsappUrl()} variant="ghost">Falar no WhatsApp</Button>
          </div>
        </div>
        <address className="grid content-center gap-px bg-white/15 not-italic">
          <div className="bg-aco py-5 pr-3">
            <p className="font-mono text-[11px] text-betao">Armazém e loja</p>
            <p className="mt-1 font-display text-2xl font-bold leading-tight">EN 220, Quinta de Vale d'Afonso<br />5360-316 Vila Flor</p>
          </div>
          <div className="bg-aco py-5 pr-3">
            <p className="font-mono text-[11px] text-betao">Telefone</p>
            <p className="mt-1 font-display text-2xl font-bold leading-tight">278 516 520 · 919 312 138</p>
          </div>
        </address>
      </div>
    </section>
  );
}
