import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Linkedin, Download, Menu, X } from "lucide-react";

const RESUME_URL = "/resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/ragil-immanuvel-p-d-a88533200/";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = ["hero", "about", "impact", "projects", "skills", "experience", "contact"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const navLinks = [
    { id: "about", label: "// ABOUT" },
    { id: "impact", label: "// IMPACT" },
    { id: "projects", label: "// PROJECTS" },
    { id: "skills", label: "// SKILLS" },
    { id: "experience", label: "// EXPERIENCE" },
    { id: "ai", label: "// ASK AI" },
    { id: "contact", label: "// CONTACT" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/85 backdrop-blur-md border-border/50 py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          className="font-mono font-bold text-xl tracking-tighter cursor-pointer text-primary shrink-0"
          onClick={() => scrollTo("hero")}
        >
          RAGIL<span className="text-foreground">.OS</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "font-mono text-xs tracking-widest transition-colors hover:text-primary",
                activeSection === link.id ? "text-primary font-bold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-primary/30 font-mono text-xs text-primary hover:bg-primary/10 transition-colors"
          >
            <Linkedin className="w-3 h-3" /> LinkedIn
          </a>
          <a
            href={RESUME_URL}
            download="Ragil_Immanuvel_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/15 border border-primary/40 font-mono text-xs text-primary hover:bg-primary/25 transition-colors"
          >
            <Download className="w-3 h-3" /> Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "font-mono text-sm tracking-widest text-left py-1 transition-colors hover:text-primary",
                activeSection === link.id ? "text-primary font-bold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 mt-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-primary/30 font-mono text-xs text-primary hover:bg-primary/10 transition-colors"
            >
              <Linkedin className="w-3 h-3" /> LinkedIn
            </a>
            <a
              href={RESUME_URL}
              download="Ragil_Immanuvel_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/15 border border-primary/40 font-mono text-xs text-primary hover:bg-primary/25 transition-colors"
            >
              <Download className="w-3 h-3" /> Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
