import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import certificationsData from "@/data/certifications.json";
import { getDynamicExperience } from "./experience";

/* ─── Types & Models ────────────────────────────────── */

export type PersonaType = "recruiter" | "tech" | "executive";

export type Intent =
  | "greet"
  | "about"
  | "experience"
  | "project_specific"
  | "projects_all"
  | "skill"
  | "certification"
  | "contact"
  | "hire"
  | "metrics"
  | "location"
  | "learning"
  | "salary_availability"
  | "fallback";

export interface QuickAction {
  label: string;
  action: "link" | "scroll" | "copy" | "query";
  value: string;
}

export interface AiSearchResponse {
  text: string;
  intent: Intent;
  persona: PersonaType;
  personaBadge: string;
  richType?: "projects" | "project_detail" | "skills" | "contact" | "metrics" | "experience";
  richData?: any;
  quickActions?: QuickAction[];
  suggestedFollowUps: string[];
}

export interface ChatContext {
  lastIntent?: Intent;
  lastSubject?: string; // e.g. "dac", "neuberg", project name, skill name
}

/* ─── Helpers ─────────────────────────────────────────── */

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function score(query: string, targets: string[]): number {
  const qw = words(query);
  let hits = 0;
  for (const t of targets) {
    const tw = words(t);
    for (const q of qw) {
      if (tw.some((w) => w.includes(q) || q.includes(w))) hits++;
    }
  }
  return hits;
}

function hasWord(query: string, ...wordsList: string[]): boolean {
  const qw = words(query);
  return wordsList.some((w) => qw.includes(w.toLowerCase()));
}

function hasPhrase(query: string, ...phrases: string[]): boolean {
  const q = query.toLowerCase();
  return phrases.some((p) => q.includes(p.toLowerCase()));
}

/* ─── Intent & Subject Detection ─────────────────────── */

function detectIntentAndSubject(query: string, prevContext?: ChatContext): { intent: Intent; subject?: string } {
  const q = query.toLowerCase().trim();

  // Handle follow-up context (e.g. "what tech stack?", "how about metrics?", "tell me more about that")
  if (prevContext?.lastSubject) {
    if (hasWord(q, "tech", "stack", "tools", "technologies")) {
      if (prevContext.lastSubject === "dac" || prevContext.lastSubject === "neuberg") {
        return { intent: "experience", subject: prevContext.lastSubject };
      }
      return { intent: "skill", subject: prevContext.lastSubject };
    }
    if (hasWord(q, "impact", "metric", "metrics", "result", "results")) {
      return { intent: "metrics", subject: prevContext.lastSubject };
    }
  }

  // 1. Hire intent
  if (
    hasWord(q, "hire", "recruit", "differentiator", "strength", "strengths") ||
    hasPhrase(q, "why should", "should i hire", "why hire", "worth hiring", "good fit", "stand out", "why ragil")
  ) {
    return { intent: "hire" };
  }

  // 2. Salary / Availability / Notice Period
  if (
    hasWord(q, "salary", "compensation", "notice", "availability", "available", "relocate", "relocation", "visa") ||
    hasPhrase(q, "start date", "when can he join", "notice period", "open to work")
  ) {
    return { intent: "salary_availability" };
  }

  // 3. Metrics intent
  if (
    hasWord(q, "metric", "metrics", "number", "numbers", "stat", "stats", "impact", "achievement", "achievements", "result", "results", "figure", "figures", "roi") ||
    hasPhrase(q, "how many", "percentage", "%", "impact metrics")
  ) {
    return { intent: "metrics" };
  }

  // 4. Contact intent
  if (
    hasWord(q, "contact", "email", "reach", "linkedin", "phone", "resume", "cv", "call", "schedule") ||
    hasPhrase(q, "get in touch", "how to contact", "how can i contact", "send email", "message")
  ) {
    return { intent: "contact" };
  }

  // 5. Greeting intent
  if (
    hasWord(q, "hi", "hello", "hey", "help", "greet", "greetings") ||
    hasPhrase(q, "good morning", "good afternoon", "what can you", "who are you")
  ) {
    return { intent: "greet" };
  }

  // 6. Experience intent (with subject isolation)
  if (
    hasWord(q, "experience", "career", "role", "roles", "history", "employ", "intern", "internship", "junior", "senior", "tenure") ||
    hasPhrase(q, "work experience", "where has he worked", "past work", "job history", "work history")
  ) {
    if (q.includes("dac")) return { intent: "experience", subject: "dac" };
    if (q.includes("neuberg")) return { intent: "experience", subject: "neuberg" };
    return { intent: "experience" };
  }

  if (hasWord(q, "dac")) return { intent: "experience", subject: "dac" };
  if (hasWord(q, "neuberg")) return { intent: "experience", subject: "neuberg" };

  // 7. Certifications intent
  if (
    hasWord(q, "certificate", "certificates", "certification", "certifications", "credential", "credentials", "course", "qualification") ||
    hasPhrase(q, "ibm", "jp morgan", "iso 31000", "iso")
  ) {
    return { intent: "certification" };
  }

  // 8. Learning intent
  if (
    hasWord(q, "learning", "studying", "future", "roadmap", "upskill") ||
    hasPhrase(q, "currently learning", "what next", "next learning")
  ) {
    return { intent: "learning" };
  }

  // 9. Location intent
  if (
    hasWord(q, "location", "city", "country", "based", "india", "chennai", "remote", "where", "onsite")
  ) {
    return { intent: "location" };
  }

  // 10. Skills intent
  if (
    hasWord(q, "skill", "skills", "tool", "tools", "tech", "stack", "python", "sql", "tableau", "excel", "yolo", "opencv", "tensorflow", "databricks", "azure", "pyspark", "fastapi", "pandas", "numpy", "postgresql", "mysql", "dax") ||
    hasPhrase(q, "power bi", "sql server", "what skills", "tech stack", "data engineering", "computer vision", "machine learning", "ai agents")
  ) {
    return { intent: "skill" };
  }

  // 11. Specific or all projects
  if (
    hasWord(q, "project", "projects", "dashboard", "dashboards", "cctv", "nps", "automation", "portfolio") ||
    hasPhrase(q, "what projects", "show projects", "portfolio projects", "built", "solutions", "case studies")
  ) {
    // Check if it matches a specific project
    const projs = projectsData.projects;
    const scored = projs.map((p) => ({
      p,
      s: score(q, [p.name, p.category, ...p.tools]),
    })).sort((a, b) => b.s - a.s);

    if (scored[0].s >= 1) {
      return { intent: "project_specific", subject: scored[0].p.name };
    }
    return { intent: "projects_all" };
  }

  // 12. About intent
  if (
    hasWord(q, "about", "bio", "overview", "ragil") ||
    hasPhrase(q, "who is", "tell me about", "introduce", "background")
  ) {
    return { intent: "about" };
  }

  return { intent: "fallback" };
}

/* ─── Persona Badges ──────────────────────────────────── */

const PERSONA_BADGES: Record<PersonaType, string> = {
  recruiter: "RECRUITER LENS // HIGHLIGHTS & FIT",
  tech: "TECH LEAD LENS // ARCHITECTURE & STACK",
  executive: "EXECUTIVE LENS // BUSINESS ROI & IMPACT",
};

/* ─── Search Engine Implementation ────────────────────── */

export function searchPortfolio(
  query: string,
  persona: PersonaType = "recruiter",
  prevContext?: ChatContext
): AiSearchResponse {
  const { intent, subject } = detectIntentAndSubject(query, prevContext);
  const exp = getDynamicExperience();
  const badge = PERSONA_BADGES[persona];

  // Quick Action presets
  const contactActions: QuickAction[] = [
    { label: "✉️ Copy Email", action: "copy", value: profileData.email },
    { label: "💼 LinkedIn Profile", action: "link", value: profileData.linkedin },
    { label: "📄 View Resume", action: "scroll", value: "experience" },
    { label: "🚀 Start Project", action: "scroll", value: "contact" },
  ];

  switch (intent) {
    case "greet": {
      let text = `Greetings! I'm Ragil's AI Copilot. Operating on full neural context for his professional journey.`;
      if (persona === "recruiter") {
        text += `\n\nI can quickly provide candidate highlights, full career tenure (${exp.fullLabel}), compensation/availability context, and production track records.`;
      } else if (persona === "tech") {
        text += `\n\nI can break down system architecture, multi-agent frameworks, computer vision pipelines (YOLO v8 + OpenCV), DAX query optimization, and Azure cloud pipelines.`;
      } else {
        text += `\n\nI can summarize quantifiable business impact, 80%+ operational automation metrics, stakeholder leadership, and ROI delivered across real enterprise environments.`;
      }

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        suggestedFollowUps: [
          "Why should I hire Ragil?",
          "Show his top projects",
          "What is his tech stack?",
          "Show impact metrics",
        ],
        quickActions: [
          { label: "Why Hire Him?", action: "query", value: "Why should I hire Ragil?" },
          { label: "View Projects", action: "query", value: "What projects has he built?" },
          { label: "Contact Info", action: "query", value: "How do I contact Ragil?" },
        ],
      };
    }

    case "about": {
      const p = profileData;
      let text = `${p.name} is a ${p.title} based in ${p.location}.\n\n`;

      if (persona === "recruiter") {
        text += `${p.summary}\n\n• Experience: ${exp.fullLabel} (${exp.totalMonths} months of real enterprise delivery)\n• Current Role: Senior AI Automation Engineer at ${experienceData.experience[0].company}\n• Education & Track Record: Consistently trusted to bridge complex data with business execution.`;
      } else if (persona === "tech") {
        text += `Technical Profile:\nSpecializes in end-to-end data systems — architecting autonomous AI multi-agent workflows, computer vision (YOLO/OpenCV), enterprise Power BI/DAX modeling, and scalable Azure pipelines.\n\nCurrently architecting automated process pipelines and computer vision security workflows at ${experienceData.experience[0].company}.`;
      } else {
        text += `Executive Profile:\nRagil transforms manual operational bottlenecks into autonomous, high-yield digital platforms. At DAC Developers and Neuberg Diagnostics, his systems delivered 80%+ report automation, accelerated decision cycles by 40%, and served C-suite leaders directly.`;
      }

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "contact",
        quickActions: contactActions,
        suggestedFollowUps: [
          "What projects has he built?",
          "Why should I hire him?",
          "What is his experience at DAC Developers?",
        ],
      };
    }

    case "experience": {
      const exps = experienceData.experience;
      let text = `─── PROFESSIONAL CAREER (${exp.fullLabel} TOTAL TENURE) ───\n\n`;

      if (subject === "dac" || !subject) {
        const dac = exps[0];
        text += `1. ${dac.role.toUpperCase()} // ${dac.company}\n`;
        text += `   Period: ${dac.period} (${dac.type})\n`;
        text += `   Mission: ${dac.description}\n`;
        if (persona === "tech") {
          text += `   Engineering Highlights:\n   • Autonomous multi-agent pipelines for automated processing\n   • YOLO v8 & OpenCV computer vision integration\n   • FastAPI high-throughput backends\n   • Tools: ${dac.technologies.join(", ")}\n\n`;
        } else if (persona === "executive") {
          text += `   Business Impact:\n   • Rapid prototyping of enterprise automation saving hundreds of staff-hours\n   • Transformed operational efficiency with real-time video intelligence\n   • Built reliable C-suite reporting mechanisms\n\n`;
        } else {
          text += `   Key Achievements:\n` + dac.achievements.map((a) => `   • ${a}`).join("\n") + `\n\n`;
        }
      }

      if (subject === "neuberg" || !subject) {
        const neu = exps[1];
        text += `2. ${neu.role.toUpperCase()} // ${neu.company}\n`;
        text += `   Period: ${neu.period} (${neu.type})\n`;
        text += `   Mission: ${neu.description}\n`;
        if (persona === "tech") {
          text += `   Engineering Highlights:\n   • 15+ production Power BI dashboards with star-schema DAX models\n   • Incremental data refresh pipelines and row-level security (RLS)\n   • Tools: ${neu.technologies.join(", ")}\n`;
        } else if (persona === "executive") {
          text += `   Business Impact:\n   • Automated 80% of recurring management reports across diagnostics network\n   • Cut reporting turnaround time by 40%\n   • Empowered regional heads with real-time margin & turnaround analytics\n`;
        } else {
          text += `   Key Achievements:\n` + neu.achievements.map((a) => `   • ${a}`).join("\n") + `\n`;
        }
      }

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "experience",
        richData: exps,
        suggestedFollowUps: [
          "What did he build at DAC Developers?",
          "What tools did he use at Neuberg Diagnostics?",
          "Show his impact metrics",
        ],
        quickActions: [
          { label: "View Impact Metrics", action: "query", value: "Show impact metrics" },
          { label: "View Projects", action: "query", value: "What projects has he built?" },
        ],
      };
    }

    case "projects_all": {
      const projs = projectsData.projects;
      let text = `Ragil has architected and shipped ${projs.length} enterprise solutions across AI, BI, and Data Engineering:\n\n`;

      const cards = projs.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        tools: p.tools,
        impactHeadline: p.impact[0],
      }));

      return {
        text: text + "Select any project card below or ask about specific systems like CCTV Analytics, Sales Performance, or NPS Management:",
        intent,
        persona,
        personaBadge: badge,
        richType: "projects",
        richData: cards,
        suggestedFollowUps: [
          "Tell me about the AI CCTV Analytics project",
          "Tell me about the Executive Sales Dashboard",
          "What tools were used in Customer NPS Platform?",
        ],
        quickActions: [
          { label: "AI CCTV Analytics", action: "query", value: "Tell me about the CCTV project" },
          { label: "Sales Dashboard", action: "query", value: "Tell me about Executive Sales Performance Dashboard" },
          { label: "NPS Platform", action: "query", value: "Tell me about Customer Experience NPS Platform" },
        ],
      };
    }

    case "project_specific": {
      const projs = projectsData.projects;
      const scored = projs.map((p) => ({
        p,
        s: score(query, [p.name, p.category, ...p.tools, p.problem, p.solution, ...p.kpis, ...p.stakeholders]),
      })).sort((a, b) => b.s - a.s);

      const p = scored[0].p;

      let text = `─── ${p.name.toUpperCase()} ───\n`;
      text += `Category: ${p.category}\n`;
      text += `Stack: ${p.tools.join(" · ")}\n\n`;

      if (persona === "tech") {
        text += `System Challenge:\n${p.problem}\n\nTechnical Architecture:\n${p.solution}\n\nKPIs Monitored:\n${p.kpis.join(", ")}`;
      } else if (persona === "executive") {
        text += `Business Problem:\n${p.problem}\n\nQuantified Business Impact:\n` + p.impact.map((i) => `✓ ${i}`).join("\n") + `\n\nExecutive Stakeholders: ${p.stakeholders.join(", ")}`;
      } else {
        text += `Problem & Solution:\n${p.solution}\n\nCore Value Delivered:\n` + p.impact.map((i) => `✓ ${i}`).join("\n");
      }

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "project_detail",
        richData: p,
        suggestedFollowUps: [
          "What other projects has he built?",
          "What skills were used here?",
          "Why should I hire him?",
        ],
        quickActions: [
          { label: "View All Projects", action: "query", value: "What projects has he built?" },
          { label: "Inspect Tech Stack", action: "query", value: "What are his skills?" },
        ],
      };
    }

    case "skill": {
      const skills = skillsData.skills;
      let text = `─── CORE TECHNICAL & DOMAIN CAPABILITIES ───\n\n`;

      if (persona === "tech") {
        text += `• AI & Automation: Autonomous Agents, LangChain/LlamaIndex, YOLO v8, OpenCV, FastAPI, Python\n`;
        text += `• Analytics & BI: Power BI (Advanced DAX, Star Schema, RLS, Incremental Refresh), Tableau, Excel Modeling\n`;
        text += `• Data & Cloud: Azure (Synapse, Data Factory), Databricks, PySpark, SQL Server (T-SQL), PostgreSQL\n`;
        text += `• BA & Engineering: Process Optimization (SOP), Requirements Engineering, Wireframing, Agile Scrum`;
      } else if (persona === "executive") {
        text += `• Automation ROI: 80% recurring process reduction, end-to-end data pipeline automation\n`;
        text += `• Decision Support: Direct C-suite KPI consoles, real-time variance and revenue reporting\n`;
        text += `• Operational Governance: Certified in ISO 31000 Risk Management, business continuity & compliance`;
      } else {
        text += `Ragil is a rare hybrid who commands both hands-on technical execution (AI models, Python, SQL, BI) and business stakeholder alignment (SOPs, KPI design, executive presentations).`;
      }

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "skills",
        richData: skills,
        suggestedFollowUps: [
          "Why should I hire Ragil?",
          "Show his certifications",
          "What projects demonstrate these skills?",
        ],
        quickActions: [
          { label: "View Skill Constellation", action: "scroll", value: "skills" },
          { label: "Inspect Certifications", action: "query", value: "What certifications does he hold?" },
        ],
      };
    }

    case "hire": {
      const m = profileData.impact_metrics;
      const exps = experienceData.experience;

      let text = `─── WHY HIRE RAGIL IMMANUVEL? ───\n\n`;

      if (persona === "recruiter") {
        text += `1. Complete End-to-End Delivery: From raw business requirements to production AI workflows and executive dashboards.\n`;
        text += `2. Proven Enterprise Track Record: Shipped live systems at ${exps[0].company} and ${exps[1].company}.\n`;
        text += `3. Strong ROI & Efficiency: ${m.efficiency_improvement} operational boost and ${m.reporting_automation} report automation.\n`;
        text += `4. Fast Ramp-Up & Hybrid Agility: Fluent in Python, SQL, Power BI, YOLO, and multi-agent AI frameworks.\n`;
        text += `5. Clear Communicator: Bridges technical engineering teams with C-level business sponsors seamlessly.`;
      } else if (persona === "tech") {
        text += `1. Production AI Experience: Deployed YOLO v8 CCTV anomaly detection with FastAPI and OpenCV.\n`;
        text += `2. Industrial-Grade Data Modeling: Expert DAX authoring, star-schema warehousing, incremental refresh, and RLS.\n`;
        text += `3. Autonomous AI Agent Mindset: Actively building LLM multi-agent pipelines for automated enterprise workflows.\n`;
        text += `4. Clean Architecture: Delivers modular, testable, and maintainable data applications.`;
      } else {
        text += `1. Direct Business Bottom-Line: Automated hundreds of manual reporting hours and reduced decision lag from days to minutes.\n`;
        text += `2. C-Suite Trusted: Solutions built specifically for CEOs, VPs, and executive boards.\n`;
        text += `3. Risk-Aware: Certified in ISO 31000 Risk Management, ensuring data governance and operational compliance.\n`;
        text += `4. High Ownership: Takes initiatives from ambiguous problem statement to fully adopted operational solution.`;
      }

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "contact",
        quickActions: contactActions,
        suggestedFollowUps: [
          "Show his impact metrics",
          "How do I contact him?",
          "What is his current availability?",
        ],
      };
    }

    case "metrics": {
      const m = profileData.impact_metrics;
      let text = `─── ENTERPRISE IMPACT METRICS ───\n\n`;
      text += `• Total Experience: ${exp.fullLabel} (${exp.totalMonths} months · May 2024 – Present)\n`;
      text += `• Efficiency Improvement: ${m.efficiency_improvement}\n`;
      text += `• Recurring Reports Automated: ${m.reporting_automation}\n`;
      text += `• Dashboard Refresh Acceleration: ${m.dashboard_refresh_improvement}\n`;
      text += `• Report Delivery Speed-Up: ${m.report_delivery_improvement}\n`;
      text += `• Executive Dashboards Adopted: ${m.dashboards_built}\n`;
      text += `• Automation Solutions Shipped: ${m.automated_solutions}\n`;
      text += `• Records Handled Daily: ${m.records_processed_daily}\n\n`;
      text += `All numbers represent real production outcomes across DAC Developers and Neuberg Diagnostics.`;

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "metrics",
        richData: m,
        suggestedFollowUps: [
          "Why should I hire him?",
          "What projects drove these metrics?",
          "How do I contact Ragil?",
        ],
        quickActions: [
          { label: "Why Hire Him?", action: "query", value: "Why should I hire Ragil?" },
          { label: "View Projects", action: "query", value: "What projects has he built?" },
          { label: "Contact Ragil", action: "query", value: "How do I contact Ragil?" },
        ],
      };
    }

    case "certification": {
      const certs = certificationsData.certifications;
      const learning = certificationsData.currently_learning;

      let text = `─── CREDENTIALS & INDUSTRY ACCREDITATIONS ───\n\n`;
      text += certs.map((c) => `• ${c.name} — ${c.issuer}\n  ${c.description}`).join("\n\n");
      text += `\n\n─── FORWARD ROADMAP (CURRENTLY LEARNING) ───\n`;
      text += learning.map((l) => `▸ ${l}`).join("\n");

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        suggestedFollowUps: [
          "What are his skills?",
          "Why should I hire him?",
          "Show his projects",
        ],
        quickActions: [
          { label: "View Skills", action: "query", value: "What are his skills?" },
          { label: "Why Hire Him?", action: "query", value: "Why should I hire Ragil?" },
        ],
      };
    }

    case "salary_availability": {
      let text = `─── AVAILABILITY & STATUS ───\n\n`;
      text += `• Current Status: Senior AI Automation Engineer at DAC Developers\n`;
      text += `• Availability: Open to discussions for high-impact AI Engineering, Automation, and Senior Data/BI roles.\n`;
      text += `• Location: ${profileData.location} (Open to Remote, Hybrid, and Relocation for compelling opportunities).\n`;
      text += `• Notice Period / Compensation: Competitive and flexible based on role scope, ownership, and tech stack.\n\n`;
      text += `To initiate a conversation or request compensation details, please reach out directly:`;

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "contact",
        quickActions: contactActions,
        suggestedFollowUps: [
          "How do I contact Ragil?",
          "Why should I hire him?",
          "Show his experience",
        ],
      };
    }

    case "contact": {
      let text = `─── DIRECT CONTACT CHANNELS ───\n\n`;
      text += `✉️  Email: ${profileData.email}\n`;
      text += `💼  LinkedIn: ${profileData.linkedin}\n`;
      text += `📍  Location: ${profileData.location}\n`;
      text += `📄  Resume: Available via direct download on the header/hero\n\n`;
      text += `${profileData.contact_response}`;

      return {
        text,
        intent,
        persona,
        personaBadge: badge,
        richType: "contact",
        quickActions: contactActions,
        suggestedFollowUps: [
          "Why should I hire Ragil?",
          "Show his impact metrics",
          "What projects has he built?",
        ],
      };
    }

    case "location": {
      return {
        text: `📍 Ragil is based in ${profileData.location}.\n\nHe is open to impactful opportunities — including remote positions, hybrid arrangements, and on-site roles for leading tech initiatives.\n\nDirect contact:\n✉️ ${profileData.email}\n💼 ${profileData.linkedin}`,
        intent,
        persona,
        personaBadge: badge,
        suggestedFollowUps: [
          "How do I contact him?",
          "What is his availability?",
          "Why should I hire him?",
        ],
        quickActions: contactActions,
      };
    }

    case "learning": {
      const learning = certificationsData.currently_learning;
      return {
        text: `─── CONTINUOUS UPSKILLING & FUTURE TECH ───\n\nRagil is actively expanding his architectural capabilities in:\n` +
          learning.map((l) => `▸ ${l}`).join("\n") +
          `\n\nFocus areas: Autonomous LLM agents, cloud-native lakehouse architectures (Databricks/Azure), and decision intelligence frameworks.`,
        intent,
        persona,
        personaBadge: badge,
        suggestedFollowUps: [
          "What are his current skills?",
          "Show his AI projects",
          "Why should I hire him?",
        ],
      };
    }

    case "fallback":
    default: {
      return {
        text: `I didn't find an exact match for "${query}" in Ragil's knowledge base.\n\nYou can query:\n▸ "Why should I hire Ragil?" — key differentiators & value\n▸ "What did he do at DAC Developers?" — recent AI automation tenure\n▸ "Show his projects" — 8 enterprise solutions\n▸ "What is his tech stack?" — AI, BI, Python, SQL, Cloud\n▸ "Show impact metrics" — quantitative production results\n▸ "How do I contact him?" — direct channels`,
        intent: "fallback",
        persona,
        personaBadge: badge,
        suggestedFollowUps: [
          "Why should I hire Ragil?",
          "Show all projects",
          "What are his skills?",
          "How do I contact him?",
        ],
        quickActions: [
          { label: "Why Hire Him?", action: "query", value: "Why should I hire Ragil?" },
          { label: "Show Projects", action: "query", value: "What projects has he built?" },
          { label: "Contact Info", action: "query", value: "How do I contact Ragil?" },
        ],
      };
    }
  }
}
