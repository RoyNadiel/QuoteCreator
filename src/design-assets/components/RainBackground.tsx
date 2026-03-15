import { useState, useEffect } from "react";

export const RainBackground = () => {
  const [drops, setDrops] = useState<
    Array<{
      id: string;
      left: number;
      duration: number;
      delay: number;
      opacity: number;
      height: number;
      width: number;
      layer: 1 | 2 | 3;
    }>
  >([]);
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Lluvia suave y lenta (Zen Mode)
    const layer1 = Array.from({ length: 150 }, (_, i) => ({
      // Fondo muy lento
      id: `l1-${i}`,
      left: Math.random() * 120 - 10,
      duration: 4 + Math.random() * 3, // Mucho más lento (4-7s)
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.2,
      height: 10 + Math.random() * 10,
      width: 1,
      layer: 1 as const,
    }));

    const layer2 = Array.from({ length: 100 }, (_, i) => ({
      // Medio tranquilo
      id: `l2-${i}`,
      left: Math.random() * 120 - 10,
      duration: 3 + Math.random() * 2, // Lento (3-5s)
      delay: Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.2,
      height: 15 + Math.random() * 15,
      width: 1.5,
      layer: 2 as const,
    }));

    const layer3 = Array.from({ length: 40 }, (_, i) => ({
      // Frente suave
      id: `l3-${i}`,
      left: Math.random() * 120 - 10,
      duration: 2 + Math.random() * 1.5, // Suave (2-3.5s)
      delay: Math.random() * 5,
      opacity: 0.4 + Math.random() * 0.2,
      height: 25 + Math.random() * 15,
      width: 2,
      layer: 3 as const,
    }));

    setDrops([...layer1, ...layer2, ...layer3]);

    const lightningInterval = setInterval(() => {
      // Relámpagos menos frecuentes para no romper la concentración
      if (Math.random() < 0.1) {
        // 10% probabilidad
        setLightning(true);
        setTimeout(() => setLightning(false), 200); // Flash más suave y largo
      }
    }, 8000); // Revisar cada 8s

    return () => clearInterval(lightningInterval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fondo base oscuro */}
      <div className="absolute inset-0 bg-slate-900" />

      {/* Contenedor con rotación para el viento */}
      <div className="absolute inset-0 -top-[20%] h-[140%] w-[120%] -left-[10%] rotate-15 pointer-events-none">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="absolute bg-linear-to-b from-transparent via-slate-300 to-slate-400"
            style={{
              left: `${drop.left}%`,
              top: "-10%",
              width: `${drop.width}px`,
              height: `${drop.height}px`,
              opacity: drop.opacity,
              animation: `fall ${drop.duration}s linear ${drop.delay}s infinite`,
              boxShadow:
                drop.layer === 3 ? "0 0 4px rgba(255, 255, 255, 0.3)" : "none",
              filter: drop.layer === 1 ? "blur(1px)" : "none", // Desenfocar fondo
            }}
          />
        ))}
      </div>

      {/* Relámpago ambiental */}
      <div
        className={`absolute inset-0 bg-white mix-blend-overlay transition-opacity duration-75 ${
          lightning ? "opacity-30" : "opacity-0"
        }`}
      />
      {/* Relámpago flash directo */}
      <div
        className={`absolute inset-0 bg-blue-100 mix-blend-hard-light transition-opacity duration-75 ${
          lightning ? "opacity-10" : "opacity-0"
        }`}
      />

      {/* Viñeta para atmósfera */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60 opacity-80" />
    </div>
  );
};
