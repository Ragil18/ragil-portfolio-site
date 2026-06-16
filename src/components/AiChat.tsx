import { useState, useEffect, useRef } from "react";
import { Send, Terminal, User, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { searchPortfolio } from "@/lib/portfolioSearch";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Tell me about Ragil",
  "What projects has he built?",
  "Why should I hire him?",
  "What are his skills?",
  "How do I contact Ragil?",
  "Show his impact metrics",
];

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

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "ml-auto flex-row-reverse max-w-[80%]" : "max-w-[92%]")}>
      <div className="mt-1 flex-shrink-0">
        {isUser ? (
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center border border-primary/20">
            <User className="w-3.5 h-3.5 text-foreground" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
            <Cpu className="w-3.5 h-3.5 text-primary" />
          </div>
        )}
      </div>
      <div
        className={cn(
          "p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap break-words",
          isUser
            ? "bg-secondary text-secondary-foreground rounded-tr-none"
            : "bg-primary/10 text-foreground border border-primary/20 font-mono text-xs rounded-tl-none"
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

export function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "RAGIL_OS // PORTFOLIO TERMINAL READY\n\nI'm Ragil's portfolio assistant. I run entirely offline — no API keys needed.\n\nAsk me about his experience, projects, skills, certifications, impact metrics, or how to get in touch.",
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
  }, [messages]);

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
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setIsTyping(false);
    }, 320);
  };

  const handleSuggestion = (s: string) => {
    if (isTyping) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: s };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      const answer = searchPortfolio(s);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setIsTyping(false);
    }, 320);
  };

  return (
    <Card className="flex flex-col h-[600px] border-primary/20 bg-background/50 backdrop-blur-md rounded-xl overflow-hidden shadow-xl shadow-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-primary/20 bg-primary/5 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-mono font-bold text-xs tracking-wider text-primary">RAGIL_OS // PORTFOLIO TERMINAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-widest">OFFLINE · LIVE</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 min-h-0">
        <div className="flex flex-col gap-4">
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

      {/* Suggestions */}
      <div className="px-4 pt-3 pb-2 border-t border-primary/10 shrink-0">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              disabled={isTyping}
              className="text-[10px] font-mono px-2 py-1 rounded border border-primary/25 text-primary/60 hover:text-primary hover:bg-primary/10 hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &gt; {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about experience, projects, skills..."
            className="font-mono text-xs bg-background/50 border-primary/30 focus-visible:ring-primary/50 h-9"
            disabled={isTyping}
          />
          <Button
            type="submit"
            size="sm"
            disabled={isTyping || !input.trim()}
            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-mono text-xs px-3 h-9 shrink-0"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            EXEC
          </Button>
        </form>
      </div>
    </Card>
  );
}
