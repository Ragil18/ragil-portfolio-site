import { RPG_DATA } from "@/data/rpgData";
import { getDynamicExperience } from "@/lib/experience";
import { playBlip } from "@/lib/rpgSound";
import { motion } from "framer-motion";

export function RpgProfile() {
  const dynamicExp = getDynamicExperience();

  return (
    <section id="profile" className="py-20 px-4 max-w-6xl mx-auto font-vt323 select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="font-press-start text-xs text-[#FFD54A] uppercase tracking-widest mb-2">
          [ CHAPTER I : THE HERO'S LEDGER ]
        </div>
        <h2 className="font-press-start text-2xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
          CHARACTER PROFILE
        </h2>
        <div className="w-24 h-1 bg-[#FFD54A] mx-auto mt-4 shadow-[0_2px_0_#000]" />
      </div>

      {/* Main Character Sheet Card */}
      <div className="bg-[#121324] border-4 border-white p-6 sm:p-8 shadow-[8px_8px_0_#000] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pixel Avatar & Quick Status */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Pixel Avatar Frame */}
            <div className="relative p-2 bg-black border-4 border-[#FFD54A] shadow-[4px_4px_0_#000] mb-4">
              <div className="w-48 h-48 bg-[#1f2038] border-2 border-dashed border-[#FFD54A]/60 flex flex-col items-center justify-center relative overflow-hidden">
                {/* 8-bit Pixel Avatar Representation */}
                <div className="text-6xl animate-pixel-float mb-2">🧙‍♂️</div>
                <div className="font-press-start text-[9px] text-[#FFD54A] text-center px-2">
                  AI WIZARD
                </div>
                <div className="font-vt323 text-base text-[#4ADE80]">
                  LV.{RPG_DATA.character.level}
                </div>
                {/* Pixel Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 animate-bounce" />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#4ADE80] text-black font-press-start text-[8px] px-2 py-1 border border-black shadow-[2px_2px_0_#000] whitespace-nowrap">
                ● ACTIVE PARTY MEMBER
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="w-full bg-black/60 border-2 border-gray-700 p-3 mt-4 text-base space-y-1">
              <div className="flex justify-between text-gray-300">
                <span>REALM:</span>
                <span className="text-white text-right">{RPG_DATA.character.realm}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>CURRENT GUILD:</span>
                <span className="text-[#FFD54A] text-right font-bold">{RPG_DATA.character.guild}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>TOTAL EXP:</span>
                <span className="text-[#4ADE80] text-right">{dynamicExp.fullLabel}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>INVENTORY GOLD:</span>
                <span className="text-[#FFD54A] text-right">{RPG_DATA.character.gold}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Vitals (HP/MP/XP), and RPG Attributes */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Header info */}
            <div>
              <div className="font-press-start text-xs text-[#38BDF8] mb-1">
                {RPG_DATA.character.secondaryClass}
              </div>
              <h3 className="font-press-start text-2xl sm:text-3xl text-[#FFD54A] drop-shadow-[2px_2px_0_#000]">
                {RPG_DATA.character.name}
              </h3>
              <div className="font-vt323 text-2xl text-gray-300 mt-1">
                Class: <span className="text-white font-bold">{RPG_DATA.character.classTitle}</span>
              </div>
            </div>

            {/* Vitals Bars: HP, MP, XP */}
            <div className="space-y-3 bg-black/70 border-2 border-white p-4">
              {/* HP Bar */}
              <div>
                <div className="flex justify-between font-press-start text-[10px] text-white mb-1">
                  <span className="text-[#4ADE80]">HP (OPERATIONAL UPTIME)</span>
                  <span className="text-[#4ADE80]">100 / 100</span>
                </div>
                <div className="h-5 bg-gray-900 border-2 border-black relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ADE80] border-r-2 border-white"
                  />
                </div>
              </div>

              {/* MP Bar */}
              <div>
                <div className="flex justify-between font-press-start text-[10px] text-white mb-1">
                  <span className="text-[#38BDF8]">MP (AI AUTOMATION MANA)</span>
                  <span className="text-[#38BDF8]">98 / 100</span>
                </div>
                <div className="h-5 bg-gray-900 border-2 border-black relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#0284c7] to-[#38BDF8] border-r-2 border-white"
                  />
                </div>
              </div>

              {/* XP Bar */}
              <div>
                <div className="flex justify-between font-press-start text-[10px] text-white mb-1">
                  <span className="text-[#FFD54A]">XP (NEXT LEVEL: CHIEF AI ARCHITECT)</span>
                  <span className="text-[#FFD54A]">2,850 / 3,000</span>
                </div>
                <div className="h-5 bg-gray-900 border-2 border-black relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#d97706] to-[#FFD54A] border-r-2 border-white"
                  />
                </div>
              </div>
            </div>

            {/* Core RPG Attributes (STR, INT, DEX, WIS, CHA) */}
            <div>
              <div className="font-press-start text-[10px] text-[#FFD54A] mb-3 uppercase">
                [ HERO ATTRIBUTES MATRIX ]
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { stat: "STR", val: 92, label: "Data Volume", color: "#F43F5E" },
                  { stat: "INT", val: 98, label: "AI & ML", color: "#38BDF8" },
                  { stat: "DEX", val: 94, label: "Velocity", color: "#4ADE80" },
                  { stat: "WIS", val: 96, label: "BI Insight", color: "#FFD54A" },
                  { stat: "CHA", val: 90, label: "Leadership", color: "#c084fc" },
                ].map((item) => (
                  <div
                    key={item.stat}
                    onMouseEnter={() => playBlip(900, 0.03)}
                    className="bg-black/80 border-2 border-gray-700 p-2 text-center hover:border-white transition-colors cursor-default"
                  >
                    <div className="font-press-start text-xs font-bold" style={{ color: item.color }}>
                      {item.stat}
                    </div>
                    <div className="font-vt323 text-3xl font-black text-white leading-none my-1">
                      {item.val}
                    </div>
                    <div className="font-vt323 text-xs text-gray-400 leading-tight">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Character Bio */}
            <div className="bg-black/60 border-2 border-dashed border-gray-600 p-4 text-xl sm:text-2xl text-gray-200 leading-relaxed">
              <span className="font-press-start text-[9px] text-[#4ADE80] block mb-2">
                &gt;&gt; HERO BACKSTORY:
              </span>
              {RPG_DATA.character.bio}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
