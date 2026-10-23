import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories, techStack, practiceIcons, groupIcons } from "../data/skillsData";
import { stackGroups } from "../data/site";
import { Reveal, Icon, SplitTitle } from "./ui.jsx";
import { LuCheck } from "react-icons/lu";

const SkillsOrbit = lazy(() => import("./SkillsOrbit.jsx"));
const colors = ["#22d3ee", "#a78bfa", "#fbbf24"];

function Marquee({ items, reverse = false, speed = 48 }) {
  return (
    <div className={`marquee ${reverse ? "is-reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items].map((t, i) => (
          <span className="marquee-item" key={i} style={{ "--c": t.color }}><t.icon size={16} />{t.name}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const u = () => setCompact(mq.matches);
    u(); mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  const half = Math.ceil(techStack.length / 2);

  return (
    <>
      <div className="marquee-stack">
        <Marquee items={techStack.slice(0, half)} />
        <Marquee items={techStack.slice(half)} reverse speed={56} />
      </div>

      <section id="skills" data-section className="section">
        <span className="section-num" aria-hidden="true">03</span>
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow"><Icon.Sparkles size={14} /> Skills</span>
              <SplitTitle text="What I build with." hl={["build"]} />
            </div>
            <p className="section-note">Drag the orbit to explore. Each ring is a layer of the stack — from models and satellites to the cloud that runs them.</p>
          </Reveal>

          <div className="skills-layout">
            <Reveal className="skills-scene glow">
              <Suspense fallback={null}><SkillsOrbit compact={compact} /></Suspense>
              <div className="scene-hint"><Icon.Drag size={14} /> drag to rotate</div>
            </Reveal>

            <div className="practice-list">
              {categories.map((cat, i) => {
                const I = practiceIcons[i % practiceIcons.length];
                return (
                  <Reveal key={cat.title} delay={i * 0.08} className="practice glow" style={{ "--c": colors[i % colors.length] }}>
                    <h3><i><I size={17} /></i>{cat.title}</h3>
                    <ul>{cat.achievements.map((a) => <li key={a}><LuCheck size={14} />{a}</li>)}</ul>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Brand icon wall: every tile lights up in its own brand colour */}
          <Reveal className="sub-title" delay={0.05}>Toolbox</Reveal>
          <motion.ul className="skill-wall" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={{ show: { transition: { staggerChildren: 0.025 } } }}>
            {techStack.map((t) => (
              <motion.li key={t.name} className="skill-tile glow" style={{ "--c": t.color }} variants={{ hidden: { opacity: 0, scale: 0.7, y: 14 }, show: { opacity: 1, scale: 1, y: 0 } }} whileHover={{ y: -6, scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                <t.icon size={26} />
                <span>{t.name}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="stack-groups">
            {stackGroups.map((g, i) => {
              const I = groupIcons[g.group] || Icon.Sparkles;
              return (
                <Reveal key={g.group} delay={i * 0.05} className="stack-group glow">
                  <h4><I size={15} /> {g.group}</h4>
                  <div className="tags">{g.items.map((it) => <span className="tag" key={it}>{it}</span>)}</div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
