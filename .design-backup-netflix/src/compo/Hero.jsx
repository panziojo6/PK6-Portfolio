import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/site";
import { metrics } from "../data/skillsData";
import { Magnetic, Typewriter, Icon, IdBadge, Parallax } from "./ui.jsx";
import { LuSatellite, LuCrosshair, LuBrain, LuLayers, LuChevronDown } from "react-icons/lu";

const HeroScene = lazy(() => import("./HeroScene.jsx"));
const base = import.meta.env.BASE_URL;

const roles = ["Geospatial Engineer", "Machine Learning Engineer", "GNSS / RTK Builder", "Full-Stack Developer", "Remote Sensing Researcher"];
const statIcons = [LuSatellite, LuLayers, LuBrain, LuCrosshair];

const wordAnim = {
  hidden: { y: "110%", rotate: 3 },
  show: (i) => ({ y: 0, rotate: 0, transition: { duration: 0.9, delay: 1.7 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] } }),
};
const up = (delay) => ({ initial: { opacity: 0, y: 16, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { delay, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } });

const tags = [
  { text: "RTK FIXED · 1.4 cm", color: "var(--green)", style: { left: "6%", top: "12%" }, depth: 34, delay: 2.4 },
  { text: "Sentinel-2 · 10 m", color: "var(--cyan)", style: { right: "4%", top: "20%" }, depth: 22, delay: 2.6 },
  { text: "OC-SVM · phenology", color: "var(--violet)", style: { right: "8%", bottom: "22%" }, depth: 40, delay: 2.8 },
];

export default function Hero() {
  const [reduced, setReduced] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 700px)");
    const update = () => setReduced(mq.matches || small.matches);
    update();
    mq.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => { mq.removeEventListener("change", update); small.removeEventListener("change", update); };
  }, []);

  return (
    <section id="top" data-section className="hero" ref={ref}>
      {/* ambient layers */}
      <div className="hero-orbits" aria-hidden="true"><i /><i /><i /></div>
      {[0, 1, 2].map((i) => (
        <span key={i} className="shooting" style={{ left: `${10 + i * 30}%`, top: `${5 + i * 12}%`, animationDelay: `${i * 2.6}s`, animationDuration: `${6 + i * 1.5}s` }} aria-hidden="true" />
      ))}

      <div className="wrap hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <motion.div className="hero-badge" {...up(1.5)}>
            <span className="pulse" /> Open to research collaborations <span className="loc"><Icon.Pin size={13} /> {profile.location}</span>
          </motion.div>

          <h1 className="hero-name" aria-label={profile.name.join(" ")}>
            {profile.name.map((part, i) => (
              <span className="word" key={part}>
                <motion.span custom={i} variants={wordAnim} initial="hidden" animate="show" className={i === 1 ? "grad" : ""} data-text={part}>
                  {part}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-role" {...up(2.1)}>
            I&apos;m a <Typewriter words={roles} />
          </motion.p>

          <motion.p className="hero-intro" {...up(2.25)}>{profile.intro}</motion.p>

          <motion.div className="hero-actions" {...up(2.4)}>
            <Magnetic><a className="btn btn-solid" href="#projects"><span className="btn-bg" />Explore projects <Icon.Arrow size={18} /></a></Magnetic>
            <Magnetic><a className="btn btn-line" href="#contact"><Icon.Mail size={18} /> Get in touch</a></Magnetic>
          </motion.div>

          <motion.div className="hero-stats" {...up(2.6)}>
            {metrics.slice(0, 4).map((m, i) => {
              const I = statIcons[i];
              return (
                <motion.div className="stat-chip glow" key={m.label} whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <span className="stat-ico"><I size={16} /></span>
                  <b>{m.value}</b><span>{m.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div className="hero-scene" style={{ y: sceneY, scale: sceneScale }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 1.6 }}>
          <Suspense fallback={null}>
            <HeroScene reduced={reduced} />
          </Suspense>
          <IdBadge src={`${base}img/profile.jpeg`} name="PUNNAWIT KOTOSRI" role={profile.role} />
          {tags.map((t) => (
            <Parallax key={t.text} depth={t.depth} className="float-tag" style={{ ...t.style, "--c": t.color }}>
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: t.delay, duration: 0.5 }}>
                <i /> {t.text}
              </motion.span>
            </Parallax>
          ))}
          <div className="scene-hint"><Icon.Drag size={14} /> drag to orbit · satellites run live</div>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span>scroll</span>
        <motion.i animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}><LuChevronDown size={18} /></motion.i>
      </a>
    </section>
  );
}
