import { useEffect, useRef } from "react";

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    // Static twinkling stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star-dot";
      const size = Math.random() * 2.5 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${Math.random() * 4 + 2}s`);
      star.style.setProperty("--delay", `${Math.random() * 5}s`);
      container.appendChild(star);
    }

    // Shooting stars — spawn periodically
    const spawnMeteor = () => {
      const meteor = document.createElement("div");
      meteor.className = "shooting-star";
      meteor.style.top = `${Math.random() * 50}%`;
      meteor.style.left = `${Math.random() * 70 + 10}%`;
      meteor.style.setProperty("--angle", `${Math.random() * 20 + 25}deg`);
      meteor.style.setProperty("--length", `${Math.random() * 80 + 60}px`);
      container.appendChild(meteor);
      setTimeout(() => meteor.remove(), 1500);
    };

    // Initial burst of 2
    setTimeout(() => spawnMeteor(), 1000);
    setTimeout(() => spawnMeteor(), 2500);

    const interval = setInterval(() => {
      if (Math.random() > 0.4) spawnMeteor();
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />;
}
