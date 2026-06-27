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
  // We use a shorter scroll range on mobile (0 to 300) so the card settles into its slot quickly.
  const scrollRange = isMobile ? [0, 300] : [0, 500];

  // Map scroll progress to Y translation dynamically:
  // On desktop, we translate from -54% of viewport height.
  // On mobile, we translate from -96% of viewport height to pull the card up from its lower stacked position into the Hero section at the start.
  const desktopOffset = -(windowHeight * 0.54);
  const mobileOffset = -(windowHeight * 0.96);

  const yTranslate = useTransform(
    scrollY,
    scrollRange,
    [isMobile ? mobileOffset : desktopOffset, 0]
  );

  // Map scroll progress to 3D RotateY (flip from 0deg to 180deg)
  const rotateY = useTransform(scrollY, scrollRange, [0, 180]);

  // Map scroll progress to scale: pinch down slightly in middle of flip for fluid feel
  const scale = useTransform(
    scrollY,
    isMobile ? [0, 150, 300] : [0, 250, 500],
    [1, 0.92, 1]
  );

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
