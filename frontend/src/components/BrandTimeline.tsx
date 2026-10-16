function FiadasDiagram() {
  const rows: [number, [number, number][]][] = [
    [37, [[38, 102], [108, 174]]],
    [73, [[38, 68]]],
    [109, [[38, 102], [108, 145]]],
    [145, [[38, 68]]],
  ];
  return (
    <svg viewBox="38 37 136 138" role="img" aria-label="Fermat" className="mx-auto w-full max-w-xs">
      {rows.map(([y, blocks]) => blocks.map(([x1, x2]) => <rect key={`${y}-${x1}`} x={x1} y={y} width={x2 - x1} height="30" fill="#C8102E" />))}
    </svg>
  );
}
export function BrandTimeline() {
  return (
    <section id="historia-marca" className="scroll-mt-24     bg-cal px-5">
          <div className="mx-auto grid max-w-7xl items-center gap-10 border-y border-aco/15 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[.25em] text-fermat">Transição da marca</p>
        <div className="mt-3 max-w-2xl">
          <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">Do nome de família<br />ao símbolo</h2>
          <p className="mt-4 text-grafite">Ninguém muda de nome de um dia para o outro. Os clientes conhecem os Irmãos Fernandes, e esse nome não pode desaparecer de repente. A marca entra em três tempos. No fim, basta o F.</p>
        </div>
        </div>
        <FiadasDiagram />
      </div>
    </section>
  );
}
