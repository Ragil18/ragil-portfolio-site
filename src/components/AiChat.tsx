import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, User, Cpu, Check, ArrowRight, ExternalLink, Calendar, Database, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { searchPortfolio } from "@/lib/portfolioSearch";

type ChatMessage = { role: "user" | "assistant"; content: string; animate?: boolean };

const SUGGESTIONS = [
  "Tell me about Ragil",
  "What projects has he built?",
  "Why should I hire him?",
  "What are his skills?",
  "How do I contact Ragil?",
  "Show his impact metrics",
];

const HIGHLIGHT_TECH = [
  "Python", "SQL", "Power BI", "Tableau", "Excel", "FastAPI", "Pandas", "NumPy", 
  "TensorFlow", "YOLO", "OpenCV", "PostgreSQL", "MySQL", "SQL Server", "Databricks", 
  "Azure", "PySpark", "VBA", "RTSP", "DAX", "Synapse", "ERP", "GA4", "GA", "Tableau Server",
  "Power Automate", "Spacy", "NLP", "Delta Lake", "OpenCV"
];

/* ─── Response Parser & Formatter ──────────────────────── */

function highlightKeywords(text: string) {
  if (!text) return "";
  
  // Build regex to match technologies as whole words
  const pattern = new RegExp(`\\b(${HIGHLIGHT_TECH.join("|")})\\b`, "gi");
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    const isTech = HIGHLIGHT_TECH.some(tech => tech.toLowerCase() === part.toLowerCase());
    if (isTech) {
      return (
        <span 
          key={index} 
          className="px-1.5 py-0.5 font-mono font-bold text-[10px] text-primary bg-primary/10 border border-primary/20 rounded mx-0.5 hover:bg-primary/20 transition-colors"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

function formatLineContent(line: string) {
  // If it contains an email
  if (line.includes("ragilimmanuvel@gmail.com")) {
    const emailPart = "ragilimmanuvel@gmail.com";
    const parts = line.split(emailPart);
    return (
      <>
        {highlightKeywords(parts[0])}
        <a href={`mailto:${emailPart}`} className="text-cyan-400 hover:underline font-bold font-mono">{emailPart}</a>
        {highlightKeywords(parts[1])}
      </>
    );
  }
  // If it contains a URL
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (urlRegex.test(line)) {
    const parts = line.split(urlRegex);
    return (
      <>
        {parts.map((part, idx) => {
          if (part.match(urlRegex)) {
            return (
              <a 
                key={idx} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:underline font-bold font-mono inline-flex items-center gap-0.5 break-all"
              >
                {part} <ExternalLink className="w-2.5 h-2.5" />
              </a>
            );
          }
          return highlightKeywords(part);
        })}
      </>
    );
  }
  return highlightKeywords(line);
}

function ResponseFormatter({ content, animate = false }: { content: string; animate?: boolean }) {
  const lines = content.split("\n");
  
  const parsedLines = lines.map((line, index) => {
    const trimmed = line.trim();
    
    // Empty line
    if (!trimmed) {
      return <div key={index} className="h-2" />;
    }
    
    // Header Line: ─── HEADER ───
    if (trimmed.startsWith("───") && trimmed.endsWith("───")) {
      const headerText = trimmed.replace(/───/g, "").trim();
      return (
        <div key={index} className="text-primary font-bold border-b border-primary/20 pb-1 mt-4 mb-2 text-xs tracking-wider uppercase flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{headerText}</span>
        </div>
      );
    }
    
    // Primary list items: ▸ Item
    if (trimmed.startsWith("▸")) {
      const itemContent = line.replace(/^\s*▸/, "").trim();
      return (
        <div key={index} className="text-cyan-400 font-semibold mt-2.5 mb-1 flex items-start gap-2">
          <span className="text-primary mt-0.5 font-bold shrink-0">▸</span>
          <span className="text-sm">{formatLineContent(itemContent)}</span>
        </div>
      );
    }
    
    // Checkmark success items: ✓ Item
    if (trimmed.startsWith("✓")) {
      const itemContent = line.replace(/^\s*✓/, "").trim();
      return (
        <div key={index} className="text-emerald-400 flex items-start gap-2 pl-4 text-xs font-mono">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{formatLineContent(itemContent)}</span>
        </div>
      );
    }
    
    // Standard bullet items: • Item
    if (trimmed.startsWith("•")) {
      // Check for sub bullet lists like • [01] Achievement
      const itemContent = line.replace(/^\s*•/, "").trim();
      if (itemContent.startsWith("[") && itemContent.includes("]")) {
        const bracketEndIndex = itemContent.indexOf("]");
        const numberLabel = itemContent.substring(0, bracketEndIndex + 1);
        const actualText = itemContent.substring(bracketEndIndex + 1).trim();
        return (
          <div key={index} className="flex items-start gap-2 pl-6 text-xs font-mono text-muted-foreground leading-relaxed">
            <span className="text-primary shrink-0 font-bold">{numberLabel}</span>
            <span>{formatLineContent(actualText)}</span>
          </div>
        );
      }
      return (
        <div key={index} className="text-muted-foreground flex items-start gap-2 pl-4 text-xs font-mono">
          <span className="text-cyan-400 font-bold shrink-0">•</span>
          <span>{formatLineContent(itemContent)}</span>
        </div>
      );
    }

    // Standard indent line (could be description details)
    if (line.startsWith("  ")) {
      return (
        <div key={index} className="text-xs font-mono text-muted-foreground/80 pl-4 leading-relaxed">
          {formatLineContent(trimmed)}
        </div>
      );
    }
    
    // Standard normal line
    return (
      <div key={index} className="text-xs font-mono text-foreground/90 leading-relaxed">
        {formatLineContent(line)}
      </div>
    );
  });

  if (!animate) {
    return <div className="space-y-1.5">{parsedLines}</div>;
  }

  // Animation config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 3 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-1.5"
    >
      {parsedLines.map((line, idx) => (
        <motion.div key={idx} variants={lineVariants}>
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Typing Animation Helper ──────────────────────────── */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

/* ─── Chat Message Bubble ─────────────────────────────── */

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "ml-auto flex-row-reverse max-w-[80%]" : "max-w-[95%]")}>
      <div className="mt-1 flex-shrink-0">
        {isUser ? (
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center border border-primary/20">
            <User className="w-3.5 h-3.5 text-foreground" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
            <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
          </div>
        )}
      </div>
      <div
        className={cn(
          "p-3.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words border",
          isUser
            ? "bg-secondary/70 text-secondary-foreground rounded-tr-none border-border/50 shadow-md"
            : "bg-primary/5 text-foreground border-primary/20 rounded-tl-none shadow-lg shadow-primary/[0.01]"
        )}
      >
        {isUser ? (
          <div className="font-mono text-xs text-foreground/90">{msg.content}</div>
        ) : (
          <ResponseFormatter content={msg.content} animate={msg.animate} />
        )}
      </div>
    </div>
  );
}

/* ─── Chat Component ──────────────────────────────────── */

export function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "RAGIL_OS // PORTFOLIO TERMINAL READY\n\nI'm Ragil's portfolio assistant. I run entirely offline — no API keys needed.\n\nAsk me about his experience, projects, skills, certifications, impact metrics, or how to get in touch.",
      animate: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate a brief processing delay for a natural feel
    setTimeout(() => {
      const answer = searchPortfolio(query);
      setMessages((prev) => [...prev, { role: "assistant", content: answer, animate: true }]);
      setIsTyping(false);
    }, 450);
  };

  const handleSuggestion = (s: string) => {
    if (isTyping) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: s };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      const answer = searchPortfolio(s);
      setMessages((prev) => [...prev, { role: "assistant", content: answer, animate: true }]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <Card className="flex flex-col h-[650px] border-primary/20 bg-background/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl shadow-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-primary/20 bg-primary/5 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary animate-pulse" />
          <span className="font-mono font-bold text-xs tracking-wider text-primary">RAGIL_OS // PORTFOLIO TERMINAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-widest">OFFLINE · LIVE</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 min-h-0 bg-black/10">
        <div className="flex flex-col gap-5">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-[92%]">
              <div className="mt-1 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 rounded-tl-none">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Suggestions & Input */}
      <div className="px-4 pt-3 pb-3 border-t border-primary/15 shrink-0 bg-background/80">
        {/* Suggestion header prompt */}
        <div className="flex items-center gap-1.5 mb-2 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-primary" />
          <span>SUGGESTED_QUERIES</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              disabled={isTyping}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-primary/25 text-primary/70 hover:text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &gt; {s}
            </button>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 font-mono text-xs text-primary/70 pointer-events-none">&gt;</span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience, projects, skills, metrics..."
              className="font-mono text-xs bg-background/40 border-primary/30 focus-visible:ring-primary/50 pl-7 h-10 rounded-lg placeholder:text-muted-foreground/45"
              disabled={isTyping}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={isTyping || !input.trim()}
            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-mono text-xs px-4 h-10 rounded-lg shrink-0 transition-colors"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            EXEC
          </Button>
        </form>
      </div>
    </Card>
  );
}
