import { useState } from "react";
import { RPG_DATA, RpgQuest } from "@/data/rpgData";
import { playBlip, playQuestChime } from "@/lib/rpgSound";
import { motion, AnimatePresence } from "framer-motion";

export function RpgQuestLog() {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedQuest, setSelectedQuest] = useState<RpgQuest | null>(null);

  const categories = ["ALL", "AI & Automation", "BI & Analytics", "Data Engineering"];

  const filteredQuests = filter === "ALL"
    ? RPG_DATA.quests
    : RPG_DATA.quests.filter((q) => q.category === filter);

  const openQuestModal = (quest: RpgQuest) => {
    playQuestChime();
    setSelectedQuest(quest);
  };

  return (
    <section id="quests" className="py-20 px-4 max-w-6xl mx-auto font-vt323 select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="font-press-start text-xs text-[#FFD54A] uppercase tracking-widest mb-2">
          [ CHAPTER III : EXPEDITIONS & VICTORIES ]
        </div>
        <h2 className="font-press-start text-2xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
          QUEST LOG
        </h2>
        <div className="w-24 h-1 bg-[#38BDF8] mx-auto mt-4 shadow-[0_2px_0_#000]" />
        <p className="font-vt323 text-2xl text-gray-400 max-w-xl mx-auto mt-3">
          Completed campaigns across enterprise AI workflows, vision systems, and business intelligence.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isSelected = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                playBlip(650, 0.05);
                setFilter(cat);
              }}
              className={`pixel-btn px-4 py-2 font-press-start text-[10px] sm:text-xs transition-colors ${
                isSelected
                  ? "bg-[#38BDF8] text-black border-4 border-black font-black shadow-[4px_4px_0_#000]"
                  : "bg-[#181930] text-gray-300 border-2 border-gray-700 hover:text-white hover:border-gray-500"
              }`}
            >
              [{cat.toUpperCase()}]
            </button>
          );
        })}
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            onMouseEnter={() => playBlip(800, 0.03)}
            className="bg-[#121324] border-4 border-white p-5 sm:p-6 shadow-[6px_6px_0_#000] flex flex-col justify-between hover:border-[#FFD54A] transition-all group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`font-press-start text-[9px] px-2 py-1 border-2 border-black ${
                    quest.rank === "S-RANK"
                      ? "bg-[#FFD54A] text-black"
                      : "bg-[#4ADE80] text-black"
                  }`}
                >
                  ★ {quest.rank}
                </span>

                <span
                  className={`font-press-start text-[8px] px-2 py-0.5 border border-black ${
                    quest.status === "COMPLETED"
                      ? "bg-[#22c55e]/20 text-[#4ADE80] border-[#4ADE80]"
                      : "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b] animate-pulse"
                  }`}
                >
                  {quest.status}
                </span>
              </div>

              {/* Quest Title */}
              <h3 className="font-press-start text-sm sm:text-base text-white group-hover:text-[#FFD54A] transition-colors leading-snug mb-2">
                {quest.title}
              </h3>

              {/* Summary */}
              <p className="font-vt323 text-xl text-gray-300 leading-normal mb-4">
                {quest.summary}
              </p>

              {/* Loot Rewards Banner */}
              <div className="bg-black/80 border border-dashed border-[#FFD54A]/60 px-3 py-1.5 mb-4 text-base text-[#FFD54A] flex items-center gap-2">
                <span>🎁 REWARD:</span>
                <span className="text-gray-200">{quest.lootRewards}</span>
              </div>

              {/* Tech Stack Inventory Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {quest.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#1f2038] text-gray-300 text-base px-2 py-0.5 border border-gray-700"
                  >
                    📦 {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t-2 border-gray-800 flex items-center justify-between gap-2">
              <button
                onClick={() => openQuestModal(quest)}
                className="pixel-btn bg-[#FFD54A] text-black font-press-start text-[10px] px-4 py-2 hover:bg-[#FDE047] active:translate-y-1 w-full text-center"
              >
                📜 VIEW QUEST DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quest Details Modal Dialog */}
      <AnimatePresence>
        {selectedQuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f1020] border-4 border-white p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0_#000] relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedQuest(null)}
                className="absolute top-4 right-4 pixel-btn bg-[#F43F5E] text-white font-press-start text-xs px-2.5 py-1.5"
              >
                ✕ CLOSE
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-2 font-press-start text-[10px] text-[#FFD54A]">
                <span>{selectedQuest.rank} QUEST ARCHIVE</span>
                <span>·</span>
                <span className="text-[#4ADE80]">{selectedQuest.status}</span>
              </div>

              <h2 className="font-press-start text-lg sm:text-xl text-white mb-4 pr-16 leading-tight">
                {selectedQuest.title}
              </h2>

              <div className="space-y-4 font-vt323 text-xl sm:text-2xl text-gray-300">
                {/* Problem */}
                <div className="bg-black/60 border border-gray-700 p-3">
                  <div className="font-press-start text-[9px] text-[#F43F5E] mb-1">
                    ⚠️ THE ENCOUNTER (PROBLEM):
                  </div>
                  <div>{selectedQuest.problem}</div>
                </div>

                {/* Solution */}
                <div className="bg-black/60 border border-gray-700 p-3">
                  <div className="font-press-start text-[9px] text-[#4ADE80] mb-1">
                    🛡️ TACTICAL EXECUTION (SOLUTION):
                  </div>
                  <div>{selectedQuest.solution}</div>
                </div>

                {/* Impact */}
                <div className="bg-black/60 border border-gray-700 p-3">
                  <div className="font-press-start text-[9px] text-[#FFD54A] mb-1">
                    ⚡ VICTORIES & MEASURABLE IMPACT:
                  </div>
                  <ul className="space-y-1">
                    {selectedQuest.impactMetrics.map((metric, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#FFD54A]">
                        <span>✓</span>
                        <span className="text-gray-200">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Loot */}
                <div className="bg-black/60 border border-dashed border-[#38BDF8] p-3 text-base text-[#38BDF8]">
                  <div className="font-press-start text-[9px] mb-1">LOOT & TROPHIES:</div>
                  <div>{selectedQuest.lootRewards}</div>
                </div>
              </div>

              {/* Close Button Bottom */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setSelectedQuest(null)}
                  className="pixel-btn bg-[#FFD54A] text-black font-press-start text-xs px-6 py-3"
                >
                  [ RETURN TO QUEST BOARD ]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
