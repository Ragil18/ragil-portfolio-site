import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Eye, 
  Activity, 
  BarChart3, 
  Cpu, 
  Sliders, 
  Play, 
  Pause, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  Sparkles,
  Maximize2,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

/* ─── Simulation 1: AI-Powered Computer Vision Simulator ─── */

interface BoundingBox {
  id: string;
  label: string;
  confidence: number;
  x: number; // percentage
  y: number; // percentage
  w: number;
  h: number;
  vx: number;
  vy: number;
  color: string;
}

export function CctvSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showBoxes, setShowBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedCam, setSelectedCam] = useState<"CAM-01" | "CAM-02" | "CAM-03">("CAM-01");
  const [fps, setFps] = useState(30);
  const [footfallCount, setFootfallCount] = useState(148);
  const [alertText, setAlertText] = useState<string | null>(null);

  const [boxes, setBoxes] = useState<BoundingBox[]>([
    { id: "1", label: "person", confidence: 0.96, x: 20, y: 35, w: 14, h: 28, vx: 0.3, vy: 0.1, color: "#00e5ff" },
    { id: "2", label: "person", confidence: 0.92, x: 55, y: 40, w: 12, h: 26, vx: -0.25, vy: 0.15, color: "#00e5ff" },
    { id: "3", label: "safety_vest", confidence: 0.89, x: 22, y: 40, w: 10, h: 12, vx: 0.3, vy: 0.1, color: "#ffd700" },
    { id: "4", label: "forklift", confidence: 0.94, x: 75, y: 50, w: 18, h: 22, vx: -0.15, vy: 0.05, color: "#a855f7" },
  ]);

  // Frame loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Fluctuating FPS
      setFps(29 + Math.floor(Math.random() * 3));

      // Move bounding boxes smoothly
      setBoxes((prev) =>
        prev.map((box) => {
          let nx = box.x + box.vx;
          let ny = box.y + box.vy;
          let nvx = box.vx;
          let nvy = box.vy;

          if (nx < 8 || nx > 82) {
            nvx = -nvx;
            nx = Math.max(8, Math.min(82, nx));
          }
          if (ny < 15 || ny > 68) {
            nvy = -nvy;
            ny = Math.max(15, Math.min(68, ny));
          }

          return { ...box, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );

      // Random footfall increments & alerts
      if (Math.random() < 0.1) {
        setFootfallCount((c) => c + 1);
      }
      if (Math.random() < 0.05) {
        setAlertText("ANOMALY: Restricted zone entry verified (Zone 3B)");
        setTimeout(() => setAlertText(null), 3000);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-[#040814] overflow-hidden shadow-2xl flex flex-col">
      {/* ─── Camera Header / HUD ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-cyan-950/40 border-b border-cyan-500/20 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold tracking-wider">REC</span>
          </div>
          <span className="text-cyan-300 font-bold">{selectedCam} // PROD SURVEILLANCE</span>
          <span className="text-slate-400 hidden sm:inline">1920x1080 @ {fps}FPS</span>
        </div>

        {/* Camera Switcher Buttons */}
        <div className="flex items-center gap-1">
          {(["CAM-01", "CAM-02", "CAM-03"] as const).map((cam) => (
            <button
              key={cam}
              onClick={() => setSelectedCam(cam)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-mono border transition-all",
                selectedCam === cam
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                  : "border-slate-800 text-slate-500 hover:text-slate-300"
              )}
            >
              {cam}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Video Canvas Viewport ─── */}
      <div className="relative w-full aspect-video bg-[#070b18] overflow-hidden select-none">
        {/* Subtle Surveillance Scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
            backgroundSize: "100% 4px"
          }}
        />

        {/* Ambient Depth Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.2) 0%, transparent 70%)"
          }}
        />

        {/* Crosshair target & grid markings */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/60 z-20">
          SYS.MODEL: YOLOv8-NATIVE [CONF &gt; 0.85]
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400/60 z-20 text-right">
          LATENCY: 18ms · INFERENCE: TENSORRT
        </div>

        {/* Heatmap overlay (optional) */}
        {showHeatmap && (
          <div className="absolute inset-0 z-15 pointer-events-none opacity-40 mix-blend-screen transition-opacity">
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-transparent blur-3xl absolute top-1/3 left-1/4" />
            <div className="w-56 h-56 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-transparent blur-3xl absolute top-1/2 left-1/2" />
          </div>
        )}

        {/* Simulated Object Bounding Boxes */}
        {showBoxes &&
          boxes.map((b) => (
            <motion.div
              key={b.id}
              className="absolute z-20 border-2 transition-transform duration-75"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.w}%`,
                height: `${b.h}%`,
                borderColor: b.color,
                boxShadow: `0 0 10px ${b.color}40`,
              }}
            >
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: b.color }} />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: b.color }} />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: b.color }} />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: b.color }} />

              {/* Tag Pill */}
              <div
                className="absolute -top-5 left-0 px-1 py-0.5 text-[9px] font-mono font-bold whitespace-nowrap text-black uppercase"
                style={{ backgroundColor: b.color }}
              >
                {b.label} {(b.confidence * 100).toFixed(0)}%
              </div>
            </motion.div>
          ))}

        {/* Anomaly Alert Banner */}
        <AnimatePresence>
          {alertText && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 z-30 p-2.5 rounded-lg bg-red-950/90 border border-red-500 text-red-200 text-xs font-mono flex items-center gap-2 shadow-xl backdrop-blur-md"
            >
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
              <span className="font-bold">{alertText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom HUD stats */}
        <div className="absolute bottom-3 left-4 z-20 flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 border border-cyan-500/30 text-cyan-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>FOOTFALL: {footfallCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 border border-emerald-500/30 text-emerald-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACCURACY: 98.4%</span>
          </div>
        </div>
      </div>

      {/* ─── Simulator Interactive Controls Bar ─── */}
      <div className="p-3 bg-slate-950 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-mono text-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 mr-1" /> : <Play className="w-3.5 h-3.5 mr-1" />}
            {isPlaying ? "PAUSE STREAM" : "RESUME STREAM"}
          </Button>

          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={cn(
              "px-3 h-8 rounded border transition-colors flex items-center gap-1.5 text-xs font-mono",
              showBoxes
                ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-300"
                : "border-slate-800 text-slate-500 hover:text-slate-300"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>BOUNDING BOXES</span>
          </button>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={cn(
              "px-3 h-8 rounded border transition-colors flex items-center gap-1.5 text-xs font-mono",
              showHeatmap
                ? "bg-amber-950/60 border-amber-500/50 text-amber-300"
                : "border-slate-800 text-slate-500 hover:text-slate-300"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>HEATMAP DENSITY</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          Engine: <strong className="text-cyan-400">Python + YOLO v8 + OpenCV</strong>
        </div>
      </div>
    </div>
  );
}

/* ─── Simulation 2: Executive Sales BI Sandbox Simulator ─── */

export function SalesBiSandbox() {
  const [region, setRegion] = useState<"ALL" | "NORTH" | "SOUTH" | "EAST" | "WEST">("ALL");
  const [quarter, setQuarter] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q3");

  // Dynamic metrics calculated based on region and quarter
  const dataMap = {
    ALL: { rev: "$4.82M", target: "$4.50M", winRate: "68%", growth: "+24.8%", reps: 42 },
    NORTH: { rev: "$1.45M", target: "$1.30M", winRate: "72%", growth: "+31.2%", reps: 14 },
    SOUTH: { rev: "$1.28M", target: "$1.20M", winRate: "69%", growth: "+21.4%", reps: 11 },
    EAST: { rev: "$1.12M", target: "$1.10M", winRate: "64%", growth: "+18.9%", reps: 10 },
    WEST: { rev: "$0.97M", target: "$0.90M", winRate: "65%", growth: "+26.1%", reps: 7 },
  };

  const current = dataMap[region];

  return (
    <div className="rounded-xl border border-amber-500/30 bg-[#070b16] overflow-hidden shadow-2xl flex flex-col font-mono">
      {/* ─── BI Header & Controls ─── */}
      <div className="p-4 bg-amber-950/20 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-amber-400 uppercase tracking-widest block">
            INTERACTIVE DAX ENGINE // POWER BI SANDBOX
          </span>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            Executive Sales Performance Simulator
          </h3>
        </div>

        {/* Region Slicers */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">REGION:</span>
          {(["ALL", "NORTH", "SOUTH", "EAST", "WEST"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={cn(
                "px-2.5 py-1 rounded text-[11px] font-mono border transition-all",
                region === r
                  ? "bg-amber-400 text-black border-amber-300 font-bold shadow-md shadow-amber-400/20"
                  : "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ─── KPI Cards Row ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950/60 border-b border-slate-800/80">
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
          <span className="text-[10px] text-slate-400 uppercase">ACTUAL REVENUE</span>
          <div className="text-xl font-bold text-amber-400 mt-1">{current.rev}</div>
          <span className="text-[10px] text-emerald-400 font-bold">{current.growth} YoY</span>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
          <span className="text-[10px] text-slate-400 uppercase">QUOTA TARGET</span>
          <div className="text-xl font-bold text-white mt-1">{current.target}</div>
          <span className="text-[10px] text-cyan-400">107% Attainment</span>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
          <span className="text-[10px] text-slate-400 uppercase">WIN RATE</span>
          <div className="text-xl font-bold text-emerald-400 mt-1">{current.winRate}</div>
          <span className="text-[10px] text-slate-400">Qualified Ops</span>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
          <span className="text-[10px] text-slate-400 uppercase">ACTIVE REPS</span>
          <div className="text-xl font-bold text-cyan-400 mt-1">{current.reps}</div>
          <span className="text-[10px] text-slate-400">All Certified</span>
        </div>
      </div>

      {/* ─── Interactive SVG Chart Simulation ─── */}
      <div className="p-4 bg-[#050811] flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>MONTHLY REVENUE VS. TARGET PACING ({quarter})</span>
          <div className="flex items-center gap-1.5">
            {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuarter(q)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] border transition-colors",
                  quarter === q
                    ? "border-amber-400 text-amber-300 bg-amber-950/40"
                    : "border-slate-800 text-slate-500 hover:text-slate-300"
                )}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Chart Bars */}
        <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
          {[
            { month: "Jan", val: 65, tgt: 60 },
            { month: "Feb", val: 78, tgt: 70 },
            { month: "Mar", val: 92, tgt: 80 },
            { month: "Apr", val: 84, tgt: 82 },
            { month: "May", val: 96, tgt: 85 },
            { month: "Jun", val: 110, tgt: 95 },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
              <div className="text-[9px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ${(bar.val * 35).toLocaleString()}k
              </div>
              <div className="w-full max-w-[36px] flex items-end gap-1 h-full justify-center">
                {/* Target line */}
                <div 
                  className="w-1.5 bg-slate-700 rounded-t"
                  style={{ height: `${(bar.tgt / 120) * 100}%` }}
                  title={`Target: ${bar.tgt}%`}
                />
                {/* Actual Revenue Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(bar.val / 120) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t shadow-lg shadow-amber-500/20 group-hover:from-amber-400 group-hover:to-yellow-200 transition-all cursor-pointer"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1">{bar.month}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-amber-400 inline-block" /> Actual Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-slate-700 inline-block" /> Quota Target
            </span>
          </div>
          <span className="text-slate-500">Star Schema: 1 Fact · 4 Dims</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Simulation 3: Autonomous Multi-Agent Suite Simulator ─── */

export function AutonomousAgentSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "AGENT.ORCHESTRATOR: Idle. Waiting for input payload...",
  ]);

  const steps = [
    { name: "Payload Ingestion", agent: "IngestionAgent", color: "#00e5ff" },
    { name: "Schema Validation", agent: "ValidationAgent", color: "#ffd700" },
    { name: "Entity Extraction", agent: "ExtractionAgent", color: "#39ff14" },
    { name: "Anomaly Flagging", agent: "SecurityAgent", color: "#d500f9" },
    { name: "C-Suite Dispatch", agent: "DispatchAgent", color: "#00e5ff" },
  ];

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs(["[00:00.01] SYSTEM: Initializing autonomous multi-agent pipeline..."]);

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
        setLogs((prev) => [
          `[00:0${idx + 1}.20] ${s.agent}: Completed ${s.name} successfully. Transferring state...`,
          ...prev.slice(0, 4),
        ]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setLogs((prev) => [
              `[00:06.00] COMPLETE: Workflow finished with 0 errors. Target latency 114ms achieved.`,
              ...prev,
            ]);
          }, 800);
        }
      }, (idx + 1) * 700);
    });
  };

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-[#040814] p-4 font-mono shadow-2xl flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
        <div>
          <span className="text-[10px] text-cyan-400 uppercase tracking-widest block">
            PRODUCTION AI DEMO // DAC DEVELOPERS ARCHITECTURE
          </span>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Autonomous Multi-Agent Process Intelligence
          </h3>
        </div>

        <Button
          size="sm"
          onClick={runPipeline}
          disabled={isRunning}
          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 text-xs font-mono"
        >
          {isRunning ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
          {isRunning ? "PROCESSING AGENTS..." : "EXECUTE PIPELINE"}
        </Button>
      </div>

      {/* Agent Pipeline Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {steps.map((s, idx) => {
          const isActive = isRunning && activeStep === idx;
          const isDone = isRunning && activeStep > idx;
          return (
            <div
              key={idx}
              className={cn(
                "p-2.5 rounded-lg border text-center transition-all relative overflow-hidden",
                isActive
                  ? "border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400"
                  : isDone
                  ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
                  : "border-slate-800 bg-slate-950/60 text-slate-500"
              )}
            >
              <div className="text-[9px] uppercase tracking-wider mb-1">
                {s.agent}
              </div>
              <div className="text-xs font-bold text-white truncate">
                {s.name}
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Live Agent Logs */}
      <div className="p-3 rounded-lg bg-black/80 border border-slate-800 text-[11px] text-slate-300 flex flex-col gap-1 min-h-[90px]">
        <span className="text-[9px] text-cyan-400/80 uppercase tracking-widest border-b border-slate-800 pb-1 mb-1">
          LIVE AGENT AUDIT LOG:
        </span>
        {logs.map((log, i) => (
          <div key={i} className="text-slate-300 font-mono truncate">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
