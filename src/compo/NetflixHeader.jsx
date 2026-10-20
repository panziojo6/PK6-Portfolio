import { useState, useEffect } from "react";
import { netflixAudio } from "./NetflixAudio";

const base = import.meta.env.BASE_URL;

export default function NetflixHeader({ onSearch, searchQuery, onSelectProject }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = netflixAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      netflixAudio.playClick();
    }
  };

  const handleNavClick = (id) => {
    netflixAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`netflix-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-left">
        <a
          href="#top"
          className="brand-logo"
          onClick={() => {
            netflixAudio.playClick();
            if (onSearch) onSearch("");
          }}
        >
          <img src={`${base}img/logopk6.png`} alt="PK6" />
          <span>PK6</span>
          <span className="brand-subtitle">STUDIOS</span>
        </a>

        <ul className="header-nav">
          <li>
            <button type="button" className="nav-link active" onClick={() => handleNavClick("top")}>
              Home
            </button>
          </li>
          <li>
            <button type="button" className="nav-link" onClick={() => handleNavClick("trending")}>
              Trending
            </button>
          </li>
          <li>
            <button type="button" className="nav-link" onClick={() => handleNavClick("top10")}>
              Top 10
            </button>
          </li>
          <li>
            <button type="button" className="nav-link" onClick={() => handleNavClick("robotics")}>
              GNSS & Robotics
            </button>
          </li>
          <li>
            <button type="button" className="nav-link" onClick={() => handleNavClick("pipelines")}>
              Pipelines & AI
            </button>
          </li>
          <li>
            <button type="button" className="nav-link" onClick={() => handleNavClick("about")}>
              About
            </button>
          </li>
          <li>
            <button type="button" className="nav-link" onClick={() => handleNavClick("recognition")}>
              Awards
            </button>
          </li>
        </ul>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="search-box">
          <div className={`search-input-wrap ${searchOpen || searchQuery ? "open" : ""}`}>
            <input
              type="text"
              placeholder="Titles, skills, tags (e.g. Python, GNSS)..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => {
                if (!searchQuery) setSearchOpen(false);
              }}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  if (onSearch) onSearch("");
                  setSearchOpen(false);
                }}
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="search-toggle-btn"
            aria-label="Search projects"
            onClick={() => {
              netflixAudio.playClick();
              setSearchOpen((prev) => !prev);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          type="button"
          className="audio-toggle-btn"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          onClick={handleAudioToggle}
          title={isMuted ? "Audio Muted - Click to Unmute" : "Audio Active - Click to Mute"}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>

        {/* Profile Avatar & Dropdown */}
        <div className="profile-menu">
          <button type="button" className="profile-avatar-btn" aria-label="Profile">
            <img src={`${base}img/profile.jpeg`} alt="Punnawit Kotosri" className="avatar-img" />
            <span className="avatar-caret">▼</span>
          </button>
          <div className="profile-dropdown">
            <div className="dropdown-header">Viewing as: Guest</div>
            <a
              href="#about"
              className="dropdown-item"
              onClick={() => handleNavClick("about")}
            >
              <span className="dropdown-item-icon">👨‍💻</span>
              <div>
                <strong>Punnawit Kotosri</strong>
                <div style={{ fontSize: "0.72rem", color: "#888" }}>Geospatial & ML Engineer</div>
              </div>
            </a>
            <a
              href={`mailto:punnawit.kot@ku.th`}
              className="dropdown-item"
              onClick={() => netflixAudio.playClick()}
            >
              <span className="dropdown-item-icon">✉️</span>
              <div>
                <span>Contact Direct</span>
                <div style={{ fontSize: "0.72rem", color: "#888" }}>punnawit.kot@ku.th</div>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/punnawit-kotosri-475406306"
              target="_blank"
              rel="noreferrer"
              className="dropdown-item"
            >
              <span className="dropdown-item-icon">💼</span>
              <div>LinkedIn Profile</div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
