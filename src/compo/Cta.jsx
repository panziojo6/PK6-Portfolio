import { LuMail, LuLinkedin } from "react-icons/lu";
import Mascot from "./Mascot.jsx";
import Floaty from "./Floaty.jsx";
import { profile } from "../data/site.js";

const base = import.meta.env.BASE_URL;

export default function Cta() {
  return (
    <section className="panel panel--blue cta" id="contact">
      <Floaty kind="rocket" size={110} tilt={-14} className="fl fl--tl" duration={7} />
      <Floaty kind="globe" size={100} tilt={6} delay={1} className="fl fl--tr" />

      <h2 className="display display--xl">
        <span>Let's build</span>
        <span>something</span>
        <span>from orbit</span>
      </h2>
      <p className="subtitle">
        Open to research collaborations, geospatial product work and anything that needs a satellite, a receiver
        and someone who can wire them together.
      </p>

      <div className="cta__row">
        <a className="qr" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn QR code">
          <img src={`${base}img/qr-linkedin.svg`} alt="" width="112" height="112" />
          <span>scan for LinkedIn</span>
        </a>
        <div className="cta__buttons">
          <a className="pill pill--dark pill--lg" href={`mailto:${profile.email}`}>
            <LuMail /> {profile.email}
          </a>
          <a className="pill pill--ghost pill--lg" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LuLinkedin /> Open LinkedIn
          </a>
        </div>
      </div>

      <figure className="polaroid polaroid--cta" style={{ "--tilt": "8deg" }}>
        <img src={`${base}img/profile.jpeg`} alt="Punnawit Kotosri" loading="lazy" />
        <figcaption>Punnawit · Bangkok</figcaption>
      </figure>
      <div className="cta__mascot">
        <Mascot size={240} prop="flag" mood="wink" delay={0.8} />
      </div>
    </section>
  );
}
