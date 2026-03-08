import { useEffect, useRef } from "react";

interface ParticleBurstProps {
  x: number;
  y: number;
  color?: string;
  count?: number;
}

export default function ParticleBurst({ x, y, color = "hsl(265 60% 65%)", count = 16 }: ParticleBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const angle = (i / count) * 360;
      const distance = Math.random() * 60 + 30;
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = color;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty("--tx", `${Math.cos(angle * Math.PI / 180) * distance}px`);
      p.style.setProperty("--ty", `${Math.sin(angle * Math.PI / 180) * distance}px`);
      p.style.animationDelay = `${Math.random() * 0.15}s`;
      container.appendChild(p);
    }

    const timeout = setTimeout(() => {
      if (container) container.innerHTML = "";
    }, 1200);

    return () => clearTimeout(timeout);
  }, [x, y, color, count]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-visible" />;
}
