export function Truck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 755 315" className={className} role="img" aria-label="Camião Fermat, material firme.">
      <rect x="52" y="40" width="477" height="195" fill="#FFFFFF" />
      <rect x="52" y="40" width="477" height="22" fill="#C8102E" />
      <rect x="88" y="92" width="85" height="85" fill="#C8102E" />
      <svg x="103" y="106" width="55" height="46" viewBox="0 0 32 27">
        {[[0, 0, 14], [15, 0, 17], [0, 7, 8], [9, 7, 13], [0, 14, 14], [0, 21, 8], [9, 21, 6]].map(([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height={6} fill="#FFFFFF" />
        ))}
      </svg>
      <text x="193" y="158" fontFamily="'Big Shoulders Display', sans-serif" fontWeight="800" fontSize="86" fill="#151515">FERMAT</text>
      <text x="195" y="189" fontFamily="'Work Sans', sans-serif" fontWeight="700" fontSize="15" letterSpacing="3.5" fill="#6B6A63">MATERIAL FIRME.</text>
      <path d="M543 108 H638 L691 166 V235 H543 Z" fill="#C8102E" />
      <path d="M557 122 H627 L669 166 H557 Z" fill="#2A3A45" />
      <rect x="39" y="231" width="668" height="17" fill="#2C2C2C" />
      {[148, 230, 612].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="253" r="30" fill="#1A1A1A" />
          <circle cx={cx} cy="253" r="12" fill="#8C8C8C" />
        </g>
      ))}
    </svg>
  );
}
