import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Swords, 
  MessageSquare, 
  ShieldAlert, 
  Trophy, 
  RefreshCw, 
  Mail, 
  Check, 
  Heart,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OracleMode = "dialogue" | "boss_battle";

export function RpgOracle() {
  const [mode, setMode] = useState<OracleMode>("dialogue");
  const [oracleText, setOracleText] = useState<string>(
    "Greetings, Adventurer! I am the Ancient Oracle of the Ragil Chronicles. Inquire of his heroic quests, arcane data sorcery, or challenge the Interview Trial!"
  );

  // Boss Battle State
  const [bossHp, setBossHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [battleTurn, setBattleTurn] = useState<number>(1);
  const [battleLog, setBattleLog] = useState<string>("A wild ALGORITHM DRAKE appears! Prove your technical mettle!");
  const [battleWon, setBattleWon] = useState<boolean>(false);
  const [battleLost, setBattleLost] = useState<boolean>(false);

  // Dialogue Tree
  const handleDialogueChoice = (choice: string) => {
    switch (choice) {
      case "quests":
        setOracleText(
          "📜 QUEST RECORD: Warrior Ragil currently holds rank of Senior AI Automation Engineer at DAC Developers (guild of real estate intelligence) & previously conquered the Diagnostics Network of Neuberg with 80% report automation!"
        );
        break;
      case "spells":
        setOracleText(
          "🔮 ARCANE SPELLS: Fluent in Autonomous Multi-Agent Summoning, YOLO v8 Computer Vision, Advanced DAX Divination, Python High-Throughput Alchemy, and Azure Synapse dimensional portals!"
        );
        break;
      case "relics":
        setOracleText(
          "⚔️ SACRED RELICS: Forged 8 legendary artifacts — including the CCTV Automated Sentry (YOLO v8), the Executive Sales Crystal Ball, and the Customer NPS Telemetry Core!"
        );
        break;
      case "summon":
        setOracleText(
          "🤝 SUMMON TO PARTY: Send dispatch to ragilimmanuvel@gmail.com or seek his parchment on LinkedIn. He is open to heroic guild alliances!"
        );
        break;
      default:
        setOracleText("The stars align with infinite data wisdom. What further lore dost thou seek?");
    }
  };

  // Boss Battle Logic
  const handleBattleChoice = (isCorrect: boolean, feedback: string) => {
    if (isCorrect) {
      const newBossHp = Math.max(0, bossHp - 50);
      setBossHp(newBossHp);
      setBattleLog(`⚔️ CRITICAL HIT! ${feedback}`);
      if (newBossHp === 0) {
        setBattleWon(true);
      } else {
        setBattleTurn(battleTurn + 1);
      }
    } else {
      const newPlayerHp = Math.max(0, playerHp - 35);
      setPlayerHp(newPlayerHp);
      setBattleLog(`💥 OUCH! ${feedback}`);
      if (newPlayerHp === 0) {
        setBattleLost(true);
      }
    }
  };

  const resetBattle = () => {
    setBossHp(100);
    setPlayerHp(100);
    setBattleTurn(1);
    setBattleWon(false);
    setBattleLost(false);
    setBattleLog("A wild ALGORITHM DRAKE appears! Prove your technical mettle!");
  };

  return (
    <section id="oracle" className="py-20 relative font-['VT323'] text-xl select-none">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title Badge */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 border-4 border-[#FFD54A] bg-[#141026] text-[#FFD54A] font-['Press_Start_2P'] text-xs tracking-widest shadow-[4px_4px_0px_#000]">
            ⚡ THE ELDER ORACLE & INTERVIEW TRIAL ⚡
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex justify-center gap-3 mb-6 font-['Press_Start_2P'] text-[10px]">
          <button
            onClick={() => setMode("dialogue")}
            className={cn(
              "px-4 py-2 border-2 transition-all flex items-center gap-2",
              mode === "dialogue"
                ? "border-[#4ADE80] bg-[#4ADE80]/20 text-[#4ADE80] shadow-[2px_2px_0px_#000]"
                : "border-slate-700 bg-black/60 text-slate-400 hover:text-white"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ORACLE CHAT</span>
          </button>

          <button
            onClick={() => setMode("boss_battle")}
            className={cn(
              "px-4 py-2 border-2 transition-all flex items-center gap-2",
              mode === "boss_battle"
                ? "border-[#F43F5E] bg-[#F43F5E]/20 text-[#F43F5E] shadow-[2px_2px_0px_#000]"
                : "border-slate-700 bg-black/60 text-slate-400 hover:text-white"
            )}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>INTERVIEW BOSS TRIAL</span>
          </button>
        </div>

        {/* ─── Mode 1: Oracle Dialogue ─── */}
        {mode === "dialogue" && (
          <div className="border-4 border-[#FFD54A] bg-[#120d28] p-4 sm:p-6 shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] relative">
            {/* Oracle Avatar & Speech */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 border-2 border-[#FFD54A] bg-black/80 flex items-center justify-center text-2xl sm:text-4xl shadow-[2px_2px_0px_#FFD54A]">
                🧙‍♂️
              </div>
              <div className="flex-1 bg-black/60 border-2 border-slate-700 p-2.5 sm:p-3 text-lg sm:text-2xl leading-snug sm:leading-tight text-[#FFD54A] min-h-[75px] sm:min-h-[90px]">
                {oracleText}
              </div>
            </div>

            {/* Dialogue Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 font-['VT323'] text-lg sm:text-2xl">
              <button
                onClick={() => handleDialogueChoice("quests")}
                className="p-2.5 sm:p-3 border-2 border-slate-700 bg-black/40 hover:bg-[#FFD54A]/20 hover:border-[#FFD54A] text-slate-200 hover:text-[#FFD54A] text-left transition-all flex items-center gap-2"
              >
                <span>&gt; Tell me of his Career Quests</span>
              </button>
              <button
                onClick={() => handleDialogueChoice("spells")}
                className="p-2.5 sm:p-3 border-2 border-slate-700 bg-black/40 hover:bg-[#4ADE80]/20 hover:border-[#4ADE80] text-slate-200 hover:text-[#4ADE80] text-left transition-all flex items-center gap-2"
              >
                <span>&gt; What Arcane Skills (Tech) does he wield?</span>
              </button>
              <button
                onClick={() => handleDialogueChoice("relics")}
                className="p-2.5 sm:p-3 border-2 border-slate-700 bg-black/40 hover:bg-[#00e5ff]/20 hover:border-[#00e5ff] text-slate-200 hover:text-[#00e5ff] text-left transition-all flex items-center gap-2"
              >
                <span>&gt; Show his 8 Legendary Relics (Projects)</span>
              </button>
              <button
                onClick={() => handleDialogueChoice("summon")}
                className="p-2.5 sm:p-3 border-2 border-slate-700 bg-black/40 hover:bg-[#F43F5E]/20 hover:border-[#F43F5E] text-slate-200 hover:text-[#F43F5E] text-left transition-all flex items-center gap-2"
              >
                <span>&gt; How do I recruit Ragil to my Guild?</span>
              </button>
            </div>
          </div>
        )}

        {/* ─── Mode 2: Interview Boss Trial ─── */}
        {mode === "boss_battle" && (
          <div className="border-4 border-[#F43F5E] bg-[#160b1e] p-6 shadow-[8px_8px_0px_#000] relative">
            {/* Battle Arena Header */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Boss Info */}
              <div className="border-2 border-[#F43F5E] bg-black/70 p-3">
                <div className="flex justify-between items-center text-xs font-['Press_Start_2P'] text-[#F43F5E] mb-2">
                  <span>ALGORITHM DRAKE</span>
                  <span>HP: {bossHp}/100</span>
                </div>
                <div className="w-full h-4 bg-slate-900 border border-slate-700">
                  <div
                    className="h-full bg-[#F43F5E] transition-all duration-300"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>

              {/* Player Info */}
              <div className="border-2 border-[#4ADE80] bg-black/70 p-3">
                <div className="flex justify-between items-center text-xs font-['Press_Start_2P'] text-[#4ADE80] mb-2">
                  <span>WARRIOR RAGIL</span>
                  <span>HP: {playerHp}/100</span>
                </div>
                <div className="w-full h-4 bg-slate-900 border border-slate-700">
                  <div
                    className="h-full bg-[#4ADE80] transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Battle Stage Visual */}
            <div className="h-32 bg-black/80 border-2 border-slate-800 flex items-center justify-around text-6xl mb-4 relative">
              <span className={cn("transition-transform", battleWon && "scale-125")}>
                {battleWon ? "👑" : "🛡️🧙‍♂️"}
              </span>
              <span className="text-2xl text-slate-500 font-['Press_Start_2P']">VS</span>
              <span className={cn("transition-transform", bossHp === 0 ? "opacity-30 rotate-90" : "animate-bounce")}>
                {bossHp === 0 ? "💀" : "🐉"}
              </span>
            </div>

            {/* Battle Log Box */}
            <div className="p-3 bg-black border-2 border-slate-700 text-[#FFD54A] text-xl mb-4 min-h-[50px]">
              {battleLog}
            </div>

            {/* Battle Victory / Loss Screen */}
            {battleWon && (
              <div className="text-center p-4 sm:p-6 border-2 border-[#4ADE80] bg-[#4ADE80]/10 mb-4">
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD54A] mx-auto mb-2" />
                <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm text-[#4ADE80] mb-2 leading-relaxed">
                  TRIAL CONQUERED! LEVEL UP!
                </h3>
                <p className="text-lg sm:text-2xl text-white mb-4">
                  The Drake bows to Ragil's architecture. The legendary OFFER LETTER parchment is unlocked!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 font-['Press_Start_2P'] text-[10px] sm:text-xs">
                  <a
                    href="mailto:ragilimmanuvel@gmail.com?subject=Offer%20Discussion%20from%20Retro%20RPG%20Trial"
                    className="px-4 py-2 bg-[#4ADE80] text-black border-2 border-black hover:bg-[#34d399] text-center"
                  >
                    SEND OFFER LETTER
                  </a>
                  <button
                    onClick={resetBattle}
                    className="px-4 py-2 border-2 border-slate-600 bg-black text-slate-300 hover:text-white"
                  >
                    REPLAY TRIAL
                  </button>
                </div>
              </div>
            )}

            {battleLost && (
              <div className="text-center p-6 border-2 border-[#F43F5E] bg-[#F43F5E]/10 mb-4">
                <h3 className="font-['Press_Start_2P'] text-sm text-[#F43F5E] mb-2">
                  TRIAL FAILED — INSERT COIN!
                </h3>
                <button
                  onClick={resetBattle}
                  className="mt-3 px-4 py-2 border-2 border-[#FFD54A] bg-[#FFD54A] text-black font-['Press_Start_2P'] text-xs"
                >
                  TRY AGAIN
                </button>
              </div>
            )}

            {/* Battle Choices (Turns 1 & 2) */}
            {!battleWon && !battleLost && (
              <div>
                {battleTurn === 1 && (
                  <div className="space-y-2">
                    <div className="text-sm font-['Press_Start_2P'] text-slate-300 mb-2">
                      DRAKE: "10 Million telemetry rows are choking my database! How dost thou slay the latency?"
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-2xl">
                      <button
                        onClick={() => handleBattleChoice(false, "Running SELECT * with no index caused a memory explosion!")}
                        className="p-3 border-2 border-slate-700 bg-black hover:border-red-500 text-left"
                      >
                        A) Cast SELECT * with zero indexes and pray!
                      </button>
                      <button
                        onClick={() => handleBattleChoice(true, "Star-schema DW with Clustered Columnstore slashed latency by 60%!")}
                        className="p-3 border-2 border-slate-700 bg-black hover:border-[#4ADE80] text-left text-[#4ADE80]"
                      >
                        B) Partition by Date, build Star Schema & Columnstore!
                      </button>
                    </div>
                  </div>
                )}

                {battleTurn === 2 && (
                  <div className="space-y-2">
                    <div className="text-sm font-['Press_Start_2P'] text-slate-300 mb-2">
                      DRAKE: "C-Suite demands real-time CCTV anomaly alerts without crushing network bandwidth!"
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-2xl">
                      <button
                        onClick={() => handleBattleChoice(false, "Streaming raw 4K video saturated cellular bandwidth!")}
                        className="p-3 border-2 border-slate-700 bg-black hover:border-red-500 text-left"
                      >
                        A) Stream uncompressed 4K video over cellular!
                      </button>
                      <button
                        onClick={() => handleBattleChoice(true, "YOLO v8 edge inference with TensorRT dispatched 20ms alerts!")}
                        className="p-3 border-2 border-slate-700 bg-black hover:border-[#4ADE80] text-left text-[#4ADE80]"
                      >
                        B) Deploy YOLO v8 Edge inference + FastAPI alerts!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
