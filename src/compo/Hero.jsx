import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/site";
import { metrics } from "../data/skillsData";
import { Magnetic, Typewriter, Icon, IdBadge } from "./ui.jsx";

const HeroScene = lazy(() => import("./HeroScene.jsx"));
const base = import.meta.env.BASE_URL;

const roles = ["Geospatial Engineer", "Machine Learning Engineer", "GNSS / RTK Builder", "Full-Stack Developer", "Remote Sensing Researcher"];

const wordAnim = {
  hidden: { y: "110%" },
  show: (i) => ({ y: 0, transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] } }),
};

export default function Hero() {
  const [reduced, setReduced] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
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
    <section id="top" className="hero" ref={ref}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="shooting" style={{ left: `${10 + i * 30}%`, top: `${5 + i * 12}%`, animationDelay: `${i * 2.6}s`, animationDuration: `${6 + i * 1.5}s` }} aria-hidden="true" />
      ))}
      <div className="wrap hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <motion.div className="hero-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="pulse" /> Open to research collaborations · {profile.location}
          </motion.div>

          <h1 className="hero-name" aria-label={profile.name.join(" ")}>
            {profile.name.map((part, i) => (
              <span className="word" key={part}>
                <motion.span custom={i} variants={wordAnim} initial="hidden" animate="show" className={i === 1 ? "grad" : ""}>
                  {part}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            I&apos;m a <Typewriter words={roles} />
          </motion.p>

          <motion.p className="hero-intro" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            {profile.intro}
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic><a className="btn btn-solid" href="#projects">Explore projects <Icon.Arrow /></a></Magnetic>
            <Magnetic><a className="btn btn-line" href="#contact"><Icon.Mail /> Get in touch</a></Magnetic>
          </motion.div>

          <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            {metrics.slice(0, 4).map((m) => (
              <motion.div className="stat-chip" key={m.label} whileHover={{ y: -4, scale: 1.04 }}><b>{m.value}</b><span>{m.label}</span></motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-scene" style={{ y: sceneY }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>
          <Suspense fallback={null}>
            <HeroScene reduced={reduced} />
          </Suspense>
          <IdBadge src={`${base}img/profile.jpeg`} name="PUNNAWIT KOTOSRI" role={profile.role} />
          <div className="scene-hint"><Icon.Drag /> drag to orbit · satellites run live</div>
        </motion.div>
      </div>
      <div className="scroll-cue"><span>scroll</span><i /></div>
    </section>
  );
}
