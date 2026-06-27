import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naivedya Raj | Software Engineer & Full Stack Developer",
  description: "Creative portfolio of Naivedya Raj, a Software Engineer & Full Stack Developer building scalable, elegant, and high-performance digital experiences.",
  keywords: ["Software Engineer", "Full Stack Developer", "Next.js Portfolio", "React Developer", "Java Developer", "Spring Boot", "Microservices"],
  authors: [{ name: "Naivedya Raj" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <div className="noise-overlay" />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
