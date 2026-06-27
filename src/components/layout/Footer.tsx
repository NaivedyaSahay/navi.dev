"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Twitter, Dribbble, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const element = document.getElementById("home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border bg-card/20 pt-16 pb-0 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Left Side: Brand and short description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 max-w-sm">
          <span className="font-mono text-sm tracking-widest font-black uppercase">
            NAIVEDYA<span className="text-muted-foreground">.</span>
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Computer Science undergraduate and full stack developer specializing in Spring Boot microservices, Node.js backend APIs, and interactive frontend platforms.
          </p>
        </div>

        {/* Center: Quick navigation links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-md">
          {["about", "skills", "services", "projects", "experience", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors hover-link"
            >
              {section}
            </a>
          ))}
        </div>

        {/* Right Side: Social Media Links */}
        <div className="flex items-center gap-3">
          {[
            { icon: <Github className="w-4 h-4" />, url: "https://github.com/NaivedyaSahay" },
            { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/naivedyasahay" },
          ].map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border bg-card hover:bg-foreground hover:text-background transition-all duration-300 rounded-full hover-link"
            >
              {soc.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Lower Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[10px] font-mono text-muted-foreground">
          © {new Date().getFullYear()} Naivedya Raj. All rights reserved.
        </span>
        <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
          Designed & Built by Naivedya Raj <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>

      {/* Giant Typography Name (MATVEYAN style) */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mt-16 select-none pointer-events-none">
        <h1 className="font-sans text-[15vw] font-black tracking-tighter text-center leading-[0.75] uppercase bg-gradient-to-b from-foreground via-foreground/90 to-background bg-clip-text text-transparent translate-y-3">
          NAIVEDYA
        </h1>
      </div>

      {/* Floating/Magnetic Back to Top Button */}
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 p-4 border border-border bg-card/95 hover:bg-foreground hover:text-background text-foreground backdrop-blur-md rounded-full shadow-lg z-30 pointer-events-auto hover-link transition-colors duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </footer>
  );
}
