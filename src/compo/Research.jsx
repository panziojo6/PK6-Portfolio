import Mascot from "./Mascot.jsx";

/* A hand-built phone running the RTK rover dashboard — UI as content, not a screenshot. */
function Phone() {
  const trail = "M28 150 C50 120 70 140 92 110 S140 80 158 60";
  return (
    <div className="phone" aria-label="Live RTK dashboard, rendered mock-up">
      <div className="phone__notch" />
      <div className="phone__screen">
        <div className="phone__status">
          <span>10:43</span>
          <span>●●● 4G</span>
        </div>
        <div className="phone__header">
          <span className="phone__avatar">R2</span>
          <span>
            <strong>Rover #2</strong>
            <small>u-blox ZED-F9P · NTRIP</small>
          </span>
          <span className="fix fix--ok">FIXED</span>
        </div>

        <div className="phone__map">
          <svg viewBox="0 0 200 170" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0 H0 V20" fill="none" stroke="#c7cff5" strokeWidth=".8" />
              </pattern>
            </defs>
            <rect width="200" height="170" fill="url(#grid)" />
            <path d="M0 40 H200 M0 120 H200 M60 0 V170 M140 0 V170" stroke="#aeb8f0" strokeWidth="4" strokeLinecap="round" />
            <path d={trail} stroke="#3b46f1" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
            <circle cx="158" cy="60" r="10" fill="#3b46f1" opacity=".2">
              <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="158" cy="60" r="5" fill="#3b46f1" stroke="#fff" strokeWidth="2" />
            <circle cx="28" cy="150" r="4" fill="#ff6b6b" />
          </svg>
          <span className="phone__pill">1.4 cm · 28 sats</span>
        </div>

        <div className="phone__stats">
          <span>
            <small>Lat</small>13.8468°
          </span>
          <span>
            <small>Lon</small>100.5674°
          </span>
          <span>
            <small>HDOP</small>0.7
          </span>
          <span>
            <small>Age</small>1 s
          </span>
        </div>

        <ul className="phone__feed">
          <li>
            <span className="dot" style={{ background: "#4ade80" }} />
            RTCM 1005/1077/1087 received
          </li>
          <li>
            <span className="dot" style={{ background: "#ffb347" }} />
            Survey-in complete · base 0.8 cm
          </li>
          <li>
            <span className="dot" style={{ background: "#60a5fa" }} />
            Trajectory saved to PostgreSQL
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Research() {
  return (
    <section className="panel panel--peach research" id="research">
      <div className="research__grid">
        <div className="research__copy">
          <h2 className="display display--lg dark">
            <span>Live RTK,</span>
            <span>in your pocket</span>
          </h2>
          <p>
            A rooftop base station, an NTRIP caster I wrote myself, a FastAPI gateway and an ESP32 rover: raw
            carrier-phase data in, centimetre positions out, on a map that updates while you walk.
          </p>
          <p>
            The same habit runs through everything here. The sugarcane classifier became a paper at IEEE ICSEC 2025
            and a talk at MIIGAiK in Moscow, but it also became a DAG that runs every week.
          </p>
          <ul className="facts">
            <li>
              <strong>&lt; 2 cm</strong> RTK fixed accuracy
            </li>
            <li>
              <strong>4</strong> constellations tracked
            </li>
            <li>
              <strong>2</strong> peer-reviewed presentations
            </li>
          </ul>
        </div>
        <div className="research__phone">
          <Phone />
        </div>
      </div>
      <div className="research__mascot">
        <Mascot size={230} prop="headset" delay={1.4} />
      </div>
    </section>
  );
}
