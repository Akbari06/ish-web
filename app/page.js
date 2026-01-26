"use client";

import { useState } from "react";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import faqs from "./data/faqs.json";

export default function Home() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
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
          {["experience", "projects", "faq", "contact"].map((tab) => (
            <button
              key={tab}
              className={`tabButton ${activeTab === tab ? "active" : ""}`}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <div className="meta">Portfolio · dev/tech</div>
          <h1>An Enjoyer of Novelty</h1>
          <p>
  Founded MathsWithIsh, a platform with 300k+ views helping A level students excel in Maths and Further Maths, with many improving from C/D to A/A*.
</p>

<p>
  As CS Lead @ Manchester MedTech, the #1 ranked student society, I led a 4 week course teaching Python and AI tools like Claude to help medical students build impactful software.
</p>

<p>
  The course helped lead to a sold out Manchester MedTech hackathon, with tickets sold out under 12 hours, making it the largest student led MedTech hackathon in North of England.
</p>

<p>
  I enjoy working across diverse projects, from hackathon winning charity platforms to low level systems work in C.
</p>

          <div className="heroActions">
            <a
              className="btn primary"
              href="#tabs"
              onClick={(event) => {
                event.preventDefault();
                setActiveTab("contact");
                document.getElementById("tabs")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact me
            </a>
            <a
              className="btn"
              href="#tabs"
              onClick={(event) => {
                event.preventDefault();
                setActiveTab("projects");
                document.getElementById("tabs")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View projects
            </a>
          </div>
        </div>
        <div className="heroVisual">
          <div className="portrait" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none">
              <defs>
                <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6ee7ff" />
                  <stop offset="1" stopColor="#ffd166" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="74" stroke="url(#stroke)" strokeWidth="2" />
              <path
                d="M70 120c10 16 24 26 44 26s34-10 46-28"
                stroke="#d5dbe2"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M70 86c8-20 22-30 42-30 24 0 40 12 48 36"
                stroke="#8b97a3"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="86" cy="100" r="6" fill="#d5dbe2" />
              <circle cx="120" cy="100" r="6" fill="#d5dbe2" />
              <path
                d="M50 140h100"
                stroke="#212a33"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M60 60h20M120 60h20"
                stroke="#6ee7ff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>

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
            id="faq"
            className={`tabPanel ${activeTab === "faq" ? "active" : ""}`}
            role="tabpanel"
          >
            <div className="grid">
              {faqs.map((faq) => (
                <div className="card" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <div className="list">
                    <div>{faq.answer}</div>
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
  );
}
