import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "../../shared/products";
import { useProducts } from "../hooks/useProducts";

export type QuoteItem = { name: string; qty: number };
export type QuoteCategory = "Todos" | Product["group"];

const norm = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function MaterialPicker({ category, items, onChange, inputClass }: {
  category: QuoteCategory;
  items: QuoteItem[];
  onChange: (items: QuoteItem[]) => void;
  inputClass: string;
}) {
  const products = useProducts();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const options = useMemo(
    () => products.filter(p => (category === "Todos" || p.group === category) && norm(p.name).includes(norm(query.trim()))),
    [products, category, query]
  );
  const isSelected = (name: string) => items.some(item => item.name === name);
  const toggle = (name: string) => onChange(isSelected(name) ? items.filter(item => item.name !== name) : [...items, { name, qty: 1 }]);
  const typed = query.trim();
  const canAddTyped = typed.length > 1 && !products.some(p => norm(p.name) === norm(typed)) && !isSelected(typed);

  const addTyped = () => {
    if (!typed) return;
    const exact = products.find(p => norm(p.name) === norm(typed));
    const match = exact ?? (options.length === 1 ? options[0] : undefined);
    const name = match?.name ?? typed;
    if (!isSelected(name)) onChange([...items, { name, qty: 1 }]);
    setQuery("");
  };

  return (
    <div ref={box} className="relative">
      <div className={`${inputClass} flex flex-wrap items-center gap-2 focus-within:border-fermat`}>
        {items.map(item => (
          <span key={item.name} className="inline-flex items-center gap-1 bg-aco px-2 py-1 text-sm text-white">
            {item.name}
            <button type="button" onClick={() => toggle(item.name)} aria-label={`Remover ${item.name}`} className="px-1 hover:text-fermat">×</button>
          </span>
        ))}
        <input
          value={query}
          onChange={event => { setQuery(event.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={event => {
            if (event.key === "Enter") { event.preventDefault(); addTyped(); }
            if (event.key === "Escape") setOpen(false);
            if (event.key === "Backspace" && !query && items.length) onChange(items.slice(0, -1));
          }}
          role="combobox" aria-expanded={open} aria-controls="material-list" aria-autocomplete="list"
          placeholder={items.length ? "Adicionar outro…" : "Escolha ou escreva o material"}
          className="min-w-40 flex-1 bg-transparent outline-none"
        />
        <button type="button" onClick={() => setOpen(o => !o)} aria-label="Mostrar materiais" className="px-1 text-grafite">{open ? "▲" : "▼"}</button>
      </div>
      {open && (
        <ul id="material-list" role="listbox" aria-multiselectable="true" className="absolute z-20 mt-1 max-h-64 w-full overflow-auto border-2 border-aco bg-white shadow-lg">
          {options.map(p => (
            <li key={p.ref} role="option" aria-selected={isSelected(p.name)}>
              <button type="button" onClick={() => toggle(p.name)} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-aco/5">
                <span className={`grid h-4 w-4 shrink-0 place-items-center border text-[10px] leading-none text-white ${isSelected(p.name) ? "border-fermat bg-fermat" : "border-grafite/60 bg-white"}`}>{isSelected(p.name) ? "✓" : ""}</span>
                <span className="flex-1">{p.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-grafite/60">{p.category}</span>
              </button>
            </li>
          ))}
          {canAddTyped && (
            <li role="option" aria-selected={false}>
              <button type="button" onClick={addTyped} className="w-full px-4 py-2 text-left font-semibold text-fermat hover:bg-aco/5">Adicionar “{typed}”</button>
            </li>
          )}
          {!options.length && !canAddTyped && <li className="px-4 py-3 text-grafite/70">Nenhum material encontrado.</li>}
        </ul>
      )}
    </div>
  );
}
