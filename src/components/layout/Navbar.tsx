"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sun, Moon, Search, MoreHorizontal, X, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle header background appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Active Section Scroll Spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Triggers active highlights when sections sit in view middle
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openCommandPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-fit max-w-[90vw]"
      >
        {/* Scroll Progress Bar Embedded in Menu Capsule */}
        <motion.div
          className="absolute top-0 left-4 right-4 h-[2px] bg-foreground/70 origin-left z-50 rounded-full"
          style={{ scaleX }}
        />

        {/* Minimal Black Menu Capsule */}
        <div className="flex items-center gap-3 sm:gap-6 px-3.5 sm:px-5 py-2.5 rounded-full border border-zinc-800 bg-neutral-950 text-neutral-100 shadow-2xl relative">
          
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="font-sans text-xs tracking-wider font-extrabold uppercase hover:text-white transition-colors duration-200"
          >
            Naivedya
          </a>

          {/* Quick inline navigation dots or subtle text for desktop */}
          <div className="hidden md:flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2">
              {activeSection}
            </span>
          </div>

          {/* Actions & Capsule Menu trigger */}
          <div className="flex items-center gap-2">
            {/* Search shortcut button */}
            <button
              onClick={openCommandPalette}
              className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
            </button>

            {/* Light/Dark Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
              )}
            </button>

            {/* Ellipses menu trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full transition-colors duration-200"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-3.5 h-3.5" /> : <MoreHorizontal className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Expanded Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-30">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-background/70 backdrop-blur-md"
            />

            {/* Navigation links drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-neutral-950 p-6 shadow-2xl z-40 text-neutral-100"
            >
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-4 border-b border-zinc-800 pb-2">
                Menu Directory
              </span>
              
              <div className="grid grid-cols-2 gap-3.5">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-left flex items-center justify-between group ${
                        isActive
                          ? "bg-white text-black"
                          : "text-zinc-400 hover:bg-neutral-900 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Drawer footer link */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span>© 2026 NAIVEDYA RAJ</span>
                <span>SYS_OK</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
