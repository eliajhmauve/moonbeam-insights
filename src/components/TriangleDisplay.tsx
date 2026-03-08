import { ZODIAC_SIGNS } from "@/lib/zodiac-data";
import { useState, useEffect } from "react";
import ParticleBurst from "./ParticleBurst";

interface TriangleDisplayProps {
  sun: string;
  moon: string;
  rising?: string;
}

export default function TriangleDisplay({ sun, moon, rising }: TriangleDisplayProps) {
  const sunSign = ZODIAC_SIGNS[sun];
  const moonSign = ZODIAC_SIGNS[moon];
  const risingSign = rising ? ZODIAC_SIGNS[rising] : null;
  const [showParticles, setShowParticles] = useState<{ x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    // Trigger particles sequentially at each vertex
    const timers = [
      setTimeout(() => setShowParticles(p => [...p, { x: 150, y: 40, color: "hsl(45 80% 65%)" }]), 300),
      setTimeout(() => setShowParticles(p => [...p, { x: 50, y: 220, color: "hsl(210 50% 80%)" }]), 700),
      setTimeout(() => setShowParticles(p => [...p, { x: 250, y: 220, color: "hsl(330 60% 65%)" }]), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const topX = 150, topY = 30;
  const leftX = 40, leftY = 230;
  const rightX = 260, rightY = 230;

  return (
    <div className="relative w-[300px] h-[280px] mx-auto my-8 animate-fade-up-delay-1">
      {/* Particle bursts */}
      {showParticles.map((p, i) => (
        <ParticleBurst key={i} x={p.x} y={p.y} color={p.color} count={12} />
      ))}

      <svg viewBox="0 0 300 280" className="absolute inset-0 w-full h-full">
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Triangle lines with glow */}
        <line x1={topX} y1={topY + 20} x2={leftX + 20} y2={leftY - 10}
          stroke="hsl(265 60% 65% / 0.5)" strokeWidth="1.5" className="animate-draw-line" filter="url(#glow)" />
        <line x1={topX} y1={topY + 20} x2={rightX - 20} y2={rightY - 10}
          stroke="hsl(265 60% 65% / 0.5)" strokeWidth="1.5" className="animate-draw-line" style={{ animationDelay: "0.3s" }} filter="url(#glow)" />
        <line x1={leftX + 20} y1={leftY - 10} x2={rightX - 20} y2={rightY - 10}
          stroke="hsl(265 60% 65% / 0.5)" strokeWidth="1.5" className="animate-draw-line" style={{ animationDelay: "0.6s" }} filter="url(#glow)" />

        {/* Pulsing dots at vertices */}
        {[
          { cx: topX, cy: topY + 20, color: "hsl(45 80% 65%)" },
          { cx: leftX + 20, cy: leftY - 10, color: "hsl(210 50% 80%)" },
          { cx: rightX - 20, cy: rightY - 10, color: "hsl(330 60% 65%)" },
        ].map((dot, i) => (
          <g key={i}>
            <circle cx={dot.cx} cy={dot.cy} r="6" fill={`${dot.color.replace(")", " / 0.2)")}`} className="animate-pulse" />
            <circle cx={dot.cx} cy={dot.cy} r="3" fill={dot.color} filter="url(#glow)" />
          </g>
        ))}
      </svg>

      {/* Sun - top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center animate-float sign-appear" style={{ animationDelay: "0.3s" }}>
        <div className="text-4xl mb-1 sign-glow-sun">☀️</div>
        <div className="text-xs text-accent font-medium tracking-wider">{sunSign.name}</div>
      </div>

      {/* Moon - bottom left */}
      <div className="absolute bottom-2 left-0 text-center animate-float sign-appear" style={{ animationDelay: "0.7s" }}>
        <div className="text-4xl mb-1 sign-glow-moon">🌙</div>
        <div className="text-xs text-celestial-moon font-medium tracking-wider">{moonSign.name}</div>
      </div>

      {/* Rising - bottom right */}
      <div className="absolute bottom-2 right-0 text-center animate-float sign-appear" style={{ animationDelay: "1.1s" }}>
        <div className="text-4xl mb-1 sign-glow-rise">⬆️</div>
        <div className="text-xs text-celestial-rose font-medium tracking-wider">
          {risingSign ? risingSign.name : "需要出生時間"}
        </div>
      </div>
    </div>
  );
}
