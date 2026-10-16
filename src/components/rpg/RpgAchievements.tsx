import { useState } from "react";
import { RPG_DATA, RpgAchievement } from "@/data/rpgData";
import { playQuestChime, playBlip } from "@/lib/rpgSound";
import { motion, AnimatePresence } from "framer-motion";

export function RpgAchievements() {
  const [unlockedNotice, setUnlockedNotice] = useState<string | null>(null);

  const handleBadgeClick = (ach: RpgAchievement) => {
    playQuestChime();
    setUnlockedNotice(ach.title);
    setTimeout(() => setUnlockedNotice(null), 3000);
  };

  return (
    <section id="achievements" className="py-20 px-4 max-w-6xl mx-auto font-vt323 select-none relative">
      {/* Toast Notification: Achievement Unlocked */}
      <AnimatePresence>
        {unlockedNotice && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#FFD54A] border-4 border-black px-6 py-3 shadow-[6px_6px_0_#000] flex items-center gap-3"
          >
            <span className="text-2xl animate-bounce">🏆</span>
            <div>
              <div className="font-press-start text-[9px] text-black">
                ACHIEVEMENT UNLOCKED!
              </div>
              <div className="font-press-start text-xs text-black font-bold">
                {unlockedNotice}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="font-press-start text-xs text-[#FFD54A] uppercase tracking-widest mb-2">
          [ CHAPTER V : TROPHY ROOM & RELICS ]
        </div>
        <h2 className="font-press-start text-2xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
          ACHIEVEMENTS & CERTIFICATIONS
        </h2>
        <div className="w-24 h-1 bg-[#FFD54A] mx-auto mt-4 shadow-[0_2px_0_#000]" />
        <p className="font-vt323 text-2xl text-gray-400 max-w-xl mx-auto mt-3">
          Verified industry credentials bestowed by legendary institutions.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {RPG_DATA.achievements.map((ach) => {
          return (
            <motion.div
              key={ach.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleBadgeClick(ach)}
              onMouseEnter={() => playBlip(750, 0.04)}
              className="bg-[#121324] border-4 border-white p-6 shadow-[6px_6px_0_#000] flex flex-col justify-between hover:border-[#FFD54A] transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Icon + Rarity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-black border-2 border-[#FFD54A] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-[2px_2px_0_#000]">
                    {ach.icon}
                  </div>
                  <span
                    className={`font-press-start text-[8px] px-2 py-1 border border-black ${
                      ach.rarity === "LEGENDARY"
                        ? "bg-[#FFD54A] text-black"
                        : ach.rarity === "EPIC"
                        ? "bg-[#c084fc] text-black"
                        : "bg-[#38BDF8] text-black"
                    }`}
                  >
                    ★ {ach.rarity}
                  </span>
                </div>

                {/* Issuer */}
                <div className="font-press-start text-[9px] text-[#4ADE80] mb-1">
                  ISSUER: {ach.issuer}
                </div>

                {/* Title */}
                <h3 className="font-press-start text-xs sm:text-sm text-white group-hover:text-[#FFD54A] transition-colors mb-2 leading-snug">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="font-vt323 text-xl text-gray-300 leading-normal mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Flavor Lore Text */}
              <div className="bg-black/60 border border-dashed border-gray-700 p-2.5 text-base text-gray-400 font-vt323 italic">
                "{ach.flavorText}"
              </div>

              {/* Inspect hint */}
              <div className="mt-4 pt-2 border-t border-gray-800 text-center font-press-start text-[8px] text-gray-500 group-hover:text-[#FFD54A]">
                [ CLICK TO EQUIP / INSPECT ]
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
