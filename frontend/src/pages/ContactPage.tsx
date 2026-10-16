import { Link } from "react-router-dom";
import { Contact } from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <div className="bg-aco py-2 text-center font-mono text-[10px] uppercase tracking-[.25em] text-betao">
        Entrega em obra · Preço no próprio dia · Profissionais e particulares
      </div>
      <section className="border-b border-aco/15 bg-aco/[.04]">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <nav aria-label="Localização" className="font-mono text-[10px] uppercase tracking-[.2em] text-grafite/60">
            <Link to="/" className="hover:text-fermat">Início</Link> / <span className="font-bold text-fermat">Contactos</span>
          </nav>
          <h1 className="mt-3 font-display text-6xl font-black uppercase leading-none md:text-7xl">          Contactos</h1>
                    <p className="mt-2 text-grafite">Peça preço, mande a sua lista de material ou visite-nos em Vila Flor.</p>
        </div>
      </section>
      <Contact />
    </>
  );
}
