"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Mail,
  FileText,
  Github,
  Home,
  User,
  Cpu,
  Layers,
  FolderGit2,
  Briefcase,
  MessageSquare,
  BookText,
} from "lucide-react";

interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollIntoSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("naivedyasahay@gmail.com");
    alert("Email copied to clipboard!");
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    {
      id: "go-home",
      name: "Go to Home",
      category: "Navigation",
      icon: <Home className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("home"),
    },
    {
      id: "go-about",
      name: "Go to About",
      category: "Navigation",
      icon: <User className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("about"),
    },
    {
      id: "go-skills",
      name: "Go to Skills",
      category: "Navigation",
      icon: <Cpu className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("skills"),
    },
    {
      id: "go-services",
      name: "Go to Services",
      category: "Navigation",
      icon: <Layers className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("services"),
    },
    {
      id: "go-projects",
      name: "Go to Projects",
      category: "Navigation",
      icon: <FolderGit2 className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("projects"),
    },
    {
      id: "go-experience",
      name: "Go to Experience",
      category: "Navigation",
      icon: <Briefcase className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("experience"),
    },

    {
      id: "go-contact",
      name: "Go to Contact",
      category: "Navigation",
      icon: <Mail className="w-4.5 h-4.5" />,
      action: () => scrollIntoSection("contact"),
    },
    {
      id: "action-theme",
      name: `Switch to ${theme === "light" ? "Dark" : "Light"} Mode`,
      category: "System Actions",
      icon: theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: "action-email",
      name: "Copy Email Address",
      category: "Quick Actions",
      icon: <Mail className="w-4.5 h-4.5" />,
      action: copyEmail,
    },
    {
      id: "action-resume",
      name: "Download Resume PDF",
      category: "Quick Actions",
      icon: <FileText className="w-4.5 h-4.5" />,
      action: () => {
        window.open("#", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "action-github",
      name: "View GitHub Profile",
      category: "Quick Actions",
      icon: <Github className="w-4.5 h-4.5" />,
      action: () => {
        window.open("https://github.com", "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      // Handle list navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Auto scroll list item into view when keyboard navigating
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-hidden text-sm"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div
              ref={listRef}
              className="max-h-[320px] overflow-y-auto p-2 scrollbar-none"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-all duration-150 ${
                        isActive
                          ? "bg-foreground text-background font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? "text-background" : "text-muted-foreground"}>
                          {cmd.icon}
                        </span>
                        <span>{cmd.name}</span>
                        <span
                          className={`text-[10px] rounded px-1.5 py-0.5 ${
                            isActive
                              ? "bg-background/25 text-background"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {cmd.category}
                        </span>
                      </div>
                      {isActive && (
                        <motion.span
                          layoutId="cmd-arrow"
                          className="text-background flex items-center gap-1 text-[10px]"
                        >
                          Select <ArrowRight className="w-3 h-3" />
                        </motion.span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No commands found matching "{search}"
                </div>
              )}
            </div>

            {/* Footer / Tip */}
            <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-[10px] text-muted-foreground">
              <span>Use arrow keys to navigate, enter to select.</span>
              <span className="hidden sm:inline">Press Ctrl+K to toggle anytime.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
