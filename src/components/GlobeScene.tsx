import { useMemo, useRef, useEffect } from "react";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function GlobeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 80 }, () => ({
      x: rand() * 1280,
      y: rand() * 720,
      r: rand() * 1.5 + 0.3,
      speed: rand() * 0.4 + 0.1,
      opacity: rand() * 0.4 + 0.05,
      dx: (rand() - 0.5) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const pts = particles.map((p) => ({
      ...p,
      x: p.x % canvas.width,
      y: p.y % canvas.height,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw particles
      for (const p of pts) {
        p.y -= p.speed;
        p.x += p.dx;
        if (p.y < -4) p.y = H + 4;
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [particles]);

  // Build globe lat/lng lines as SVG paths using spherical projection
  const R = 120;
  const cx = 0;
  const cy = 0;
  const tiltY = 0.4;

  const lngLines = useMemo(() => {
    const lines: string[] = [];
    for (let i = 0; i < 12; i++) {
      const phi = (i * Math.PI) / 6;
      const pts: string[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j * Math.PI) / 64;
        const x = cx + R * Math.sin(theta) * Math.cos(phi);
        const y = cy + R * Math.cos(theta) * tiltY + R * Math.sin(theta) * Math.sin(phi) * tiltY;
        pts.push(`${j === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      lines.push(pts.join(" "));
    }
    return lines;
  }, []);

  const latLines = useMemo(() => {
    const lines: string[] = [];
    for (let i = 1; i < 8; i++) {
      const theta = (i * Math.PI) / 8;
      const pts: string[] = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j * Math.PI * 2) / 64;
        const x = cx + R * Math.sin(theta) * Math.cos(phi);
        const y = cy + R * Math.cos(theta) * tiltY + R * Math.sin(theta) * Math.sin(phi) * tiltY;
        pts.push(`${j === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      lines.push(pts.join(" "));
    }
    return lines;
  }, []);

  const nodes = useMemo(() => {
    const pts: { x: number; y: number; key: string }[] = [];
    for (let lng = 0; lng < 12; lng++) {
      const phi = (lng * Math.PI) / 6;
      for (let lat = 1; lat < 8; lat++) {
        const theta = (lat * Math.PI) / 8;
        const x = cx + R * Math.sin(theta) * Math.cos(phi);
        const y = cy + R * Math.cos(theta) * tiltY + R * Math.sin(theta) * Math.sin(phi) * tiltY;
        pts.push({ x, y, key: `${lng}-${lat}` });
      }
    }
    return pts;
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Ambient glow blob */}
      <div
        className="absolute"
        style={{
          top: "5%",
          right: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Globe SVG — rotates via CSS */}
      <div
        className="absolute"
        style={{
          top: "50%",
          right: "8%",
          transform: "translateY(-55%)",
          opacity: 0.45,
          animation: "spinGlobe 90s linear infinite",
        }}
      >
        <svg width="380" height="380" viewBox="-140 -140 280 280">
          <defs>
            <radialGradient id="gGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={0} cy={0} r={R} fill="url(#gGlow)" />

          {lngLines.map((d, i) => (
            <path key={`lng-${i}`} d={d} stroke="#00e5ff" strokeWidth="0.7" strokeOpacity="0.22" fill="none" />
          ))}
          {latLines.map((d, i) => (
            <path key={`lat-${i}`} d={d} stroke="#00e5ff" strokeWidth="0.7" strokeOpacity="0.18" fill="none" />
          ))}
          {nodes.map((n) => (
            <circle key={n.key} cx={n.x} cy={n.y} r={1.5} fill="#00e5ff" fillOpacity="0.5" />
          ))}

          <circle cx={0} cy={0} r={R} fill="none" stroke="#00e5ff" strokeWidth="0.9" strokeOpacity="0.35" />
        </svg>
      </div>

      {/* Scan lines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.010) 3px, rgba(0,229,255,0.010) 4px)",
        }}
      />

      <style>{`
        @keyframes spinGlobe {
          from { transform: translateY(-55%) rotate(0deg); }
          to   { transform: translateY(-55%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
