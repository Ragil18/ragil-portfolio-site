import { RPG_DATA } from "@/data/rpgData";
import { playBlip } from "@/lib/rpgSound";
import { motion } from "framer-motion";

export function RpgAdventureLog() {
  return (
    <section id="adventure" className="py-20 px-4 max-w-5xl mx-auto font-vt323 select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="font-press-start text-xs text-[#FFD54A] uppercase tracking-widest mb-2">
          [ CHAPTER IV : OVERWORLD ADVENTURE MAP ]
        </div>
        <h2 className="font-press-start text-2xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
          ADVENTURE LOG
        </h2>
        <div className="w-24 h-1 bg-[#F43F5E] mx-auto mt-4 shadow-[0_2px_0_#000]" />
        <p className="font-vt323 text-2xl text-gray-400 max-w-xl mx-auto mt-3">
          Chronicles of conquered enterprise realms, guilds served, and operational milestones achieved.
        </p>
      </div>

      {/* Vertical Map Path */}
      <div className="relative pl-6 sm:pl-10 border-l-4 border-dashed border-[#FFD54A]/40 space-y-12 ml-4 sm:ml-8">
        {RPG_DATA.adventureLog.map((cp, idx) => {
          const isCurrent = cp.status === "CURRENT GUILD";
          return (
            <motion.div
              key={cp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onMouseEnter={() => playBlip(600 + idx * 100, 0.04)}
              className="relative group"
            >
              {/* Checkpoint Node Marker */}
              <div
                className={`absolute -left-[37px] sm:-left-[53px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 border-4 border-black flex items-center justify-center text-xs shadow-[2px_2px_0_#000] ${
                  isCurrent
                    ? "bg-[#4ADE80] animate-bounce"
                    : "bg-[#FFD54A]"
                }`}
              >
                {isCurrent ? "🏰" : "🚩"}
              </div>

              {/* Checkpoint Dialog Card */}
              <div className="bg-[#121324] border-4 border-white p-5 sm:p-7 shadow-[6px_6px_0_#000] group-hover:border-[#FFD54A] transition-all">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="font-press-start text-[9px] text-[#38BDF8] mb-1">
                      REALM: {cp.realm}
                    </div>
                    <h3 className="font-press-start text-base sm:text-lg text-white group-hover:text-[#FFD54A] transition-colors">
                      {cp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`font-press-start text-[8px] px-2 py-1 border-2 border-black ${
                        isCurrent
                          ? "bg-[#4ADE80] text-black font-bold animate-pulse"
                          : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {cp.status}
                    </span>
                    <span className="font-press-start text-[9px] text-gray-400 bg-black/60 px-2 py-1 border border-gray-700">
                      ⏱ {cp.period}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-vt323 text-xl sm:text-2xl text-gray-300 leading-normal mb-4">
                  {cp.summary}
                </p>

                {/* Achievements List */}
                <div className="bg-black/60 border border-gray-700 p-3 mb-4 space-y-1.5">
                  <div className="font-press-start text-[9px] text-[#FFD54A] uppercase mb-1">
                    QUEST OBJECTIVES COMPLETED:
                  </div>
                  {cp.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-lg text-gray-200">
                      <span className="text-[#4ADE80] font-press-start text-[10px] mt-0.5">▶</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Inventory / Gear Acquired */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t-2 border-gray-800">
                  <span className="font-press-start text-[8px] text-gray-400">GEAR ACQUIRED:</span>
                  {cp.inventory.map((item) => (
                    <span
                      key={item}
                      className="bg-[#1f2038] text-white text-base px-2 py-0.5 border border-gray-700 font-vt323"
                    >
                      🛡️ {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
