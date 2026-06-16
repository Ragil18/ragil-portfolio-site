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
    const tw = words(t);
    for (const q of qw) if (tw.some((w) => w.includes(q) || q.includes(w))) hits++;
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
  if (has(q, "hi", "hello", "hey", "good morning", "good afternoon", "what can you", "who are you", "help")) return "greet";
  if (has(q, "contact", "email", "reach", "linkedin", "phone", "resume", "cv", "get in touch")) return "contact";
  if (has(q, "hire", "why should", "should i hire", "worth hiring", "good fit", "suit", "recruit", "consider", "stand out")) return "hire";
  if (has(q, "metric", "number", "stat", "impact", "achievement", "result", "figure", "how many", "percentage", "%")) return "metrics";
  if (has(q, "locat", "city", "country", "based", "india", "chennai", "remote", "where")) return "location";
  if (has(q, "learning", "currently", "studying", "future", "plan", "next", "upskill", "roadmap")) return "learning";
  if (has(q, "certif", "certificate", "credential", "ibm", "jp morgan", "course", "qualification")) return "certification";
  if (has(q, "skill", "tool", "tech", "stack", "know", "proficien", "expert", "python", "sql", "power bi", "tableau", "excel", "yolo", "opencv", "tensorflow", "databricks", "azure", "pyspark", "fastapi", "pandas", "numpy", "postgresql", "mysql", "sql server")) return "skill";
  if (has(q, "experience", "work", "career", "job", "role", "neuberg", "background", "history", "employ", "intern", "junior", "analyst")) return "experience";
  if (has(q, "project", "built", "build", "dashboard", "platform", "solution", "cctv", "sales", "nps", "customer", "attendance", "financial", "healthcare", "automation", "marketing", "call centre")) return "project_specific";
  if (has(q, "about", "who is", "tell me", "summary", "profile", "introduc", "overview", "ragil")) return "about";
  return "fallback";
}

/* ─── response builders ───────────────────────────────── */

function respondGreet(): string {
  return `Hello! I'm Ragil's portfolio assistant.

I can tell you about:
▸ His professional experience & career
▸ Projects he's built (8 enterprise solutions)
▸ Skills & technical expertise
▸ Certifications & qualifications
▸ Impact metrics & achievements
▸ How to get in touch

Try asking: "Tell me about Ragil", "What projects has he built?", or "Why should I hire him?"`;
}

function respondAbout(): string {
  const p = profileData;
  return `${p.name} is a ${p.title}.

${p.summary}

📍 Based in ${p.location}
✉️ ${p.email}
🔗 LinkedIn available on the portfolio

He has worked exclusively at ${experienceData.experience[0].company} — building dashboards executives rely on, automating processes, and developing AI solutions that change how organizations operate.`;
}

function respondExperience(): string {
  const exps = experienceData.experience;
  const lines: string[] = ["─── PROFESSIONAL EXPERIENCE ───\n"];
  for (const e of exps) {
    lines.push(`▸ ${e.role} · ${e.company}`);
    lines.push(`  ${e.period} · ${e.type}`);
    lines.push(`  ${e.description}\n`);
    lines.push("  Key achievements:");
    for (const a of e.achievements) lines.push(`  • ${a}`);
    lines.push(`\n  Technologies: ${e.technologies.join(", ")}\n`);
  }
  return lines.join("\n");
}

function respondProjectsAll(): string {
  const projs = projectsData.projects;
  const lines: string[] = [`─── ALL PROJECTS (${projs.length}) ───\n`];
  for (const p of projs) {
    lines.push(`${p.id}. ${p.name}`);
    lines.push(`   Category: ${p.category}`);
    lines.push(`   Tools: ${p.tools.join(", ")}`);
    lines.push(`   Impact: ${p.impact[0]}\n`);
  }
  lines.push('Ask me about any specific project for full details — e.g. "Tell me about the CCTV project"');
  return lines.join("\n");
}

function respondProjectSpecific(query: string): string {
  const projs = projectsData.projects;

  // score each project against the query
  const scored = projs.map((p) => ({
    p,
    s: score(query, [p.name, p.category, ...p.tools, p.problem, p.solution, ...p.kpis, ...p.stakeholders]),
  }));

  scored.sort((a, b) => b.s - a.s);
  const best = scored[0];

  // if decent match, return specific project detail
  if (best.s >= 1) {
    const p = best.p;
    return [
      `─── ${p.name.toUpperCase()} ───`,
      `Category: ${p.category}`,
      `Tools: ${p.tools.join(", ")}\n`,
      `Business Problem:\n${p.problem}\n`,
      `Solution:\n${p.solution}\n`,
      `Key KPIs: ${p.kpis.join(", ")}\n`,
      `Business Impact:`,
      ...p.impact.map((i) => `✓ ${i}`),
      `\nStakeholders: ${p.stakeholders.join(", ")}`,
    ].join("\n");
  }

  // otherwise list all
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
  lines.push("▸ Business Analyst Capabilities");
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
    ...certs.map((c) => `▸ ${c.name}\n  Issued by: ${c.issuer}\n  ${c.description}\n`),
    "─── CURRENTLY LEARNING ───\n",
    ...learning.map((l) => `▸ ${l}`),
  ].join("\n");
}

function respondContact(): string {
  return `─── CONTACT RAGIL ───

✉️  Email: ${profileData.email}
🔗  LinkedIn: ${profileData.linkedin}
📍  Location: ${profileData.location}
📄  Resume: Available for download on the portfolio

${profileData.contact_response}

Click "CONTACT ME" or "DOWNLOAD RESUME" in the hero section to connect directly.`;
}

function respondHire(): string {
  const m = profileData.impact_metrics;
  const exps = experienceData.experience;
  return [
    "─── WHY HIRE RAGIL? ───\n",
    "He delivers measurable business impact — not just dashboards:\n",
    `✓ ${m.efficiency_improvement} operational efficiency improvement`,
    `✓ ${m.reporting_automation} of recurring reports automated`,
    `✓ ${m.dashboard_refresh_improvement} faster dashboard refresh times`,
    `✓ ${m.dashboards_built} dashboards built and adopted by executives`,
    `✓ ${m.automated_solutions} automation solutions deployed`,
    "\nHe has worked across the full data stack:",
    "  Analytics → BI → AI → Automation → Business Analysis",
    "\nKey differentiators:",
    "  • Bridges business requirements and technical execution",
    "  • Has deployed production AI (YOLO CCTV analytics)",
    `  • Delivered results at ${exps[0].company} — a real enterprise environment`,
    "  • Strong stakeholder management — from C-suite to frontline",
    "  • Domain expertise in healthcare, diagnostics & operations",
    `\n📍 ${profileData.location} · Open to opportunities`,
    `✉️  ${profileData.email}`,
  ].join("\n");
}

function respondMetrics(): string {
  const m = profileData.impact_metrics;
  return [
    "─── IMPACT METRICS ───\n",
    `▸ Experience: ${m.years_experience} years`,
    `▸ Efficiency improvement: ${m.efficiency_improvement}`,
    `▸ Reporting automation: ${m.reporting_automation}`,
    `▸ Dashboard refresh speed-up: ${m.dashboard_refresh_improvement}`,
    `▸ Report delivery improvement: ${m.report_delivery_improvement}`,
    `▸ Dashboards built: ${m.dashboards_built}`,
    `▸ Automation solutions delivered: ${m.automated_solutions}`,
    `▸ Records processed daily: ${m.records_processed_daily}`,
    "\nAll metrics from real production work at Neuberg Diagnostics.",
  ].join("\n");
}

function respondLocation(): string {
  return `📍 Ragil is based in ${profileData.location}.

He is open to opportunities — both local and remote. 

To discuss a role or collaboration:
✉️  ${profileData.email}
🔗  ${profileData.linkedin}`;
}

function respondLearning(): string {
  const learning = certificationsData.currently_learning;
  return [
    "─── CURRENTLY LEARNING ───\n",
    "Ragil is actively expanding his expertise in:\n",
    ...learning.map((l) => `▸ ${l}`),
    "\nThis reflects his focus on the future of data: cloud engineering, AI agents, and decision intelligence frameworks.",
  ].join("\n");
}

function respondFallback(query: string): string {
  // try project match as last resort
  const projs = projectsData.projects;
  const scored = projs.map((p) => ({
    p,
    s: score(query, [p.name, p.category, ...p.tools]),
  })).sort((a, b) => b.s - a.s);

  if (scored[0].s >= 1) return respondProjectSpecific(query);

  // try skill match
  const allSkillNames = Object.values(skillsData.skills).flatMap((c) => c.tools.map((t) => t.name.toLowerCase()));
  if (allSkillNames.some((s) => query.toLowerCase().includes(s))) return respondSkills();

  return `I didn't find specific information about "${query}" in Ragil's portfolio.

You can ask me about:
▸ "Tell me about Ragil" — overview & summary
▸ "What's his experience?" — work history
▸ "Show all projects" — all 8 enterprise projects
▸ "What are his skills?" — full tech stack
▸ "Certifications?" — credentials
▸ "Why should I hire him?" — key differentiators
▸ "How do I contact Ragil?" — contact details`;
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
