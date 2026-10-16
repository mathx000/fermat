import { useMemo } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { CATALOG_CATEGORIES, type Product } from "../../shared/products";
import { Button } from "../components/Button";
import type { LayoutContext } from "../components/Layout";
import { ProductIllustration } from "../components/ProductIllustration";
import { useProducts } from "../hooks/useProducts";
import { whatsappUrl } from "../lib/whatsapp";

type Group = "Obra grossa" | "Obra fina";
const GROUPS: Group[] = ["Obra grossa", "Obra fina"];
const INTRO: Record<Group | "Todos", [string, string]> = {
  Todos: ["Catálogo completo", "Todos os materiais para a sua obra, do alicerce ao acabamento."],
  "Obra grossa": ["Obra grossa", "Tudo o que põe uma obra de pé."],
  "Obra fina": ["Obra fina", "Tudo o que dá acabamento à obra."],
};

export default function CatalogPage() {
  const { openQuote } = useOutletContext<LayoutContext>();
  const products = useProducts();
  const [params, setParams] = useSearchParams();

  const group = GROUPS.find(g => g === params.get("grupo")) ?? "Todos";
  const category = CATALOG_CATEGORIES.find(c => c.name === params.get("categoria"))?.name;
  const query = params.get("q") ?? "";

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    setParams(next, { replace: true });
  };

  const inGroup = useMemo(() => products.filter(p => group === "Todos" || p.group === group), [products, group]);
  const categories = CATALOG_CATEGORIES.filter(c => group === "Todos" || c.group === group).map(c => c.name);
  const visible = useMemo(
    () => inGroup.filter(p => (!category || p.category === category) && (p.name + p.ref).toLowerCase().includes(query.toLowerCase())),
    [inGroup, category, query]
  );
  const [title, subtitle] = INTRO[group];

  return (
    <>
      <div className="bg-aco py-2 text-center font-mono text-[10px] uppercase tracking-[.25em] text-betao">
        Entrega em obra · Preço no próprio dia · Profissionais e particulares
      </div>

      <section className="border-b border-aco/15 bg-aco/[.04]">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <nav aria-label="Localização" className="font-mono text-[10px] uppercase tracking-[.2em] text-grafite/60">
            <Link to="/" className="hover:text-fermat">Início</Link> / <Link to="/catalogo" className="hover:text-fermat">Produtos</Link>
            {group !== "Todos" && <> / <span className="font-bold text-fermat">{group}</span></>}
          </nav>
          <h1 className="mt-3 font-display text-6xl font-black uppercase leading-none md:text-7xl">{title}</h1>
          <p className="mt-2 text-grafite">{subtitle}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-8">
          <label className="block">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[.25em] text-grafite/70">Pesquisar</span>
            <input value={query} onChange={e => update({ q: e.target.value || null })} placeholder="Pesquisar material…" className="mt-3 w-full border-2 border-aco bg-transparent px-3 py-2.5 outline-none placeholder:text-grafite/50 focus:border-fermat" />
          </label>

          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[.25em] text-grafite/70">Tipo de obra</h2>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {(["Todos", ...GROUPS] as const).map(g => (
                <li key={g}>
                  <button onClick={() => update({ grupo: g === "Todos" ? null : g, categoria: null })} aria-pressed={group === g}
                    className={`w-full px-3 py-2 text-left font-display text-lg font-bold uppercase tracking-wide transition-colors ${group === g ? "bg-aco text-white" : "bg-aco/5 hover:bg-aco hover:text-white"}`}>{g}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[.25em] text-grafite/70">Categoria</h2>
            <ul className="mt-3 space-y-2.5">
              {categories.map(c => (
                <li key={c}>
                  <button onClick={() => update({ categoria: category === c ? null : c })} aria-pressed={category === c} className="flex items-center gap-3 text-left text-sm">
                    <span className={`h-3.5 w-3.5 shrink-0 border ${category === c ? "border-fermat bg-fermat" : "border-grafite/60 bg-white"}`} />
                    <span className={category === c ? "font-bold" : ""}>{c}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[.25em] text-grafite/70">Precisa de ajuda?</h2>
            <div className="mt-3 bg-aco p-4 text-sm text-white">
              <p>Tem uma lista de material? Mande por WhatsApp. Nós fazemos as contas.</p>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-4 inline-block bg-emerald-600 px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-emerald-500">WhatsApp</a>
            </div>
          </div>
        </aside>

        <section aria-label="Produtos">
          <p className="mb-4 font-mono text-xs text-grafite/70" aria-live="polite">{visible.length} {visible.length === 1 ? "produto" : "produtos"}</p>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map(p => <ProductCard key={p.ref} product={p} onQuote={openQuote} />)}
          </ul>
          {!visible.length && (
            <p className="text-lg">{category && !query ? `Ainda não há produtos online em ${category}.` : "Não encontrámos esse material."} <a className="font-semibold text-fermat underline" href={whatsappUrl(`Procuro: ${query || category || ""}`)} target="_blank" rel="noreferrer">Pergunte-nos no WhatsApp.</a></p>
          )}
          <div className="mt-10"><Button href="/" variant="dark">Voltar ao início</Button></div>
        </section>
      </div>
    </>
  );
}

function ProductCard({ product, onQuote }: { product: Product; onQuote: (p?: Product) => void }) {
  return (
    <li className="group flex flex-col border border-aco/15 bg-white p-2.5 transition-colors hover:border-aco/40">
      <div className="h-36 bg-cal"><ProductIllustration product={product} /></div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-fermat">{product.category}</p>
          <h2 className="mt-1.5 font-display text-2xl font-bold leading-tight">{product.name}</h2>
          <p className="mt-1 font-mono text-xs text-grafite/70">{product.unit} · {product.spec}</p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-2">
          <span className={`flex items-center gap-2 text-xs font-semibold ${product.inStock ? "text-emerald-700" : "text-grafite/70"}`}>
            <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-emerald-600" : "bg-betao"}`} />{product.inStock ? "Disponível" : "Sob encomenda"}
          </span>
          <button onClick={() => onQuote(product)} className="bg-aco px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-fermat">Pedir preço</button>
        </div>
      </div>
    </li>
  );
}
