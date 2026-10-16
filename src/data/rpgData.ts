/**
 * RPG CHARACTER SHEET DATA FOR RAGIL IMMANUVEL
 * Single source of truth for the Retro RPG portfolio theme.
 * Edit all character stats, quests, log checkpoints, and achievements here.
 */

export interface RpgSkill {
  name: string;
  level: number; // 1 - 10
  grade: string; // e.g. "Lv. 9 — Master"
  description: string;
}

export interface RpgSkillCategory {
  id: string;
  categoryName: string;
  icon: string;
  color: string;
  skills: RpgSkill[];
}

export interface RpgQuest {
  id: number;
  title: string;
  rank: "S-RANK" | "A-RANK" | "B-RANK";
  status: "COMPLETED" | "IN PROGRESS";
  category: "AI & Automation" | "BI & Analytics" | "Data Engineering";
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  lootRewards: string;
  impactMetrics: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface RpgCheckpoint {
  id: string;
  realm: string;
  role: string;
  period: string;
  status: "CURRENT GUILD" | "CONQUERED";
  location: string;
  summary: string;
  achievements: string[];
  inventory: string[];
}

export interface RpgAchievement {
  id: string;
  title: string;
  issuer: string;
  icon: string;
  rarity: "LEGENDARY" | "EPIC" | "RARE";
  description: string;
  flavorText: string;
}

export const RPG_DATA = {
  character: {
    name: "RAGIL IMMANUVEL",
    classTitle: "SENIOR AI AUTOMATION ENGINEER",
    secondaryClass: "DATA ALCHEMIST & BI WIZARD",
    guild: "DAC Developers",
    realm: "Chennai, Tamil Nadu, India",
    level: 26,
    hp: { current: 100, max: 100, label: "OPERATIONAL UPTIME" },
    mp: { current: 98, max: 100, label: "AI AUTOMATION MANA" },
    xp: { current: 2850, max: 3000, label: "EXP TO NEXT RANK" },
    gold: "99,999G",
    typewriterTaglines: [
      "Bridges raw data, AI agents, and executive decisions.",
      "Architects autonomous workflows that save hundreds of hours.",
      "Deploys computer vision & LLMs to solve real enterprise problems.",
      "Turns complex metrics into gold-standard BI dashboards.",
    ],
    bio: "A seasoned level-26 AI Automation Engineer and Data Wizard. Currently stationed at DAC Developers, deploying multi-agent autonomous workflows and computer vision systems. Formerly conquered 15+ enterprise dashboards and automated 80% of reporting pipelines at Neuberg Diagnostics.",
    stats: {
      str: { val: 92, label: "STR (Data Volume Handling)" },
      int: { val: 98, label: "INT (AI & Machine Learning)" },
      dex: { val: 94, label: "DEX (Rapid Prototyping)" },
      wis: { val: 96, label: "WIS (Business Intelligence)" },
      cha: { val: 90, label: "CHA (Stakeholder Management)" },
    },
  },

  skillCategories: [
    {
      id: "languages",
      categoryName: "SACRED RUNES (LANGUAGES)",
      icon: "📜",
      color: "#FFD54A",
      skills: [
        { name: "Python", level: 9, grade: "Lv. 9 — Master", description: "Pandas, NumPy, automation scripts & ML engineering" },
        { name: "SQL (T-SQL, PGSQL)", level: 10, grade: "Lv. 10 — Grandmaster", description: "Complex joins, window functions, CTEs & tuning" },
        { name: "DAX & Power Query", level: 9, grade: "Lv. 9 — Master", description: "Advanced data modeling and calculated star-schemas" },
        { name: "TypeScript / JS", level: 8, grade: "Lv. 8 — Expert", description: "Web UI, modern full-stack integrations & API tools" },
      ],
    },
    {
      id: "ai_automation",
      categoryName: "AI & AUTOMATION SPELLBOOK",
      icon: "⚡",
      color: "#38BDF8",
      skills: [
        { name: "Autonomous AI Agents", level: 9, grade: "Lv. 9 — Master", description: "Multi-agent orchestration, LLM tool-calling & workflows" },
        { name: "Computer Vision & YOLO", level: 9, grade: "Lv. 9 — Master", description: "YOLOv8, RTSP stream processing & edge inference" },
        { name: "OpenCV", level: 8, grade: "Lv. 8 — Expert", description: "Multi-zone tracking, bounding box and frame logic" },
        { name: "FastAPI & AI APIs", level: 9, grade: "Lv. 9 — Master", description: "High-throughput asynchronous inference services" },
        { name: "TensorFlow & ML", level: 7, grade: "Lv. 7 — Adept", description: "Deep learning models and predictive analytics" },
      ],
    },
    {
      id: "bi_cloud",
      categoryName: "CRYSTAL BALLS & CLOUD REALMS",
      icon: "🔮",
      color: "#4ADE80",
      skills: [
        { name: "Power BI Premium", level: 10, grade: "Lv. 10 — Grandmaster", description: "15+ production dashboards, row-level security & service" },
        { name: "Tableau", level: 8, grade: "Lv. 8 — Expert", description: "Executive visualizations and interactive segment drills" },
        { name: "Azure Synapse & Cloud", level: 8, grade: "Lv. 8 — Expert", description: "Enterprise ETL pipelines, Blob storage and monitoring" },
        { name: "Databricks & PySpark", level: 8, grade: "Lv. 8 — Expert", description: "Large-scale distributed data processing" },
        { name: "PostgreSQL & SQL Server", level: 9, grade: "Lv. 9 — Master", description: "High-volume transactional and analytics data marts" },
      ],
    },
    {
      id: "consulting",
      categoryName: "LEADERSHIP & TACTICAL TRAITS",
      icon: "🛡️",
      color: "#F43F5E",
      skills: [
        { name: "Stakeholder Alignment", level: 9, grade: "Lv. 9 — Master", description: "Translating C-suite vision into technical execution" },
        { name: "KPI & Metric Architecture", level: 10, grade: "Lv. 10 — Grandmaster", description: "Designing metrics that drive tangible bottom-line ROI" },
        { name: "Process Optimization (SOP)", level: 9, grade: "Lv. 9 — Master", description: "Eliminating manual toil; 80% reporting automation" },
        { name: "Root Cause Diagnosis", level: 9, grade: "Lv. 9 — Master", description: "Deep-dive diagnostic analytics to resolve bottlenecks" },
      ],
    },
  ] as RpgSkillCategory[],

  quests: [
    {
      id: 1,
      title: "AI-Powered CCTV Analytics",
      rank: "S-RANK",
      status: "COMPLETED",
      category: "AI & Automation",
      summary: "Deployed real-time edge computer vision (YOLOv8 + OpenCV) across CCTV streams to automate tracking across 500+ personnel.",
      problem: "Manual attendance and facility monitoring took 4+ hours daily and suffered from chronic inaccuracy.",
      solution: "Engineered edge YOLOv8 vision pipeline on RTSP video feeds with OpenCV zone logic and streaming Power BI heatmaps.",
      techStack: ["YOLOv8", "OpenCV", "Python", "FastAPI", "Power BI", "RTSP"],
      lootRewards: "+950 XP · 600G · Vision Helm of True Sight",
      impactMetrics: ["95% detection accuracy", "500+ employees tracked", "100% manual toil eliminated"],
    },
    {
      id: 2,
      title: "Executive Sales Performance Command",
      rank: "S-RANK",
      status: "COMPLETED",
      category: "BI & Analytics",
      summary: "Unified 12 regional sales divisions into a single source of truth with real-time drill-through and automated refresh.",
      problem: "Executive leadership waited 3 days every week for manual spreadsheets that arrived stale.",
      solution: "Engineered Azure Synapse star-schema data warehouse feeding a high-performance Power BI dashboard with 15-minute scheduled refresh.",
      techStack: ["Power BI", "SQL Server", "DAX", "Azure Synapse"],
      lootRewards: "+850 XP · 500G · Crown of Insights",
      impactMetrics: ["Reporting time cut from 3 days to real-time", "25% operational efficiency boost", "12 regions unified"],
    },
    {
      id: 3,
      title: "Autonomous Multi-Agent Process Suite",
      rank: "S-RANK",
      status: "IN PROGRESS",
      category: "AI & Automation",
      summary: "Engineering autonomous LLM agent pipelines at DAC Developers to automate cross-departmental operations and intelligence retrieval.",
      problem: "Cross-team handoffs and document verification created operational latency.",
      solution: "Architecting multi-agent tool-calling workflows integrating with enterprise data APIs and automated decision guardrails.",
      techStack: ["Python", "AI Agents", "LLMs", "FastAPI", "Cloud APIs"],
      lootRewards: "+1,200 XP · 1,000G · Orb of Autonomous Dominion",
      impactMetrics: ["Autonomous workflow execution", "Near-instant document parsing", "Direct C-suite pipeline"],
    },
    {
      id: 4,
      title: "Customer Experience & NPS Engine",
      rank: "A-RANK",
      status: "COMPLETED",
      category: "BI & Analytics",
      summary: "Real-time NLP sentiment platform processing customer surveys with automated detractor alerting within 15 minutes.",
      problem: "Customer feedback was fragmented across silos; unhappy customers went unaddressed for 72+ hours.",
      solution: "Built Python ETL + spaCy NLP pipeline feeding PostgreSQL and Tableau with automated Power Automate alert triggers.",
      techStack: ["Python", "spaCy NLP", "Tableau", "PostgreSQL", "Power Automate"],
      lootRewards: "+700 XP · 400G · Ring of Empathy",
      impactMetrics: ["NPS improved +12 points in 6 months", "Follow-up time slashed from 72h to <15 min", "80% root causes tagged"],
    },
    {
      id: 5,
      title: "Healthcare Operations Intelligence",
      rank: "A-RANK",
      status: "COMPLETED",
      category: "BI & Analytics",
      summary: "Diagnostics lab operations console tracking sample turnaround times and equipment throughput across regional facilities.",
      problem: "Lab leaders lacked visibility into testing bottlenecks, causing test turnaround delays.",
      solution: "Modeled thousands of daily diagnostic records in SQL Server and built drill-down operational Power BI consoles.",
      techStack: ["SQL Server", "Power BI", "ETL Pipelines", "Healthcare Analytics"],
      lootRewards: "+750 XP · 450G · Elixir of Vitality",
      impactMetrics: ["50% faster dashboard refreshes", "Thousands of daily records processed", "35% faster report delivery"],
    },
    {
      id: 6,
      title: "Digital Marketing & Call Centre Sync",
      rank: "A-RANK",
      status: "COMPLETED",
      category: "BI & Analytics",
      summary: "Connected ad spend to downstream customer support resolution quality, eliminating campaign-to-service blindspots.",
      problem: "Marketing spend and call center resolution lived in completely separate silos.",
      solution: "Integrated Google Analytics APIs and telephony logs into SQL data models with unified attribution dashboards.",
      techStack: ["Power BI", "Python", "Google Analytics API", "SQL"],
      lootRewards: "+650 XP · 350G · Boots of Quick Dispatch",
      impactMetrics: ["30% better ROI visibility", "+15% call resolution rate", "$120K annual waste identified"],
    },
    {
      id: 7,
      title: "Attendance & Productivity Analytics",
      rank: "A-RANK",
      status: "COMPLETED",
      category: "Data Engineering",
      summary: "Consolidated biometric logs and department shift schedules into predictive workforce allocation dashboards.",
      problem: "Biometric and shift systems were disconnected, leading to chronic understaffing during peak shifts.",
      solution: "Built automated Python cleaning pipelines and Power BI shifts heatmaps showing occupancy bottlenecks.",
      techStack: ["Python", "SQL", "Power BI", "Pandas"],
      lootRewards: "+600 XP · 300G · Hourglass of Diligence",
      impactMetrics: ["Automated daily rollups", "Identified 25% scheduling gap", "Zero manual admin collations"],
    },
    {
      id: 8,
      title: "Executive Financial & P&L Platform",
      rank: "S-RANK",
      status: "COMPLETED",
      category: "BI & Analytics",
      summary: "Comprehensive P&L and cash-flow monitoring console with variance modeling against quarterly targets.",
      problem: "Finance leaders relied on month-end manual books, discovering budget variances too late to pivot.",
      solution: "Built dynamic DAX financial models calculating gross margins, EBITDA, and run-rates with scenario bookmarks.",
      techStack: ["Power BI", "Advanced DAX", "SQL Server", "Excel Financials"],
      lootRewards: "+800 XP · 500G · Tome of Endless Treasure",
      impactMetrics: ["Real-time P&L visibility", "Zero end-of-month manual reconciliation delay", "Variance alerts"],
    },
  ] as RpgQuest[],

  adventureLog: [
    {
      id: "dac-realm",
      realm: "DAC DEVELOPERS",
      role: "Senior AI Automation Engineer",
      period: "Jul 2026 – Present · Full-Time",
      status: "CURRENT GUILD",
      location: "Chennai, India",
      summary: "Stationed at the forefront of enterprise automation. Engineering autonomous multi-agent workflows, computer vision, and high-ROI operational intelligence systems.",
      achievements: [
        "Architecting autonomous multi-agent workflows across core business units",
        "Deploying computer vision and document intelligence to eliminate operational bottlenecks",
        "Constructing executive command consoles for real-time portfolio intelligence",
        "Standardizing internal AI engineering stacks and LLM-driven tooling",
      ],
      inventory: ["AI Agents", "Python", "FastAPI", "OpenCV", "LLMs", "Cloud Architecture"],
    },
    {
      id: "neuberg-jr",
      realm: "NEUBERG DIAGNOSTICS",
      role: "Junior Data Analyst",
      period: "Dec 2024 – Apr 2026 · Full-Time",
      status: "CONQUERED",
      location: "Chennai, India",
      summary: "Delivered 15+ production BI dashboards, optimized data models for 50% faster refreshes, and automated 80% of reporting operations.",
      achievements: [
        "Shipped 15+ Power BI and Tableau dashboards for executive leadership",
        "Reduced dashboard refresh latency by 50% through DAX and star-schema optimization",
        "Automated 80% of recurring operational reports, reclaiming hundreds of analyst hours",
        "Pioneered AI-powered CCTV analytics with YOLO and OpenCV for facility monitoring",
        "Processed thousands of diagnostic records daily via automated ETL workflows",
      ],
      inventory: ["Power BI", "SQL Server", "YOLOv8", "OpenCV", "FastAPI", "PostgreSQL"],
    },
    {
      id: "neuberg-intern",
      realm: "NEUBERG DIAGNOSTICS",
      role: "Data Analyst Intern",
      period: "May 2024 – Nov 2024 · Internship",
      status: "CONQUERED",
      location: "Chennai, India",
      summary: "Initiated analytical questline in enterprise healthcare diagnostics — built foundational dashboards, wrote complex queries, and spearheaded reporting audits.",
      achievements: [
        "Constructed first operational throughput dashboards for lab managers",
        "Uncovered root causes behind reporting inefficiencies, discovering 25% efficiency gains",
        "Drafted standard operating procedure (SOP) documentation for data workflows",
      ],
      inventory: ["SQL", "Excel", "Python", "Tableau", "ETL"],
    },
  ] as RpgCheckpoint[],

  achievements: [
    {
      id: "ibm-methodology",
      title: "Data Science Methodology",
      issuer: "IBM",
      icon: "🏆",
      rarity: "LEGENDARY",
      description: "Mastery of structured CRISP-DM methodology, analytical workflows, and hypothesis testing.",
      flavorText: "Unlocks +15 WIS when architecting data project roadmaps.",
    },
    {
      id: "ibm-sql",
      title: "SQL & Relational Databases",
      issuer: "IBM",
      icon: "💾",
      rarity: "EPIC",
      description: "Advanced relational schema design, query optimization, and complex data modeling.",
      flavorText: "Guarantees 0ms lag when interrogating massive database realms.",
    },
    {
      id: "ibm-python",
      title: "Python for Data Science",
      issuer: "IBM",
      icon: "🐍",
      rarity: "EPIC",
      description: "Python data structures, Pandas, NumPy, and statistical computing.",
      flavorText: "Enchants Python scripts with +20% execution speed.",
    },
    {
      id: "jpmorgan-excel",
      title: "Excel Skills Simulation",
      issuer: "JP Morgan Chase",
      icon: "📊",
      rarity: "LEGENDARY",
      description: "Enterprise financial modelling and advanced simulation under real investment banking conditions.",
      flavorText: "Grants immunity to corrupted spreadsheets.",
    },
    {
      id: "cloud-essentials",
      title: "Cloud Computing Essentials",
      issuer: "Cloud Academy",
      icon: "☁️",
      rarity: "RARE",
      description: "Cloud service architectures (IaaS, PaaS, SaaS) and scalable deployment patterns.",
      flavorText: "Enables cloud summoning in high-traffic sieges.",
    },
    {
      id: "iso-risk",
      title: "ISO 31000 Risk Management",
      issuer: "ISO",
      icon: "🛡️",
      rarity: "RARE",
      description: "Enterprise risk assessment frameworks, mitigation strategies, and governance standards.",
      flavorText: "Provides +50 Armor against system failures and data breaches.",
    },
  ] as RpgAchievement[],

  contact: {
    dialogPrompt: "A wild RECRUITER or FOUNDER appeared! Will you recruit Ragil to your party?",
    email: "ragilimmanuvel@gmail.com",
    linkedin: "https://www.linkedin.com/in/ragil-immanuvel-p-d-a88533200/",
    resumeUrl: "/resume.pdf",
    mailtoSubject: "Quest Offer for Ragil Immanuvel",
    mailtoBody: "Greetings Ragil,\n\nI inspected your character sheet and would like to discuss an opportunity.\n\nBest Regards,",
  },
};
