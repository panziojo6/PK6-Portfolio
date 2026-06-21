import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "../css/navbar.css";

const navItems = [
  { id: "home", label: "Home", icon: <HomeOutlined /> },
  { id: "about", label: "About", icon: <UserOutlined /> },
  { id: "skills", label: "Skills", icon: <SettingOutlined /> },
  { id: "projects", label: "Projects", icon: <AppstoreOutlined /> },
  { id: "certificates", label: "Certificates", icon: <SafetyCertificateOutlined /> },
  { id: "contact", label: "Contact", icon: <MailOutlined /> },
];

export default function HeaderBar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const base = import.meta.env.BASE_URL;

  // IntersectionObserver to set active link
  useEffect(() => {
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

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`nav-premium desktop-nav-only ${scrolled ? "nav-premium-scrolled" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-premium-inner">
          <div className="nav-brand">
            <div className="brand-img-ring">
              <img src={`${base}img/profile.jpeg`} alt="PK6" className="brand-img" />
            </div>
            <div className="nav-logo">PK6</div>
          </div>

          {/* DESKTOP LINKS */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? "active" : ""}`}
                whileHover={{ scale: 1.08 }}
              >
                {item.label}
                {active === item.id && (
                  <motion.div
                    className="nav-laser-line"
                    layoutId="activeSectionDesktop"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* MOBILE BOTTOM NAV */}
      <motion.div 
        className="mobile-bottom-nav"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bottom-nav-inner">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`bottom-nav-item ${active === item.id ? "active" : ""}`}
            >
              <span className="bottom-nav-icon">{item.icon}</span>
              <span className="bottom-nav-label">{item.label}</span>
              {active === item.id && (
                <motion.div
                  className="bottom-nav-active-bg"
                  layoutId="activeSectionMobile"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}