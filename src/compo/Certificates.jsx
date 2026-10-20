import { recognition } from "../data/site";
import { Reveal, Icon, SplitTitle } from "./ui.jsx";

const base = import.meta.env.BASE_URL;

export default function Certificates() {
  return (
    <section id="recognition" data-section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Recognition</span>
            <SplitTitle text="Presented on international stages." hl={["international"]} />
          </div>
          <p className="section-note">Peer-reviewed work on phenotype-based crop classification, presented in Thailand and Russia.</p>
        </Reveal>
        <div className="awards">
          {recognition.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1} className="award">
              <a href={`${base}${r.img}`} target="_blank" rel="noreferrer" className="award-media">
                <img src={`${base}${r.img}`} alt={`Certificate: ${r.title}`} loading="lazy" />
                <span className="chip zoom"><Icon.ArrowUpRight /></span>
              </a>
              <div className="award-text">
                <span className="award-when">{r.when}</span>
                <strong className="award-title">{r.title}</strong>
                <span className="award-where">{r.where}</span>
                <span className="award-note">{r.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
