import { useState, useEffect } from "react";
import { RPG_DATA } from "@/data/rpgData";
import { isSoundEnabled, toggleSound, playBlip, playConfirm } from "@/lib/rpgSound";
import { useLocation } from "wouter";

export function RpgNavbar() {
  const [, setLocation] = useLocation();
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    const handleScroll = () => {
      const sections = ["hero", "profile", "stats", "quests", "adventure", "achievements", "contact"];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(s);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    playBlip(750, 0.05);
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleSwitchToOs = () => {
    playConfirm();
    setLocation("/");
  };

  const navItems = [
    { id: "profile", label: "PROFILE" },
    { id: "stats", label: "STATS" },
    { id: "quests", label: "QUESTS" },
    { id: "adventure", label: "LOG" },
    { id: "achievements", label: "BADGES" },
    { id: "contact", label: "PARTY" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0e1c]/95 border-b-4 border-black backdrop-blur-md font-press-start text-xs shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Character HUD Badge */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 cursor-pointer group hover:opacity-90 select-none"
        >
          <div className="w-8 h-8 bg-[#FFD54A] border-2 border-black flex items-center justify-center font-bold text-black text-[10px] shadow-[2px_2px_0_#000]">
            ⚔️
          </div>
          <div>
            <div className="text-white text-[11px] tracking-wider group-hover:text-[#FFD54A] transition-colors">
              {RPG_DATA.character.name}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[9px] font-vt323 text-[#4ADE80]">
              <span>HP 100/100</span>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-[#38BDF8]">MP 98/100</span>
              <span className="text-muted-foreground/60">·</span>
              <span className="text-[#FFD54A]">LV.{RPG_DATA.character.level}</span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 text-[10px] tracking-wide border-2 transition-all ${
                  isActive
                    ? "bg-[#FFD54A] text-black border-black font-bold shadow-[2px_2px_0_#000]"
                    : "bg-transparent text-gray-300 border-transparent hover:text-white hover:border-gray-700"
                }`}
              >
                [{item.label}]
              </button>
            );
          })}
        </div>

        {/* Controls: Sound & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title="Toggle 8-bit Sound Effects"
            className={`pixel-btn px-2.5 py-1.5 text-[9px] font-press-start flex items-center gap-1.5 ${
              soundOn ? "bg-[#4ADE80] text-black" : "bg-gray-800 text-gray-400"
            }`}
          >
            <span>{soundOn ? "🔊 ON" : "🔇 OFF"}</span>
          </button>

          {/* Theme Switcher to Cyber OS */}
          <button
            onClick={handleSwitchToOs}
            title="Switch to Ragil.OS Command Center theme"
            className="pixel-btn bg-[#38BDF8] text-black px-2.5 py-1.5 text-[9px] font-press-start hidden sm:inline-flex items-center gap-1"
          >
            <span>💻 OS MODE</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              playBlip();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden pixel-btn bg-[#FFD54A] text-black px-2.5 py-1.5 text-[10px]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0e1c] border-t-2 border-black p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="pixel-btn text-left px-3 py-2 text-[10px] bg-black text-white hover:bg-[#FFD54A] hover:text-black border-2 border-gray-700"
            >
              ▶ {item.label}
            </button>
          ))}
          <button
            onClick={handleSwitchToOs}
            className="pixel-btn text-left px-3 py-2 text-[10px] bg-[#38BDF8] text-black font-bold mt-2"
          >
            💻 SWITCH TO RAGIL.OS
          </button>
        </div>
      )}
    </nav>
  );
}
