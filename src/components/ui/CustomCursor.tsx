"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<"default" | "link" | "input" | "none">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Position coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follow (60fps lag-free)
  const springConfig = { damping: 40, stiffness: 400, mass: 0.3 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover/has mouse
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    // Set body class to hide default cursor
    document.body.classList.add("custom-cursor-active");

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find if target is interactive
      const isLink = target.closest("a") || target.closest("button") || target.closest(".hover-link");
      const isInput = target.closest("input") || target.closest("textarea") || target.closest("[contenteditable]");

      if (isLink) {
        setHoverType("link");
      } else if (isInput) {
        setHoverType("input");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Render cursor with Framer Motion springs
  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -mt-4 -ml-4 border border-foreground/30 rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverType === "link" ? 1.8 : hoverType === "input" ? 0.3 : 1,
          backgroundColor: hoverType === "link" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderColor: hoverType === "link" ? "rgba(255, 255, 255, 1)" : "rgba(var(--foreground), 0.3)",
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -mt-[3px] -ml-[3px] bg-foreground rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverType === "link" ? 0 : hoverType === "input" ? 2.5 : 1,
          opacity: hoverType === "link" ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
    </>
  );
}
