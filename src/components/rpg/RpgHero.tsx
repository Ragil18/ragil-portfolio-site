import { useState, useEffect } from "react";
import { RPG_DATA } from "@/data/rpgData";
import { playPressStart, playBlip } from "@/lib/rpgSound";
import { motion } from "framer-motion";

export function RpgHero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const taglines = RPG_DATA.character.typewriterTaglines;

  // Typewriter effect
  useEffect(() => {
    const currentFullText = taglines[taglineIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, taglineIndex, taglines]);

  const handlePressStart = () => {
    playPressStart();
    const profileEl = document.getElementById("profile");
    if (profileEl) {
      profileEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 rpg-starfield overflow-hidden select-none"
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10" />

      {/* Floating Pixel Stars / Decors */}
      <div className="absolute top-28 left-8 text-2xl animate-pixel-float hidden sm:block">⭐</div>
      <div className="absolute top-40 right-12 text-xl animate-pixel-float delay-1000 hidden sm:block">👾</div>
      <div className="absolute bottom-24 left-16 text-xl animate-pixel-float delay-500 hidden sm:block">💎</div>
      <div className="absolute bottom-32 right-20 text-2xl animate-pixel-float delay-700 hidden sm:block">🗡️</div>

      {/* Main Title Container */}
      <div className="relative z-20 max-w-4xl w-full mx-auto text-center flex flex-col items-center">
        {/* Top Game Header Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6 font-press-start text-[10px]"
        >
          <span className="bg-[#F43F5E] text-white border-2 border-black px-3 py-1 shadow-[2px_2px_0_#000]">
            ★ LEVEL {RPG_DATA.character.level}
          </span>
          <span className="bg-[#FFD54A] text-black border-2 border-black px-3 py-1 shadow-[2px_2px_0_#000]">
            {RPG_DATA.character.guild}
          </span>
          <span className="bg-[#4ADE80] text-black border-2 border-black px-3 py-1 shadow-[2px_2px_0_#000]">
            SAVE FILE: READY
          </span>
        </motion.div>

        {/* Big Retro Game Title */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="font-press-start text-xs sm:text-sm text-[#FFD54A] tracking-[0.25em] mb-2 uppercase">
            -- CHRONICLES OF DATA & AI --
          </div>
          <h1 className="font-press-start text-3xl sm:text-5xl md:text-6xl text-white font-black tracking-tight leading-tight drop-shadow-[4px_4px_0_#000] text-stroke">
            RAGIL <span className="text-[#FFD54A]">IMMANUVEL</span>
          </h1>
        </motion.div>

        {/* Character Class Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-press-start text-xs sm:text-sm text-[#38BDF8] tracking-wider mb-8 max-w-2xl px-2"
        >
          &lt; {RPG_DATA.character.classTitle} &gt;
        </motion.div>

        {/* Dialogue Box with Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full max-w-2xl bg-black/85 border-4 border-white p-4 sm:p-6 mb-10 shadow-[6px_6px_0_#000] relative"
        >
          <div className="absolute -top-3 left-4 bg-black px-2 font-press-start text-[9px] text-[#FFD54A] border border-[#FFD54A]">
            SYSTEM MESSAGE
          </div>
          <div className="font-vt323 text-2xl sm:text-3xl text-[#4ADE80] min-h-[64px] flex items-center justify-center leading-snug">
            <span>"{displayText}"</span>
            <span className="animate-retro-blink ml-1 text-[#FFD54A]">█</span>
          </div>
        </motion.div>

        {/* PRESS START Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={handlePressStart}
            onMouseEnter={() => playBlip(800, 0.04)}
            className="pixel-btn bg-[#FFD54A] text-black font-press-start text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-5 border-4 border-black hover:bg-[#FDE047] active:translate-y-2 cursor-pointer shadow-[6px_6px_0_#000] animate-pulse"
          >
            ▶ PRESS START ◀
          </button>

          <div className="font-vt323 text-lg sm:text-xl text-gray-400 mt-2">
            INSERT COIN // SCROLL TO VIEW CHARACTER SHEET
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-press-start text-[9px] text-gray-500">
        [ ▲ ▲ ▼ ▼ ◄ ► ◄ ► B A ] FOR SECRET BUFF
      </div>
    </section>
  );
}
