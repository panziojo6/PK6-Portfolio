import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollProgress, Icon } from "./ui.jsx";

const base = import.meta.env.BASE_URL;

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("pk6-theme") || "dark"; } catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("pk6-theme", theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

export default function Header() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
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

  return (
    <motion.header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="wrap header-row">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-avatar"><img src={`${base}img/profile.jpeg`} alt="" width="36" height="36" /><span className="dot" /></span>
          <span className="brand-text">Punnawit Kotosri<small>Geospatial · ML · GNSS</small></span>
        </a>

        <nav id="site-nav" className="site-nav" aria-label="Sections">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined} onClick={() => setOpen(false)}>
              {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme">
            {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
          </button>
          <button type="button" className="icon-btn menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>
      <ScrollProgress />
    </motion.header>
  );
}
