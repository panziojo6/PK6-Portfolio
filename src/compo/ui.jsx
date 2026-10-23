import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion, useInView, useMotionValue, useSpring, useScroll, useTransform, useVelocity, useAnimationFrame, useMotionTemplate,
  AnimatePresence, useReducedMotion, wrap,
} from "framer-motion";
import {
  LuSun, LuMoon, LuMenu, LuX, LuArrowRight, LuArrowUpRight, LuArrowLeft, LuArrowUp, LuPlay, LuMail, LuCopy, LuLinkedin,
  LuMove3D, LuCheck, LuExternalLink, LuSatellite, LuRadio, LuGraduationCap, LuRocket, LuMapPin, LuHouse, LuUser,
  LuFolderOpen, LuSparkles, LuAward, LuSend, LuTerminal, LuMousePointer2, LuCalendar, LuClock, LuGithub, LuDownload, LuCrosshair,
} from "react-icons/lu";

/* ------------------------------------------------------------------ icons */
/* All UI glyphs come from Lucide (react-icons/lu). Brand glyphs live in skillsData. */
export const Icon = {
  Sun: LuSun, Moon: LuMoon, Menu: LuMenu, Close: LuX,
  Arrow: (p) => <LuArrowRight className="arrow" {...p} />, ArrowUpRight: LuArrowUpRight, ArrowLeft: LuArrowLeft, ArrowUp: LuArrowUp,
  Play: LuPlay, Mail: LuMail, Copy: LuCopy, Linkedin: LuLinkedin, Github: LuGithub, Drag: LuMove3D, Check: LuCheck, External: LuExternalLink,
  Satellite: LuSatellite, Radio: LuRadio, Graduation: LuGraduationCap, Rocket: LuRocket, Pin: LuMapPin, Home: LuHouse, User: LuUser,
  Folder: LuFolderOpen, Sparkles: LuSparkles, Award: LuAward, Send: LuSend, Terminal: LuTerminal, Pointer: LuMousePointer2,
  Calendar: LuCalendar, Clock: LuClock, Download: LuDownload, Crosshair: LuCrosshair,
};

/* ---------------------------------------------------------- device hooks */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const u = () => setTouch(mq.matches);
    u(); mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);
  return touch;
}

/* ------------------------------------------------------------ scroll reveal */
export function Reveal({ children, delay = 0, y = 28, className, as = "div", once = true, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  const reduce = useReducedMotion();
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ----------------------------------------------------- animated counter */
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

/* -------------------------------------------------------- magnetic wrap */
export function Magnetic({ children, strength = 0.35, className, ...rest }) {
  const ref = useRef(null);
  const touch = useIsTouch();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const onMove = (e) => {
    if (touch) return;
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

/* --------------------------------------------------- 3D tilt + glare card */
export function Tilt({ children, max = 10, className, style, ...rest }) {
  const ref = useRef(null);
  const touch = useIsTouch();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const onMove = (e) => {
    if (touch) return;
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
    <motion.div ref={ref} className={className} style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, ...style }} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------- cursor glow + spotlight borders */
/* One global pointer listener feeds every `.glow` card its --gx/--gy so the border lights up where the cursor is. */
export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    let cards = [];
    let raf = 0;
    const collect = () => { cards = Array.from(document.querySelectorAll(".glow")); };
    collect();
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(collect); });
    mo.observe(document.body, { childList: true, subtree: true });
    const onMove = (e) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        if (e.clientX < r.left - 200 || e.clientX > r.right + 200 || e.clientY < r.top - 200 || e.clientY > r.bottom + 200) continue;
        c.style.setProperty("--sx", `${e.clientX - r.left}px`);
        c.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); mo.disconnect(); };
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}

/* ----------------------------------------------------- header progress */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ------------------------------------------- back to top w/ progress ring */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const dash = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
          className="to-top" aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }} whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg className="ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="21" />
            <motion.circle cx="24" cy="24" r="21" style={{ pathLength: dash }} />
          </svg>
          <LuArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ toast */
export function useToast() {
  const [msg, setMsg] = useState(null);
  const timer = useRef(0);
  const show = useCallback((m) => {
    setMsg(m);
    window.dispatchEvent(new CustomEvent("pk6:island", { detail: { text: m, icon: "Check" } })); /* echo on the header island */
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 2200);
  }, []);
  const node = (
    <AnimatePresence>
      {msg && (
        <motion.div className="toast" role="status" initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.95 }}>
          <LuCheck size={16} /> {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return [show, node];
}

/* ------------------------------------------------------------ typewriter */
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

/* --------------------------------------------- scramble-on-hover text */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#0123456789";
export function Scramble({ text, as = "span", className, trigger = "hover", ...rest }) {
  const Comp = as;
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  const run = useCallback(() => {
    cancelAnimationFrame(frame.current);
    let step = 0;
    const total = Math.max(10, text.length * 2);
    const tick = () => {
      step++;
      const progress = step / total;
      setOut(text.split("").map((ch, idx) => {
        if (ch === " ") return " ";
        return idx / text.length < progress ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }).join(""));
      if (step < total) frame.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const handlers = trigger === "hover" ? { onMouseEnter: run, onFocus: run } : {};
  return <Comp className={className} {...handlers} {...rest}><span aria-hidden="true">{out}</span><span className="sr-only">{text}</span></Comp>;
}

/* --------------------------------------- scroll-velocity marquee ticker */
export function VelocityTicker({ children, baseVelocity = 2, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });
  return (
    <div className={`ticker ${className}`} aria-hidden="true">
      <motion.div className="ticker-track" style={{ x }}>
        {[0, 1, 2, 3].map((k) => <span key={k}>{children}</span>)}
      </motion.div>
    </div>
  );
}

/* --------------------------------------------- label that follows cursor */
export function CursorLabel({ text, visible }) {
  const x = useMotionValue(-200); const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <motion.div className="cursor-label" style={{ x: sx, y: sy }} animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      {text} <LuArrowUpRight size={14} />
    </motion.div>
  );
}

/* --------------------------------------- lagging cursor ring (desktop) */
export function CursorRing() {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });
  const [hot, setHot] = useState(false);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHot(!!e.target.closest("a, button, .pcard, canvas, .skill-tile"));
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

/* ------------------------------------------------- split-word title */
export function SplitTitle({ text, className = "section-title", hl = [], as = "h2" }) {
  const Comp = motion[as] ?? motion.h2;
  const words = text.split(" ");
  return (
    <Comp className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {words.map((w, i) => (
        <span className="word-in" key={i}>
          <motion.span
            className={hl.includes(w.replace(/[.,!?]/g, "")) ? "hl" : ""}
            variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 0.7, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] } } }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Comp>
  );
}

/* ------------------------------------------------------------ terminal */
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
    <div className="terminal glow" ref={ref}>
      <div className="terminal-bar"><i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} /><span><LuTerminal size={12} /> {title}</span></div>
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

/* ------------------------------------------------------------ ID badge */
export function IdBadge({ src, name, role, id = "PK6-2026" }) {
  const ref = useRef(null);
  const touch = useIsTouch();
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const onMove = (e) => {
    if (touch) return;
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
      <div className="id-foot"><div className="id-chip" /><span><LuSatellite size={11} /> GEO <LuSparkles size={11} /> ML <LuRadio size={11} /> GNSS</span></div>
      <div className="id-barcode" />
    </motion.div>
  );
}

/* ----------------------------------------- mouse-parallax layer (hero) */
export function Parallax({ children, depth = 20, className, style }) {
  const touch = useIsTouch();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (touch) return;
    const move = (e) => {
      x.set(((e.clientX / window.innerWidth) - 0.5) * depth);
      y.set(((e.clientY / window.innerHeight) - 0.5) * depth);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y, depth, touch]);
  return <motion.div className={className} style={{ x: sx, y: sy, ...style }}>{children}</motion.div>;
}

/* --------------------------------------------------- gradient border glow */
export function useGradientSpot(ref) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 60%)`;
  const onMove = (e) => { const r = ref.current.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); };
  return { bg, onMove };
}
