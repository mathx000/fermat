import type { QuoteItem } from "./MaterialPicker";
import { Button } from "./Button";
import { QuoteForm } from "./QuoteForm";
import { Truck } from "./Truck";
import { whatsappUrl } from "../lib/whatsapp";

export function Contact({ items, onSent }: { items?: QuoteItem[]; onSent?: () => void } = {}) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-5 py-16 lg:grid-cols-2">
      <div className="min-w-0 bg-white pt-5 sm:pt-8"><QuoteForm presetItems={items} onSent={onSent} /></div>
      <div className="flex min-w-0 flex-col justify-between gap-8">
        <div><h2 className="font-display text-5xl font-black uppercase md:text-7xl">Tem uma lista de material?</h2>
          <p className="mt-4 max-w-md text-lg">Mande por WhatsApp. Nós fazemos as contas.</p>
          <div className="mt-6"><Button href={whatsappUrl()} variant="dark">WhatsApp</Button></div>
          <Truck className="mt-8 w-full max-w-md" /></div>
        <address className="not-italic">
          <p className="font-mono text-sm text-grafite/70">Armazém e loja</p>
          <p className="mt-1 text-lg">EN 220, Quinta de Vale d'Afonso<br />5360-316 Vila Flor</p>
          <p className="mt-3 font-mono">278 516 520 · 919 312 138</p>
        </address>
      </div>
    </section>
  );
}
