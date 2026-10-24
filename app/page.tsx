"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import experience from "./data/experience.json";
import education from "./data/education.json";

type Link = { name: string; url: string };
type Entry = {
  start: string;
  end: string;
  title: string;
  description: string;
  now?: boolean;
  links?: Link[];
};

function joinLinks(links: Link[]) {
  return links.map((link, i) => (
    <span key={link.url}>
      {i > 0 && (i === links.length - 1 ? " and " : ", ")}
      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
    </span>
  ));
}

function DatedList({ items }: { items: Entry[] }) {
  return (
    <ul className="dated">
      {items.map((item) => (
        <li key={item.title}>
          <span className="d">
            {item.start}
            <span className="to"> – {item.end}</span>
          </span>
          <span>
            <span className="t">{item.title}</span>
            {item.now && <span className="now-tag">now</span>}
            <span className="s">
              {item.description}
              {item.links && <> {joinLinks(item.links)}.</>}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <>
      <header className="site-header">
        <div className="head-in">
          <div className="row">
            <a className="brand" href="#top">Ishtiaque Akbar</a>
            <button className="theme" onClick={toggleTheme} type="button" aria-label="Toggle theme">
              ◐ <span>{theme}</span>
            </button>
          </div>
          <nav aria-label="Sections">
            <a className="on" href="#top">/</a>
            <a href="#experience">experience</a>
            <a href="#education">education</a>
            <a href="#thoughts">thoughts</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="top">
          <Image
            src="/me.jpg"
            alt="Ishtiaque Akbar walking past Liverpool Street station at night"
            width={900}
            height={1200}
            priority
          />
          <div className="right-now">
            <div className="k">right now</div>
            <div><span className="dot" />sde intern @ amazon, london</div>
            <div>living room players team</div>
            <div>prev. swe intern @ google, munich</div>
            <div>cs &amp; maths @ manchester</div>
          </div>
        </section>

        <h1>hi, i&apos;m ish</h1>
        <div className="roles">student<span>·</span>software engineer</div>

        <p>just a guy from preston. living in london rn, was in munich before that.</p>
        <p>
          i&apos;ve written code for{" "}
          <a href="https://about.google" target="_blank" rel="noopener noreferrer">google</a> and{" "}
          <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">amazon</a>.
        </p>
        <p>used to teach a level maths for a bit (mathswithish).</p>
        <p>i like: prompting, travelling and long walks.</p>
        <p>open to cool opportunities where i can learn and grow as best as possible.</p>
        <p className="contact">
          <a href="https://github.com/Akbari06" target="_blank" rel="noopener noreferrer">github</a>
          <span>·</span>
          <a href="https://www.linkedin.com/in/ishtiaqueakbar/" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span>·</span>
          <a href="mailto:akbarishtiaque@gmail.com">akbarishtiaque@gmail.com</a>
        </p>

        <h2 id="experience">experience</h2>
        <DatedList items={experience as Entry[]} />

        <h2 id="education">education</h2>
        <DatedList items={education as Entry[]} />

        <h2 id="thoughts">thoughts <small>// coming soon</small></h2>
        <ul className="dated">
          <li>
            <span className="d">--/--</span>
            <span className="s">first post on its way.</span>
          </li>
        </ul>

        <footer>
          <span className="sign">welcome to my corner of the internet.</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>
    </>
  );
}
