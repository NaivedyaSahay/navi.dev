"use client";

import React from "react";
import { motion } from "framer-motion";
import Counter from "../ui/Counter";
import { Coffee, Music, Heart, Code2, ArrowUpRight, Award } from "lucide-react";
import FlippingProfileCard from "../ui/FlippingProfileCard";

export default function About() {
  const funFacts = [
    { icon: <Coffee className="w-4 h-4 text-muted-foreground" />, text: "Fueled by single-origin espresso and dark chocolate." },
    { icon: <Music className="w-4 h-4 text-muted-foreground" />, text: "Coding playlist consists of Synthwave, Ambient, and Lo-Fi." },
    { icon: <Code2 className="w-4 h-4 text-muted-foreground" />, text: "Enjoys contributing to open-source developer toolings." },
    { icon: <Heart className="w-4 h-4 text-muted-foreground" />, text: "Passionate about typography, UI polish, and micro-interactions." },
  ];

  const milestones = [
    {
      year: "Jan 2026 - June 2026",
      title: "Java Backend Trainee // Capgemini",
      desc: "Engineered a scalable microservices Stationery Management System. Implemented JWT/RBAC security, Eureka Service registries, API Gateways, and Jenkins/Docker CI/CD pipelines.",
    },
    {
      year: "2022 - 2026",
      title: "B.Tech - Computer Science & Engineering // JECRC University",
      desc: "Specialized in Core Computer Science principles, algorithms, operating systems, OOPS (Java), and DBMS. Jaipur, Rajasthan. CGPA: 8.2 / 10.0.",
    },
    {
      year: "2020 - 2021",
      title: "Senior Secondary // Baldwin Academy",
      desc: "Completed Senior Secondary education with a score of 87.5% in Patna, Bihar.",
    },
    {
      year: "2010 - 2019",
      title: "Secondary // St Xavier’s High School",
      desc: "Completed Secondary education with a score of 87% in Patna, Bihar.",
    },
  ];

  const stats = [
    { value: 4, suffix: " + Projects", label: "Completed" },
    { value: 12, suffix: "+ Techs", label: "Mastered" },
    { value: 60, suffix: "K+", label: "Lines of Code Written" },
    { value: 99, suffix: ".9%", label: "Coffee Conversion" },
  ];

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-24 px-6 relative border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Main 3-Column Introduction Grid (From User Screenshots) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Left Copy (Col-span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-reveal font-black tracking-tighter text-6xl uppercase"
            >
              Hey!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-foreground font-medium leading-relaxed"
            >
              I'm Naivedya, a Computer Science undergraduate and full stack developer based in Patna, Bihar, passionate about building scalable, high-performance web systems.
            </motion.p>
          </div>

          {/* Center Column: Flipping Profile Card (Col-span 4) */}
          <div className="lg:col-span-4 flex justify-center py-6 lg:py-0 relative z-20">
            <FlippingProfileCard />
          </div>

          {/* Right Column: Detailed Copy & CTA (Col-span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs text-muted-foreground leading-relaxed font-light"
            >
              I'm a software engineer specializing in Java, Spring Boot microservices, Node.js backend frameworks, and interactive frontend development. I have hands-on experience as a Java Backend Trainee at Capgemini.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs text-muted-foreground leading-relaxed font-light"
            >
              Over the years, I've created and shipped multiple full-stack applications, interactive games, and developer utilities, focused on delivering clean code and robust systems.
            </motion.p>
            
            {/* Get Started CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2"
            >
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-3 border border-border bg-card/60 backdrop-blur-md text-foreground font-semibold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:bg-muted active:scale-95 hover-link"
              >
                Get Started
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

        </div>

        {/* Pathway & Statistics Grid (Sub-Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-16 border-t border-dashed border-border/40">
          
          {/* Left: Milestones */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              02 // PATHWAY
            </span>
            
            <div className="relative border-l border-border pl-6 flex flex-col gap-8">
              {milestones.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  <span className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-border group-hover:bg-foreground transition-colors duration-300" />
                  
                  <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-bold tracking-tight mt-1 hover-link">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Fun Facts and Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            {/* Fun Facts */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-medium">
                // INTERPERSONAL STATS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {funFacts.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -2, borderColor: "rgba(var(--foreground), 0.2)" }}
                    className="flex gap-3 items-start p-4 rounded-xl border border-border bg-card/45 backdrop-blur-xs transition-colors"
                  >
                    <span className="p-2 bg-muted rounded-lg shrink-0">{fact.icon}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">{fact.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 border border-border bg-card/40 backdrop-blur-md rounded-2xl p-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1 p-2 text-left">
                  <span className="font-mono text-2xl md:text-3xl text-foreground font-black tracking-tighter">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
