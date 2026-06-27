"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Server, Database, Cloud, Cpu, Terminal } from "lucide-react";

interface SkillItem {
  name: string;
  level: string; // e.g. "90%", "Intermediate", etc.
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <Terminal className="w-5 h-5" />,
      skills: [
        { name: "Java", level: "Expert" },
        { name: "JavaScript", level: "Expert" },
        { name: "SQL", level: "Advanced" },
        { name: "HTML5", level: "Expert" },
        { name: "CSS3", level: "Expert" },
      ],
    },
    {
      title: "Backend & Frameworks",
      icon: <Server className="w-5 h-5" />,
      skills: [
        { name: "Spring Boot", level: "Expert" },
        { name: "Microservices", level: "Advanced" },
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "Bootstrap", level: "Advanced" },
        { name: "EJS", level: "Advanced" },
      ],
    },
    {
      title: "Databases & ORM",
      icon: <Database className="w-5 h-5" />,
      skills: [
        { name: "MySQL", level: "Advanced" },
        { name: "MongoDB", level: "Advanced" },
        { name: "Hibernate ORM", level: "Advanced" },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <Cloud className="w-5 h-5" />,
      skills: [
        { name: "Docker", level: "Advanced" },
        { name: "Jenkins", level: "Intermediate" },
        { name: "Git / GitHub", level: "Expert" },
        { name: "Postman", level: "Advanced" },
        { name: "Chrome DevTools", level: "Advanced" },
        { name: "VS Code", level: "Expert" },
      ],
    },
    {
      title: "Core Coursework",
      icon: <Code className="w-5 h-5" />,
      skills: [
        { name: "DSA", level: "Advanced" },
        { name: "Operating Systems", level: "Advanced" },
        { name: "OOPS (Java)", level: "Expert" },
        { name: "DBMS", level: "Advanced" },
        { name: "Computer Networks", level: "Intermediate" },
        { name: "Software Eng.", level: "Advanced" },
      ],
    },
    {
      title: "Soft Skills",
      icon: <Cpu className="w-5 h-5" />,
      skills: [
        { name: "Problem Solving", level: "Expert" },
        { name: "Humble", level: "Expert" },
        { name: "Active Listening", level: "Expert" },
        { name: "Adaptability", level: "Expert" },
        { name: "Flexibility", level: "Expert" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 15 } },
  };

  return (
    <section id="skills" className="py-24 px-6 relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            03 // REPERTOIRE
          </span>
          <h2 className="text-reveal font-black tracking-tighter text-5xl uppercase mt-4">
            Technical Skills
          </h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCardIndex(idx)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/45 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl group"
            >
              {/* Animated glow background when hovered */}
              <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),var(--glow-color)_0%,transparent_50%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={
                  {
                    "--glow-color": "rgba(var(--foreground), 0.08)",
                  } as React.CSSProperties
                }
              />

              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 border-b border-border/80 pb-4 mb-5">
                  <span className="p-2.5 bg-muted rounded-xl text-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    {cat.icon}
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider">{cat.title}</h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg border border-border bg-card/60 backdrop-blur-xs text-[11px] font-mono font-medium text-muted-foreground hover:text-foreground hover:border-foreground/45 transition-all duration-200 cursor-default flex items-center justify-between gap-2"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[9px] px-1 bg-muted rounded-sm text-muted-foreground/80 font-sans">
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Minimal Tech Indicator Accent */}
              <div className="mt-8 pt-4 border-t border-dashed border-border/60 flex items-center justify-between text-[9px] font-mono text-muted-foreground/60">
                <span>INDEX_00{idx + 1}</span>
                <span>SYS_READY</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
