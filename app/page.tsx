"use client";

import { useState, useEffect } from "react";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import AnoAI from "@/components/ui/animated-shader-background";
import { Sun, Moon } from "lucide-react";
import { TypingEffect } from "@/components/ui/typing-effect";
import Image from "next/image";

type Company = { name: string; logo: string };
type ExperienceItem = {
  range: string;
  title: string;
  points: string[];
  logo?: string;
  companies?: Company[];
};
type ProjectItem = {
  tag: string;
  title: string;
  points: string[];
  github?: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("");
  const [theme, setTheme] = useState("dark");
  const [phase, setPhase] = useState(0);

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
                  if (activeTab === tab) {
                    setActiveTab("");
                  } else {
                    setActiveTab(tab);
                    setTimeout(() => {
                      document.getElementById("tabs")?.scrollIntoView({ behavior: "smooth" });
                    }, 10);
                  }
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
            <h1>
              <TypingEffect
                texts={["Novelty Lover"]}
                typingSpeed={80}
                rotationInterval={999999}
                onDone={() => setPhase(1)}
                className="text-left justify-start font-[inherit] text-[inherit]"
              />
            </h1>
            <TypingEffect
              texts={["CS & Maths student @ University of Manchester, incoming SWE Intern at Google and Amazon."]}
              typingSpeed={20}
              rotationInterval={999999}
              active={phase >= 1}
              onDone={() => setPhase(2)}
              block
              className="para"
            />
            <TypingEffect
              texts={["I build things that get used, from MathsWithIsh (300k+ views) helping A level students jump from C/D to A/A*, to leading a Python and AI course at Manchester MedTech that led to the largest student led MedTech hackathon in the North of England."]}
              typingSpeed={20}
              rotationInterval={999999}
              active={phase >= 2}
              onDone={() => setPhase(3)}
              block
              className="para"
            />
            <TypingEffect
              texts={["Outside of that, I spend a lot of time at hackathons (5x winner), travelling, going on long walks, and tinkering with new ideas, usually turning them into projects."]}
              typingSpeed={20}
              rotationInterval={999999}
              active={phase >= 3}
              block
              className="para"
            />
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

        <section className="tabs" id="tabs" aria-label="Portfolio tabs" style={{ display: activeTab === "" ? "none" : "block" }}>
          <div className="tabPanels">
            <div
              id="experience"
              className={`tabPanel ${activeTab === "experience" ? "active" : ""}`}
              role="tabpanel"
            >
              <div className="grid">
                {(experience as ExperienceItem[]).map((item) => (
                  <div className="card" key={item.title}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div className="meta">{item.range}</div>
                      {item.logo && (
                        <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.logo} alt="" style={{ maxWidth: 24, maxHeight: 24, objectFit: 'contain' }} />
                        </div>
                      )}
                      {item.companies && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {item.companies.filter((c) => c.logo).map((c) => (
                            <div key={c.name} style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={c.logo} alt={c.name} title={c.name} style={{ maxWidth: 24, maxHeight: 24, objectFit: 'contain' }} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <h3>{item.title}</h3>
                    {item.companies && (
                      <div className="meta" style={{ marginBottom: 8, textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>
                        {item.companies.map((c) => c.name).join(' · ')}
                      </div>
                    )}
                    <ul className="list" style={{ paddingLeft: 16, listStyleType: 'disc' }}>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
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
                {(projects as ProjectItem[]).map((project) => (
                  <div className="card" key={project.title}>
                    <div className="meta">{project.tag}</div>
                    <h3>{project.title}</h3>
                    <div className="list">
                      {project.points.map((point) => (
                        <div key={point}>{point}</div>
                      ))}
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          marginTop: 14,
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: 12,
                          color: 'var(--muted)',
                          textDecoration: 'none',
                          border: '1px solid var(--stroke)',
                          borderRadius: 999,
                          padding: '4px 12px',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        GitHub →
                      </a>
                    )}
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
                  <h3>Let's build something memorable.</h3>
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
