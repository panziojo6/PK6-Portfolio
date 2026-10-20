import { education, profile } from "../data/site";
import { metrics } from "../data/skillsData";
import { Reveal, Counter, Tilt, Terminal, SplitTitle } from "./ui.jsx";

const termLines = [
  { cmd: "whoami" }, { out: "punnawit.kotosri — geospatial engineer, Bangkok" },
  { cmd: "cat research.txt" }, { out: "Sentinel-2 phenology → One-Class SVM → sugarcane / rice maps" },
  { cmd: "ls ./stack" }, { out: "python  pytorch  gdal  rasterio  fastapi  react  airflow  docker" },
  { cmd: "gnss --status" }, { out: "RTK FIXED · 32 sats · hAcc 1.4 cm · NTRIP caster online", ok: true },
  { cmd: "next --where" }, { out: "PhD Space Engineering @ Moscow State University 🚀", ok: true },
];

export default function About() {
  return (
    <section id="about" data-section className="section">
      <div className="wrap about-grid v2">
        <div>
          <Reveal>
            <span className="eyebrow">About me</span>
            <SplitTitle text="Satellite data in, usable tools out." hl={["usable", "tools"]} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-lead" style={{ marginTop: 22 }}>
              I&apos;m a geospatial engineer. Most of my projects start with a pile of observations — satellite scenes or raw GNSS messages — and end with
              something a farmer, a planner or another researcher can <span className="hl">actually read</span>.
            </p>
            <p className="about-p">
              My research is on crop mapping: fitting the seasonal growth curve of each field in Sentinel-2 time series, then separating sugarcane from
              rice with one-class SVMs. I presented that work at IEEE ICSEC 2025 and at MIIGAiK in Moscow.
            </p>
            <p className="about-p">
              Outside research I build the plumbing around it: Airflow pipelines, FastAPI services, React dashboards, and GNSS receivers on Raspberry Pi
              and ESP32 that stream RTK corrections in real time.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="metric-grid">
              {metrics.map((m) => (
                <Tilt className="metric" key={m.label} max={10}>
                  <b><Counter value={m.value} /></b>
                  <span>{m.label}</span>
                </Tilt>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="eyebrow">Education</span>
            <ol className="timeline">
              {[...education].reverse().map((e) => (
                <li key={e.degree}>
                  <span className="when">{e.when}</span>
                  <strong>{e.degree}</strong>
                  <span className="school">{e.school}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="about-aside">
          <Terminal lines={termLines} />
          <div className="now-card">
            <h4><span className="pulse" /> Right now</h4>
            <div className="now-row"><i>🛰️</i><div><b>Mapping sugarcane from orbit</b><span>Sentinel-2 time series, Thailand</span></div></div>
            <div className="now-row"><i>📡</i><div><b>RTK base station on the roof</b><span>u-blox ZED-F9P · NTRIP caster</span></div></div>
            <div className="now-row"><i>🎓</i><div><b>Heading to Moscow</b><span>PhD Space Engineering · {profile.location} → Russia</span></div></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
