import { useState, type FormEvent } from "react";
import { whatsappUrl } from "../lib/whatsapp";
import { MaterialPicker, type QuoteCategory, type QuoteItem } from "./MaterialPicker";

const CATEGORIES: QuoteCategory[] = ["Obra grossa", "Obra fina", "Todos"];

export function QuoteForm({ preset, onDone }: { preset?: string; onDone?: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "ok">("idle");
  const [error, setError] = useState("");
  const [category, setCategory] = useState<QuoteCategory>("Todos");
  const [items, setItems] = useState<QuoteItem[]>(preset ? [{ name: preset, qty: 1 }] : []);

  const setQty = (name: string, qty: number) => setItems(list => list.map(item => item.name === name ? { ...item, qty: Math.max(1, Math.min(9999, qty || 1)) } : item));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!items.length) return setError("Escolha pelo menos um material.");
    setState("sending");
    const form = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category, items })
      });
      if (!response.ok) throw new Error((await response.json()).error);
      setState("ok");
    } catch (caught) {
      setError((caught as Error).message || "Não foi possível enviar. Tente o WhatsApp.");
      setState("idle");
    }
  }

  if (state === "ok") return (
    <div className="p-8"><h3 className="font-display text-5xl font-black uppercase">Pedido enviado.</h3>
      <p className="mt-3">Alguém da nossa equipa liga-lhe de volta.</p>{onDone && <button onClick={onDone} className="mt-6 bg-aco px-5 py-3 font-display font-bold uppercase text-white">Fechar</button>}</div>
  );

  const inputClass = "w-full border-2 border-aco/80 bg-white px-4 py-3 outline-none focus:border-fermat";
  const summary = items.length ? items.map(item => `${item.qty}× ${item.name}`).join(", ") : "material";
  return (
    <form onSubmit={submit} className="grid gap-4 p-8">
      <h3 className="font-display text-4xl font-black uppercase">Peça preço</h3>
      <p className="-mt-2 text-grafite">Diga o que precisa. Alguém da nossa equipa liga-lhe de volta.</p>
      <label>Nome *<input name="name" required autoComplete="name" className={inputClass} /></label>
      <label>Contacto *<input name="phone" required type="tel" autoComplete="tel" className={inputClass} /></label>
      <label>Email *<input name="email" required type="email" autoComplete="email" className={inputClass} /></label>

      <label>Categoria
        <select value={category} onChange={event => setCategory(event.target.value as QuoteCategory)} className={inputClass}>
          {CATEGORIES.map(item => <option key={item}>{item}</option>)}
        </select>
      </label>

      <div>
        <span>Material</span>
        <MaterialPicker category={category} items={items} onChange={setItems} inputClass={inputClass} />
      </div>

      <fieldset>
        <legend>Quantidade e local da obra</legend>
        <ul className="mt-1 divide-y divide-aco/15 border-2 border-aco/80 bg-white">
          {items.map(item => (
            <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-2">
              <span className="min-w-0 flex-1 truncate" title={item.name}>{item.name}</span>
              <span className="flex shrink-0 items-center">
                <button type="button" onClick={() => setQty(item.name, item.qty - 1)} disabled={item.qty <= 1} aria-label={`Diminuir ${item.name}`} className="h-9 w-9 bg-aco text-xl text-white hover:bg-fermat disabled:opacity-30">−</button>
                <input type="number" min={1} max={9999} value={item.qty} onChange={event => setQty(item.name, Number(event.target.value))} aria-label={`Quantidade de ${item.name}`} className="h-9 w-14 border-y-2 border-aco/80 text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
                <button type="button" onClick={() => setQty(item.name, item.qty + 1)} aria-label={`Aumentar ${item.name}`} className="h-9 w-9 bg-aco text-xl text-white hover:bg-fermat">+</button>
              </span>
            </li>
          ))}
          {!items.length && <li className="px-4 py-3 text-grafite/70">Escolha os materiais acima para indicar as quantidades.</li>}
        </ul>
        <input name="location" placeholder="Local da obra" autoComplete="off" className={`${inputClass} mt-2`} />
      </fieldset>

      <label>Observação<textarea name="notes" rows={3} className={inputClass} /></label>
      {error && <p role="alert" className="font-semibold text-fermat">{error}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={state === "sending"} className="bg-fermat px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wider text-white hover:bg-aco disabled:opacity-60">{state === "sending" ? "A enviar…" : "Enviar pedido"}</button>
        <span>ou</span><a href={whatsappUrl(`Olá, quero preço de: ${summary}`)} target="_blank" rel="noreferrer" className="font-semibold underline decoration-fermat decoration-2 underline-offset-4">Falar no WhatsApp</a>
      </div>
    </form>
  );
}
