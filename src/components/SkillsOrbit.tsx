import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillCategories = [
  {
    id: "analytics",
    label: "ANALYTICS",
    color: "#00e5ff",
    glow: "rgba(0,229,255,0.35)",
    orbitDuration: 28,
    orbitRadius: 200,
    skills: [
      { name: "SQL", level: "Expert" },
      { name: "Power BI", level: "Expert" },
      { name: "Tableau", level: "Proficient" },
      { name: "Excel", level: "Expert" },
    ],
  },
  {
    id: "programming",
    label: "CODING",
    color: "#39ff14",
    glow: "rgba(57,255,20,0.35)",
    orbitDuration: 36,
    orbitRadius: 160,
    skills: [
      { name: "Python", level: "Proficient" },
      { name: "FastAPI", level: "Proficient" },
      { name: "Pandas", level: "Proficient" },
      { name: "NumPy", level: "Proficient" },
    ],
  },
  {
    id: "databases",
    label: "DATABASES",
    color: "#d500f9",
    glow: "rgba(213,0,249,0.35)",
    orbitDuration: 22,
    orbitRadius: 240,
    skills: [
      { name: "SQL Server", level: "Expert" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "MySQL", level: "Proficient" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#ffea00",
    glow: "rgba(255,234,0,0.35)",
    orbitDuration: 44,
    orbitRadius: 190,
    skills: [
      { name: "YOLO", level: "Proficient" },
      { name: "OpenCV", level: "Proficient" },
      { name: "TensorFlow", level: "Intermediate" },
    ],
  },
  {
    id: "cloud",
    label: "CLOUD",
    color: "#2979ff",
    glow: "rgba(41,121,255,0.35)",
    orbitDuration: 32,
    orbitRadius: 220,
    skills: [
      { name: "Databricks", level: "Intermediate" },
      { name: "Azure", level: "Intermediate" },
      { name: "PySpark", level: "Intermediate" },
    ],
  },
];

export function SkillsOrbit() {
  const [activeCategory, setActiveCategory] = useState<typeof skillCategories[0] | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-8" style={{ minHeight: 560 }}>
      {/* Orbit visualization */}
      <div className="relative flex items-center justify-center" style={{ width: 520, height: 520 }}>
        {/* Orbit ring decorations */}
        {skillCategories.map((cat) => (
          <div
            key={cat.id + "-ring"}
            className="absolute rounded-full border"
            style={{
              width: cat.orbitRadius * 2,
              height: cat.orbitRadius * 2,
              borderColor: cat.color,
              borderStyle: "dashed",
              opacity: activeCategory?.id === cat.id ? 0.25 : 0.08,
              transition: "opacity 0.3s",
            }}
          />
        ))}

        {/* Center core */}
        <div className="relative z-20">
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 110,
              height: 110,
              background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,0,0,0.9) 70%)",
              border: "1px solid rgba(0,229,255,0.4)",
              boxShadow: "0 0 40px rgba(0,229,255,0.2), inset 0 0 30px rgba(0,229,255,0.05)",
            }}
          >
            {/* Spinning border */}
            <div
              className="absolute inset-0 rounded-full border border-dashed"
              style={{
                borderColor: "rgba(0,229,255,0.2)",
                animation: "spin 20s linear infinite",
              }}
            />
            <div
              style={{ color: "#00e5ff", fontSize: 9, letterSpacing: 2, lineHeight: 1.5, textAlign: "center" }}
              className="font-mono font-black"
            >
              DATA<br />
              <span style={{ fontSize: 7, opacity: 0.7 }}>INTELLIGENCE</span>
            </div>
          </div>
        </div>

        {/* Orbital nodes — pure CSS animations */}
        {skillCategories.map((cat, i) => {
          const delay = i * -4;
          const isActive = activeCategory?.id === cat.id;
          return (
            <div
              key={cat.id}
              className="absolute"
              style={{
                width: cat.orbitRadius * 2,
                height: cat.orbitRadius * 2,
                animation: `spin ${cat.orbitDuration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            >
              {/* The node, placed at the top of the orbit, counter-rotates to stay upright */}
              <button
                className="absolute font-mono font-bold cursor-pointer select-none transition-all duration-300"
                style={{
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                  animation: `spin-reverse ${cat.orbitDuration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  zIndex: 30,
                }}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                onClick={() => setActiveCategory(isActive ? null : cat)}
              >
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 82 : 64,
                    height: isActive ? 82 : 64,
                    border: `${isActive ? 2 : 1}px solid ${cat.color}`,
                    background: isActive
                      ? `radial-gradient(circle, ${cat.glow} 0%, rgba(0,0,0,0.92) 70%)`
                      : "rgba(5,5,10,0.88)",
                    boxShadow: isActive ? `0 0 24px ${cat.glow}` : "none",
                    fontSize: 7,
                    letterSpacing: 1,
                    color: cat.color,
                    textAlign: "center",
                    lineHeight: 1.3,
                    padding: 6,
                  }}
                >
                  {cat.label}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg mx-auto mt-4 rounded-xl border p-5 backdrop-blur-md"
            style={{
              borderColor: activeCategory.color + "44",
              background: "rgba(0,0,0,0.75)",
              boxShadow: `0 0 30px ${activeCategory.glow}`,
            }}
          >
            <h4
              className="font-mono font-black text-sm tracking-[0.25em] mb-4"
              style={{ color: activeCategory.color }}
            >
              // {activeCategory.label}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between px-3 py-2 rounded-lg border"
                  style={{
                    borderColor: activeCategory.color + "22",
                    background: activeCategory.color + "08",
                  }}
                >
                  <span className="font-mono text-sm text-white">{skill.name}</span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: activeCategory.color, opacity: 0.8 }}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Hover nodes to explore skill architecture
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
          to   { transform: translateX(-50%) translateY(-50%) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
