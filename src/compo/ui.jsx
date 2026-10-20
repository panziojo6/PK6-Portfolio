import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, AnimatePresence, useReducedMotion } from "framer-motion";

/* Scroll reveal wrapper */
export function Reveal({ children, delay = 0, y = 28, className, as = "div", once = true, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  const reduce = useReducedMotion();
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Animated number that counts up when visible. Accepts "12+", "4", "2" */
export function Counter({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [shown, setShown] = useState(0);
  const target = parseFloat(String(value).replace(/[^\d.]/g, "")) || 0;
  const suffix = String(value).replace(/[\d.]/g, "");

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref}>{shown}{suffix}</span>;
}

/* Button that leans toward the cursor */
export function Magnetic({ children, strength = 0.35, className, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }} onMouseMove={onMove} onMouseLeave={onLeave} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/* 3D tilt card with glare that follows the cursor */
export function Tilt({ children, max = 10, className, style, ...rest }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Soft light that follows the cursor across the page */
export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (e) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}

/* Thin progress bar under the header */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* Tiny toast hook */
export function useToast() {
  const [msg, setMsg] = useState(null);
  const show = useCallback((m) => {
    setMsg(m);
    window.clearTimeout(show.t);
    show.t = window.setTimeout(() => setMsg(null), 2200);
  }, []);
  const node = (
    <AnimatePresence>
      {msg && (
        <motion.div className="toast" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return [show, node];
}

/* Rotating typewriter text */
export function Typewriter({ words, typeSpeed = 55, pause = 1600 }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!del && txt === word) t = setTimeout(() => setDel(true), pause);
    else if (del && txt === "") t = setTimeout(() => { setDel(false); setI((v) => v + 1); }, 0);
    else t = setTimeout(() => setTxt(word.slice(0, txt.length + (del ? -1 : 1))), del ? typeSpeed / 2 : typeSpeed);
    return () => clearTimeout(t);
  }, [txt, del, i, words, typeSpeed, pause]);
  return <span className="type">{txt}<span className="caret" /></span>;
}

export const Icon = {
  Sun: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" /></svg>,
  Moon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>,
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  Close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>,
  Arrow: () => <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
  ArrowUpRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>,
  Play: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  Copy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>,
  Linkedin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>,
  Drag: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" /></svg>,
};

/* Lagging cursor ring + dot (desktop only) */
export function CursorRing() {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });
  const [hot, setHot] = useState(false);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHot(!!e.target.closest("a, button, .pcard, canvas"));
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [x, y]);
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }} animate={{ scale: hot ? 1.8 : 1, opacity: hot ? 0.9 : 0.6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
      <motion.div className="cursor-dot" style={{ x, y }} />
    </>
  );
}

/* Title whose words slide up one by one */
export function SplitTitle({ text, className = "section-title", hl = [] }) {
  const words = text.split(" ");
  return (
    <motion.h2 className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {words.map((w, i) => (
        <span className="word-in" key={i}>
          <motion.span
            className={hl.includes(w.replace(/[.,!?]/g, "")) ? "hl" : ""}
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.7, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] } } }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </motion.h2>
  );
}

/* Fake terminal that types lines when scrolled into view */
export function Terminal({ lines, title = "pk6 — zsh" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || n >= lines.length) return;
    const t = setTimeout(() => setN((v) => v + 1), n === 0 ? 300 : 420);
    return () => clearTimeout(t);
  }, [inView, n, lines.length]);
  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar"><i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} /><span>{title}</span></div>
      <div className="terminal-body">
        {lines.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
            {l.cmd ? <><span className="p">$ </span><span className="k">{l.cmd}</span></> : <span className={l.ok ? "ok" : "v"}>{l.out}</span>}
          </motion.div>
        ))}
        {n >= lines.length && <div><span className="p">$ </span><span className="cur" /></div>}
      </div>
    </div>
  );
}

export function IdBadge({ src, name, role, id = "PK6-2026" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 24); rx.set((0.5 - py) * 24);
    ref.current.style.setProperty("--hx", `${px * 100}%`);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref} className="id-badge" onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30, rotate: -4 }} animate={{ opacity: 1, y: [0, -8, 0], rotate: 0 }}
      transition={{ opacity: { delay: 1.1, duration: 0.6 }, rotate: { delay: 1.1, duration: 0.6 }, y: { delay: 1.7, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div className="id-strip" />
      <div className="id-clip" />
      <div className="holo" />
      <div className="id-head"><span>Mission ID</span><span>{id}</span></div>
      <div className="id-photo"><img src={src} alt={`Portrait of ${name}`} /></div>
      <div className="id-body"><b>{name}</b><span>{role}</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 12px 0" }}><div className="id-chip" /><span style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".12em" }}>GEO · ML · GNSS</span></div>
      <div className="id-barcode" />
    </motion.div>
  );
}
