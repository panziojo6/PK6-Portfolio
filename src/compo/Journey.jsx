import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Mascot from "./Mascot.jsx";
import { education, recognition } from "../data/site.js";

const base = import.meta.env.BASE_URL;

const detail = {
  0: "Four years of engineering at Kasetsart. Where the first GNSS receiver got soldered and the first Sentinel-2 tile got downloaded.",
  1: "Master's research on phenotype-based crop classification: sinusoidal phenology models plus a two-stage one-class SVM, trained on Sentinel-2 time series.",
  2: "Next stop Moscow: a PhD in space engineering at Moscow State University on a Russian Government Scholarship.",
};

const transcript = [
  { from: "ICSEC 2025", color: "#fb7185", text: "Your paper on phenotype-based classification is accepted for presentation in Chiang Mai 🎉", time: "Aug" },
  { from: "me", text: "Thank you! Packing the poster and the rover.", time: "Aug" },
  { from: "MIIGAiK", color: "#60a5fa", text: "Invitation: present at Spatial Data: Science and Technology, Moscow, May 2026.", time: "Feb" },
  { from: "me", text: "On it. Same model, now with the InSAR explorer as a demo.", time: "Feb" },
];

export default function Journey() {
  const [step, setStep] = useState(1);
  const pct = ((step + 0.5) / education.length) * 100;

  return (
    <section className="chapter journey" id="journey">
      <h2 className="display display--lg chapter__title">
        <span>From Bangkok</span>
        <span className="accent">to Moscow</span>
      </h2>

      <div className="journey__grid">
        {/* interactive education card */}
        <div className="dcard">
          <div className="dcard__head">
            <span>Education</span>
            <span className="dcard__count">
              {step + 1} / {education.length}
            </span>
          </div>
          <div className="bar bar--dark">
            <motion.span animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
          </div>
          <div className="dcard__mascot">
            <Mascot size={150} prop={step === 2 ? "flag" : "cap"} delay={0.3} />
          </div>
          <div className="chips" role="tablist" aria-label="Education steps">
            {education.map((e, i) => (
              <button
                key={e.degree}
                role="tab"
                aria-selected={step === i}
                className={`chip-btn ${step === i ? "is-active" : ""}`}
                onClick={() => setStep(i)}
              >
                {e.degree.split(",")[0]} · {e.when}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="dcard__detail"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <strong>{education[step].degree}</strong>
              <span>{education[step].school}</span>
              <p>{detail[step]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* transcript card */}
        <div className="dcard dcard--chat">
          <div className="dcard__head">
            <span>Conferences</span>
            <span className="dcard__count">2 talks</span>
          </div>
          <ul className="transcript">
            {transcript.map((m, i) => (
              <li key={i} className={m.from === "me" ? "me" : ""}>
                {m.from !== "me" && (
                  <span className="transcript__avatar" style={{ background: m.color }}>
                    {m.from[0]}
                  </span>
                )}
                <span className="transcript__bubble">
                  {m.from !== "me" && <span className="transcript__from">{m.from}</span>}
                  {m.text}
                  <small>{m.time}</small>
                </span>
                {m.from === "me" && <span className="transcript__avatar transcript__avatar--me"><Mascot size={44} float={false} /></span>}
              </li>
            ))}
          </ul>
          <div className="transcript__photos">
            {recognition.map((r, i) => (
              <figure key={r.id} className="polaroid polaroid--sm" style={{ "--tilt": i ? "5deg" : "-4deg" }}>
                <img src={`${base}${r.img}`} alt={r.title} loading="lazy" />
                <figcaption>
                  {r.title} · {r.when}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
