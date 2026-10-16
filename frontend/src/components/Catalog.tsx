import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "../../shared/products";
import { Button } from "./Button";
import { whatsappUrl } from "../lib/whatsapp";

export function Catalog({ onQuote }: { onQuote: (product?: Product) => void }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [category, setCategory] = useState<Category | "Todos">("Todos");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products").then(response => response.json()).then(setProducts).catch(() => {});
  }, []);

  const filteredProducts = useMemo(
    () => products.filter(product =>
      (category === "Todos" || product.category === category) &&
      (product.name + product.ref).toLowerCase().includes(query.toLowerCase())
    ),
    [products, category, query]
  );

  return (
    <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-5xl font-black uppercase leading-none md:text-7xl">Do alicerce<br />ao acabamento</h2>
        <label className="w-full md:w-80"><span className="sr-only">Pesquisar material</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Pesquisar material…" className="w-full border-2 border-aco bg-transparent px-4 py-3 outline-none placeholder:text-grafite/50 focus:border-fermat" />
        </label>
      </div>
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorias">
        {(["Todos", ...CATEGORIES] as const).map(item => (
          <button key={item} role="tab" aria-selected={category === item} onClick={() => setCategory(item)}
            className={`px-4 py-2 font-display text-lg font-bold uppercase tracking-wide transition-colors ${category === item ? "bg-fermat text-white" : "bg-aco/5 text-aco hover:bg-aco hover:text-white"}`}>{item}</button>
        ))}
      </div>
      <ul className="mt-8 grid gap-px bg-aco/15 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.slice(0, 6).map(product => (
          <li key={product.ref} className="group relative flex flex-col justify-between bg-cal p-6 transition-colors hover:bg-white">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-grafite/70"><span>{product.group} · {product.category}</span><span>{product.ref}</span></div>
              <h3 className="mt-5 font-display text-3xl font-bold leading-tight"><Link to={`/produtos/${product.ref}`} className="after:absolute after:inset-0 hover:text-fermat">{product.name}</Link></h3>
              <p className="mt-2 font-mono text-sm text-grafite/70">{product.unit} · {product.spec}</p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm"><span className={`h-2.5 w-2.5 ${product.inStock ? "bg-emerald-600" : "bg-betao"}`} />{product.inStock ? "Disponível" : "Sob encomenda"}</span>
              <button onClick={() => onQuote(product)} className="relative z-10 bg-aco px-4 py-2 font-display text-base font-bold uppercase tracking-wider text-white group-hover:bg-fermat">Pedir preço</button>
            </div>
          </li>
        ))}
      </ul>
      {!filteredProducts.length && <p className="mt-8 text-lg">Não encontrámos esse material. <a className="font-semibold text-fermat underline" href={whatsappUrl(`Procuro: ${query}`)}>Pergunte-nos no WhatsApp.</a></p>}
      <div className="mt-10 flex justify-center">
        <Button href="/catalogo" variant="dark">Ver catálogo completo</Button>
      </div>
    </section>
  );
}
