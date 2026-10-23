import { useEffect, useState } from "react";
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

export default function Header() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

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

  return (
    <>
      <motion.header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="wrap header-row">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-avatar"><img src={`${base}img/profile.jpeg`} alt="" width="36" height="36" /><span className="dot" /></span>
            <span className="brand-text"><Scramble text="Punnawit Kotosri" /><small>Geospatial · ML · GNSS</small></span>
          </a>

          <nav className="site-nav" aria-label="Sections">
            {links.slice(1).map((l) => (
              <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
                {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                <Scramble text={l.label} />
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="btn btn-mini" href={`mailto:${profile.email}`}><Icon.Mail size={15} /> Hire me</a>
            <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }} style={{ display: "grid" }}>
                  {theme === "dark" ? <Icon.Sun size={18} /> : <Icon.Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button type="button" className={`icon-btn menu-toggle ${open ? "is-open" : ""}`} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              <span className="burger"><i /><i /><i /></span>
            </button>
          </div>
        </div>
        <ScrollProgress />
      </motion.header>

      {/* Full-screen menu (mobile / tablet) */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ clipPath: "circle(0% at calc(100% - 44px) 34px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 34px)" }} exit={{ clipPath: "circle(0% at calc(100% - 44px) 34px)" }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="mobile-menu-bg" aria-hidden="true" />
            <nav className="mobile-links" aria-label="Sections">
              {links.map((l, i) => (
                <motion.a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className={active === l.id ? "is-active" : ""}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
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
