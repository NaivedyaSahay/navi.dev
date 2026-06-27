"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, BookMarked, Code2 } from "lucide-react";

interface Project {
  title: string;
  desc: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
}

interface Repository {
  name: string;
  desc: string;
  stars: number;
  forks: number;
  lang: string;
  langColor: string;
  url: string;
}

export default function Projects() {
  const featuredProjects: Project[] = [
    {
      title: "NavDay Habit Tracker",
      desc: "A clean, modern habit-tracking web application designed for personal routine progression. Features daily logging checkboxes, completion rate stats, streak trackers, and local data caching.",
      tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Bootstrap"],
      github: "https://github.com/NaivedyaSahay/NavDay",
      demo: "https://nav-day.vercel.app",
      image: "/nav-day.png",
    },
    {
      title: "NavUno",
      desc: "Interactive web-based single-screen UNO card game. Features standard UNO gameplay mechanics, card hand deals, dynamic draw card deck triggers, and responsive layout scaling.",
      tech: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
      github: "https://github.com/NaivedyaSahay/NaviUno",
      demo: "https://navi-uno.onrender.com/",
      image: "/nav-uno.png",
    },
    {
      title: "Mind Jutsu Game",
      desc: "A browser-based color sequence memory challenge game. Engineered with randomized speed progression, click checks, sound alerts, CSS flash card visuals, and direct Vercel deployment.",
      tech: ["JavaScript", "HTML5", "CSS3", "Vercel"],
      github: "https://github.com/NaivedyaSahay/Mind-Jutsu",
      demo: "https://mind-jutsu-v2.vercel.app/",
      image: "/mind-jutsu.png",
    },
    {
      title: "Stationery Management System",
      desc: "A scalable enterprise inventory and requisition tracking platform. Architected utilizing Spring Boot microservices, secure role-based JWT access controls, Spring Cloud service registry, API Gateway routing, and automated Jenkins/Docker CI/CD pipelines.",
      tech: ["Spring Boot", "Microservices", "Spring Security", "MySQL", "Docker", "Jenkins"],
      github: "https://github.com/cser-naivedya-raj/Stationery-Management-System",
      demo: "https://github.com/cser-naivedya-raj/Stationery-Management-System",
      image: "/stationery-management.png",
    },
    {
      title: "NaviGator",
      desc: "A full-stack property listing and reviews platform inspired by Airbnb. Developed a RESTful API to manage listings, reviews, and authentication, and engineered a responsive server-side rendered UI with EJS.",
      tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
      github: "https://github.com/NaivedyaSahay/NaviGator",
      demo: "https://github.com/NaivedyaSahay/NaviGator",
      image: "/navigator.png",
    },
  ];

  const githubRepos: Repository[] = [
    {
      name: "NavDay",
      desc: "Minimalist habit tracker focusing on routine building, streak counting, and LocalStorage data caching.",
      stars: 15,
      forks: 3,
      lang: "JavaScript",
      langColor: "bg-yellow-500",
      url: "https://github.com/NaivedyaSahay/NavDay",
    },
    {
      name: "NaviUno",
      desc: "Web-based responsive UNO card game showcasing DOM events, CSS card layers, and score logs.",
      stars: 22,
      forks: 4,
      lang: "JavaScript",
      langColor: "bg-yellow-500",
      url: "https://github.com/NaivedyaSahay/NaviUno",
    },
    {
      name: "Stationery-Management-System",
      desc: "Stationery Management System utilizing Spring Boot microservices, Spring Security JWT/RBAC, Eureka registry, and Docker.",
      stars: 18,
      forks: 3,
      lang: "Java",
      langColor: "bg-amber-600",
      url: "https://github.com/cser-naivedya-raj/Stationery-Management-System",
    },
  ];

  // Helper to generate simulated GitHub contribution data
  // 53 weeks * 7 days = 371 squares. We'll generate different activity levels (0 to 4)
  const generateContributions = () => {
    const data = [];
    for (let i = 0; i < 371; i++) {
      // Deterministic pseudo-random generation based on index i
      // This ensures identical grids on server and client, resolving SSR hydration errors.
      const x = Math.sin(i + 1) * 10000;
      const val = x - Math.floor(x); // fractional part between 0 and 1
      
      let activity = 0;
      if (val > 0.45) activity = 1;
      if (val > 0.72) activity = 2;
      if (val > 0.88) activity = 3;
      if (val > 0.96) activity = 4;
      
      data.push(activity);
    }
    return data;
  };

  const contributions = generateContributions();

  return (
    <section id="projects" className="py-24 px-6 relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            05 // CREATIONS
          </span>
          <h2 className="text-reveal font-black tracking-tighter text-5xl uppercase mt-4">
            Featured Projects
          </h2>
        </div>

        {/* Alternating Showcase List */}
        <div className="flex flex-col gap-24 lg:gap-32 mb-32">
          {featuredProjects.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card/60 backdrop-blur-md p-3 group shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Text Details Column */}
                <div
                  className={`lg:col-span-5 flex flex-col items-start gap-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-3"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                      CASE_STUDY_0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight hover-link">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      {proj.desc}
                    </p>
                  </motion.div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded border border-border bg-muted/30 text-[10px] font-mono text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border bg-card hover:bg-muted transition-colors rounded-xl px-4 py-2.5 text-xs text-foreground hover-link"
                    >
                      <Github className="w-4 h-4" />
                      Repository
                    </a>
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-foreground text-background hover:opacity-90 transition-colors rounded-xl px-4 py-2.5 text-xs font-semibold hover-link"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub Graph & Repo Showcase Sub-Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-dashed border-border/80">
          
          {/* GitHub Activity Graph (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                // SYSTEM TELEMETRY
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider mt-1">
                GitHub Contributions
              </h3>
            </div>

            <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4">
              {/* Contribution statistics banner */}
              <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-muted-foreground border-b border-border/60 pb-3">
                <span className="text-foreground font-bold">1,824 contributions in the last year</span>
                <div className="flex gap-4">
                  <span>Longest Streak: <strong className="text-foreground">47 days</strong></span>
                  <span>Active Streak: <strong className="text-foreground">12 days</strong></span>
                </div>
              </div>

              {/* Grid Scroll wrap (for mobile responsiveness) */}
              <div className="overflow-x-auto scrollbar-none">
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[530px]">
                  {contributions.map((act, index) => {
                    const bgColors = [
                      "bg-muted/40", // Level 0
                      "bg-emerald-950/30 dark:bg-emerald-950/40 border border-emerald-950/20", // Level 1
                      "bg-emerald-800/40 dark:bg-emerald-800/50", // Level 2
                      "bg-emerald-600/70 dark:bg-emerald-600/60", // Level 3
                      "bg-emerald-500 dark:bg-emerald-400", // Level 4
                    ];
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        className={`w-[8px] h-[8px] rounded-[1px] transition-colors ${bgColors[act]}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Graph Legend */}
              <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/80 mt-2">
                <span>Jan 2025 - Dec 2025</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-muted/40" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-950/40" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-800/50" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-600/60" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Algorithmic Telemetry / DSA Card */}
            <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 mt-6">
              <div className="flex flex-col gap-1 text-left w-full sm:w-auto">
                <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-muted-foreground" /> // ALGORITHMIC TELEMETRY
                </span>
                <h3 className="font-sans text-3xl font-black tracking-tight mt-1.5 flex items-baseline gap-2">
                  180+
                  <span className="text-xs text-muted-foreground font-normal uppercase tracking-wider">
                    DSA Problems Solved
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-light max-w-sm">
                  Active problem solving across LeetCode & GeeksforGeeks, with strong foundations in algorithms and data structures.
                </p>
              </div>

              {/* Progress metrics */}
              <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-start shrink-0">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Easy</span>
                  <span className="font-mono font-bold text-[11px] text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5 px-2.5 py-1 rounded-lg border border-emerald-500/20">75 Solved</span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Medium</span>
                  <span className="font-mono font-bold text-[11px] text-amber-500 bg-amber-500/10 dark:bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/20">90 Solved</span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Hard</span>
                  <span className="font-mono font-bold text-[11px] text-rose-500 bg-rose-500/10 dark:bg-rose-500/5 px-2.5 py-1 rounded-lg border border-rose-500/20">15 Solved</span>
                </div>
              </div>
            </div>

          </div>

          {/* GitHub Repositories (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                // CODEBASES
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider mt-1">
                Open Source Repositories
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {githubRepos.map((repo, idx) => (
                <motion.a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, borderColor: "var(--foreground)" }}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-card/45 backdrop-blur-md p-4 transition-all duration-300 hover-link group"
                >
                  {/* Repo title */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold font-mono tracking-tight text-foreground group-hover:text-foreground">
                      <BookMarked className="w-3.5 h-3.5 text-muted-foreground" />
                      {repo.name}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                      {repo.lang}
                    </span>
                  </div>

                  {/* Repo description */}
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                    {repo.desc}
                  </p>

                  {/* Stars and Forks */}
                  <div className="flex gap-4 mt-1.5 text-[10px] font-mono text-muted-foreground/80">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
