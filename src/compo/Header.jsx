import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress, Icon, Scramble } from "./ui.jsx";
import { profile } from "../data/site";

const base = import.meta.env.BASE_URL;

const links = [
  { id: "top", label: "Home", icon: Icon.Home },
  { id: "about", label: "About", icon: Icon.User },
  { id: "projects", label: "Projects", icon: Icon.Folder },
  { id: "skills", label: "Skills", icon: Icon.Sparkles },
  { id: "recognition", label: "Recognition", icon: Icon.Award },
  { id: "contact", label: "Contact", icon: Icon.Send },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("pk6-theme") || "dark"; } catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("pk6-theme", theme); } catch { /* ignore */ }
  }, [theme]);

  /* Circular reveal from the button, via the View Transitions API (falls back to a plain switch). */
  const toggle = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { setTheme(next); return; }
    const x = e?.clientX ?? window.innerWidth - 40;
    const y = e?.clientY ?? 30;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(() => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    });
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };
  return [theme, toggle];
}

/* Local time in Bangkok, refreshed every 30s — the "status readout" on the notch. */
const bkkTime = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Bangkok" }).format(new Date());
function useBangkokClock() {
  const [time, setTime] = useState(bkkTime);
  useEffect(() => {
    const id = setInterval(() => setTime(bkkTime()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ---------------------------------------------------------------- island
   Dynamic-Island behaviour for the notch:
   - "expanded": full link row (at the top of the page, on hover/focus, or when tapped)
   - "compact" : resting pill — LED + clock — once you've scrolled
   - "alert"   : briefly bulges to announce something (section change, theme switch,
                 or anything that dispatches  window.dispatchEvent(new CustomEvent("pk6:island", { detail: { text, icon } }))  )
*/
function useIsland({ scrolled, active, theme }) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);     // tapped open on touch devices
  const [alert, setAlert] = useState(null);         // { text, icon }
  const timer = useRef(0);
  const first = useRef(true);
  const ref = useRef(null);

  const announce = useCallback((text, icon = "Check", ms = 1900) => {
    setAlert({ text, icon, key: Date.now() });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAlert(null), ms);
  }, []);

  /* section change → "Projects" readout */
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const l = links.find((x) => x.id === active);
    if (l && active !== "top") announce(l.label, l.id, 1500);
  }, [active, announce]);

  /* theme switch */
  const prevTheme = useRef(theme);
  useEffect(() => {
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;
    announce(theme === "dark" ? "Dark mode" : "Light mode", theme === "dark" ? "Moon" : "Sun");
  }, [theme, announce]);

  /* anything else on the page */
  useEffect(() => {
    const onEvt = (e) => announce(e.detail?.text ?? "", e.detail?.icon ?? "Check", e.detail?.ms);
    window.addEventListener("pk6:island", onEvt);
    return () => window.removeEventListener("pk6:island", onEvt);
  }, [announce]);

  /* tap outside collapses a pinned island */
  useEffect(() => {
    if (!pinned) return;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setPinned(false); };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [pinned]);
  useEffect(() => { if (!scrolled) setPinned(false); }, [scrolled]);

  const expanded = !scrolled || hover || pinned;
  const mode = expanded ? "expanded" : alert ? "alert" : "compact";
  return { mode, alert, ref, setHover, setPinned, pinned };
}

export default function Header() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const clock = useBangkokClock();
  const current = links.find((l) => l.id === active) ?? links[0];
  const island = useIsland({ scrolled, active, theme });
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const spring = reduce ? { duration: 0.2 } : { type: "spring", stiffness: 480, damping: 36, mass: 0.7 };
  const swap = { initial: { opacity: 0, scale: 0.85, filter: "blur(6px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.85, filter: "blur(6px)" }, transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] } };
  const AlertIcon = island.alert ? (links.find((l) => l.id === island.alert.icon)?.icon ?? Icon[island.alert.icon] ?? Icon.Check) : Icon.Check;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        setActive(e.target.id);
        document.documentElement.dataset.sec = e.target.id; /* section-aware accent colour */
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("[data-section]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("menu-open"); };
  }, [open]);

  const ease = [0.2, 0.8, 0.2, 1];

  return (
    <>
      <motion.header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 1.6, ease }}
      >
        <ScrollProgress />
        <div className="wrap header-row">
          {/* left — brand mark + name */}
          <div className="hdr-side hdr-side--l">
            <a href="#top" className="brand" onClick={() => setOpen(false)}>
              <span className="brand-avatar"><img src={`${base}img/profile.jpeg`} alt="" width="36" height="36" /><span className="dot" /></span>
              <span className="brand-text"><Scramble text="Punnawit Kotosri" /><small>Geospatial · ML · GNSS</small></span>
            </a>
          </div>

          {/* centre — floating black notch (Dynamic Island) */}
          <motion.div
            ref={island.ref}
            className={`notch is-${island.mode}`}
            layout
            style={{ borderRadius: 999 }}
            initial={{ y: -14, opacity: 0, scale: 0.92 }} animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ layout: spring, default: { duration: 0.6, delay: 1.95, ease } }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => island.setHover(true)} onMouseLeave={() => island.setHover(false)}
            onFocus={() => island.setHover(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) island.setHover(false); }}
            onClick={() => { if (island.mode !== "expanded") island.setPinned(true); }}
            aria-live="polite"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {island.mode === "expanded" && (
                <motion.div key="expanded" className="island island--expanded" layout="position" {...swap}>
                  <span className="notch-status" title="Open to work">
                    <i className="led led--live" />
                    <span className="notch-status-text">Open to work</span>
                  </span>
                  <span className="notch-sep" aria-hidden="true" />

                  <nav className="notch-nav" aria-label="Sections">
                    {links.slice(1).map((l) => (
                      <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined} onClick={() => island.setPinned(false)}>
                        {active === l.id && <motion.span layoutId="nav-pill" className="notch-pill" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                        <Scramble text={l.label} />
                      </a>
                    ))}
                  </nav>

                  {/* tablet: current section instead of the link row */}
                  <span className="notch-current">
                    <current.icon size={13} /> {current.label}
                  </span>

                  <span className="notch-sep notch-sep--r" aria-hidden="true" />
                  <span className="notch-clock" title="Local time, Bangkok">
                    <Icon.Satellite size={13} className="notch-sat" />
                    <span className="notch-clock-text">BKK <b>{clock}</b></span>
                  </span>
                </motion.div>
              )}

              {island.mode === "alert" && (
                <motion.div key={`alert-${island.alert.key}`} className="island island--alert" layout="position" {...swap}>
                  <i className="led led--live" />
                  <motion.span className="island-icon" initial={{ rotate: -40, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={spring}><AlertIcon size={14} /></motion.span>
                  <span className="island-text">{island.alert.text}</span>
                </motion.div>
              )}

              {island.mode === "compact" && (
                <motion.div key="compact" className="island island--compact" layout="position" {...swap}>
                  <i className="led led--live" />
                  <span className="island-sec"><current.icon size={12} /></span>
                  <span className="island-clock">{clock}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* right — compact actions */}
          <div className="hdr-side hdr-side--r header-actions">
            <a className="btn btn-mini btn-ink" href={`mailto:${profile.email}`}><Icon.Mail size={14} /> Hire me</a>
            <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }} style={{ display: "grid" }}>
                  {theme === "dark" ? <Icon.Sun size={17} /> : <Icon.Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button type="button" className={`icon-btn menu-toggle ${open ? "is-open" : ""}`} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              <span className="burger"><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu (mobile / tablet) */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ clipPath: "circle(0% at calc(100% - 44px) 34px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 34px)" }} exit={{ clipPath: "circle(0% at calc(100% - 44px) 34px)" }} transition={{ duration: 0.6, ease }}>
            <div className="mobile-menu-bg" aria-hidden="true" />
            <nav className="mobile-links" aria-label="Sections">
              {links.map((l, i) => (
                <motion.a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className={active === l.id ? "is-active" : ""}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}>
                  <span className="mi"><l.icon size={22} /></span>
                  <span className="ml">{l.label}</span>
                  <span className="mn">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div className="mobile-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <a href={`mailto:${profile.email}`}><Icon.Mail size={16} /> {profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Icon.Linkedin size={16} /> LinkedIn</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom dock (phones) */}
      <nav className="dock" aria-label="Quick navigation">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : ""} aria-label={l.label}>
            {active === l.id && <motion.span layoutId="dock-pill" className="dock-pill" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <l.icon size={20} />
            <span>{l.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
