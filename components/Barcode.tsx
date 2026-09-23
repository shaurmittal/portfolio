// Decorative barcode: bar widths are derived from the text, so it's stable between renders.
export function Barcode({ value, className = "" }: { value: string; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of value.repeat(3)) {
    const c = ch.charCodeAt(0);
    const w = (c % 3) + 1;
    bars.push({ x, w });
    x += w + ((c >> 2) % 3) + 1;
  }
  return (
    <svg viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" aria-hidden="true" className={className}>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={40} fill="currentColor" />
      ))}
    </svg>
  );
}
