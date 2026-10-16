import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, 
  Cpu, 
  Database, 
  BarChart3, 
  ShieldCheck, 
  Server, 
  ArrowRight, 
  Zap, 
  Activity, 
  GitBranch,
  CheckCircle2,
  Lock,
  Play
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PipelineLayer {
  id: string;
  number: string;
  title: string;
  badge: string;
  color: string;
  icon: any;
  technologies: string[];
  latency: string;
  throughput: string;
  productionImplementation: string;
  engineeringDetails: string[];
}

const LAYERS: PipelineLayer[] = [
  {
    id: "ingestion",
    number: "01",
    title: "INGESTION & SENSORS",
    badge: "INPUT LAYER",
    color: "#00e5ff",
    icon: Server,
    technologies: ["RTSP CCTV Feeds", "Twilio Webhooks", "ERP SQL Exports", "CRM REST APIs"],
    latency: "< 50ms",
    throughput: "Thousands rec/day",
    productionImplementation: "DAC Developers & Neuberg Diagnostics",
    engineeringDetails: [
      "Sub-second event ingestion via FastAPI asynchronous endpoints",
      "RTSP video frame sampling buffer optimized for edge compute",
      "Automated schema validation and dead-letter queue handling",
    ],
  },
  {
    id: "processing",
    number: "02",
    title: "AI & COMPUTATIONAL ENGINE",
    badge: "PROCESSING LAYER",
    color: "#a855f7",
    icon: Cpu,
    technologies: ["YOLO v8 Object Detection", "OpenCV Pipelines", "Spacy NLP", "Python / Pandas"],
    latency: "18ms - 120ms",
    throughput: "30 FPS Live Stream",
    productionImplementation: "DAC Developers Autonomous Systems",
    engineeringDetails: [
      "Real-time object localization and anomaly boundary classification",
      "Sentiment scoring and automated tag extraction on open-text feedback",
      "Multi-agent state machines orchestrating step-by-step decision rules",
    ],
  },
  {
    id: "storage",
    number: "03",
    title: "MODERN LAKEHOUSE & DW",
    badge: "PERSISTENCE LAYER",
    color: "#ffd700",
    icon: Database,
    technologies: ["Azure Synapse", "Delta Lake", "SQL Server (T-SQL)", "PostgreSQL"],
    latency: "< 5s Analytics Query",
    throughput: "Multi-Gigabyte",
    productionImplementation: "Neuberg Diagnostics Diagnostics Mart",
    engineeringDetails: [
      "Optimized Star-Schema dimensional modeling for high-velocity aggregations",
      "Partitioned columnar storage with incremental load mechanisms",
      "ACID transactional guarantees across all reporting pipelines",
    ],
  },
  {
    id: "governance",
    number: "04",
    title: "GOVERNANCE & SECURITY",
    badge: "COMPLIANCE LAYER",
    color: "#39ff14",
    icon: ShieldCheck,
    technologies: ["Row-Level Security (RLS)", "ISO 31000 Risk Framework", "Role-Based Access (RBAC)"],
    latency: "0ms Overhead",
    throughput: "Enterprise-wide",
    productionImplementation: "Neuberg Diagnostics Regional RLS",
    engineeringDetails: [
      "Granular dynamic RLS ensuring regional managers only access their territory",
      "ISO 31000 compliant risk evaluation and data privacy protocols",
      "Automated audit logging of all executive queries and data transformations",
    ],
  },
  {
    id: "serving",
    number: "05",
    title: "SERVING & EXECUTIVE ACTION",
    badge: "ACTION LAYER",
    color: "#00e5ff",
    icon: BarChart3,
    technologies: ["Power BI Premium", "Autonomous Agent Webhooks", "Automated SMS/Email Alerts"],
    latency: "Real-Time / 15m Refresh",
    throughput: "Adopted by C-Suite",
    productionImplementation: "15+ Executive Dashboards in Production",
    engineeringDetails: [
      "Interactive drill-through and bookmarking for CEO & VP level reviews",
      "Automated detractor alerts and KPI breach dispatches within 15 minutes",
      "80% reduction in manual executive reporting turnaround time",
    ],
  },
];

export function ArchitectureExplorer() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("ingestion");
  const [isSimulatingFlow, setIsSimulatingFlow] = useState<boolean>(false);

  const activeLayer = LAYERS.find((l) => l.id === selectedLayerId) || LAYERS[0];

  const triggerPacketFlow = () => {
    if (isSimulatingFlow) return;
    setIsSimulatingFlow(true);
    let step = 0;
    const interval = setInterval(() => {
      setSelectedLayerId(LAYERS[step].id);
      step++;
      if (step >= LAYERS.length) {
        clearInterval(interval);
        setTimeout(() => setIsSimulatingFlow(false), 800);
      }
    }, 900);
  };

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#040814] p-4 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.25) 0%, transparent 80%)"
        }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-cyan-500/20 pb-4 sm:pb-5 mb-5 sm:mb-6">
        <div>
          <span className="text-[11px] sm:text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold mb-1">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            END-TO-END DATA & AI SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
            Enterprise Pipeline Topology
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">
            Interactive breakdown of how Ragil architects scalable, fault-tolerant pipelines from edge video feeds to C-suite executive dashboards.
          </p>
        </div>

        <Button
          onClick={triggerPacketFlow}
          disabled={isSimulatingFlow}
          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 font-mono text-xs px-4 w-full sm:w-auto justify-center"
        >
          <Play className="w-3.5 h-3.5 mr-2" />
          {isSimulatingFlow ? "FLOWING TELEMETRY..." : "SIMULATE PIPELINE FLOW"}
        </Button>
      </div>

      {/* ─── Interactive Pipeline Stages Strip ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {LAYERS.map((layer, idx) => {
          const isSelected = selectedLayerId === layer.id;
          const Icon = layer.icon;
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayerId(layer.id)}
              className={cn(
                "p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group",
                isSelected
                  ? "bg-slate-900/90 shadow-xl ring-1"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
              style={{
                borderColor: isSelected ? layer.color : undefined,
                boxShadow: isSelected ? `0 0 20px ${layer.color}25` : undefined,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-widest" style={{ color: layer.color }}>
                    {layer.number} // {layer.badge}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: isSelected ? layer.color : "#64748b" }} />
                </div>
                <h4 className="text-xs font-bold text-white leading-tight font-mono mb-2">
                  {layer.title}
                </h4>
              </div>

              <div className="text-[10px] text-slate-400 truncate pt-2 border-t border-slate-800/80">
                {layer.technologies.slice(0, 2).join(", ")}
              </div>

              {isSelected && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: layer.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Stage Deep-Dive Telemetry Dossier ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-xl border bg-slate-950/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6"
          style={{ borderColor: `${activeLayer.color}40` }}
        >
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: `${activeLayer.color}20`, color: activeLayer.color, border: `1px solid ${activeLayer.color}50` }}
              >
                LAYER {activeLayer.number} DEEP DIVE
              </span>
              <h3 className="text-lg font-black text-white font-mono">
                {activeLayer.title}
              </h3>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-2 pt-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                ENGINEERING SPECIFICATIONS & PROTOCOLS:
              </span>
              {activeLayer.engineeringDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: activeLayer.color }} />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Technologies Chips */}
            <div className="pt-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                CORE TECHNOLOGIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeLayer.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono border bg-slate-900 text-slate-200 border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Telemetry Specs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#060a14]">
            <div className="space-y-3 text-xs">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-[10px] text-slate-500 uppercase block">PERFORMANCE LATENCY TARGET:</span>
                <span className="text-base font-bold text-white font-mono mt-0.5 block" style={{ color: activeLayer.color }}>
                  {activeLayer.latency}
                </span>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-[10px] text-slate-500 uppercase block">SCALE & THROUGHPUT:</span>
                <span className="text-white font-bold font-mono mt-0.5 block">
                  {activeLayer.throughput}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block">PRODUCTION DEPLOYMENT:</span>
                <span className="text-emerald-400 font-bold font-mono mt-0.5 block">
                  {activeLayer.productionImplementation}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 font-sans">
              Designed with <strong>ISO 31000 Risk Framework</strong> compliance for high availability and zero unplanned data downtime.
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
