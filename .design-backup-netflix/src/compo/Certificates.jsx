import { recognition } from "../data/site";
import { Reveal, Tilt, SplitTitle } from "./ui.jsx";
import { LuAward, LuMapPin, LuCalendar, LuExternalLink, LuFileBadge, LuMic } from "react-icons/lu";

const base = import.meta.env.BASE_URL;

export default function Certificates() {
  return (
    <section id="recognition" data-section className="section">
      <span className="section-num" aria-hidden="true">04</span>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow"><LuAward size={14} /> Recognition</span>
            <SplitTitle text="Presented on international stages." hl={["international"]} />
          </div>
          <p className="section-note">Peer-reviewed work on phenotype-based crop classification, presented in Thailand and Russia.</p>
        </Reveal>
        <div className="awards">
          {recognition.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <Tilt className="award glow" max={6}>
                <a href={`${base}${r.img}`} target="_blank" rel="noreferrer" className="award-media" aria-label={`Open certificate: ${r.title}`}>
                  <img src={`${base}${r.img}`} alt={`Certificate: ${r.title}`} loading="lazy" />
                  <span className="award-holo" aria-hidden="true" />
                  <span className="chip zoom"><LuExternalLink size={13} /> View</span>
                </a>
                <div className="award-text">
                  <span className="award-when"><LuCalendar size={12} /> {r.when}</span>
                  <strong className="award-title">{r.title}</strong>
                  <span className="award-where"><LuMapPin size={13} /> {r.where}</span>
                  <span className="award-note"><LuMic size={13} /> {r.note}</span>
                  <span className="award-seal" aria-hidden="true"><LuFileBadge size={18} /></span>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
