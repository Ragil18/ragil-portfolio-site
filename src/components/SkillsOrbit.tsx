import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Cpu, 
  Database, 
  BarChart3, 
  Cloud, 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Search, 
  ExternalLink,
  Radar
} from "lucide-react";

export interface SkillNode {
  id: string;
  name: string;
  category: "ai" | "bi" | "cloud" | "db" | "ba";
  categoryLabel: string;
  proficiency: "Grandmaster" | "Expert" | "Proficient" | "Advanced";
  percentage: number;
  color: string;
  glow: string;
  iconName: string;
  x: number; // 0-100 coordinate in constellation space
  y: number; // 0-100 coordinate in constellation space
  description: string;
  enterpriseDeployment: string;
  relatedProjects: string[];
  connections: string[]; // IDs of related skills
}

const SKILL_NODES: SkillNode[] = [
  // AI & Automation Cluster
  {
    id: "agents",
    name: "Autonomous AI Agents",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    proficiency: "Expert",
    percentage: 95,
    color: "#00e5ff",
    glow: "rgba(0, 229, 255, 0.4)",
    iconName: "Cpu",
    x: 22,
    y: 24,
    description: "Multi-agent autonomous systems, LLM tool-calling orchestration, and automated decision workflows.",
    enterpriseDeployment: "Architecting autonomous process intelligence and document extraction pipelines at DAC Developers.",
    relatedProjects: ["Autonomous Multi-Agent Process Suite", "AI-Powered CCTV Analytics"],
    connections: ["python", "yolo", "fastapi", "azure"]
  },
  {
    id: "yolo",
    name: "YOLO v8 / Vision",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    proficiency: "Expert",
    percentage: 92,
    color: "#00e5ff",
    glow: "rgba(0, 229, 255, 0.4)",
    iconName: "Cpu",
    x: 14,
    y: 42,
    description: "Real-time edge object detection, uniform identification, and personnel tracking across CCTV feeds.",
    enterpriseDeployment: "Deployed fine-tuned YOLO models on live RTSP video feeds across 500+ employees with 95% accuracy.",
    relatedProjects: ["AI-Powered CCTV Analytics"],
    connections: ["agents", "opencv", "python"]
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    proficiency: "Proficient",
    percentage: 88,
    color: "#00e5ff",
    glow: "rgba(0, 229, 255, 0.4)",
    iconName: "Cpu",
    x: 28,
    y: 48,
    description: "Multi-zone boundary logic, video stream pre-processing, bounding-box tracking, and heatmap generation.",
    enterpriseDeployment: "Multi-floor zone occupancy logic and motion filtering on live RTSP video streams.",
    relatedProjects: ["AI-Powered CCTV Analytics"],
    connections: ["yolo", "fastapi"]
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "ai",
    categoryLabel: "AI & AUTOMATION",
    proficiency: "Expert",
    percentage: 90,
    color: "#00e5ff",
    glow: "rgba(0, 229, 255, 0.4)",
    iconName: "Cpu",
    x: 35,
    y: 32,
    description: "High-throughput asynchronous REST APIs serving real-time model inferences and streaming analytics.",
    enterpriseDeployment: "Edge inference API backend dispatching vision detections to PostgreSQL in under 120ms.",
    relatedProjects: ["AI-Powered CCTV Analytics", "Autonomous Multi-Agent Process Suite"],
    connections: ["agents", "python", "postgres"]
  },

  // Analytics & BI Cluster
  {
    id: "powerbi",
    name: "Power BI Premium",
    category: "bi",
    categoryLabel: "ANALYTICS & BI",
    proficiency: "Grandmaster",
    percentage: 98,
    color: "#ffd700",
    glow: "rgba(255, 215, 0, 0.4)",
    iconName: "BarChart3",
    x: 75,
    y: 22,
    description: "Enterprise DAX modeling, star schema architecture, row-level security, bookmarks, and scheduled services.",
    enterpriseDeployment: "Designed and shipped 15+ production dashboards for C-suite and department heads at Neuberg Diagnostics.",
    relatedProjects: ["Executive Sales Dashboard", "Healthcare Operations Intelligence", "Executive Financial & P&L"],
    connections: ["sql", "tableau", "excel", "dax"]
  },
  {
    id: "sql",
    name: "SQL (T-SQL / ANSI)",
    category: "bi",
    categoryLabel: "ANALYTICS & BI",
    proficiency: "Grandmaster",
    percentage: 99,
    color: "#ffd700",
    glow: "rgba(255, 215, 0, 0.4)",
    iconName: "Database",
    x: 58,
    y: 18,
    description: "Advanced query tuning, window functions, recursive CTEs, indexing strategies, and stored procedures.",
    enterpriseDeployment: "Queried, modeled, and transformed millions of diagnostic and financial records daily.",
    relatedProjects: ["Executive Sales Dashboard", "Healthcare Operations Intelligence", "Attendance Analytics"],
    connections: ["powerbi", "sqlserver", "postgres", "python"]
  },
  {
    id: "tableau",
    name: "Tableau",
    category: "bi",
    categoryLabel: "ANALYTICS & BI",
    proficiency: "Proficient",
    percentage: 86,
    color: "#ffd700",
    glow: "rgba(255, 215, 0, 0.4)",
    iconName: "BarChart3",
    x: 88,
    y: 32,
    description: "Interactive visual exploratory analytics, parameter actions, trend forecasting, and segment blendings.",
    enterpriseDeployment: "Built customer sentiment tracking dashboards analyzing survey responses across customer touchpoints.",
    relatedProjects: ["Customer Experience & NPS Management Platform"],
    connections: ["powerbi", "sql"]
  },
  {
    id: "excel",
    name: "Excel & Financial Modeling",
    category: "bi",
    categoryLabel: "ANALYTICS & BI",
    proficiency: "Grandmaster",
    percentage: 96,
    color: "#ffd700",
    glow: "rgba(255, 215, 0, 0.4)",
    iconName: "BarChart3",
    x: 82,
    y: 44,
    description: "Advanced financial modelling, Power Query ETL, VBA automation, dynamic arrays, and scenario testing.",
    enterpriseDeployment: "Completed JP Morgan investment banking simulation and automated 80% of legacy reporting sheets.",
    relatedProjects: ["Executive Financial & P&L Analytics", "Healthcare Operations Intelligence"],
    connections: ["powerbi", "sql"]
  },

  // Programming & Core
  {
    id: "python",
    name: "Python",
    category: "ai",
    categoryLabel: "CORE PROGRAMMING",
    proficiency: "Expert",
    percentage: 94,
    color: "#39ff14",
    glow: "rgba(57, 255, 20, 0.4)",
    iconName: "Cpu",
    x: 42,
    y: 40,
    description: "Data pipelines, automated ETL scripts, asynchronous microservices, Pandas, NumPy, and OpenCV.",
    enterpriseDeployment: "Automated recurring daily data pipelines; engineered core AI inference logic and web services.",
    relatedProjects: ["Customer Experience & NPS Platform", "AI-Powered CCTV Analytics"],
    connections: ["agents", "sql", "fastapi", "pyspark"]
  },

  // Cloud & Big Data Cluster
  {
    id: "azure",
    name: "Azure Synapse & Cloud",
    category: "cloud",
    categoryLabel: "CLOUD & DATA ENGINEERING",
    proficiency: "Advanced",
    percentage: 85,
    color: "#2979ff",
    glow: "rgba(41, 121, 255, 0.4)",
    iconName: "Cloud",
    x: 72,
    y: 72,
    description: "Cloud analytics, Synapse data pipelines, Blob storage integration, and scalable data warehousing.",
    enterpriseDeployment: "Engineered Synapse pipelines ingesting multi-region sales data for consolidated C-suite views.",
    relatedProjects: ["Executive Sales Performance Dashboard"],
    connections: ["powerbi", "databricks", "sql"]
  },
  {
    id: "databricks",
    name: "Databricks",
    category: "cloud",
    categoryLabel: "CLOUD & DATA ENGINEERING",
    proficiency: "Advanced",
    percentage: 82,
    color: "#2979ff",
    glow: "rgba(41, 121, 255, 0.4)",
    iconName: "Cloud",
    x: 84,
    y: 62,
    description: "Unified lakehouse analytics, notebook orchestration, Delta Lake architecture, and distributed clusters.",
    enterpriseDeployment: "Actively building high-volume data transformations and exploring MLflow integrations.",
    relatedProjects: ["Autonomous Multi-Agent Process Suite"],
    connections: ["azure", "pyspark", "python"]
  },
  {
    id: "pyspark",
    name: "PySpark",
    category: "cloud",
    categoryLabel: "CLOUD & DATA ENGINEERING",
    proficiency: "Proficient",
    percentage: 80,
    color: "#2979ff",
    glow: "rgba(41, 121, 255, 0.4)",
    iconName: "Cloud",
    x: 62,
    y: 82,
    description: "Distributed Resilient Distributed Dataset (RDD) manipulations and Spark SQL on massive tabular datasets.",
    enterpriseDeployment: "Big data transformations and batch processing for scalable analytics pipelines.",
    relatedProjects: ["Healthcare Operations Intelligence"],
    connections: ["databricks", "python"]
  },

  // Databases Cluster
  {
    id: "sqlserver",
    name: "SQL Server (SSMS)",
    category: "db",
    categoryLabel: "DATABASE SYSTEMS",
    proficiency: "Grandmaster",
    percentage: 96,
    color: "#d500f9",
    glow: "rgba(213, 0, 249, 0.4)",
    iconName: "Database",
    x: 48,
    y: 80,
    description: "Enterprise database administration, stored procedure optimizations, schema design, and query tuning.",
    enterpriseDeployment: "Production data backbone powering diagnostics operations and executive BI refreshes.",
    relatedProjects: ["Executive Sales Performance Dashboard", "Healthcare Operations Intelligence"],
    connections: ["sql", "powerbi", "postgres"]
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "db",
    categoryLabel: "DATABASE SYSTEMS",
    proficiency: "Expert",
    percentage: 90,
    color: "#d500f9",
    glow: "rgba(213, 0, 249, 0.4)",
    iconName: "Database",
    x: 34,
    y: 72,
    description: "Relational modeling, JSONB document storage, analytical window aggregations, and vacuum optimization.",
    enterpriseDeployment: "Backed survey analytics data store and real-time CCTV inference event logging.",
    relatedProjects: ["Customer Experience & NPS Platform", "AI-Powered CCTV Analytics"],
    connections: ["sql", "fastapi", "sqlserver"]
  },

  // Business Analysis & Consulting Cluster
  {
    id: "kpis",
    name: "KPI Architecture & ROI",
    category: "ba",
    categoryLabel: "BUSINESS ARCHITECTURE",
    proficiency: "Grandmaster",
    percentage: 97,
    color: "#00e676",
    glow: "rgba(0, 230, 118, 0.4)",
    iconName: "Briefcase",
    x: 18,
    y: 78,
    description: "Translating business goals into leading/lagging KPIs, north-star metrics, and financial impact models.",
    enterpriseDeployment: "Designed enterprise KPI trees connecting operational throughput to bottom-line profitability.",
    relatedProjects: ["Executive Financial & P&L Platform", "Executive Sales Dashboard"],
    connections: ["stakeholders", "process", "powerbi"]
  },
  {
    id: "stakeholders",
    name: "Stakeholder Alignment",
    category: "ba",
    categoryLabel: "BUSINESS ARCHITECTURE",
    proficiency: "Expert",
    percentage: 94,
    color: "#00e676",
    glow: "rgba(0, 230, 118, 0.4)",
    iconName: "Briefcase",
    x: 26,
    y: 62,
    description: "Cross-functional requirement elicitation, C-suite executive briefings, and frontline user alignment.",
    enterpriseDeployment: "Interfaced between C-suite directors, medical lab managers, and engineering teams.",
    relatedProjects: ["Healthcare Operations Intelligence", "Customer Experience Platform"],
    connections: ["kpis", "process", "agents"]
  },
  {
    id: "process",
    name: "Process Optimization (SOP)",
    category: "ba",
    categoryLabel: "BUSINESS ARCHITECTURE",
    proficiency: "Expert",
    percentage: 92,
    color: "#00e676",
    glow: "rgba(0, 230, 118, 0.4)",
    iconName: "Briefcase",
    x: 16,
    y: 60,
    description: "Root cause analysis (5-Whys, Fishbone), standard operating procedures, and 80% reporting automation.",
    enterpriseDeployment: "Uncovered bottlenecks across reporting workflows, slashing delivery turnaround by 35%.",
    relatedProjects: ["Digital Marketing & Call Centre Sync", "Attendance & Productivity Analytics"],
    connections: ["kpis", "stakeholders"]
  }
];

export function SkillsOrbit() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("agents");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"constellation" | "matrix">("constellation");

  // Currently active node
  const activeNode = useMemo(() => {
    return SKILL_NODES.find((n) => n.id === (hoveredNodeId || selectedNodeId)) || SKILL_NODES[0];
  }, [hoveredNodeId, selectedNodeId]);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return SKILL_NODES.filter((n) => {
      const matchesCategory = filterCategory === "all" || n.category === filterCategory;
      const matchesSearch = !searchQuery || 
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        n.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery]);

  // Constellation connection lines
  const constellationLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; key: string; isHighlighted: boolean; color: string }[] = [];
    const seen = new Set<string>();

    SKILL_NODES.forEach((source) => {
      source.connections.forEach((targetId) => {
        const target = SKILL_NODES.find((n) => n.id === targetId);
        if (!target) return;

        const pairKey = [source.id, target.id].sort().join("-");
        if (seen.has(pairKey)) return;
        seen.add(pairKey);

        const isHighlighted = 
          (activeNode.id === source.id || activeNode.id === target.id) ||
          (activeNode.connections.includes(source.id) && activeNode.connections.includes(target.id));

        lines.push({
          x1: source.x,
          y1: source.y,
          x2: target.x,
          y2: target.y,
          key: pairKey,
          isHighlighted,
          color: isHighlighted ? activeNode.color : "rgba(0, 229, 255, 0.15)"
        });
      });
    });

    return lines;
  }, [activeNode]);

  return (
    <div className="w-full bg-[#05070e] text-foreground font-mono select-none">
      {/* Top Header / Mode Switcher */}
      <div className="border-b border-primary/20 bg-primary/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
          <div>
            <div className="text-xs font-bold text-primary tracking-widest uppercase">
              RAGIL.OS // INTELLIGENCE ARCHITECTURE
            </div>
            <div className="text-[11px] text-muted-foreground">
              Interactive Celestial Skill Constellation & Enterprise Telemetry
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-background/80 border border-primary/30 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("constellation")}
            className={`px-3 py-1 text-xs rounded transition-all flex items-center gap-1.5 ${
              viewMode === "constellation"
                ? "bg-primary text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Radar className="w-3.5 h-3.5" /> CONSTELLATION MAP
          </button>
          <button
            onClick={() => setViewMode("matrix")}
            className={`px-3 py-1 text-xs rounded transition-all flex items-center gap-1.5 ${
              viewMode === "matrix"
                ? "bg-primary text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> TACTICAL MATRIX
          </button>
        </div>
      </div>

      {/* Sector Category Filter Bar */}
      <div className="px-6 py-3 border-b border-border/40 bg-card/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground uppercase tracking-widest mr-2">
            SECTOR FILTER:
          </span>
          {[
            { id: "all", label: "ALL SECTORS" },
            { id: "ai", label: "AI & AGENTS" },
            { id: "bi", label: "ANALYTICS & BI" },
            { id: "cloud", label: "CLOUD & DATA" },
            { id: "db", label: "DATABASES" },
            { id: "ba", label: "BUSINESS ARCHITECTURE" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] rounded border transition-all ${
                filterCategory === cat.id
                  ? "bg-primary/20 text-primary border-primary font-bold shadow-[0_0_8px_rgba(0,229,255,0.25)]"
                  : "bg-background/40 text-muted-foreground border-border/40 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input in tactical mode */}
        {viewMode === "matrix" && (
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, tools, frameworks..."
              className="w-full bg-background/60 border border-primary/30 rounded pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
            />
          </div>
        )}
      </div>

      {/* CONSTELLATION MAP VIEW */}
      {viewMode === "constellation" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px] relative">
          
          {/* Main Constellation Canvas (Left 8 cols on desktop) */}
          <div className="lg:col-span-8 relative min-h-[520px] lg:min-h-[620px] overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#071324] via-[#04060d] to-[#020307] flex items-center justify-center p-4">
            
            {/* Concentric Cyber Rings (Stationary & stable!) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className="w-[180px] h-[180px] rounded-full border border-primary/30" />
              <div className="w-[320px] h-[320px] rounded-full border border-dashed border-primary/20" />
              <div className="w-[480px] h-[480px] rounded-full border border-primary/15" />
              <div className="w-[640px] h-[640px] rounded-full border border-dashed border-primary/10" />
            </div>

            {/* Radar Sweep Animation Line */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, rgba(0, 229, 255, 0.15) 0deg, transparent 60deg, transparent 360deg)",
                animation: "radarSweep 14s linear infinite"
              }}
            />

            {/* Central Intelligence Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-black/90 border-2 border-primary shadow-[0_0_35px_rgba(0,229,255,0.35)]">
                <div className="w-16 h-16 rounded-full border border-primary/40 animate-ping opacity-25" />
                <div className="absolute text-center">
                  <div className="text-[10px] font-black text-primary tracking-widest">RAGIL.OS</div>
                  <div className="text-[8px] text-muted-foreground tracking-tighter">DATA CORE</div>
                </div>
              </div>
            </div>

            {/* Constellation SVG Line Mesh */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {constellationLines.map((line) => (
                <line
                  key={line.key}
                  x1={`${line.x1}%`}
                  y1={`${line.y1}%`}
                  x2={`${line.x2}%`}
                  y2={`${line.y2}%`}
                  stroke={line.color}
                  strokeWidth={line.isHighlighted ? 2 : 0.8}
                  strokeDasharray={line.isHighlighted ? "none" : "3,3"}
                  className="transition-all duration-300"
                />
              ))}

              {/* Connecting lines from active node to center core */}
              <line
                x1={`${activeNode.x}%`}
                y1={`${activeNode.y}%`}
                x2="50%"
                y2="50%"
                stroke={activeNode.color}
                strokeWidth={1.5}
                strokeOpacity={0.7}
                strokeDasharray="4,4"
              />
            </svg>

            {/* Interactive Skill Star Nodes */}
            {SKILL_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isActive = isSelected || isHovered;
              const isDimmed = filterCategory !== "all" && node.category !== filterCategory;

              return (
                <div
                  key={node.id}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isDimmed ? "opacity-20 scale-75 pointer-events-none" : "opacity-100"
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                >
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
                  >
                    {/* Glowing outer aura when active */}
                    {isActive && (
                      <div
                        className="absolute -inset-2 rounded-full blur-md opacity-75 animate-pulse"
                        style={{ backgroundColor: node.color }}
                      />
                    )}

                    {/* Node Star Circle */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-300 border ${
                        isActive
                          ? "w-11 h-11 border-2 scale-110 shadow-lg"
                          : "w-8 h-8 hover:scale-110"
                      }`}
                      style={{
                        backgroundColor: isActive ? "rgba(4, 8, 18, 0.95)" : "rgba(10, 15, 28, 0.85)",
                        borderColor: node.color,
                        boxShadow: isActive ? `0 0 20px ${node.glow}` : `0 0 8px ${node.glow}`,
                      }}
                    >
                      <span className="text-[11px] font-bold" style={{ color: node.color }}>
                        {node.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    {/* Skill Label Tag */}
                    <div
                      className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all border ${
                        isActive
                          ? "bg-black/90 border-primary text-white shadow-md scale-105"
                          : "bg-black/60 border-border/40 text-muted-foreground group-hover:text-white group-hover:border-primary/50"
                      }`}
                    >
                      {node.name}
                    </div>

                    {/* Proficiency Ring Tag */}
                    {isActive && (
                      <span
                        className="text-[9px] font-mono tracking-tighter"
                        style={{ color: node.color }}
                      >
                        {node.percentage}%
                      </span>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Bottom Map Help Legend */}
            <div className="absolute bottom-3 left-4 text-[10px] text-muted-foreground tracking-widest hidden sm:flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              <span>CLICK ANY STAR NODE TO ENGAGE TELEMETRY DOSSIER</span>
            </div>
          </div>

          {/* Right Column: Telemetry Dossier Panel */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-primary/20 bg-background/90 p-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header Badge & Skill Name */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border"
                      style={{
                        color: activeNode.color,
                        borderColor: activeNode.color + "44",
                        backgroundColor: activeNode.color + "11",
                      }}
                    >
                      {activeNode.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      SYS.NODE-0{activeNode.percentage % 10}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-foreground font-mono flex items-center gap-2">
                    <span style={{ color: activeNode.color }}>◆</span>
                    {activeNode.name}
                  </h3>
                </div>

                {/* Proficiency Gauge Telemetry */}
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground uppercase">MASTERY LEVEL:</span>
                    <span className="font-bold" style={{ color: activeNode.color }}>
                      {activeNode.proficiency} ({activeNode.percentage}%)
                    </span>
                  </div>

                  {/* Segmented Neon Bar */}
                  <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border border-border flex gap-0.5 p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500 shadow-sm"
                      style={{
                        width: `${activeNode.percentage}%`,
                        backgroundColor: activeNode.color,
                        boxShadow: `0 0 10px ${activeNode.glow}`,
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">
                    // CAPABILITY OVERVIEW
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                    {activeNode.description}
                  </p>
                </div>

                {/* Production Deployment Impact */}
                <div className="p-3.5 rounded-lg border border-border/60 bg-card/40 space-y-1">
                  <div className="text-[11px] text-primary uppercase font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> PRODUCTION ENTERPRISE DEPLOYMENT
                  </div>
                  <p className="text-xs text-muted-foreground leading-normal font-sans">
                    {activeNode.enterpriseDeployment}
                  </p>
                </div>

                {/* Associated Projects */}
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2 font-bold">
                    // ASSOCIATED ENGAGEMENTS
                  </div>
                  <div className="space-y-1.5">
                    {activeNode.relatedProjects.map((proj) => (
                      <div
                        key={proj}
                        onClick={() => {
                          const projSection = document.getElementById("projects");
                          if (projSection) projSection.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-2.5 py-1.5 rounded border border-border/50 bg-background/50 text-xs text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <span className="truncate">{proj}</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Constellation Link Affinities */}
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2 font-bold">
                    // CONSTELLATION SYNERGIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNode.connections.map((connId) => {
                      const target = SKILL_NODES.find((n) => n.id === connId);
                      if (!target) return null;
                      return (
                        <button
                          key={connId}
                          onClick={() => setSelectedNodeId(connId)}
                          className="px-2 py-0.5 rounded text-[11px] border border-border/60 bg-background/40 hover:border-primary hover:text-primary transition-colors"
                        >
                          → {target.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 border-t border-border/40 text-[10px] text-muted-foreground/60 text-center uppercase tracking-widest mt-6">
              RAGIL.OS TELEMETRY BUFFER v2.4 // READY
            </div>
          </div>

        </div>
      )}

      {/* TACTICAL MATRIX GRID VIEW */}
      {viewMode === "matrix" && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => {
                  setSelectedNodeId(node.id);
                  setViewMode("constellation");
                }}
                className="group p-5 rounded-xl border border-border/60 bg-card/30 hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border"
                      style={{
                        color: node.color,
                        borderColor: node.color + "44",
                        backgroundColor: node.color + "11",
                      }}
                    >
                      {node.categoryLabel}
                    </span>
                    <h4 className="text-base font-bold text-foreground font-mono mt-2 group-hover:text-primary transition-colors">
                      {node.name}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold" style={{ color: node.color }}>
                    {node.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${node.percentage}%`,
                      backgroundColor: node.color,
                    }}
                  />
                </div>

                <p className="text-xs text-muted-foreground font-sans line-clamp-2">
                  {node.description}
                </p>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{node.proficiency}</span>
                  <span className="text-primary group-hover:underline">
                    Inspect in Orbit →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredNodes.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No matching skills found in matrix buffer. Try resetting your search filter.
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
