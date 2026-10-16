import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../lib/cart";
import { whatsappUrl } from "../lib/whatsapp";

export default function CartPage() {
  const { items, count, setQty, remove, clear } = useCart();
  const products = useProducts();
  const summary = items.map(item => `${item.qty}× ${item.name}`).join(", ");

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <p className="font-mono text-xs font-bold uppercase tracking-[.25em] text-fermat">O seu pedido</p>
      <h1 className="mt-2 font-display text-5xl font-black uppercase leading-none md:text-7xl">Carrinho</h1>

      {!items.length ? (
        <div className="mt-10 border-2 border-dashed border-aco/30 p-8">
          <p className="text-lg text-grafite">O carrinho está vazio. Adicione os materiais de que precisa e peça o preço de tudo de uma vez.</p>
          <div className="mt-6"><Button href="/catalogo" variant="dark">Ver catálogo completo</Button></div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            <ul className="divide-y divide-aco/15 border-y border-aco/15 bg-white">
              {items.map(item => {
                const product = products.find(p => p.name === item.name);
                return (
                  <li key={item.name} className="flex flex-wrap items-center justify-between gap-4 p-4">
                    <div className="min-w-0 flex-1 basis-48">
                      {product && <p className="font-mono text-xs text-grafite/70">{product.ref} · {product.unit}</p>}
                      {product ? <Link to={`/produtos/${product.ref}`} className="font-display text-2xl font-bold leading-tight hover:text-fermat">{item.name}</Link> : <p className="font-display text-2xl font-bold leading-tight">{item.name}</p>}
                    </div>
                    <span className="flex shrink-0 items-center">
                      <button type="button" onClick={() => setQty(item.name, item.qty - 1)} disabled={item.qty <= 1} aria-label={`Diminuir ${item.name}`} className="h-10 w-10 bg-aco text-xl text-white hover:bg-fermat disabled:opacity-30">−</button>
                      <input type="number" min={1} max={9999} value={item.qty} onChange={event => setQty(item.name, Number(event.target.value))} aria-label={`Quantidade de ${item.name}`} className="h-10 w-16 border-y-2 border-aco/80 text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
                      <button type="button" onClick={() => setQty(item.name, item.qty + 1)} aria-label={`Aumentar ${item.name}`} className="h-10 w-10 bg-aco text-xl text-white hover:bg-fermat">+</button>
                    </span>
                    <button type="button" onClick={() => remove(item.name)} className="text-sm font-semibold text-fermat underline underline-offset-4">Remover</button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm">
              <Link to="/catalogo" className="font-semibold underline decoration-fermat decoration-2 underline-offset-4">← Continuar a escolher materiais</Link>
              <button type="button" onClick={clear} className="font-semibold text-grafite underline underline-offset-4">Esvaziar carrinho</button>
            </div>
          </div>

          <aside className="h-fit border-l-[6px] border-fermat bg-white p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-betao">Resumo</p>
            <p className="mt-1 font-display text-3xl font-bold uppercase">{items.length} {items.length === 1 ? "material" : "materiais"} · {count} un.</p>
            <p className="mt-1 text-sm text-grafite">Preço: sob consulta. Envie o pedido e respondemos com o valor de tudo.</p>
            <div className="mt-5 grid gap-3">
              <Link to="/formulario" className="bg-fermat px-6 py-3.5 text-center font-display text-lg font-bold uppercase tracking-wider text-white hover:bg-aco">Pedir preço</Link>
              <Button href={whatsappUrl(`Olá, quero preço de: ${summary}`)} variant="dark">Enviar por WhatsApp</Button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}