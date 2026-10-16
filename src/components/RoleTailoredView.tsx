import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Cpu, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Mail, 
  Sparkles,
  Layers
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { getDynamicExperience } from "@/lib/experience";

export type RoleCategory = "ai_engineer" | "bi_architect" | "business_analyst";

interface RolePitch {
  id: RoleCategory;
  title: string;
  badge: string;
  color: string;
  headline: string;
  oneMinutePitch: string;
  coreStack: string[];
  keyOutcomes: string[];
  recommendedProjects: string[];
}

const PITCHES: Record<RoleCategory, RolePitch> = {
  ai_engineer: {
    id: "ai_engineer",
    title: "Senior AI & Automation Engineer",
    badge: "AI & MULTI-AGENT SYSTEMS",
    color: "#00e5ff",
    headline: "Architecting Autonomous Agent Pipelines & Real-Time Computer Vision",
    oneMinutePitch:
      "Proven enterprise track record deploying production AI systems: autonomous multi-agent process workflows at DAC Developers, real-time YOLO v8 computer vision surveillance pipelines, and high-throughput FastAPI microservices. Combines modern LLM orchestration with industrial data reliability.",
    coreStack: ["Python", "YOLO v8", "OpenCV", "Autonomous Agents", "FastAPI", "TensorFlow", "PySpark", "Azure"],
    keyOutcomes: [
      "70% reduction in manual surveillance monitoring with real-time video anomaly detection",
      "End-to-end multi-agent autonomous document and workflow intelligence",
      "Low-latency (<20ms) computer vision inference pipelines",
    ],
    recommendedProjects: ["AI-Powered CCTV Analytics", "Autonomous Multi-Agent Process Suite", "Customer Experience NLP Platform"],
  },
  bi_architect: {
    id: "bi_architect",
    title: "Enterprise BI & Data Architect",
    badge: "ANALYTICS & STAR SCHEMA",
    color: "#ffd700",
    headline: "Transforming Fragmented Data into Executive Intelligence Consoles",
    oneMinutePitch:
      "Built and deployed 15+ production dashboards for C-suite and regional leaders across Neuberg Diagnostics and DAC Developers. Master of complex DAX, star-schema data warehousing, incremental refresh scheduling, and granular dynamic Row-Level Security (RLS).",
    coreStack: ["Power BI Premium", "DAX", "SQL Server (T-SQL)", "Azure Synapse", "Star Schema DW", "Incremental Refresh", "RLS"],
    keyOutcomes: [
      "80% recurring management reports automated across healthcare network",
      "Reporting turnaround slashed from 3 days to real-time (15-min refresh)",
      "DAX optimization cutting complex model query latency by 60%",
    ],
    recommendedProjects: ["Executive Sales Performance Dashboard", "Diagnostics Network Performance Mart", "Digital Marketing & Call Centre Dashboard"],
  },
  business_analyst: {
    id: "business_analyst",
    title: "Business Systems & Decision Analyst",
    badge: "STRATEGY & GOVERNANCE",
    color: "#39ff14",
    headline: "Bridging Deep Technical Architecture with C-Level Business Strategy",
    oneMinutePitch:
      "A rare hybrid who commands both code and boardroom presentations. Certified in ISO 31000 Risk Management, Ragil translates ambiguous business challenges into clear SOP documentation, functional requirements, KPI trees, and high-adoption analytical tools.",
    coreStack: ["Stakeholder Alignment", "SOP Documentation", "KPI Tree Architecture", "ISO 31000 Risk", "UAT Testing", "Excel Financial Modeling"],
    keyOutcomes: [
      "25% operational efficiency improvement through process re-engineering",
      "Zero-downtime UAT transitions across cross-functional teams",
      "Trusted advisor to CEOs, VP of Sales, and Regional Operations Heads",
    ],
    recommendedProjects: ["Customer Experience & NPS Management Platform", "Executive Sales Performance Dashboard", "Operational SOP Automation Suite"],
  },
};

export function RoleTailoredView({ onSelectProject }: { onSelectProject?: (projectName: string) => void }) {
  const [activeRole, setActiveRole] = useState<RoleCategory>("ai_engineer");
  const exp = getDynamicExperience();
  const pitch = PITCHES[activeRole];

  const handleInquireRole = () => {
    const subject = encodeURIComponent(`Inquiry for ${pitch.title} Role`);
    const body = encodeURIComponent(
      `Hi Ragil,\n\nI reviewed your portfolio with the ${pitch.title} lens. We are looking for someone with your background in ${pitch.coreStack.slice(0, 4).join(", ")}.\n\nLet's schedule a time to talk.\n\nBest regards,`
    );
    window.location.href = `mailto:ragilimmanuvel@gmail.com?subject=${subject}&body=${body}`;
  };

  const handlePrintOnePager = () => {
    window.print();
  };

  return (
    <div className="rounded-2xl border border-primary/30 bg-[#050914] p-4 sm:p-8 shadow-2xl relative font-mono">
      {/* ─── Role Lens Switcher Toolbar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-primary/20 pb-4 sm:pb-5 mb-5 sm:mb-6">
        <div>
          <span className="text-[11px] sm:text-xs text-primary uppercase tracking-widest flex items-center gap-1.5 font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            ROLE-TAILORED RECRUITER VIEW
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
            Customize Portfolio to Your Hiring Need
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Select your open requisition to instantly re-focus Ragil's experience ({exp.fullLabel}), accomplishments, and case studies.
          </p>
        </div>

        {/* Lens Pill Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          {(["ai_engineer", "bi_architect", "business_analyst"] as const).map((r) => {
            const p = PITCHES[r];
            const isSelected = activeRole === r;
            return (
              <button
                key={r}
                onClick={() => setActiveRole(r)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5",
                  isSelected
                    ? "font-bold shadow-lg"
                    : "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
                )}
                style={{
                  borderColor: isSelected ? p.color : undefined,
                  backgroundColor: isSelected ? `${p.color}20` : undefined,
                  color: isSelected ? p.color : undefined,
                  boxShadow: isSelected ? `0 0 15px ${p.color}30` : undefined,
                }}
              >
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Tailored 1-Minute Pitch Card ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pitch.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Summary & Stack (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span 
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-2"
                style={{ backgroundColor: `${pitch.color}20`, color: pitch.color, border: `1px solid ${pitch.color}40` }}
              >
                {pitch.badge} // {exp.fullLabel} TOTAL ENTERPRISE TENURE
              </span>
              <h3 className="text-xl font-bold text-white font-mono leading-snug">
                {pitch.headline}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              {pitch.oneMinutePitch}
            </p>

            {/* Core Stack */}
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-2 font-mono">
                RELEVANT TECH STACK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pitch.coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 text-slate-200 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Outcomes & Action (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl border bg-slate-950/90 shadow-xl space-y-4" style={{ borderColor: `${pitch.color}40` }}>
            <span className="text-[11px] font-bold uppercase tracking-wider block font-mono" style={{ color: pitch.color }}>
              PROVEN BUSINESS OUTCOMES:
            </span>

            <div className="space-y-2.5 text-xs text-slate-300">
              {pitch.keyOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: pitch.color }} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            {/* Recommended Case Studies */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                TOP RELEVANT CASE STUDIES:
              </span>
              <div className="space-y-1.5">
                {pitch.recommendedProjects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="text-xs text-cyan-300 font-mono flex items-center gap-1.5 hover:underline cursor-pointer"
                    onClick={() => {
                      const el = document.getElementById("projects");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
              <Button
                onClick={handleInquireRole}
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs font-bold h-9"
              >
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                INTERVIEW FOR THIS ROLE
              </Button>

              <a
                href="/resume.pdf"
                download="Ragil_Immanuvel_Resume.pdf"
                className="px-3 h-9 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RESUME</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
