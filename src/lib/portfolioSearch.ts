import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import certificationsData from "@/data/certifications.json";

/* ─── helpers ─────────────────────────────────────────── */

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function score(query: string, targets: string[]): number {
  const qw = words(query);
  let hits = 0;
  for (const t of targets) {
    const tw = words(t || "");
    for (const q of qw) {
      if (tw.some((w) => w.includes(q) || q.includes(w))) {
        hits++;
      }
    }
  }
  return hits;
}

function has(query: string, ...terms: string[]): boolean {
  const q = query.toLowerCase();
  return terms.some((t) => q.includes(t));
}

/* ─── intent detection ────────────────────────────────── */

type Intent =
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
  | "fallback";

function detectIntent(q: string): Intent {
  const query = q.toLowerCase().trim();

  // 1. Greet
  if (has(query, "hi", "hello", "hey", "good morning", "good afternoon", "what can you", "who are you", "help", "commands")) {
    return "greet";
  }

  // 2. Contact
  if (has(query, "contact", "email", "reach", "linkedin", "phone", "get in touch", "call", "write to")) {
    return "contact";
  }

  // 3. Hire
  if (has(query, "hire", "why should", "should i hire", "worth hiring", "good fit", "suit", "recruit", "consider", "stand out", "differentiators")) {
    return "hire";
  }

  // 4. Metrics
  if (has(query, "metric", "number", "stat", "impact", "achievement", "result", "figure", "how many", "percentage", "%", "records")) {
    return "metrics";
  }

  // 5. Location
  if (has(query, "locat", "city", "country", "based", "india", "chennai", "remote", "where")) {
    return "location";
  }

  // 6. Learning / Future
  if (has(query, "learning", "currently", "studying", "future", "plan", "next", "upskill", "roadmap", "explore")) {
    return "learning";
  }

  // 7. Certifications
  if (has(query, "certif", "certificate", "credential", "ibm", "jp morgan", "course", "qualification")) {
    return "certification";
  }

  // 8. Projects All
  if (
    has(query, "all project", "list project", "projects list", "show projects", "what are your projects", "which projects", "portfolio projects", "show all projects") ||
    query === "projects" ||
    query === "project" ||
    query === "list" ||
    query === "work"
  ) {
    return "projects_all";
  }

  // 9. Specific Project matching by keyword/ID
  // Matches "project 1", "3rd project", "nps project", etc.
  if (
    has(query, "cctv", "yolo", "opencv", "computer vision", "camera", "video", "surveillance", "detection",
      "nps", "customer experience", "cx", "survey", "feedback", "promoter", "detractor",
      "sales", "revenue", "regions", "sales rep", "crm", "leaderboard", "executive sales",
      "marketing", "ads", "advertising", "campaign", "call center", "call centre", "ga4", "attribution",
      "attendance", "biometric", "productivity", "hr", "leave", "overtime", "absenteeism",
      "financial", "finance", "p&l", "profit", "cfo", "budget", "board report", "cost center", "erp",
      "healthcare", "diagnostics", "lab", "laboratory", "tat", "sla", "rejection", "turnaround", "neuberg",
      "automation", "vba", "script", "schedule", "reconcile", "orchestr") ||
    /\b(project\s*#?([1-8])|([1-8])(st|nd|rd|th)?\s*project)\b/.test(query)
  ) {
    return "project_specific";
  }

  // 10. Skills
  if (has(query, "skill", "tool", "tech", "stack", "know", "proficien", "expert", "python", "sql", "power bi", "tableau", "excel", "fastapi", "pandas", "numpy", "postgresql", "mysql", "sql server", "databricks", "azure", "pyspark")) {
    return "skill";
  }

  // 11. Experience
  if (has(query, "experience", "career", "job", "role", "neuberg", "background", "history", "employ", "intern", "junior", "analyst")) {
    return "experience";
  }

  // 12. About / Introduction
  if (has(query, "about", "who is", "tell me", "summary", "profile", "introduc", "overview", "ragil")) {
    return "about";
  }

  return "fallback";
}

/* ─── response builders ───────────────────────────────── */

function respondGreet(): string {
  return `Hello! I'm Ragil's portfolio assistant.

I can tell you about:
─── KNOWLEDGE BASE CATEGORIES ───
▸ His professional experience & career at Neuberg Diagnostics
▸ Projects he's built (8 enterprise solutions across BI, AI, and Automation)
▸ Skills & technical expertise (SQL, Python, Power BI, FastAPI, etc.)
▸ Certifications & qualifications (IBM, JP Morgan, etc.)
▸ Impact metrics & business achievements
▸ How to get in touch

Try asking: "Tell me about Ragil", "What projects has he built?", or "Why should I hire him?"`;
}

function respondAbout(): string {
  const p = profileData;
  return `${p.name} is a ${p.title}.

${p.summary}

─── QUICK PROFILE INFO ───
▸ Location: Based in ${p.location}
▸ Email: ${p.email}
▸ LinkedIn: Available on the portfolio site header/footer
▸ Experience: 2 Years at Neuberg Diagnostics (Junior Data Analyst & Data Analyst Intern)

He has worked extensively building production dashboards executives rely on, automating workflows that save hundreds of hours monthly, and developing AI computer vision systems.`;
}

function respondExperience(): string {
  const exps = experienceData.experience;
  const lines: string[] = ["─── PROFESSIONAL EXPERIENCE ───\n"];
  for (const e of exps) {
    lines.push(`▸ ${e.role} · ${e.company}`);
    lines.push(`  ${e.period} · ${e.type}`);
    lines.push(`  ${e.description}\n`);
    lines.push("  Key achievements:");
    for (let i = 0; i < e.achievements.length; i++) {
      lines.push(`  • [${String(i + 1).padStart(2, "0")}] ${e.achievements[i]}`);
    }
    lines.push(`\n  Technologies: ${e.technologies.join(", ")}\n`);
  }
  return lines.join("\n");
}

function respondProjectsAll(): string {
  const projs = projectsData.projects;
  const lines: string[] = [`─── ALL PROJECTS (${projs.length}) ───\n`];
  for (const p of projs) {
    lines.push(`▸ Project #${p.id}: ${p.name}`);
    lines.push(`  Category: ${p.category}`);
    lines.push(`  Tools: ${p.tools.join(", ")}`);
    lines.push(`  Impact: ${p.impact[0]}\n`);
  }
  lines.push('Ask me about any specific project for full details — e.g. "Tell me about the CCTV project" or "project 6"');
  return lines.join("\n");
}

function respondProjectSpecific(query: string): string {
  const projs = projectsData.projects;
  const qLower = query.toLowerCase();

  // Try numeric matching (e.g. "project 3" or "3rd project")
  const idMatch = qLower.match(/\b(project\s*#?([1-8])|([1-8])(st|nd|rd|th)?\s*project)\b/);
  let matchedProject = null;

  if (idMatch) {
    const id = parseInt(idMatch[2] || idMatch[3]);
    matchedProject = projs.find((p) => p.id === id) || null;
  }

  // If not matched by ID, check specific high-priority keywords
  if (!matchedProject) {
    if (has(qLower, "cctv", "yolo", "opencv", "computer vision", "video", "surveillance", "camera")) {
      matchedProject = projs.find((p) => p.id === 3);
    } else if (has(qLower, "nps", "customer experience", "cx", "feedback", "survey")) {
      matchedProject = projs.find((p) => p.id === 2);
    } else if (has(qLower, "sales", "revenue", "regions", "sales rep", "crm")) {
      matchedProject = projs.find((p) => p.id === 1);
    } else if (has(qLower, "marketing", "call center", "call centre", "ga4", "attribution", "ads")) {
      matchedProject = projs.find((p) => p.id === 4);
    } else if (has(qLower, "attendance", "biometric", "productivity", "hr", "leave")) {
      matchedProject = projs.find((p) => p.id === 5);
    } else if (has(qLower, "financial", "finance", "p&l", "profit", "cfo", "budget")) {
      matchedProject = projs.find((p) => p.id === 6);
    } else if (has(qLower, "healthcare", "diagnostics", "lab", "laboratory", "tat", "sla", "clinical")) {
      matchedProject = projs.find((p) => p.id === 7);
    } else if (has(qLower, "automation", "vba", "script", "scheduled", "reconcile")) {
      matchedProject = projs.find((p) => p.id === 8);
    }
  }

  // Fall back to score-based matching
  if (!matchedProject) {
    const scored = projs.map((p) => ({
      p,
      s: score(query, [p.name, p.category, ...p.tools, p.problem, p.solution, ...p.kpis, ...p.stakeholders]),
    }));
    scored.sort((a, b) => b.s - a.s);
    if (scored[0].s >= 1) {
      matchedProject = scored[0].p;
    }
  }

  if (matchedProject) {
    const p = matchedProject;
    return [
      `─── PROJECT DETAIL: ${p.name.toUpperCase()} ───`,
      `▸ Category: ${p.category} (Project #${p.id})`,
      `▸ Technologies: ${p.tools.join(", ")}\n`,
      `Business Problem:`,
      `${p.problem}\n`,
      `Solution Implemented:`,
      `${p.solution}\n`,
      `Key KPIs Monitored: ${p.kpis.join(", ")}\n`,
      `Business Impact:`,
      ...p.impact.map((i) => `✓ ${i}`),
      `\nStakeholders: ${p.stakeholders.join(", ")}`,
    ].join("\n");
  }

  return respondProjectsAll();
}

function respondSkills(): string {
  const cats = skillsData.skills;
  const lines: string[] = ["─── SKILLS & EXPERTISE ───\n"];
  for (const cat of Object.values(cats)) {
    lines.push(`▸ ${cat.label}`);
    for (const t of cat.tools) {
      lines.push(`  • ${t.name} (${t.proficiency}) — ${t.description}`);
    }
    lines.push("");
  }
  lines.push("─── BUSINESS ANALYST CAPABILITIES ───");
  for (const cap of skillsData.business_analyst_capabilities) {
    lines.push(`  • ${cap}`);
  }
  return lines.join("\n");
}

function respondCertifications(): string {
  const certs = certificationsData.certifications;
  const learning = certificationsData.currently_learning;
  return [
    "─── CERTIFICATIONS ───\n",
    ...certs.map((c) => `▸ ${c.name}\n  Issued by: ${c.issuer}\n  Description: ${c.description}\n`),
    "─── CURRENTLY LEARNING ───\n",
    ...learning.map((l) => `▸ ${l}`),
  ].join("\n");
}

function respondContact(): string {
  return `─── CONTACT RAGIL ───

✉️ Email: ${profileData.email}
📞 Phone: ${profileData.phone}
🔗 LinkedIn: ${profileData.linkedin}
📍 Location: ${profileData.location}
📄 Resume: Available for download on the top header or below the contact section.

${profileData.contact_response}

You can also use the contact details at the bottom of the page to message him directly.`;
}

function respondHire(): string {
  const m = profileData.impact_metrics;
  const exps = experienceData.experience;
  return [
    "─── WHY HIRE RAGIL? ───\n",
    "He delivers measurable business impact — not just dashboards:\n",
    `✓ Operational efficiency improved: ${m.efficiency_improvement}`,
    `✓ Recurring report processes automated: ${m.reporting_automation}`,
    `✓ Dashboard refresh queries optimized: ${m.dashboard_refresh_improvement}`,
    `✓ Custom analytics dashboards built & adopted: ${m.dashboards_built}`,
    `✓ Automation solutions running in production: ${m.automated_solutions}`,
    "\nHe has worked across the full data stack:",
    "  Analytics → BI → AI → Automation → Business Analysis",
    "\nKey differentiators:",
    "  • Bridges business requirements and technical execution",
    "  • Has deployed production AI (YOLO CCTV analytics)",
    `  • Delivered results at ${exps[0].company} — a real enterprise environment`,
    "  • Strong stakeholder management — from C-suite to frontline",
    "  • Domain expertise in healthcare, diagnostics & operations",
    `\n📍 Based in ${profileData.location} · Open to new opportunities.`,
  ].join("\n");
}

function respondMetrics(): string {
  const m = profileData.impact_metrics;
  return [
    "─── IMPACT METRICS ───\n",
    `▸ Years of Experience: ${m.years_experience} years`,
    `▸ Efficiency Improvement: ${m.efficiency_improvement}`,
    `▸ Reporting Automation: ${m.reporting_automation}`,
    `▸ Dashboard Refresh Speed-up: ${m.dashboard_refresh_improvement}`,
    `▸ Report Delivery Improvement: ${m.report_delivery_improvement}`,
    `▸ Dashboards Built: ${m.dashboards_built}`,
    `▸ Automation Solutions Deployed: ${m.automated_solutions}`,
    `▸ Records Processed Daily: ${m.records_processed_daily}`,
    "\nAll metrics verified from production analytics projects at Neuberg Diagnostics.",
  ].join("\n");
}

function respondLocation(): string {
  return `📍 Location: Ragil is based in ${profileData.location}.

He is open to both on-site roles in Chennai/India and remote opportunities worldwide.

To discuss details:
✉️ Email: ${profileData.email}
🔗 LinkedIn: ${profileData.linkedin}`;
}

function respondLearning(): string {
  const learning = certificationsData.currently_learning;
  return [
    "─── CURRENTLY LEARNING ───\n",
    "Ragil is actively expanding his skills in future-facing data engineering and AI stack:",
    ...learning.map((l) => `▸ ${l}`),
    "\nHis focus is on cloud infrastructure, distributed systems (Databricks, PySpark), and autonomous AI agent development.",
  ].join("\n");
}

function respondFallback(query: string): string {
  // Check skills match
  const allSkillNames = Object.values(skillsData.skills).flatMap((c) => c.tools.map((t) => t.name.toLowerCase()));
  if (allSkillNames.some((s) => query.toLowerCase().includes(s))) {
    return respondSkills();
  }

  // Check project match
  const projs = projectsData.projects;
  const scored = projs.map((p) => ({
    p,
    s: score(query, [p.name, p.category, ...p.tools]),
  })).sort((a, b) => b.s - a.s);

  if (scored[0].s >= 1) {
    return respondProjectSpecific(query);
  }

  return `I didn't find specific details for "${query}" in my knowledge base database.

You can ask me about:
▸ "Tell me about Ragil" — background introduction
▸ "Show all projects" — details of all 8 enterprise projects
▸ "What are your skills?" — detailed tools and proficiency
▸ "What are your certifications?" — issued credentials
▸ "Why should I hire you?" — metrics and business impact
▸ "How do I contact you?" — direct email, phone, and links`;
}

/* ─── main search function ────────────────────────────── */

export function searchPortfolio(query: string): string {
  const intent = detectIntent(query);

  switch (intent) {
    case "greet":        return respondGreet();
    case "about":        return respondAbout();
    case "experience":   return respondExperience();
    case "projects_all": return respondProjectsAll();
    case "project_specific": return respondProjectSpecific(query);
    case "skill":        return respondSkills();
    case "certification": return respondCertifications();
    case "contact":      return respondContact();
    case "hire":         return respondHire();
    case "metrics":      return respondMetrics();
    case "location":     return respondLocation();
    case "learning":     return respondLearning();
    case "fallback":     return respondFallback(query);
  }
}
