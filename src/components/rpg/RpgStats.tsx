import { useState } from "react";
import { RPG_DATA, RpgSkill } from "@/data/rpgData";
import { playBlip } from "@/lib/rpgSound";
import { motion } from "framer-motion";

export function RpgStats() {
  const [activeTab, setActiveTab] = useState(RPG_DATA.skillCategories[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<RpgSkill | null>(null);

  const currentCategory = RPG_DATA.skillCategories.find((c) => c.id === activeTab) || RPG_DATA.skillCategories[0];

  return (
    <section id="stats" className="py-20 px-4 max-w-6xl mx-auto font-vt323 select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="font-press-start text-xs text-[#FFD54A] uppercase tracking-widest mb-2">
          [ CHAPTER II : SKILL TREE & SPELLBOOK ]
        </div>
        <h2 className="font-press-start text-2xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
          STATS & SKILLS
        </h2>
        <div className="w-24 h-1 bg-[#4ADE80] mx-auto mt-4 shadow-[0_2px_0_#000]" />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {RPG_DATA.skillCategories.map((cat) => {
          const isSelected = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playBlip(700, 0.05);
                setActiveTab(cat.id);
              }}
              className={`pixel-btn px-4 py-3 font-press-start text-[10px] sm:text-xs transition-colors flex items-center gap-2 ${
                isSelected
                  ? "bg-[#FFD54A] text-black border-4 border-black font-black shadow-[4px_4px_0_#000]"
                  : "bg-[#181930] text-gray-300 border-2 border-gray-700 hover:text-white hover:border-gray-500"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.categoryName}</span>
            </button>
          );
        })}
      </div>

      {/* Main Stats Card */}
      <div className="bg-[#121324] border-4 border-white p-6 sm:p-8 shadow-[8px_8px_0_#000]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Skills Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="font-press-start text-xs text-[#38BDF8] mb-4 flex items-center justify-between border-b-2 border-gray-700 pb-2">
              <span>SKILL / RUNIC MASTERY</span>
              <span>PROFICIENCY LEVEL</span>
            </div>

            {currentCategory.skills.map((skill, index) => {
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => {
                    playBlip(700 + index * 40, 0.04);
                    setHoveredSkill(skill);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group p-3 bg-black/60 border-2 border-gray-800 hover:border-[#FFD54A] transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="font-press-start text-xs sm:text-sm text-white group-hover:text-[#FFD54A] transition-colors">
                      {skill.name}
                    </div>
                    <div className="font-press-start text-[10px] sm:text-xs" style={{ color: currentCategory.color }}>
                      {skill.grade}
                    </div>
                  </div>

                  {/* 10-Segment Pixel Bar */}
                  <div className="grid grid-cols-10 gap-1 sm:gap-1.5 h-4 bg-gray-950 p-1 border border-gray-700">
                    {Array.from({ length: 10 }).map((_, blockIdx) => {
                      const isFilled = blockIdx < skill.level;
                      return (
                        <motion.div
                          key={blockIdx}
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          transition={{ duration: 0.2, delay: blockIdx * 0.04 }}
                          className={`h-full border border-black ${
                            isFilled
                              ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                              : "bg-gray-900 opacity-20"
                          }`}
                          style={{
                            backgroundColor: isFilled ? currentCategory.color : undefined,
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="font-vt323 text-lg text-gray-400 mt-1.5 group-hover:text-gray-200">
                    {skill.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spellbook Details / Info Column */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-black/70 border-2 border-dashed border-[#FFD54A] p-5">
            <div>
              <div className="font-press-start text-[10px] text-[#FFD54A] mb-3">
                &gt;&gt; SKILL INSPECTOR
              </div>

              {hoveredSkill ? (
                <div className="space-y-3">
                  <div className="font-press-start text-sm text-white">
                    {hoveredSkill.name}
                  </div>
                  <div className="font-press-start text-[10px] text-[#4ADE80]">
                    STATUS: {hoveredSkill.grade}
                  </div>
                  <div className="font-vt323 text-2xl text-gray-300 leading-normal border-t border-gray-700 pt-2">
                    "{hoveredSkill.description}"
                  </div>
                  <div className="font-vt323 text-lg text-[#38BDF8]">
                    MANA COST: 0 (PASSIVE ABILITY)
                  </div>
                </div>
              ) : (
                <div className="font-vt323 text-2xl text-gray-500 italic">
                  Hover over any skill to inspect tactical spellcraft, level rank, and production applications.
                </div>
              )}
            </div>

            {/* Quick Lore Box */}
            <div className="border-t border-gray-800 pt-4 mt-6">
              <div className="font-press-start text-[9px] text-[#4ADE80] mb-1">
                COMBAT TIP:
              </div>
              <div className="font-vt323 text-lg text-gray-400">
                Level 9 and 10 masteries indicate production battle-readiness in live enterprise architectures.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
