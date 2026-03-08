import { ZODIAC_SIGNS } from "@/lib/zodiac-data";

interface TriangleDisplayProps {
  sun: string;
  moon: string;
  rising?: string;
}

export default function TriangleDisplay({ sun, moon, rising }: TriangleDisplayProps) {
  const sunSign = ZODIAC_SIGNS[sun];
  const moonSign = ZODIAC_SIGNS[moon];
  const risingSign = rising ? ZODIAC_SIGNS[rising] : null;

  // Triangle points (SVG coordinates)
  const topX = 150, topY = 30;
  const leftX = 40, leftY = 230;
  const rightX = 260, rightY = 230;

  return (
    <div className="relative w-[300px] h-[280px] mx-auto my-8 animate-fade-up-delay-1">
      <svg viewBox="0 0 300 280" className="absolute inset-0 w-full h-full">
        {/* Triangle lines */}
        <line x1={topX} y1={topY + 20} x2={leftX + 20} y2={leftY - 10}
          stroke="hsl(265 60% 65% / 0.4)" strokeWidth="1" className="animate-draw-line" />
        <line x1={topX} y1={topY + 20} x2={rightX - 20} y2={rightY - 10}
          stroke="hsl(265 60% 65% / 0.4)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: "0.3s" }} />
        <line x1={leftX + 20} y1={leftY - 10} x2={rightX - 20} y2={rightY - 10}
          stroke="hsl(265 60% 65% / 0.4)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: "0.6s" }} />
        {/* Dots at vertices */}
        {[
          [topX, topY + 20],
          [leftX + 20, leftY - 10],
          [rightX - 20, rightY - 10],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="hsl(265 60% 65% / 0.6)" />
        ))}
      </svg>

      {/* Sun - top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center animate-float" style={{ animationDelay: "0s" }}>
        <div className="text-4xl mb-1">☀️</div>
        <div className="text-xs text-accent font-medium tracking-wider">{sunSign.name}</div>
      </div>

      {/* Moon - bottom left */}
      <div className="absolute bottom-2 left-0 text-center animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="text-4xl mb-1">🌙</div>
        <div className="text-xs text-celestial-moon font-medium tracking-wider">{moonSign.name}</div>
      </div>

      {/* Rising - bottom right */}
      <div className="absolute bottom-2 right-0 text-center animate-float" style={{ animationDelay: "1s" }}>
        <div className="text-4xl mb-1">⬆️</div>
        <div className="text-xs text-celestial-rose font-medium tracking-wider">
          {risingSign ? risingSign.name : "需要出生時間"}
        </div>
      </div>
    </div>
  );
}
