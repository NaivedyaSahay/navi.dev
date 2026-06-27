"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ParticlesBackground from "../ui/ParticlesBackground";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates for local cursor glow effect
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  
  const springGlowX = useSpring(glowX, { stiffness: 150, damping: 25 });
  const springGlowY = useSpring(glowY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowX.set(x);
      glowY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [glowX, glowY]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen z-30 flex flex-col justify-between overflow-hidden pt-12 pb-20 sm:py-12 px-6 bg-grid"
    >
      {/* Background elements */}
      <ParticlesBackground />
      
      {/* Interactive Cursor Glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[100px] bg-[radial-gradient(circle,var(--ring)_0%,transparent_60%)] opacity-[0.06] dark:opacity-[0.09]"
        style={{
          left: springGlowX,
          top: springGlowY,
        }}
      />

      {/* Top spacing */}
      <div className="h-16" />

      {/* Main Centered Content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center flex-1 relative z-10 text-center">
        <div className="relative inline-block select-none -translate-y-12 sm:-translate-y-16 z-30">
          {/* Star Icon (Left Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="absolute -left-12 top-10 sm:-left-20 sm:top-14 text-foreground/80 dark:text-foreground/90 w-8 h-8 sm:w-12 sm:h-12"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </motion.div>

          {/* Large Bold Centered Typography */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-reveal font-extrabold tracking-tighter text-5xl sm:text-7xl md:text-8xl xl:text-9xl leading-none uppercase"
          >
            SOFTWARE <br />
            ENGINEER
          </motion.h1>

          {/* Lightning Icon (Right Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="absolute -right-12 bottom-12 sm:-right-20 sm:bottom-16 text-foreground/80 dark:text-foreground/90 w-8 h-8 sm:w-12 sm:h-12"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M13 0L3 14H11L9 24L21 10H13L13 0Z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Footer labels inside Hero section */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-end text-xs font-mono text-muted-foreground relative z-10 pt-8 border-t border-dashed border-border/40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          ©2026
        </motion.div>

        {/* Space reserved in the center bottom for the flipping card overlay */}
        <div className="w-56 h-12 hidden md:block" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          /CREATING SINCE 2022
        </motion.div>
      </div>
    </section>
  );
}
