import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, X, TrendingUp, Target, Lightbulb, BarChart2, Layers, Zap, BookOpen, Monitor } from "lucide-react";

type FilterKey = "All" | "Analytics" | "Business Intelligence" | "AI" | "Automation" | "Business Analysis";

interface Project {
  id: number;
  name: string;
  category: string;
  filterKey: FilterKey[];
  technologies: string[];
  impactMetrics: string[];
  problem: string;
  objectives: string[];
  solution: string;
  kpis: string[];
  architecture: string[];
  impact: string[];
  learnings: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Executive Sales Performance Dashboard",
    category: "BUSINESS INTELLIGENCE",
    filterKey: ["Business Intelligence", "Analytics"],
    technologies: ["Power BI", "SQL Server", "DAX", "Azure Synapse"],
    impactMetrics: ["25% efficiency boost", "12 regions unified", "3-day reporting cut"],
    problem:
      "Sales leadership had no unified view of pipeline and performance across 12 regions. Decisions relied on manually collated Excel sheets sent weekly — stale by the time they reached executives.",
    objectives: [
      "Create a single source of truth for C-suite decision-making",
      "Enable drill-through from national → regional → rep level",
      "Automate data refresh to eliminate manual consolidation",
    ],
    solution:
      "Built an Azure Synapse Analytics pipeline ingesting from SQL Server and CRM exports, modeled into a star schema, and surfaced through a Power BI executive dashboard with drill-through, bookmarks, and role-level security. Scheduled auto-refresh every 15 minutes.",
    kpis: ["Revenue vs Target", "Win Rate %", "Pipeline Value", "ASP", "Forecast Accuracy", "QoQ Growth"],
    architecture: ["CRM + SQL Server", "→ Azure Synapse Pipelines", "→ Star Schema DW", "→ Power BI Service (Premium)", "→ Scheduled Refresh"],
    impact: [
      "Reporting time reduced from 3 days to real-time",
      "Enabled weekly executive review cadence vs monthly",
      "Identified 2 underperforming regions 6 weeks earlier than previously possible",
    ],
    learnings: [
      "Executives need extreme simplicity — detail hides in drill-throughs, not the main view",
      "Role-level security was critical for regional managers",
      "Star schema over wide tables improved DAX performance by 60%",
    ],
  },
  {
    id: 2,
    name: "Customer Experience & NPS Management Platform",
    category: "ANALYTICS",
    filterKey: ["Analytics", "Business Analysis"],
    technologies: ["Python", "Pandas", "Tableau", "NLP", "PostgreSQL", "Twilio API"],
    impactMetrics: ["NPS +12 points", "40% faster response", "6-month turnaround"],
    problem:
      "Customer feedback was fragmented across email, SMS surveys, and call center notes. No systematic NLP analysis existed, and detractors weren't being followed up within the required 48-hour window.",
    objectives: [
      "Centralize NPS collection and analysis in real time",
      "Apply NLP sentiment tagging to all open-text responses",
      "Trigger automated detractor alerts for relationship recovery",
    ],
    solution:
      "Built a Python pipeline ingesting Twilio SMS surveys into PostgreSQL. Spacy-based NLP classified sentiment and extracted themes. Tableau dashboard provided daily NPS view by segment. Power Automate triggered alerts for any score ≤ 6 within 15 minutes.",
    kpis: ["NPS Score", "Promoter %", "Detractor %", "Response Rate", "Resolution Rate", "Sentiment Score"],
    architecture: ["Twilio SMS API", "→ Python ETL + NLP", "→ PostgreSQL", "→ Tableau Server", "→ Power Automate Alerts"],
    impact: [
      "NPS improved from 42 to 54 (12 points) in 6 months",
      "Detractor follow-up time reduced from 72h to under 15 minutes",
      "Identified 3 root-cause themes driving 80% of low scores",
    ],
    learnings: [
      "Closing the feedback loop matters far more than collecting it",
      "NLP theme extraction revealed issues invisible to structured surveys",
      "Automated alerts changed team culture — from reactive to proactive",
    ],
  },
  {
    id: 3,
    name: "AI-Powered CCTV Analytics",
    category: "AI / COMPUTER VISION",
    filterKey: ["AI"],
    technologies: ["YOLO v8", "OpenCV", "Python", "FastAPI", "Power BI", "RTSP"],
    impactMetrics: ["95% detection accuracy", "500+ employees tracked", "100% manual elimination"],
    problem:
      "Manual attendance tracking across multiple floors was inaccurate and consumed 4+ hours daily of admin time. Existing CCTV infrastructure was unused for analytics purposes.",
    objectives: [
      "Leverage existing CCTV infrastructure for automated attendance",
      "Track zone-level productivity and occupancy in real time",
      "Provide daily reports without human intervention",
    ],
    solution:
      "Deployed YOLO v8 fine-tuned on facility staff for person detection on RTSP streams. OpenCV handled multi-zone boundary logic. FastAPI served inference results to a PostgreSQL backend. Power BI streaming dashboards displayed live attendance and zone heatmaps.",
    kpis: ["Detection Accuracy", "Processing Latency", "Attendance Rate", "Zone Occupancy", "False Positive Rate"],
    architecture: ["CCTV RTSP Streams", "→ YOLO v8 Inference (Edge)", "→ OpenCV Zone Logic", "→ FastAPI + PostgreSQL", "→ Power BI Streaming"],
    impact: [
      "95% attendance detection accuracy across 500+ employees",
      "Eliminated 4+ hours/day of manual tracking admin work",
      "Zone productivity data influenced floor layout redesign",
    ],
    learnings: [
      "Edge inference outperforms cloud for real-time video — latency dropped from 800ms to 120ms",
      "RTSP stream stability requires heartbeat monitoring; silent drops caused data gaps",
      "Fine-tuning YOLO on domain-specific uniforms boosted accuracy from 78% to 95%",
    ],
  },
  {
    id: 4,
    name: "Digital Marketing & Call Centre Dashboard",
    category: "ANALYTICS",
    filterKey: ["Analytics", "Business Intelligence"],
    technologies: ["Power BI", "Google Analytics API", "Python", "SQL", "REST APIs"],
    impactMetrics: ["30% better ROI visibility", "+15% call resolution", "$120K savings identified"],
    problem:
      "Marketing spend and call center outcomes lived in completely separate silos. Performance teams couldn't connect campaign decisions to downstream service load or resolution quality.",
    objectives: [
      "Create a unified view bridging marketing spend to call center outcomes",
      "Identify which campaigns drove high-cost, low-quality inbound calls",
      "Enable budget reallocation based on full-funnel cost data",
    ],
    solution:
      "Built a Python ETL connecting GA4 API and CRM call exports into a unified SQL model. Power BI dashboard provided side-by-side campaign and call metrics with cost-per-resolution as the bridging KPI.",
    kpis: ["CPL", "ROAS", "Call Volume by Campaign", "FCR %", "AHT", "Cost-per-Resolution"],
    architecture: ["GA4 API + CRM Export", "→ Python ETL", "→ SQL Data Model", "→ Power BI Dashboard", "→ Campaign Attribution Layer"],
    impact: [
      "Identified 3 underperforming campaigns generating high call volume with low conversion",
      "$120K annually redirected to higher-ROAS channels",
      "FCR improved 15% after removing misleading ad copy driving confused calls",
    ],
    learnings: [
      "Full-funnel attribution requires agreeing on the bridging KPI before building — cost-per-resolution united both teams",
      "GA4 API rate limits require batched nightly pulls rather than real-time",
    ],
  },
  {
    id: 5,
    name: "Attendance & Productivity Analytics Platform",
    category: "BUSINESS INTELLIGENCE",
    filterKey: ["Business Intelligence", "Automation"],
    technologies: ["Power BI", "Azure SQL", "Power Automate", "Biometric API", "Excel"],
    impactMetrics: ["80% less manual reporting", "40 hrs/week saved", "Real-time visibility"],
    problem:
      "HR teams spent 40+ hours per week manually reconciling biometric attendance data from Excel sheets before any analysis could happen. Reports were always 1 week delayed.",
    objectives: [
      "Automate attendance reconciliation end-to-end",
      "Provide real-time productivity and absenteeism dashboards",
      "Alert managers on attendance anomalies the same day",
    ],
    solution:
      "Power Automate flows pulled biometric API exports hourly into Azure SQL. A data model reconciled shifts, leaves, and overtime automatically. Power BI provided self-serve dashboards for HR and line managers with daily anomaly alerts.",
    kpis: ["Attendance Rate", "Overtime Hours", "Productivity Index", "Absenteeism Rate", "Leave Utilization"],
    architecture: ["Biometric System API", "→ Power Automate (Hourly)", "→ Azure SQL", "→ Power BI Report", "→ Email Anomaly Alerts"],
    impact: [
      "80% reduction in manual reporting effort",
      "40+ person-hours per week returned to HR for strategic work",
      "Same-day visibility into attendance anomalies vs. 1-week delay",
    ],
    learnings: [
      "Biometric API data quality was inconsistent — a cleansing layer was essential before any analytics",
      "Manager self-serve adoption required training sessions, not just dashboard deployment",
    ],
  },
  {
    id: 6,
    name: "Executive Financial & P&L Analytics Platform",
    category: "BUSINESS INTELLIGENCE",
    filterKey: ["Business Intelligence", "Analytics"],
    technologies: ["Power BI", "SQL Server", "DAX", "Azure Data Factory", "Excel"],
    impactMetrics: ["60% faster close", "5-day → 2-day reporting", "Zero manual errors"],
    problem:
      "Monthly financial close required 5+ days of manual data consolidation across 8 cost centers and 3 entities. CFO reviews were delayed; decision-making lagged market events by weeks.",
    objectives: [
      "Automate P&L consolidation across all entities and cost centers",
      "Provide CFO with real-time actuals vs. budget visibility",
      "Eliminate manual errors in month-end reporting",
    ],
    solution:
      "Azure Data Factory pipelines ingested ERP GL extracts nightly into a SQL DW star schema. DAX measures handled inter-company eliminations and currency normalization. Power BI Premium enabled paginated reports for formal board distribution alongside interactive exec dashboards.",
    kpis: ["Gross Margin %", "EBITDA", "Variance to Budget", "YoY Growth", "Cash Flow", "Cost per Entity"],
    architecture: ["ERP GL Extracts", "→ Azure Data Factory", "→ SQL DW (Star Schema)", "→ Power BI Premium", "→ Paginated Board Reports"],
    impact: [
      "Monthly close cycle reduced from 5 days to 2 days",
      "Zero manual calculation errors post-implementation",
      "CFO adopted weekly P&L reviews vs. monthly — enabling faster pivots",
    ],
    learnings: [
      "Inter-company eliminations are the hardest part of multi-entity P&L — model them first",
      "Power BI paginated reports were essential for formal board distribution; interactive dashboards alone weren't sufficient",
    ],
  },
  {
    id: 7,
    name: "Healthcare Operations Intelligence Dashboard",
    category: "ANALYTICS",
    filterKey: ["Analytics"],
    technologies: ["Power BI", "Databricks", "Azure", "Python", "Delta Lake", "SQL"],
    impactMetrics: ["20% TAT reduction", "SLA breach -35%", "100k+ records/day"],
    problem:
      "Diagnostic centers processing 100,000+ daily records had no real-time view of sample processing bottlenecks. Delayed TAT on critical tests was causing patient care issues and SLA penalties.",
    objectives: [
      "Build real-time TAT tracking across all 200+ test categories",
      "Identify bottleneck workstations and shift patterns",
      "Reduce SLA breach rate for critical test categories",
    ],
    solution:
      "A Databricks streaming pipeline ingested LIS system events in near real-time into a Delta Lake. Python transformations computed TAT at each processing stage. Power BI streaming dashboards displayed live queue depth, critical test status, and SLA risk scores.",
    kpis: ["TAT by Test Category", "Equipment Utilization %", "Pending Sample Count", "SLA Breach Rate", "Critical Test TAT"],
    architecture: ["LIS System Events", "→ Databricks Streaming", "→ Delta Lake", "→ Power BI Streaming", "→ SLA Alert Service"],
    impact: [
      "Critical test TAT reduced from 6.0h to 4.8h (20% improvement)",
      "SLA breach rate dropped 35% in 3 months",
      "Workstation bottleneck identification enabled shift rebalancing",
    ],
    learnings: [
      "Streaming architecture requires checkpoint management — batch fallbacks were essential for data integrity",
      "Operations teams needed anomaly alerts, not just dashboards — real-time push notifications drove adoption",
    ],
  },
  {
    id: 8,
    name: "Business Process Automation Suite",
    category: "AUTOMATION",
    filterKey: ["Automation", "Business Analysis"],
    technologies: ["Python", "Power Automate", "Excel VBA", "REST APIs", "Scheduler", "RPA"],
    impactMetrics: ["10+ processes automated", "200+ hrs/month saved", "0 manual errors"],
    problem:
      "12+ high-frequency manual business processes consumed analyst and operations time daily — from report distribution to data entry reconciliation — none of which added analytical value.",
    objectives: [
      "Map and prioritize automation candidates by effort vs. frequency",
      "Automate top 10 processes within 3 months",
      "Achieve zero errors in automated flows vs. existing manual baseline",
    ],
    solution:
      "Conducted process mapping workshops to identify and rank automation opportunities. Deployed Python schedulers for data pipeline tasks, Power Automate for cross-system workflows, and Excel VBA for legacy report generation. Each automation included exception handling and email notifications for failures.",
    kpis: ["Processes Automated", "Hours Saved per Month", "Error Rate Before vs. After", "Automation ROI", "Exception Rate"],
    architecture: ["Trigger Sources (Schedule/Event)", "→ Python / Power Automate / VBA", "→ Target Systems", "→ Output Distribution", "→ Exception Notification"],
    impact: [
      "200+ person-hours reclaimed monthly across teams",
      "0 manual errors in all automated flows post-deployment",
      "Team capacity redirected to higher-value analysis work",
    ],
    learnings: [
      "Process mapping before automation reveals the real bottleneck — often upstream data quality, not the process itself",
      "Exception handling and failure alerts were as important as the automation — silent failures are worse than manual processes",
    ],
  },
];

const FILTERS: FilterKey[] = ["All", "Analytics", "Business Intelligence", "AI", "Automation", "Business Analysis"];

const categoryColors: Record<string, string> = {
  "BUSINESS INTELLIGENCE": "text-cyan-400",
  "ANALYTICS": "text-emerald-400",
  "AI / COMPUTER VISION": "text-violet-400",
  "AUTOMATION": "text-amber-400",
};

const detailVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut" as const } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const } }),
};

function DetailBlock({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary/80">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

export function ProjectExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterKey.includes(activeFilter));

  const expandedIndex = filtered.findIndex((p) => p.id === expandedId);

  function handleCardClick(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function handlePrev() {
    if (expandedIndex <= 0) {
      setExpandedId(filtered[filtered.length - 1].id);
    } else {
      setExpandedId(filtered[expandedIndex - 1].id);
    }
  }

  function handleNext() {
    if (expandedIndex >= filtered.length - 1 || expandedIndex === -1) {
      setExpandedId(filtered[0].id);
    } else {
      setExpandedId(filtered[expandedIndex + 1].id);
    }
  }

  return (
    <div ref={sectionRef} className="space-y-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.filterKey.includes(f)).length;
            return (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setExpandedId(null);
                }}
                className={`relative font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                  activeFilter === f
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {f}
                <span className={`ml-1.5 text-[10px] ${activeFilter === f ? "text-primary/70" : "text-muted-foreground/50"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next */}
        {expandedId && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs text-muted-foreground">
              {expandedIndex + 1} / {filtered.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-1.5 rounded border border-border/50 hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded border border-border/50 hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Project list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const isExpanded = expandedId === project.id;
            const color = categoryColors[project.category] ?? "text-primary";
            return (
              <motion.div
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                layout
                className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
                  isExpanded
                    ? "border-primary/60 bg-card/80"
                    : "border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/50"
                }`}
              >
                {/* Card header — always visible */}
                <button
                  onClick={() => handleCardClick(project.id)}
                  className="w-full text-left"
                >
                  <div className="px-6 py-4 flex items-start sm:items-center justify-between gap-4">
                    {/* Left: index + name */}
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <span className="font-mono text-xs text-muted-foreground/40 shrink-0 pt-0.5 sm:pt-0 w-6 text-right">
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className={`font-mono text-[10px] tracking-[0.2em] mb-1 ${color}`}>
                          {project.category}
                        </div>
                        <h3 className={`font-bold text-sm sm:text-base leading-tight transition-colors ${isExpanded ? "text-primary" : "text-foreground"}`}>
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {/* Right: tags + toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden md:flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/50 text-secondary-foreground border border-border/30">
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/30 text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="hidden sm:flex gap-3 items-center">
                        {project.impactMetrics.slice(0, 1).map((m) => (
                          <span key={m} className="font-mono text-[10px] text-primary/70 border border-primary/20 px-2 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`p-1 rounded transition-colors ${isExpanded ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* Expanded detail panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key="detail"
                      variants={detailVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="border-t border-primary/20 px-6 pb-8 pt-6">
                        {/* Impact summary strip */}
                        <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-border/30">
                          {project.impactMetrics.map((m) => (
                            <div key={m} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
                              <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="font-mono text-xs text-primary font-medium">{m}</span>
                            </div>
                          ))}
                        </div>

                        {/* Detail grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Left column */}
                          <div className="space-y-7">
                            <DetailBlock icon={<Target className="w-3.5 h-3.5" />} label="BUSINESS PROBLEM">
                              <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                            </DetailBlock>

                            <DetailBlock icon={<Lightbulb className="w-3.5 h-3.5" />} label="OBJECTIVES">
                              <ul className="space-y-1.5">
                                {project.objectives.map((o, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-primary mt-1 shrink-0">▸</span>
                                    {o}
                                  </li>
                                ))}
                              </ul>
                            </DetailBlock>

                            <DetailBlock icon={<Zap className="w-3.5 h-3.5" />} label="SOLUTION">
                              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                            </DetailBlock>
                          </div>

                          {/* Right column */}
                          <div className="space-y-7">
                            <DetailBlock icon={<BarChart2 className="w-3.5 h-3.5" />} label="KEY KPIs">
                              <div className="flex flex-wrap gap-1.5">
                                {project.kpis.map((k) => (
                                  <span key={k} className="font-mono text-[11px] px-2 py-1 rounded bg-secondary/60 text-secondary-foreground border border-border/30">
                                    {k}
                                  </span>
                                ))}
                              </div>
                            </DetailBlock>

                            <DetailBlock icon={<Layers className="w-3.5 h-3.5" />} label="ARCHITECTURE">
                              <div className="flex flex-wrap items-center gap-1">
                                {project.architecture.map((a, i) => (
                                  <span key={i} className={`font-mono text-[11px] ${a.startsWith("→") ? "text-primary/50" : "text-foreground/80"}`}>
                                    {a}
                                  </span>
                                ))}
                              </div>
                            </DetailBlock>

                            <DetailBlock icon={<TrendingUp className="w-3.5 h-3.5" />} label="BUSINESS IMPACT">
                              <ul className="space-y-1.5">
                                {project.impact.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                                    <span className="text-emerald-400 mt-1 shrink-0">✓</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </DetailBlock>

                            <DetailBlock icon={<BookOpen className="w-3.5 h-3.5" />} label="KEY LEARNINGS">
                              <ul className="space-y-1.5">
                                {project.learnings.map((l, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-amber-400 mt-1 shrink-0">◆</span>
                                    {l}
                                  </li>
                                ))}
                              </ul>
                            </DetailBlock>
                          </div>
                        </div>

                        {/* Dashboard placeholder */}
                        <div className="mt-8 rounded-xl border border-border/40 bg-background/50 p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[120px]">
                          <Monitor className="w-8 h-8 text-primary/30" />
                          <div className="font-mono text-xs text-muted-foreground/50 tracking-widest">DASHBOARD SCREENSHOT</div>
                          <div className="font-mono text-xs text-muted-foreground/30">{project.name.toUpperCase()}</div>
                        </div>

                        {/* All technologies */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.technologies.map((t) => (
                            <span key={t} className="font-mono text-xs px-2.5 py-1 rounded bg-secondary/40 text-secondary-foreground border border-border/30">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Close */}
                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => setExpandedId(null)}
                            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> COLLAPSE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center font-mono text-muted-foreground/50 text-sm tracking-widest">
            NO PROJECTS IN THIS CATEGORY
          </div>
        )}
      </div>
    </div>
  );
}
