"use client";

import { useState, useEffect } from "react";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import AnoAI from "@/components/ui/animated-shader-background";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="glass-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="40" xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.35, pointerEvents: 'none' }}>
        <AnoAI />
      </div>
    <div className="page">
      <header>
          <div className="logo">
          <div className="logoBadge">&lt;/&gt;</div>
          <div>
            <div>Ishtiaque Akbar</div>
            <div className="logoMeta">Software Engineer</div>
          </div>
        </div>
        <div className="topTabs" role="tablist" aria-label="Portfolio sections">
          {["experience", "projects", "contact"].map((tab) => (
            <button
              key={tab}
              className={`tabButton ${activeTab === tab ? "active" : ""}`}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
                setTimeout(() => {
                  document.getElementById("tabs")?.scrollIntoView({ behavior: "smooth" });
                }, 10);
              }}
              type="button"
            >
              {tab === "experience" ? "Exp." : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="tabButton"
            aria-label="Toggle theme"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 12px" }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      <section className="hero">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <div className="heroCopy">
          <h1>Novelty Lover</h1>
          <p>
  CS and Maths student at the University of Manchester, incoming Software Engineering Intern at Google and Amazon.
</p>

<p>
  Founded MathsWithIsh, a platform with 300k+ views helping A level students improve from C / D to A / A* in Maths.
</p>

<p>
  As CS Lead at Manchester MedTech, delivered a four week Python and AI course that led to a sold out hackathon in under 12 hours, the largest student led MedTech event in the North of England.
</p>

        </div>
        <div className="heroVisual">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      <div style={{
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--stroke)',
        boxShadow: 'var(--shadow)',
      }}>
        <Image
          src="/collage.jpg"
          alt="collage"
          width={3000}
          height={3000}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          draggable={false}
        />
      </div>

      <section className="tabs" id="tabs" aria-label="Portfolio tabs">
        <div className="tabPanels">
          <div
            id="experience"
            className={`tabPanel ${activeTab === "experience" ? "active" : ""}`}
            role="tabpanel"
          >
            <div className="grid">
              {experience.map((item) => (
                <div className="card" key={item.title}>
                  <div className="meta">{item.range}</div>
                  <h3>{item.title}</h3>
                  <div className="list">
                    {item.points.map((point) => (
                      <div key={point}>{point}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div
            id="projects"
            className={`tabPanel ${activeTab === "projects" ? "active" : ""}`}
            role="tabpanel"
          >
            <div className="grid">
              {projects.map((project) => (
                <div className="card" key={project.title}>
                  <div className="meta">{project.tag}</div>
                  <h3>{project.title}</h3>
                  <div className="list">
                    {project.points.map((point) => (
                      <div key={point}>{point}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

<div
            id="contact"
            className={`tabPanel ${activeTab === "contact" ? "active" : ""}`}
            role="tabpanel"
          >
            <div className="grid two">
              <div className="card">
                <div className="meta">Contact</div>
                <h3>Let’s build something memorable.</h3>
                <div className="list">
                  <div>Email: <a href="mailto:akbarishtiaque@gmail.com">akbarishtiaque@gmail.com</a></div>
                  <div>Location: United Kingdom · Open to remote</div>
                </div>
              </div>
              <div className="card">
                <div className="meta">Elsewhere</div>
                <h3>Find me online</h3>
                <div className="list">
                  <div>GitHub: <a href="https://github.com/Akbari06" target="_blank" rel="noopener noreferrer">github.com/Akbari06</a></div>
                  <div>LinkedIn: <a href="https://www.linkedin.com/in/ishtiaqueakbar/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ishtiaqueakbar</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>

    </>
  );
}
