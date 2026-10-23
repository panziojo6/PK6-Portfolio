import { LuMail, LuLinkedin } from "react-icons/lu";
import { profile } from "../data/site.js";

const base = import.meta.env.BASE_URL;

export default function Nav() {
  return (
    <header className="nav">
      <a className="nav__logo" href="#top" aria-label="PK6 home">
        <img src={`${base}img/logopk6.png`} alt="" width="28" height="28" />
        <span>PK6</span>
      </a>
      <nav className="nav__links" aria-label="Sections">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#research">Research</a>
        <a href="#journey">Journey</a>
      </nav>
      <div className="nav__cta">
        <a className="pill pill--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
          <LuLinkedin /> LinkedIn
        </a>
        <a className="pill pill--solid" href={`mailto:${profile.email}`}>
          <LuMail /> Email me
        </a>
      </div>
    </header>
  );
}
