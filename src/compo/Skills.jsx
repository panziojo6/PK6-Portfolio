import { lazy, Suspense, useEffect, useState } from "react";
import { categories, techStack } from "../data/skillsData";
import { stackGroups } from "../data/site";
import { Reveal, Icon, SplitTitle } from "./ui.jsx";

const SkillsOrbit = lazy(() => import("./SkillsOrbit.jsx"));
const colors = ["#22d3ee", "#a78bfa", "#fbbf24"];
const icons = ["🧩", "🛰️", "🧠"];

export default function Skills() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const u = () => setCompact(mq.matches);
    u(); mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);
  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...techStack, ...techStack].map((t, i) => (
            <span className="marquee-item" key={i}><span>{t.icon}</span>{t.name}</span>
          ))}
        </div>
      </div>

      <section id="skills" data-section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Skills</span>
              <SplitTitle text="What I build with." hl={["build"]} />
            </div>
            <p className="section-note">Drag the orbit to explore. Each ring is a layer of the stack — from models and satellites to the cloud that runs them.</p>
          </Reveal>

          <div className="skills-layout">
            <Reveal className="skills-scene">
              <Suspense fallback={null}><SkillsOrbit compact={compact} /></Suspense>
              <div className="scene-hint"><Icon.Drag /> drag to rotate</div>
            </Reveal>

            <div className="practice-list">
              {categories.map((cat, i) => (
                <Reveal key={cat.title} delay={i * 0.08} className="practice" style={{ "--c": colors[i % colors.length] }}>
                  <h3><i>{icons[i % icons.length]}</i>{cat.title}</h3>
                  <ul>{cat.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="stack-groups">
            {stackGroups.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.05} className="stack-group">
                <h4>{g.group}</h4>
                <div className="tags">{g.items.map((it) => <span className="tag" key={it}>{it}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
