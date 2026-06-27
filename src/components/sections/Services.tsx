"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Cpu,
  Layers,
  Zap,
  Bot,
  Route,
  ArrowUpRight,
} from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Full Stack Development",
      desc: "End-to-end web applications crafted with Next.js, React, Node.js, and modern databases. Structured for scale, performance, and optimal SEO metrics.",
      features: ["Serverless Architectures", "Modern State Management", "SEO & Core Web Vitals Optimization"],
    },
    {
      icon: <Route className="w-5 h-5" />,
      title: "API Development & Integration",
      desc: "Robust, documented, and secure RESTful and GraphQL APIs built using Express, Spring Boot, or Next.js server actions. Connected with external SaaS APIs.",
      features: ["OAuth / JWT Authentication", "Rate Limiting & Security", "Comprehensive OpenAPI / Swagger Docs"],
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Backend Architecture",
      desc: "Designing scalable database structures, query optimization, and background workers using PostgreSQL, Redis, and message queues for load balancing.",
      features: ["Database Normalization & Indexing", "Caching Strategies with Redis", "Scalable Job Queues"],
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "UI / UX Development",
      desc: "Turning design specs from Figma or Framer into interactive code with pixel-perfect layouts, responsive typography, and fluid 60fps animations.",
      features: ["Component Library Architecture", "Framer Motion Animations", "Responsive Mobile-First Design"],
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Performance Optimization",
      desc: "Auditing and diagnosing slower web apps. Reducing bundle sizes, lazy loading routes, optimizing assets, and caching queries to target 95+ Lighthouse scores.",
      features: ["Static & Dynamic Render Tuning", "Asset Compression & Caching", "Webpack / Vite Bundle Shrinking"],
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI & Model Integration",
      desc: "Leveraging LLMs and cognitive APIs (OpenAI, Gemini, Anthropic) within production web systems. Setting up structured JSON responses, vector databases, and semantic search.",
      features: ["Model RAG Orchestration", "Vector Database Indexing (Pinecone/pgvector)", "Prompt Engineering & Structured Outputs"],
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
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 16,
      },
    },
  } as const;

  return (
    <section id="services" className="py-24 px-6 relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            04 // SERVICES
          </span>
          <h2 className="text-reveal font-black tracking-tighter text-5xl uppercase mt-4">
            Professional Services
          </h2>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: "var(--foreground)" }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/45 backdrop-blur-md p-7 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-2xl"
            >
              <div>
                {/* Header Icon & Arrow Link */}
                <div className="flex items-center justify-between mb-6">
                  <span className="p-3 bg-muted rounded-xl text-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    {service.icon}
                  </span>
                  <span className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>

                {/* Title and description */}
                <h3 className="text-base font-bold uppercase tracking-wide mb-3">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Service Features list */}
              <div>
                <ul className="flex flex-col gap-2 pt-4 border-t border-dashed border-border/80">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-[10px] text-muted-foreground/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
