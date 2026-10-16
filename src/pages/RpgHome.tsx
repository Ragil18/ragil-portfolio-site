import { RpgNavbar } from "@/components/rpg/RpgNavbar";
import { RpgHero } from "@/components/rpg/RpgHero";
import { RpgProfile } from "@/components/rpg/RpgProfile";
import { RpgStats } from "@/components/rpg/RpgStats";
import { RpgQuestLog } from "@/components/rpg/RpgQuestLog";
import { RpgAdventureLog } from "@/components/rpg/RpgAdventureLog";
import { RpgOracle } from "@/components/rpg/RpgOracle";
import { RpgAchievements } from "@/components/rpg/RpgAchievements";
import { RpgContact } from "@/components/rpg/RpgContact";
import { KonamiCelebration } from "@/components/rpg/KonamiCelebration";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useEffect } from "react";

export default function RpgHome() {
  const { triggered, reset } = useKonamiCode();

  useEffect(() => {
    // Set document title
    document.title = "Ragil Immanuvel — Retro RPG Character Sheet";
    return () => {
      document.title = "Ragil Immanuvel — Senior AI Automation Engineer & Data Wizard";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#090a16] text-white selection:bg-[#FFD54A] selection:text-black relative">
      {/* Global CRT Scanlines */}
      <div className="fixed inset-0 scanlines-overlay pointer-events-none z-40" />

      {/* Secret Cheat Code Overlay */}
      <KonamiCelebration active={triggered} onClose={reset} />

      {/* Retro Navigation HUD */}
      <RpgNavbar />

      {/* 1. Title Screen */}
      <RpgHero />

      {/* 2. Character Profile */}
      <RpgProfile />

      {/* 3. Stats & Skills */}
      <RpgStats />

      {/* 4. Quest Log */}
      <RpgQuestLog />

      {/* 5. Adventure Log */}
      <RpgAdventureLog />

      {/* 6. The Elder Oracle & Interview Boss Trial */}
      <RpgOracle />

      {/* 7. Achievements & Certifications */}
      <RpgAchievements />

      {/* 8. Join My Party / Contact */}
      <RpgContact />
    </div>
  );
}
