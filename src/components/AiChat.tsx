import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Terminal, 
  User, 
  Cpu, 
  Sparkles, 
  Briefcase, 
  Code2, 
  TrendingUp, 
  Copy, 
  Check, 
  ExternalLink, 
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { 
  searchPortfolio, 
  PersonaType, 
  AiSearchResponse, 
  ChatContext,
  QuickAction 
} from "@/lib/portfolioSearch";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  displayedContent?: string;
  isStreaming?: boolean;
  responsePayload?: AiSearchResponse;
};

const PERSONAS: { id: PersonaType; label: string; icon: any; color: string; desc: string }[] = [
  {
    id: "recruiter",
    label: "RECRUITER TL;DR",
    icon: Briefcase,
    color: "text-amber-400 border-amber-400/40 bg-amber-400/10",
    desc: "Candidate highlights, experience duration, cultural fit & career progression",
  },
  {
    id: "tech",
    label: "TECH LEAD",
    icon: Code2,
    color: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
    desc: "System architectures, multi-agent frameworks, vision pipelines & data models",
  },
  {
    id: "executive",
    label: "EXECUTIVE ROI",
    icon: TrendingUp,
    color: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
    desc: "Measurable business impact, efficiency gains & bottom-line return",
  },
];

export function AiChat({ initialQuery }: { initialQuery?: string }) {
  const [persona, setPersona] = useState<PersonaType>("recruiter");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "RAGIL.OS // NEURAL PORTFOLIO COPILOT INITIALIZED\n\nI run 100% offline with zero latency. I am trained on Ragil's complete career history, multi-agent AI systems, and enterprise data projects.\n\nSelect your lens above (Recruiter, Tech Lead, or Executive) or ask any question below.",
      displayedContent:
        "RAGIL.OS // NEURAL PORTFOLIO COPILOT INITIALIZED\n\nI run 100% offline with zero latency. I am trained on Ragil's complete career history, multi-agent AI systems, and enterprise data projects.\n\nSelect your lens above (Recruiter, Tech Lead, or Executive) or ask any question below.",
      isStreaming: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<string[]>([
    "Why should I hire Ragil?",
    "Show all enterprise projects",
    "What is his tech stack?",
    "What are his impact metrics?",
    "How do I contact Ragil?",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContextRef = useRef<ChatContext>({});
  const { toast } = useToast();

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isTyping]);

  // Handle optional external initial query
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  // Speech synthesis helper
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    // Clean markdown/symbols for speech
    const cleanText = text.replace(/[*_#•▸✓✓]/g, "").slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q || isTyping) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      role: "user",
      content: q,
      displayedContent: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Compute response
    setTimeout(() => {
      const response = searchPortfolio(q, persona, chatContextRef.current);
      chatContextRef.current = {
        lastIntent: response.intent,
      };

      const assistantMsgId = `assistant-${Date.now()}`;
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: response.text,
        displayedContent: "",
        isStreaming: true,
        responsePayload: response,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setFollowUps(response.suggestedFollowUps || []);

      // Stream typewriter text
      let index = 0;
      const fullText = response.text;
      const step = Math.max(1, Math.floor(fullText.length / 30));

      const interval = setInterval(() => {
        index += step;
        if (index >= fullText.length) {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, displayedContent: fullText, isStreaming: false }
                : m
            )
          );
          setIsTyping(false);
          speakText(fullText);
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, displayedContent: fullText.slice(0, index) }
                : m
            )
          );
        }
      }, 15);
    }, 280);
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.action === "query") {
      handleSend(action.value);
    } else if (action.action === "copy") {
      navigator.clipboard.writeText(action.value);
      toast({
        title: "Copied to Clipboard",
        description: action.value,
      });
    } else if (action.action === "link") {
      window.open(action.value, "_blank");
    } else if (action.action === "scroll") {
      const el = document.getElementById(action.value);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Response Copied",
      description: "Copied output to clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "reset",
        role: "assistant",
        content: `RAGIL.OS // TERMINAL FLUSHED\n\nActive Lens: ${persona.toUpperCase()}.\nAsk any question about Ragil's experience, multi-agent AI systems, or enterprise dashboards.`,
        displayedContent: `RAGIL.OS // TERMINAL FLUSHED\n\nActive Lens: ${persona.toUpperCase()}.\nAsk any question about Ragil's experience, multi-agent AI systems, or enterprise dashboards.`,
        isStreaming: false,
      },
    ]);
    chatContextRef.current = {};
    setFollowUps([
      "Why should I hire Ragil?",
      "Show all enterprise projects",
      "What is his tech stack?",
      "How do I contact Ragil?",
    ]);
  };

  return (
    <Card className="flex flex-col h-[650px] border border-cyan-500/30 bg-[#060913]/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl shadow-cyan-950/40">
      {/* ─── Top Telemetry & Controls Bar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-cyan-500/20 bg-cyan-950/20 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-mono font-bold text-xs tracking-wider text-cyan-300">
            RAGIL.OS // NEURAL COPILOT
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            v2.4 LOCAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Output Toggle */}
          <button
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
              toast({
                title: next ? "Voice Output Active" : "Voice Output Muted",
                description: next ? "Audio synthesis enabled." : "Audio muted.",
              });
            }}
            className={cn(
              "p-1.5 rounded text-xs border transition-colors flex items-center gap-1 font-mono text-[10px]",
              voiceEnabled
                ? "border-emerald-500 text-emerald-400 bg-emerald-950/40"
                : "border-slate-800 text-slate-400 hover:text-slate-200"
            )}
            title="Toggle synthetic voice readout"
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{voiceEnabled ? "VOICE ON" : "VOICE OFF"}</span>
          </button>

          {/* Reset Terminal */}
          <button
            onClick={resetChat}
            className="p-1.5 rounded text-xs border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Audience Persona Lens Selector ─── */}
      <div className="px-3 py-2 bg-slate-950/60 border-b border-cyan-500/10 flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest shrink-0 hidden sm:inline">
          AUDIENCE LENS:
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            const isActive = persona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPersona(p.id);
                  toast({
                    title: `Switched to ${p.label}`,
                    description: p.desc,
                  });
                }}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono border transition-all",
                  isActive
                    ? p.color + " font-bold shadow-md shadow-cyan-500/10"
                    : "border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                )}
              >
                <Icon className="w-3 h-3" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Chat Message Stream ─── */}
      <ScrollArea className="flex-1 p-4 min-h-0 bg-[#04060d]">
        <div className="flex flex-col gap-5">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  isUser ? "ml-auto flex-row-reverse max-w-[85%]" : "max-w-[95%]"
                )}
              >
                {/* Avatar Icon */}
                <div className="mt-1 flex-shrink-0">
                  {isUser ? (
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/60 flex items-center justify-center border border-cyan-500/30 text-cyan-400 shadow-sm">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-400/50 text-cyan-300 shadow-sm shadow-cyan-500/20">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <div
                    className={cn(
                      "p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap break-words font-mono relative group",
                      isUser
                        ? "bg-gradient-to-r from-cyan-950/60 to-blue-950/60 text-cyan-100 border border-cyan-500/40 rounded-tr-none shadow-md"
                        : "bg-slate-950/80 text-slate-200 border border-cyan-500/20 rounded-tl-none shadow-lg shadow-black/40"
                    )}
                  >
                    {/* Persona Badge if available */}
                    {!isUser && msg.responsePayload?.personaBadge && (
                      <div className="mb-2 pb-1.5 border-b border-cyan-500/15 flex items-center justify-between text-[10px] text-cyan-400 tracking-wider">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          {msg.responsePayload.personaBadge}
                        </span>
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.content)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-cyan-300 transition-opacity"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Text Content */}
                    <div>
                      {msg.displayedContent || msg.content}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-3 ml-0.5 bg-cyan-400 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>

                  {/* ─── Rich Cards & Widgets ─── */}
                  {!isUser && !msg.isStreaming && msg.responsePayload && (
                    <div className="space-y-3 mt-1">
                      {/* Projects Carousel / Cards */}
                      {msg.responsePayload.richType === "projects" &&
                        Array.isArray(msg.responsePayload.richData) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {msg.responsePayload.richData.slice(0, 4).map((p: any) => (
                              <div
                                key={p.id}
                                className="p-2.5 rounded-lg border border-cyan-500/20 bg-slate-900/60 hover:border-cyan-400 hover:bg-cyan-950/20 transition-all flex flex-col justify-between"
                              >
                                <div>
                                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                                    {p.category}
                                  </span>
                                  <h4 className="text-xs font-bold text-white font-mono mb-1">
                                    {p.name}
                                  </h4>
                                  <p className="text-[11px] text-slate-300 font-sans line-clamp-2 mb-2">
                                    {p.impactHeadline}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                                  <span className="text-[9px] font-mono text-slate-400 truncate max-w-[140px]">
                                    {p.tools.slice(0, 2).join(", ")}
                                  </span>
                                  <button
                                    onClick={() => handleSend(`Tell me about ${p.name}`)}
                                    className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-0.5 shrink-0"
                                  >
                                    Inspect <ArrowRight className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Metrics Grid */}
                      {msg.responsePayload.richType === "metrics" && msg.responsePayload.richData && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                          {[
                            { label: "EFFICIENCY", value: msg.responsePayload.richData.efficiency_improvement, color: "text-emerald-400" },
                            { label: "AUTOMATION", value: msg.responsePayload.richData.reporting_automation, color: "text-cyan-400" },
                            { label: "REFRESH BOOST", value: msg.responsePayload.richData.dashboard_refresh_improvement, color: "text-amber-400" },
                            { label: "DASHBOARDS", value: msg.responsePayload.richData.dashboards_built, color: "text-purple-400" },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/80 text-center"
                            >
                              <div className={cn("text-base font-bold font-mono", item.color)}>
                                {item.value}
                              </div>
                              <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                                {item.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick Action Buttons */}
                      {msg.responsePayload.quickActions && msg.responsePayload.quickActions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.responsePayload.quickActions.map((qa, qIdx) => (
                            <button
                              key={qIdx}
                              onClick={() => handleQuickAction(qa)}
                              className="px-2.5 py-1 rounded text-[11px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors flex items-center gap-1.5"
                            >
                              <span>{qa.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[95%]">
              <div className="mt-1 flex-shrink-0">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-400/50 text-cyan-300 animate-pulse">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 rounded-tl-none flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-[10px] font-mono text-cyan-400/70 ml-1">
                  QUERYING RAGIL.OS ARCHIVES...
                </span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* ─── Dynamic Follow-Up Prompt Chips ─── */}
      <div className="px-4 pt-2.5 pb-2 border-t border-cyan-500/15 bg-slate-950/90 shrink-0">
        <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>SUGGESTED NEXT INQUIRIES:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {followUps.map((item, fIdx) => (
            <button
              key={fIdx}
              onClick={() => handleSend(item)}
              disabled={isTyping}
              className="text-[10px] font-mono px-2 py-1 rounded border border-cyan-500/25 text-cyan-300/80 hover:text-cyan-200 hover:bg-cyan-500/15 hover:border-cyan-400/60 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-left"
            >
              &gt; {item}
            </button>
          ))}
        </div>

        {/* ─── Terminal Input Field ─── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-cyan-400 font-mono text-xs select-none">
              &gt;
            </span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI agents, DAC Developers, DAX, computer vision..."
              className="pl-7 font-mono text-xs bg-slate-900/80 border-cyan-500/30 text-white placeholder:text-slate-500 focus-visible:ring-cyan-400/50 h-9 rounded-lg"
              disabled={isTyping}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={isTyping || !input.trim()}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 font-mono text-xs px-3.5 h-9 shrink-0 rounded-lg shadow-sm shadow-cyan-500/20"
          >
            <Send className="w-3.5 h-3.5 mr-1" />
            EXEC
          </Button>
        </form>
      </div>
    </Card>
  );
}
