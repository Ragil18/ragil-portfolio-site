import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight, Terminal, Award } from "lucide-react";
import experienceData from "@/data/experience.json";

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
  })
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

export function ExperienceTimeline() {
  const { experience } = experienceData;

  return (
    <div className="relative">
      {/* Console prompt decorative header */}
      <div className="mb-10 font-mono text-xs text-muted-foreground/60 border border-border/30 bg-black/35 rounded-lg p-4 max-w-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 font-semibold text-primary/75">SYSTEM_QUERY // LOG_READER</span>
        </div>
        <div className="text-muted-foreground">
          <span className="text-primary">admin@RAGIL.OS</span>:<span className="text-cyan-400">~</span>$ cat /var/log/experience_history.db
          <br />
          <span className="text-emerald-400">Executing database fetch... Found {experience.length} records.</span>
        </div>
      </div>

      <div className="relative pl-6 md:pl-8 border-l border-primary/20 space-y-12">
        {/* Animated vertical track line cover with primary glow */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
        />

        {experience.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative group"
          >
            {/* Timeline node dot indicator */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border border-primary/40 group-hover:border-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-300 animate-pulse" />
            </div>

            {/* Main experience card */}
            <div className="p-6 border border-border/40 bg-card/30 group-hover:bg-card/50 hover:border-primary/40 rounded-xl transition-all duration-300 shadow-sm relative overflow-hidden">
              {/* Subtle top primary highlight bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Title Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {item.role}
                    </h3>
                  </div>
                  <div className="font-mono text-sm text-cyan-400 font-medium">
                    {item.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Period badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary/40 border border-border/30 text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </div>
                  {/* Job type badge */}
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Achievements console list */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-1.5 text-xs font-mono text-primary/80 uppercase tracking-widest mb-3">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>KEY_ACHIEVEMENTS_LOG</span>
                </div>
                <ul className="space-y-2 font-mono text-xs text-muted-foreground leading-relaxed">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 group/item hover:text-foreground transition-colors duration-250">
                      <span className="text-primary font-bold shrink-0">
                        [{String(idx + 1).padStart(2, "0")}]
                      </span>
                      <span className="text-left">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tag Cloud */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/20">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground border border-border/35 hover:border-primary/30 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
