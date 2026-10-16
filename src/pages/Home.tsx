import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { GlobeScene } from "@/components/GlobeScene";
import { SkillsOrbit } from "@/components/SkillsOrbit";
import { AiChat } from "@/components/AiChat";
import { FloatingAiCopilot } from "@/components/FloatingAiCopilot";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Activity, Code, Database, BrainCircuit, Download, Mail, Linkedin, Check, Copy, Briefcase, Calendar } from "lucide-react";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { RoleTailoredView } from "@/components/RoleTailoredView";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { RoiCalculator } from "@/components/RoiCalculator";
import experienceData from "@/data/experience.json";
import { getDynamicExperience } from "@/lib/experience";

const RESUME_URL = "/resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/ragil-immanuvel-p-d-a88533200/";
const EMAIL = "ragilimmanuvel@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Opportunity%20for%20Ragil%20Immanuvel&body=Hi%20Ragil%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.%0A%0ABest%20Regards%2C`;

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

function AnimatedSection({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function MetricCounter({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) {
  // A simple counter effect could be added here, but for now we just show the static value with animation
  return (
    <motion.div variants={fadeUp} className="p-6 border border-primary/20 bg-background/50 backdrop-blur-sm rounded-xl text-center hover:border-primary/50 transition-colors">
      <div className="text-4xl font-mono font-bold text-primary mb-2">
        {value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}


function useMailClick() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMailClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Try to open mail client (works on deployed site / real browsers)
    try {
      (window.top ?? window).location.href = MAILTO;
    } catch {
      // iframe may block — fall through to clipboard
    }
    // Always copy email to clipboard as a reliable fallback
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return { copied, handleMailClick };
}

export default function Home() {
  const { copied: emailCopied, handleMailClick } = useMailClick();
  const expStats = getDynamicExperience();
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <GlobeScene />
        
        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-primary">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="font-mono text-xs sm:text-sm tracking-widest truncate">SYSTEM_INITIALIZED // RAGIL.OS</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 sm:mb-6 leading-tight break-words">
              DATA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">INTELLIGENCE</span><br />
              COMMAND CENTER
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl font-light">
              Ragil Immanuvel. Senior AI Automation Engineer · Data Analyst · BI & AI Solutions Builder.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button size="lg" className="font-mono tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto justify-center" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
                EXPLORE MY WORK <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href={RESUME_URL} download="Ragil_Immanuvel_Resume.pdf" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="font-mono tracking-wider border-primary/30 hover:bg-primary/10 w-full justify-center">
                  <Download className="w-4 h-4 mr-2" /> DOWNLOAD RESUME
                </Button>
              </a>
              <Button size="lg" variant="outline" className="font-mono tracking-wider border-primary/20 hover:bg-primary/5 w-full sm:w-auto min-w-[160px] justify-center" onClick={handleMailClick}>
                {emailCopied ? <><Check className="w-4 h-4 mr-2 text-emerald-400" /><span className="text-emerald-400">EMAIL COPIED!</span></> : <><Mail className="w-4 h-4 mr-2" /> CONTACT ME</>}
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating KPIs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute right-6 top-1/4 hidden lg:flex flex-col gap-4"
          >
            {[
              { label: "Experience", value: expStats.yearsBadge },
              { label: "Efficiency", value: "+25%" },
              { label: "Dashboards", value: "15+" }
            ].map((kpi, i) => (
              <div key={i} className="bg-background/80 backdrop-blur-md border border-primary/20 p-4 rounded-lg flex flex-col items-end">
                <span className="text-xs font-mono text-muted-foreground uppercase">{kpi.label}</span>
                <span className="text-xl font-bold text-primary font-mono">{kpi.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ROLE TAILORED RECRUITER VIEW */}
      <section className="py-8 sm:py-12 border-b border-border/40 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6">
          <RoleTailoredView />
        </div>
      </section>

      {/* ABOUT TIMELINE */}
      <AnimatedSection id="about" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-16">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4 flex items-center gap-3">
              <Activity className="text-primary" /> THE STORY BEHIND THE DATA
            </h2>
            <div className="w-20 h-1 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Engineering Foundation", desc: "Started with a strong engineering background, learning complex problem-solving and systems thinking." },
              { title: "Healthcare Analytics", desc: "Applied data skills at Neuberg Diagnostics, uncovering operational bottlenecks and optimizing processes." },
              { title: "Business Intelligence", desc: "Built 15+ dashboards, translating raw datasets into actionable executive insights." },
              { title: "Automation Focus", desc: "Automated manual reporting, achieving 80% reduction in reporting time and 50% faster refreshes." },
              { title: "AI Solutions", desc: "Pioneered AI implementations including YOLO-based CCTV analytics for attendance and productivity." },
              { title: "Senior AI Automation", desc: "Leading enterprise AI at DAC Developers, deploying multi-agent workflows, computer vision, and autonomous systems." }
            ].map((node, i) => (
              <motion.div key={i} variants={fadeUp} className="p-6 border-l-2 border-primary/30 relative pl-8 hover:border-primary transition-colors">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-7" />
                <h3 className="text-xl font-bold mb-2">{node.title}</h3>
                <p className="text-muted-foreground text-sm">{node.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* IMPACT METRICS */}
      <AnimatedSection id="impact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCounter value={25} suffix="%" label="Efficiency Up" />
            <MetricCounter value={80} suffix="%" label="Reporting Auto" />
            <MetricCounter value={50} suffix="%" label="Faster Refresh" />
            <MetricCounter value={15} suffix="+" label="Dashboards" />
            <MetricCounter value={10} suffix="+" label="Auto Solutions" />
            <MetricCounter value={100} suffix="k+" label="Daily Records" />
          </div>
        </div>
      </AnimatedSection>

      {/* PROJECTS */}
      <AnimatedSection id="projects" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4 flex items-center gap-3">
              <Code className="text-primary" /> PROJECTS <span className="text-primary/60 text-2xl">(8)</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-4" />
            <p className="text-muted-foreground text-sm max-w-xl">
              Enterprise case studies across analytics, BI, AI, and automation. Click any project to explore the full engagement.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ProjectExplorer />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* SKILLS CONSTELLATION */}
      <AnimatedSection id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4 flex items-center gap-3">
              <Database className="text-primary" /> SKILLS CONSTELLATION
            </h2>
            <div className="w-20 h-1 bg-primary" />
          </motion.div>
          
          <motion.div variants={fadeUp} className="border border-border/50 rounded-2xl overflow-hidden bg-black/50">
            <SkillsOrbit />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ENTERPRISE PIPELINE ARCHITECTURE */}
      <AnimatedSection id="architecture" className="py-24 border-t border-border/50">
        <div className="container mx-auto px-6">
          <ArchitectureExplorer />
        </div>
      </AnimatedSection>

      {/* EXPERIENCE TIMELINE */}
      <AnimatedSection id="experience" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-14">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4 flex items-center gap-3">
              <Briefcase className="text-primary" /> WORK EXPERIENCE
            </h2>
            <div className="w-20 h-1 bg-primary mb-4" />
            <p className="text-muted-foreground text-sm max-w-2xl">
              Enterprise engineering journey spanning AI automation systems, operational analytics, and business intelligence.
            </p>
          </motion.div>

          <div className="relative border-l border-primary/25 ml-3 md:ml-6 space-y-10 pl-6 md:pl-10">
            {experienceData.experience.map((exp, idx) => {
              const isCurrent = exp.period.toLowerCase().includes("present");
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="relative group"
                >
                  {/* Timeline node marker */}
                  <div
                    className={`absolute -left-[31px] md:-left-[47px] top-2 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                      isCurrent
                        ? "bg-emerald-400 border-background shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                        : "bg-primary border-background"
                    }`}
                  />

                  <div className="p-6 md:p-8 rounded-2xl border border-primary/20 bg-background/60 backdrop-blur-md hover:border-primary/50 transition-all duration-300 shadow-xl">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-2xl font-bold text-foreground font-mono tracking-tight">{exp.role}</h3>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              CURRENT ROLE
                            </span>
                          )}
                        </div>
                        <div className="text-primary font-mono font-medium text-base mt-1 flex items-center gap-2">
                          <span>{exp.company}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span className="text-muted-foreground text-xs font-sans tracking-wide">{exp.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground px-3 py-1.5 rounded-lg bg-card/60 border border-border/50">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                      {exp.description}
                    </p>

                    <div className="mb-6 space-y-2.5">
                      <div className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">
                        Key Impact & Achievements:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {exp.achievements.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-foreground/90 leading-normal">
                            <span className="text-primary font-mono text-xs leading-none mt-1">▸</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono rounded bg-primary/10 border border-primary/20 text-primary hover:border-primary/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* AI CHAT & EXPLORING */}
      <AnimatedSection id="ai" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={fadeUp}>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
                    <BrainCircuit className="text-primary" /> ASK RAGIL.AI
                  </h2>
                  <span className="font-mono text-xs text-primary/70 border border-primary/30 px-2.5 py-1 rounded bg-primary/5">
                    NEURAL COPILOT // 100% OFFLINE
                  </span>
                </div>
                <div className="w-20 h-1 bg-primary mb-6" />
                <p className="text-muted-foreground mb-6 text-sm">
                  Experience my background interactively. Switch between <strong className="text-amber-400">Recruiter</strong>, <strong className="text-cyan-400">Tech Lead</strong>, and <strong className="text-emerald-400">Executive</strong> lenses, query multi-agent systems, or summon anytime using <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs border border-border">Ctrl + K</kbd>.
                </p>
                <AiChat />
              </motion.div>
            </div>

            <div className="lg:col-span-5 space-y-12">
              <motion.div variants={fadeUp}>
                <h2 className="text-3xl font-bold font-mono tracking-tight mb-4">INNOVATION LAB</h2>
                <div className="w-20 h-1 bg-primary mb-8" />
                <div className="space-y-6">
                  {[
                    { label: "Azure Data Engineering", progress: 85 },
                    { label: "AI Agents & LLM Applications", progress: 70 },
                    { label: "Decision Intelligence", progress: 60 },
                    { label: "Databricks Advanced", progress: 75 }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-mono mb-2">
                        <span>{item.label}</span>
                        <span className="text-primary">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-16">
                <h2 className="text-3xl font-bold font-mono tracking-tight mb-4">BUSINESS MEETS TECH</h2>
                <div className="w-20 h-1 bg-primary mb-8" />
                <div className="flex flex-wrap gap-3">
                  {["Stakeholder Management", "Requirement Gathering", "Process Mapping", "Root Cause Analysis", "KPI Design", "UAT Testing", "SOP Documentation"].map(skill => (
                    <span key={skill} className="px-4 py-2 border border-primary/20 bg-background/50 rounded-lg text-sm font-medium hover:border-primary/60 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </AnimatedSection>

      {/* AUTOMATION ROI CALCULATOR */}
      <AnimatedSection id="roi" className="py-20 bg-card/20 border-t border-border/40">
        <div className="container mx-auto px-6">
          <RoiCalculator />
        </div>
      </AnimatedSection>

      {/* HIRE ME CTA */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.07) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <motion.div variants={fadeUp} className="inline-block font-mono text-xs tracking-[0.3em] text-primary mb-6 px-4 py-2 border border-primary/30 rounded-full">
            OPEN TO OPPORTUNITIES
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Looking for someone who can turn<br />
            <span className="text-primary">data into business impact?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-10">
            Interested in analytics, business intelligence, automation, or AI-driven solutions? Let's connect.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="font-mono font-bold tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 px-10 min-w-[200px]" onClick={handleMailClick}>
              {emailCopied ? <><Check className="w-4 h-4 mr-2" /> EMAIL COPIED!</> : <>LET'S TALK <Mail className="w-4 h-4 ml-2" /></>}
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CONTACT */}
      <AnimatedSection id="contact" className="py-20 bg-card/30 border-t border-border/50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4">LET'S BUILD SOMETHING DATA-DRIVEN</h2>
            <p className="text-muted-foreground">Interested in analytics, business intelligence, automation, or AI-driven solutions? Let's connect.</p>
            <div className="w-20 h-1 bg-primary mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            {/* Email */}
            <motion.div
              variants={fadeUp}
              onClick={handleMailClick}
              className="group flex flex-col gap-3 p-6 rounded-xl border border-border/50 hover:border-primary/50 bg-card/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {emailCopied ? <Check className="w-5 h-5 text-emerald-400" /> : <Mail className="w-5 h-5 text-primary" />}
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground tracking-widest mb-1">EMAIL</div>
                <div className="font-mono text-sm text-primary break-all">
                  {emailCopied ? <span className="text-emerald-400">Copied to clipboard!</span> : EMAIL}
                </div>
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.a
              variants={fadeUp}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-6 rounded-xl border border-border/50 hover:border-primary/50 bg-card/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground tracking-widest mb-1">LINKEDIN</div>
                <div className="font-mono text-sm text-primary">Connect on LinkedIn</div>
              </div>
            </motion.a>

            {/* Resume */}
            <motion.a
              variants={fadeUp}
              href={RESUME_URL}
              download="Ragil_Immanuvel_Resume.pdf"
              className="group flex flex-col gap-3 p-6 rounded-xl border border-border/50 hover:border-primary/50 bg-card/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground tracking-widest mb-1">RESUME</div>
                <div className="font-mono text-sm text-primary">Download PDF</div>
              </div>
            </motion.a>
          </div>
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/50 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-mono font-bold text-xl text-primary mb-1">RAGIL<span className="text-foreground">.OS</span></div>
              <div className="text-sm text-muted-foreground max-w-xs">
                Senior AI Automation Engineer · Data Analyst · BI & AI Solutions Builder
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <button
                onClick={handleMailClick}
                className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {emailCopied ? <><Check className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400">Copied!</span></> : <><Mail className="w-4 h-4" /> Email</>}
              </button>
              <a
                href={RESUME_URL}
                download="Ragil_Immanuvel_Resume.pdf"
                className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>

            <div className="text-center md:text-right">
              <div className="font-mono text-xs text-muted-foreground">
                © {new Date().getFullYear()} Ragil Immanuvel
              </div>
              <div className="font-mono text-xs text-muted-foreground/50 mt-1">
                RAGIL.OS SYSTEM v1.0.0
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Floating AI Copilot (Ctrl + K) */}
      <FloatingAiCopilot />
    </div>
  );
}
