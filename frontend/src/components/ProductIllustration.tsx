import type { Product } from "../../shared/products";

const stroke = "#151515";

function Block() {
  return (
    <g>
      <polygon points="40,52 100,28 160,52 100,76" fill="#C9C6C0" />
      <polygon points="40,52 100,76 100,96 40,72" fill="#A8A59F" />
      <polygon points="100,76 160,52 160,72 100,96" fill="#8C8983" />
      <polygon points="62,52 84,43 104,51 82,60" fill="#6f6d68" />
      <polygon points="104,56 126,47 144,54 122,63" fill="#6f6d68" />
    </g>
  );
}

function Brick() {
  return (
    <g>
      <polygon points="50,56 110,30 160,52 100,78" fill="#D9703F" />
      <polygon points="50,56 100,78 100,100 50,78" fill="#B5532A" />
      <polygon points="100,78 160,52 160,74 100,100" fill="#9A4422" />
    </g>
  );
}

function Prop() {
  return (
    <g>
      <rect x="94" y="8" width="12" height="6" fill="#4a4a4a" />
      <rect x="97" y="14" width="6" height="52" fill="#6b6b6b" />
      <rect x="95" y="38" width="10" height="7" fill="#C8102E" />
      <rect x="99" y="66" width="2" height="12" fill="#4a4a4a" />
      <polygon points="80,84 120,84 128,94 72,94" fill="#4a4a4a" />
    </g>
  );
}

function Panel() {
  return (
    <g>
      <polygon points="40,58 150,26 168,40 58,74" fill="#F1C94B" />
      <polygon points="40,58 58,74 58,84 40,68" fill="#C9A22E" />
      <polygon points="58,74 168,40 168,50 58,84" fill="#D8B13B" />
      {[0, 1, 2, 3, 4].map(i => <line key={i} x1={62 + i * 20} y1={64 - i * 6} x2={80 + i * 20} y2={78 - i * 6 - 12} stroke="#C9A22E" strokeWidth="1.5" />)}
    </g>
  );
}

function Tile() {
  return (
    <g>
      {[0, 1].flatMap(r => [0, 1].map(c => (
        <polygon key={`${r}${c}`} points={`${70 + c * 34 - r * 18},${52 + r * 14 + c * -8} ${100 + c * 34 - r * 18},${40 + r * 14 + c * -8} ${118 + c * 34 - r * 18},${52 + r * 14 + c * -8} ${88 + c * 34 - r * 18},${64 + r * 14 + c * -8}`} fill={(r + c) % 2 ? "#D8D4CC" : "#EAE7E0"} stroke="#A8A59F" />
      )))}
    </g>
  );
}

function Toilet() {
  return (
    <g>
      <rect x="82" y="14" width="40" height="30" rx="3" fill="#FFFFFF" stroke="#C9C6C0" />
      <ellipse cx="104" cy="62" rx="34" ry="14" fill="#FFFFFF" stroke="#C9C6C0" />
      <ellipse cx="104" cy="60" rx="22" ry="8" fill="#E7E4DD" />
      <rect x="86" y="70" width="36" height="16" fill="#F4F2EC" stroke="#C9C6C0" />
    </g>
  );
}

function ShowerTray() {
  return (
    <g>
      <polygon points="44,60 104,34 164,60 104,86" fill="#F4F2EC" stroke="#C9C6C0" />
      <polygon points="44,60 104,86 104,94 44,68" fill="#D8D4CC" />
      <polygon points="104,86 164,60 164,68 104,94" fill="#BFBBB3" />
      <circle cx="104" cy="60" r="5" fill="#A8A59F" />
    </g>
  );
}

function PaintBucket({ accent }: { accent: string }) {
  return (
    <g>
      <path d="M74 36 Q104 26 134 36 L130 90 Q104 100 78 90 Z" fill="#F4F2EC" stroke="#C9C6C0" />
      <ellipse cx="104" cy="36" rx="30" ry="7" fill="#E7E4DD" stroke="#C9C6C0" />
      <rect x="80" y="54" width="48" height="24" fill={accent} />
      <path d="M78 36 Q104 4 130 36" fill="none" stroke={stroke} strokeWidth="2" />
    </g>
  );
}

function Rebar() {
  return (
    <g>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <polygon points={`${40 + i * 6},${70 - i * 12} ${166 + i * 6},${34 - i * 12 + 18} ${166 + i * 6},${40 - i * 12 + 18} ${40 + i * 6},${76 - i * 12}`} fill="#6b6b6b" />
          <polygon points={`${40 + i * 6},${70 - i * 12} ${166 + i * 6},${52 - i * 12} ${166 + i * 6},${56 - i * 12} ${40 + i * 6},${74 - i * 12}`} fill="#8a8a8a" />
        </g>
      ))}
    </g>
  );
}

function Mesh() {
  const a = (u: number, v: number) => `${60 + u * 90 + v * 40},${70 - u * 10 - v * 30}`;
  return (
    <g stroke="#6b6b6b" strokeWidth="2.5" strokeLinecap="round">
      {[0, 1, 2, 3, 4].map(i => <line key={`u${i}`} x1={a(i / 4, 0).split(",")[0]} y1={a(i / 4, 0).split(",")[1]} x2={a(i / 4, 1).split(",")[0]} y2={a(i / 4, 1).split(",")[1]} />)}
      {[0, 1, 2, 3].map(j => <line key={`v${j}`} x1={a(0, j / 3).split(",")[0]} y1={a(0, j / 3).split(",")[1]} x2={a(1, j / 3).split(",")[0]} y2={a(1, j / 3).split(",")[1]} />)}
    </g>
  );
}

function WireRoll() {
  return (
    <g>
      <ellipse cx="104" cy="78" rx="40" ry="12" fill="#4a4a4a" />
      <rect x="64" y="40" width="80" height="38" fill="#6b6b6b" />
      <ellipse cx="104" cy="40" rx="40" ry="12" fill="#8a8a8a" />
      <ellipse cx="104" cy="40" rx="16" ry="5" fill="#E7E4DD" />
    </g>
  );
}

function Sack({ accent }: { accent: string }) {
  return (
    <g>
      <path d="M62 30 L146 30 L152 86 Q104 96 56 86 Z" fill="#E7E4DD" stroke="#C9C6C0" />
      <path d="M62 30 Q104 40 146 30 L146 24 Q104 34 62 24 Z" fill="#C9C6C0" />
      <rect x="70" y="48" width="68" height="26" fill={accent} />
      <rect x="78" y="56" width="30" height="4" fill="#FFFFFF" />
      <rect x="78" y="64" width="46" height="3" fill="#FFFFFF" opacity=".7" />
    </g>
  );
}

function Pile({ fill, dark }: { fill: string; dark: string }) {
  const dots = [[84, 78], [100, 82], [118, 79], [132, 84], [92, 66], [110, 68], [124, 66], [102, 54], [114, 52]];
  return (
    <g>
      <path d="M44 90 Q104 -6 164 90 Z" fill={fill} />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 3 : 2} fill={dark} />)}
    </g>
  );
}

export function ProductIllustration({ product }: { product: Product }) {
  const art = (() => {
    switch (product.category) {
      case "Ferro e Aço":
        if (product.ref.startsWith("FA-M")) return <Mesh />;
        return product.ref.startsWith("FA-A") ? <WireRoll /> : <Rebar />;
      case "Cimentos e Argamassa": return <Sack accent={product.ref.startsWith("CM-AR") ? "#C8102E" : "#6b6b6b"} />;
      case "Areias e Britas":
        if (product.ref.startsWith("AB-A")) return <Pile fill="#E2C48B" dark="#C9A45C" />;
        return product.ref.startsWith("AB-B") ? <Pile fill="#8C8983" dark="#4a4a4a" /> : <Pile fill="#B7A58A" dark="#7d6b52" />;
      case "Blocos": return <Block />;
      case "Tijolo": return <Brick />;
      case "Cofragem": return product.ref.startsWith("CF-E") ? <Prop /> : <Panel />;
      case "Cerâmicas": return <Tile />;
      case "Sanitários": return product.ref.startsWith("SN-WC") ? <Toilet /> : <ShowerTray />;
      case "Tintas": return <PaintBucket accent={product.ref.startsWith("TN-E") ? "#C8102E" : "#151515"} />;
    }
  })();
  return (
    <svg viewBox="0 0 208 104" className="h-full w-full" role="img" aria-label={product.name}>
      {art}
    </svg>
  );
}
