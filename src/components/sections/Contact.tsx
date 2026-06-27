"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, Copy, Send, Check, AlertCircle, Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("naivedyasahay@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic verification
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMsg("Please fill out all fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "27414074-78be-4e18-8954-2b3f5bf35fff",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: `${formData.name} via Portfolio`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Trigger premium celebration confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#000000", "#71717a"], // Match minimal black/white/gray color scheme
      });
      
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative border-t border-border bg-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            09 // CONNECT
          </span>
          <h2 className="text-reveal font-black tracking-tighter text-5xl uppercase mt-4">
            Get In Touch
          </h2>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Info & Copy Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold uppercase tracking-wide">
                Let's construct something outstanding together.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Feel free to reach out if you have an application project in mind, want to discuss technical architectures, or simply talk shop. I am generally responsive within 24 hours.
              </p>

              {/* Specs List */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-3.5 text-xs text-muted-foreground">
                  <span className="p-2.5 bg-muted rounded-xl text-foreground">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">Email Address</span>
                    <span className="font-medium text-foreground">naivedyasahay@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-xs text-muted-foreground">
                  <span className="p-2.5 bg-muted rounded-xl text-foreground">
                    <MapPin className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">Location</span>
                    <span className="font-medium text-foreground">Patna, Bihar</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-xs text-muted-foreground">
                  <span className="p-2.5 bg-muted rounded-xl text-foreground">
                    <Briefcase className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">Current Status</span>
                    <span className="font-medium text-foreground">Open to Internships & Junior Roles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions (Copy Email and Socials) */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 flex-wrap">
                {/* Copy Email Button */}
                <button
                  onClick={copyEmailToClipboard}
                  className="flex items-center gap-2 px-5 py-3 border border-border bg-card hover:bg-muted transition-colors rounded-xl text-xs font-semibold hover-link"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      Copied Address!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Email Address
                    </>
                  )}
                </button>
              </div>

              {/* Social icons */}
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
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:border-foreground/25 transition-colors duration-300 shadow-lg">
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={status === "loading"}
                    placeholder="Jane Doe"
                    className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs outline-hidden focus:border-foreground transition-colors disabled:opacity-50"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={status === "loading"}
                    placeholder="jane@example.com"
                    className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs outline-hidden focus:border-foreground transition-colors disabled:opacity-50"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={status === "loading"}
                    placeholder="Partnership proposal / Freelance project"
                    className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs outline-hidden focus:border-foreground transition-colors disabled:opacity-50"
                    required
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={status === "loading"}
                    placeholder="Hey Alex, let's connect..."
                    className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-xs outline-hidden focus:border-foreground transition-colors disabled:opacity-50 resize-none"
                    required
                  />
                </div>

                {/* Status indicators */}
                {status === "error" && (
                  <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl p-3 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 rounded-xl p-3 text-xs">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Your message has been sent successfully. Thank you!</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-semibold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed hover-link mt-2"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      Transmit Message
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
