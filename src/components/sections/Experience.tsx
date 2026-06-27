"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

interface Job {
  company: string;
  role: string;
  duration: string;
  points: string[];
  tech: string[];
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const jobs: Job[] = [
    {
      company: "Capgemini",
      role: "Java Backend Trainee",
      duration: "Jan 2026 - June 2026",
      points: [
        "Engineered a scalable Stationery Management System utilizing a modern Spring Boot microservices architecture to streamline inventory tracking and request fulfillment processes.",
        "Implemented robust security and access control utilizing Spring Security, integrating JWT token-based authentication and Role-Based Access Control (RBAC).",
        "Orchestrated inter-service communication and centralized configuration utilizing Spring Cloud components, including Eureka Service Registry and API Gateway.",
        "Established an automated CI/CD pipeline leveraging Jenkins and Docker containerization to streamline the application's build, test, and deployment lifecycle.",
      ],
      tech: ["Spring Boot", "Microservices", "Spring Security", "JWT", "Spring Cloud", "Eureka", "API Gateway", "Docker", "Jenkins"],
    },
    {
      company: "JECRC University",
      role: "B.Tech - Computer Science & Engineering",
      duration: "2022 - 2026",
      points: [
        "Acquiring strong foundations in Core Computer Science: Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems, and OOPs (Java).",
        "Engaging in interactive web engineering practices and developing portfolio projects (NaviGator, NavDay, NaviUno).",
        "Achieving and maintaining a strong academic score with a CGPA of 8.2 / 10.0.",
      ],
      tech: ["Java", "JavaScript", "SQL", "HTML5", "CSS3", "MongoDB", "Express.js", "Node.js"],
    },
  ];

  // Animate the vertical timeline bar as you scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" ref={containerRef} className="py-24 px-6 relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            06 // CHRONOLOGY
          </span>
          <h2 className="text-reveal font-black tracking-tighter text-5xl uppercase mt-4">
            Professional Experience
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          
          {/* Animated Vertical Timeline Line */}
          <motion.div
            className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-[2px] bg-foreground origin-top"
            style={{ scaleY }}
          />

          {/* Fallback Static Timeline Line (Muted Background) */}
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-[2px] bg-border -z-10" />

          {/* Experience Cards */}
          <div className="flex flex-col gap-16">
            {jobs.map((job, idx) => {
              const delay = idx * 0.1;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay }}
                  className="relative group"
                >
                  {/* Outer Pulsing Timeline Dot */}
                  <div className="absolute -left-[30px] sm:-left-[39px] top-2 flex items-center justify-center">
                    <span className="relative flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-border opacity-75 group-hover:scale-125 group-hover:bg-foreground transition-all duration-300"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-background border-2 border-border group-hover:border-foreground transition-all duration-300"></span>
                    </span>
                  </div>

                  {/* Card Content wrapper */}
                  <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:border-foreground/35 hover:shadow-2xl transition-all duration-300">
                    
                    {/* Header info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/80 pb-4 mb-5">
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 bg-muted rounded-lg shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <Briefcase className="w-4 h-4" />
                        </span>
                        <div>
                          <h3 className="text-base font-bold uppercase tracking-wide group-hover:text-foreground">
                            {job.role}
                          </h3>
                          <span className="text-xs text-muted-foreground font-mono">
                            {job.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground bg-muted/40 px-3 py-1 rounded-full w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        {job.duration}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="flex flex-col gap-3 mb-6">
                      {job.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2.5">
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="font-light">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Job Tech tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-dashed border-border/60">
                      {job.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded border border-border bg-card/60 text-[9px] font-mono text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
