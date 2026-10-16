import { useState, useRef } from "react";
import { RPG_DATA } from "@/data/rpgData";
import { playConfirm, playBlip } from "@/lib/rpgSound";

export function RpgContact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sentNotice, setSentNotice] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contact = RPG_DATA.contact;
  const MAILTO_LINK = `mailto:${contact.email}?subject=${encodeURIComponent(contact.mailtoSubject)}&body=${encodeURIComponent(contact.mailtoBody)}`;

  const handleCopyEmail = () => {
    playConfirm();
    navigator.clipboard.writeText(contact.email).catch(() => {});
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    playConfirm();

    const subject = encodeURIComponent(`Party Invite from ${formData.name || "Adventurer"}`);
    const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
    const mailto = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailto;
    } catch {}

    navigator.clipboard.writeText(contact.email).catch(() => {});
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto font-vt323 select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="font-press-start text-xs text-[#4ADE80] uppercase tracking-widest mb-2">
          [ FINAL CHAPTER : TAVERN & RECRUITMENT ]
        </div>
        <h2 className="font-press-start text-2xl sm:text-3xl text-white drop-shadow-[3px_3px_0_#000]">
          JOIN MY PARTY
        </h2>
        <div className="w-24 h-1 bg-[#4ADE80] mx-auto mt-4 shadow-[0_2px_0_#000]" />
      </div>

      {/* Retro Encounter Dialog Box */}
      <div className="bg-[#121324] border-4 border-white p-6 sm:p-10 shadow-[8px_8px_0_#000] relative">
        {/* Dialogue Prompt Header */}
        <div className="bg-black border-2 border-[#FFD54A] p-4 mb-8 flex items-start gap-4">
          <div className="text-3xl animate-bounce">⚔️</div>
          <div>
            <div className="font-press-start text-[10px] text-[#FFD54A] mb-1">
              ENCOUNTER INITIATED:
            </div>
            <div className="font-vt323 text-2xl sm:text-3xl text-white leading-tight">
              "{contact.dialogPrompt}"
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmitForm} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-press-start text-[9px] text-gray-300 block mb-1.5">
                GUILD / ADVENTURER NAME:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Hiring Manager / Founder"
                className="w-full bg-black border-2 border-gray-600 focus:border-[#FFD54A] px-3 py-2 text-xl sm:text-2xl text-white font-vt323 outline-none"
              />
            </div>

            <div>
              <label className="font-press-start text-[9px] text-gray-300 block mb-1.5">
                SIGNAL (YOUR EMAIL):
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. recruiter@guild.com"
                className="w-full bg-black border-2 border-gray-600 focus:border-[#FFD54A] px-3 py-2 text-xl sm:text-2xl text-white font-vt323 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-press-start text-[9px] text-gray-300 block mb-1.5">
              QUEST DETAILS / PROPOSAL:
            </label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell Ragil about the mission, role, or project..."
              className="w-full bg-black border-2 border-gray-600 focus:border-[#FFD54A] p-3 text-xl sm:text-2xl text-white font-vt323 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="pixel-btn bg-[#FFD54A] text-black font-press-start text-xs sm:text-sm px-6 py-3 w-full border-4 border-black hover:bg-[#FDE047] active:translate-y-1 shadow-[4px_4px_0_#000]"
          >
            ▶ DISPATCH QUEST OFFER VIA EMAIL ◀
          </button>
        </form>

        {sentNotice && (
          <div className="bg-[#4ADE80] text-black font-press-start text-xs p-3 text-center mb-6 border-2 border-black">
            ✓ MESSAGE TRANSMITTED & EMAIL CLIENT OPENED!
          </div>
        )}

        {/* Quick Action Pixel Buttons */}
        <div className="pt-6 border-t-2 border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Email button */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={() => playBlip(700, 0.03)}
            className="pixel-btn bg-black text-white font-press-start text-[9px] p-3 border-2 border-gray-600 hover:border-[#FFD54A] hover:text-[#FFD54A] flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">✉️</span>
            <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY EMAIL"}</span>
          </button>

          {/* LinkedIn Button */}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playBlip(750, 0.03)}
            className="pixel-btn bg-black text-white font-press-start text-[9px] p-3 border-2 border-gray-600 hover:border-[#38BDF8] hover:text-[#38BDF8] flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">🌐</span>
            <span>LINKEDIN GUILD</span>
          </a>

          {/* Resume Download */}
          <a
            href={contact.resumeUrl}
            download="Ragil_Immanuvel_Resume.pdf"
            onMouseEnter={() => playBlip(800, 0.03)}
            className="pixel-btn bg-black text-white font-press-start text-[9px] p-3 border-2 border-gray-600 hover:border-[#4ADE80] hover:text-[#4ADE80] flex flex-col items-center justify-center gap-1"
          >
            <span className="text-lg">📜</span>
            <span>RESUME SCROLL (PDF)</span>
          </a>
        </div>
      </div>

      {/* CONTINUE? Game Over Screen Footer */}
      <footer className="text-center mt-16 pt-8 border-t-4 border-dashed border-gray-800 space-y-4">
        <div className="font-press-start text-xs sm:text-sm text-[#F43F5E] animate-pulse">
          GAME OVER? CONTINUE?
        </div>
        <div className="font-vt323 text-2xl text-gray-400">
          9... 8... 7... 6... INSERT COIN TO RECRUIT RAGIL IMMANUVEL
        </div>
        <div className="font-press-start text-[9px] text-gray-500 pt-4">
          © {new Date().getFullYear()} RAGIL IMMANUVEL · ALL RIGHTS RESERVED · 8-BIT EDITION
        </div>
      </footer>
    </section>
  );
}
