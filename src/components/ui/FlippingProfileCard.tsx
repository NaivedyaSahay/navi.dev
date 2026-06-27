"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function FlippingProfileCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track window scroll
  const { scrollY } = useScroll();

  // Scroll ranges:
  // From scroll = 0 (top of page) to scroll = 500 (scrolled down)
  const scrollRange = [0, 500];

  // Map scroll progress to Y translation dynamically:
  // We use viewport-relative calculation to ensure consistent proportions.
  // -54% of viewport height places the card exactly overlapping the lower part of 'ENGINEER' when shifted up.
  // -38% of viewport height is optimal for mobile cards when shifted up.
  const desktopOffset = -(windowHeight * 0.54);
  const mobileOffset = -(windowHeight * 0.38);

  const yTranslate = useTransform(
    scrollY,
    scrollRange,
    isMobile ? [mobileOffset, 0] : [desktopOffset, 0]
  );

  // Map scroll progress to 3D RotateY (flip from 0deg to 180deg)
  const rotateY = useTransform(scrollY, scrollRange, [0, 180]);

  // Map scroll progress to scale: pinch down slightly in middle of flip for fluid feel
  const scale = useTransform(scrollY, [0, 250, 500], [1, 0.92, 1]);

  // Smooth out the motion values with springs
  const smoothY = useSpring(yTranslate, { stiffness: 90, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 90, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 90, damping: 20 });

  return (
    <div
      className="relative w-52 h-68 sm:w-60 sm:h-76 xl:w-64 xl:h-80 z-20"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="w-full h-full relative pointer-events-auto"
        style={{
          y: smoothY,
          rotateY: smoothRotateY,
          scale: smoothScale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Face: Black and White Portrait */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-border bg-card p-2 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted">
            <Image
              src="/profile_v2.png"
              alt="Naivedya Raj Black and White Portrait"
              fill
              priority
              sizes="(max-width: 768px) 208px, (max-width: 1200px) 240px, 256px"
              className="object-cover grayscale contrast-110 brightness-95 scale-[1.06]"
            />
          </div>
        </div>

        {/* Back Face: Red Background Color Portrait */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-border bg-card p-2 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted">
            <Image
              src="/profile_red_v2.png"
              alt="Naivedya Raj Red Background Color Portrait"
              fill
              priority
              sizes="(max-width: 768px) 208px, (max-width: 1200px) 240px, 256px"
              className="object-cover scale-[1.06]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
