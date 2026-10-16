const facts = [["Desde", "2001"], ["Sede", "Vila Flor · Bragança"], ["Atividade", "Construção, bricolage, sanitários e ladrilhos"], ["Empresa", "Irmãos Mário & Jorge Fernandes, Lda."]];
const values = [["Forte", "Letra pesada, cor de obra. Vê-se ao longe."], ["Atual", "Limpa. Longe do aspeto de armazém dos anos 90."], ["Franca", "Fala como se fala no estaleiro. Curto e certo."], ["Séria", "Promete o que entrega. Nem mais, nem menos."]];

export function About() {
  return (
    <section id="quem-somos" className="scroll-mt-24 bg-cal px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[.25em] text-fermat">Vila Flor · Bragança · desde 2001</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="font-display text-5xl font-black uppercase leading-[.9] md:text-7xl">Quem somos<br />nós?</h2>
          <div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-4xl">Material pesado.<br />Marca à altura.</h3>
            <p className="mt-4 max-w-2xl text-grafite">Desde 2001 que os Irmãos Fernandes vendem material de construção em Vila Flor. Quem lá compra sabe que há, que chega a horas e que não dá chatices. Faltava uma marca à altura disso. O nome já lá estava: <strong><span className="text-fermat">FER</span>nandes, <span className="text-fermat">MAT</span>eriais.</strong> Fermat.</p>
          </div>
        </div>
        <dl className="mt-10 grid border-l-[6px] border-fermat bg-white sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="px-5 py-5">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-betao">{label}</dt>
              <dd className="mt-2 font-display text-xl font-bold leading-tight">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([title, description], i) => (
            <article key={title} className="border-t-2 border-aco pt-3">
              <span className="font-display text-4xl font-black text-fermat">0{i + 1}</span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-sm text-grafite/75">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
