import { motion, AnimatePresence } from "framer-motion";

export function KonamiCelebration({ active, onClose }: { active: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-[#121324] border-8 border-[#FFD54A] p-8 max-w-lg w-full text-center shadow-[16px_16px_0_#000] relative animate-pulse"
          >
            <div className="text-6xl mb-4 animate-bounce">👑</div>

            <div className="font-press-start text-xs text-[#4ADE80] mb-2 uppercase">
              ★ SECRET CHEAT CODE UNLOCKED ★
            </div>

            <h2 className="font-press-start text-2xl sm:text-3xl text-[#FFD54A] mb-4 leading-tight drop-shadow-[4px_4px_0_#000]">
              LEVEL UP!
            </h2>

            <div className="font-press-start text-xs text-white mb-6 bg-black border-2 border-white p-3">
              +99,999 EXP GAINED!<br />
              ALL STATS MAXED OUT!<br />
              AUTO-HIRE BUFF ACQUIRED!
            </div>

            <p className="font-vt323 text-2xl text-gray-300 mb-6">
              "You discovered the legendary Konami spell! Ragil's autonomous agents have been supercharged with infinite mana."
            </p>

            <button
              onClick={onClose}
              className="pixel-btn bg-[#FFD54A] text-black font-press-start text-xs px-6 py-3 border-4 border-black"
            >
              [ CLAIM VICTORY ]
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
