import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { projects } from "../data/projectsData";
import { Reveal, Tilt, Icon, Magnetic, SplitTitle } from "./ui.jsx";

const ALL = "All";
const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];
const featured = projects.filter((p) => p.featured).slice(0, 4);

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={onClose} aria-label="Close"><Icon.Close /></button>
            <div className={`modal-media ${project.video ? "has-video" : ""}`}>
              {project.video ? <video src={project.video} poster={project.image} controls playsInline /> : <img src={project.image} alt="" />}
            </div>
            <div className="modal-body">
              <div className="modal-chips">
                <span className="chip accent">{project.category}</span>
                <span className="chip">{project.year}</span>
                {project.badge && <span className="chip">{project.badge}</span>}
              </div>
              <h2 id="pm-title">{project.title}</h2>
              <p className="role">{project.role}</p>
              <div className="modal-cols">
                <div>
                  <p className="desc">{project.description}</p>
                  {project.longDescription && <p className="desc">{project.longDescription}</p>}
                </div>
                {project.specs && (
                  <dl className="spec-list">
                    {Object.entries(project.specs).map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                )}
              </div>
              {project.episodes?.length > 0 && (
                <ol className="steps">
                  {project.episodes.map((ep, i) => (
                    <li key={ep.title}>
                      <span className="num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <small>{ep.time}</small>
                        <b>{ep.title}</b>
                        <p>{ep.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              <div className="modal-tags">{project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const DUR = 7000;
function Spotlight({ items, onOpen }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n) => setI((v) => (v + n + items.length) % items.length);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), DUR);
    return () => clearInterval(t);
  }, [paused, items.length, i]);
  const p = items[i];
  return (
    <Reveal className="spotlight" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence initial={false}>
        <motion.div key={p.id} className="spot-slide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.6 }}>
          <div className="spot-media">
            <motion.img src={p.image} alt="" initial={{ scale: 1.15, x: 20 }} animate={{ scale: 1, x: 0 }} transition={{ duration: DUR / 1000 + 1, ease: "linear" }} />
          </div>
          <div className="spot-text">
            <span className="spot-index">{String(i + 1).padStart(2, "0")}</span>
            <motion.div className="spot-title-tag" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <span className="chip accent">{p.category}</span><span className="chip">{p.year}</span>{p.badge && <span className="chip">{p.badge}</span>}
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>{p.title}</motion.h3>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>{p.description}</motion.p>
            {p.specs && (
              <motion.dl className="spot-specs" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                {Object.entries(p.specs).slice(0, 4).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </motion.dl>
            )}
            <motion.div className="spot-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              <Magnetic><button type="button" className="btn btn-solid" onClick={() => onOpen(p)}>{p.video ? <><Icon.Play /> Watch & read</> : <>Open case study <Icon.Arrow /></>}</button></Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="spot-nav">
        <div className="spot-dots">
          {items.map((it, k) => (
            <button key={it.id} type="button" className={`spot-dot ${k === i ? "is-active" : ""}`} style={{ "--dur": `${DUR}ms`, animationPlayState: paused ? "paused" : "running" }} onClick={() => setI(k)} aria-label={`Show ${it.shortTitle || it.title}`}>
              <i style={{ animationPlayState: paused ? "paused" : "running" }} />
            </button>
          ))}
        </div>
        <span className="spot-counter">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <div className="spot-arrows">
          <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 5l-7 7 7 7" /></svg></button>
          <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next"><Icon.Arrow /></button>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ p, featured, onOpen }) {
  return (
    <Tilt className={`pcard`} max={featured ? 5 : 8}>
      <button type="button" onClick={() => onOpen(p)} style={{ all: "unset", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer", width: "100%" }}>
        <div className="pcard-media">
          <img src={p.image} alt="" loading="lazy" />
          <div className="pcard-top">
            <span className="chip accent">{p.category}</span>
            {p.video && <span className="chip play"><Icon.Play /> Video</span>}
          </div>
        </div>
        <div className="pcard-body">
          <div className="pcard-meta"><span>{p.year}</span><span>{p.duration}</span></div>
          <h3>{featured ? p.title : p.shortTitle || p.title}</h3>
          <p>{p.description}</p>
          <div className="pcard-tags">{p.tags.slice(0, featured ? 6 : 4).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        </div>
        <span className="pcard-cta"><Icon.ArrowUpRight /></span>
        <div className="pcard-glare" />
      </button>
    </Tilt>
  );
}

export default function Projects() {
  const [cat, setCat] = useState(ALL);
  const [selected, setSelected] = useState(null);
  const list = useMemo(() => (cat === ALL ? projects : projects.filter((p) => p.category === cat)), [cat]);
  const count = (c) => (c === ALL ? projects.length : projects.filter((p) => p.category === c).length);

  return (
    <section id="projects" data-section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Selected work</span>
            <SplitTitle text="Projects that ship." hl={["ship"]} />
          </div>
          <p className="section-note">{projects.length} projects across remote sensing, GNSS, robotics and data engineering. Click any card for the full story.</p>
        </Reveal>

        <Spotlight items={featured} onOpen={setSelected} />
        <h3 className="sub-title">All projects</h3>

        <Reveal className="filters" delay={0.05}>
          {categories.map((c) => (
            <button key={c} type="button" className={`filter ${cat === c ? "is-active" : ""}`} onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="filter-pill" className="pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              {c}<small>{count(c)}</small>
            </button>
          ))}
        </Reveal>

        <LayoutGroup>
          <motion.ul className="project-grid" layout>
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => {
                const featuredCard = cat === ALL && i === 0;
                return (
                  <motion.li
                    key={p.id} layout className={featuredCard ? "is-featured" : ""}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <ProjectCard p={p} featured={featuredCard} onOpen={setSelected} />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
