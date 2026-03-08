import { useEffect, useRef } from "react";

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "star-dot";
      const size = Math.random() * 2.5 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${Math.random() * 4 + 2}s`);
      star.style.setProperty("--delay", `${Math.random() * 3}s`);
      container.appendChild(star);
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />;
}
