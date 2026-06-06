import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/navbar.css";

const base = import.meta.env.BASE_URL;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = ["home", "about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.header
      className={`nav-premium ${scrolled ? "nav-premium-scrolled" : ""}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-premium-inner">

        {/* BRAND / LOGO AREA */}
        <div
          className="nav-brand"
          onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
        >
          <div className="brand-img-ring">
            <img src={`${base}img/profile.jpeg`} alt="PK6" className="brand-img" />
          </div>
          <span className="nav-logo">PK6</span>
        </div>

        {/* DESKTOP LINKS */}
        <nav className="nav-links desktop">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${active === item.id ? "active" : ""}`}
            >
              {item.label}
              {/* Laser Underline for Active Item */}
              {active === item.id && (
                <motion.div
                  layoutId="active-nav-laser"
                  className="nav-laser-line"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* MOBILE HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={`bar ${open ? "open" : ""}`}></div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu-premium"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-link-premium ${active === item.id ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}