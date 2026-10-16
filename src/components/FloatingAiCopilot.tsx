import { useState, useEffect } from "react";
import { Sparkles, Terminal, X, Command } from "lucide-react";
import { AiChat } from "./AiChat";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingAiCopilot() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* ─── Floating Corner HUD Trigger Button ─── */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-[#050a18]/90 border border-cyan-400/50 text-cyan-300 font-mono text-xs shadow-xl shadow-cyan-500/20 backdrop-blur-md group hover:border-cyan-300 hover:shadow-cyan-400/30 transition-all cursor-pointer"
        aria-label="Open Ask Ragil AI Copilot"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="font-bold tracking-wider text-[11px] sm:text-xs">ASK RAGIL.AI</span>
        <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
          <Command className="w-2.5 h-2.5" />K
        </span>
      </motion.button>

      {/* ─── Modal Overlay Copilot Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl z-10"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 right-0 flex items-center gap-1 text-slate-400 hover:text-white font-mono text-xs transition-colors"
              >
                <span>CLOSE [ESC]</span>
                <X className="w-4 h-4" />
              </button>

              {/* AiChat Instance inside Modal */}
              <div className="shadow-2xl shadow-cyan-900/60 rounded-xl overflow-hidden border border-cyan-500/40">
                <AiChat />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
