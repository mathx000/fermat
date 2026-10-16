import { Link, useOutletContext, useParams } from "react-router-dom";
import { PRODUCT_DETAILS } from "../../shared/product-details";
import { Button } from "../components/Button";
import type { LayoutContext } from "../components/Layout";
import { ProductIllustration } from "../components/ProductIllustration";
import { useProducts } from "../hooks/useProducts";
import { whatsappUrl } from "../lib/whatsapp";

export default function ProductPage() {
  const { ref } = useParams();
  const { openQuote } = useOutletContext<LayoutContext>();
  const products = useProducts();
  const product = products.find(p => p.ref === ref);

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-24">
        <h1 className="font-display text-5xl font-black uppercase">Material não encontrado</h1>
        <p className="mt-3 text-grafite">Esse material não existe ou já não está no catálogo.</p>
        <div className="mt-8"><Button href="/catalogo" variant="dark">Ver catálogo completo</Button></div>
      </section>
    );
  }

  const details = PRODUCT_DETAILS[product.ref];
  const specs: [string, string][] = [["Referência", product.ref], ["Categoria", product.category], ["Tipo de obra", product.group], ["Venda", product.unit], ...(details?.specs ?? [["Características", product.spec]] as [string, string][])];
  const related = products.filter(p => p.category === product.category && p.ref !== product.ref).slice(0, 3);

  return (
    <>
      <section className="border-b border-aco/15 bg-aco/[.04]">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <nav aria-label="Localização" className="font-mono text-[10px] uppercase tracking-[.2em] text-grafite/60">
            <Link to="/" className="hover:text-fermat">Início</Link> / <Link to="/catalogo" className="hover:text-fermat">Produtos</Link> / <Link to={`/catalogo?categoria=${encodeURIComponent(product.category)}`} className="hover:text-fermat">{product.category}</Link> / <span className="font-bold text-fermat">{product.ref}</span>
          </nav>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-2">
        <div className="aspect-[4/3] min-w-0 border border-aco/15 bg-cal"><ProductIllustration product={product} /></div>

        <div className="min-w-0">
          <p className="font-mono text-xs font-bold uppercase tracking-[.25em] text-fermat">{product.group} · {product.category}</p>
          <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl md:text-6xl">{product.name}</h1>
          <p className="mt-2 font-mono text-sm text-grafite/70">{product.unit} · {product.spec}</p>
          {details && <p className="mt-5 max-w-xl text-lg text-grafite">{details.description}</p>}

          <div className="mt-6 border-l-[6px] border-fermat bg-white p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-betao">Preço</p>
            <p className="mt-1 font-display text-3xl font-bold uppercase">Sob consulta</p>
            <p className="mt-1 flex items-center gap-2 text-sm"><span className={`h-2.5 w-2.5 ${product.inStock ? "bg-emerald-600" : "bg-betao"}`} />{product.inStock ? "Disponível" : "Sob encomenda"}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => openQuote(product)} className="bg-fermat px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wider text-white hover:bg-aco">Pedir preço</button>
              <Button href={whatsappUrl(`Olá, gostava de pedir preço de: ${product.name} (${product.ref}).`)} variant="dark">Falar no WhatsApp</Button>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-black uppercase">Especificações</h2>
          <dl className="mt-4 divide-y divide-aco/15 border-y border-aco/15 bg-white">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                <dt className="font-mono text-xs uppercase tracking-wider text-grafite/70">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {details && (
          <div>
            <h2 className="font-display text-3xl font-black uppercase">Aplicações</h2>
            <ul className="mt-4 space-y-2">
              {details.uses.map(use => <li key={use} className="flex items-center gap-3"><span className="h-2.5 w-2.5 shrink-0 bg-fermat" />{use}</li>)}
            </ul>
          </div>
        )}
      </section>

      {!!related.length && (
        <section className="border-t border-aco/15 bg-aco/[.04]">
          <div className="mx-auto max-w-7xl px-5 py-12">
            <h2 className="font-display text-3xl font-black uppercase">Também em {product.category}</h2>
            <ul className="mt-6 grid gap-px bg-aco/15 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(p => (
                <li key={p.ref}>
                  <Link to={`/produtos/${p.ref}`} className="block h-full bg-cal p-5 transition-colors hover:bg-white">
                    <span className="font-mono text-xs text-grafite/70">{p.ref}</span>
                    <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{p.name}</h3>
                    <p className="mt-1 font-mono text-xs text-grafite/70">{p.unit} · {p.spec}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
