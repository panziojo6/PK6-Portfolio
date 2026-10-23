import { education, stackGroups } from "../data/site";
import { netflixAudio } from "./NetflixAudio";

const base = import.meta.env.BASE_URL;

export default function NetflixAboutDoc() {
  const allSkills = stackGroups.flatMap((g) => g.items);

  return (
    <section id="about" className="netflix-about-section">
      <div className="about-inner">
        <div className="about-header-badge">
          <span className="badge-netflix-n-icon">N</span>
          <span>ORIGINAL DOCUMENTARY · BEHIND THE SCENES</span>
        </div>

        <h2 className="about-heading">Creator Profile: Punnawit Kotosri</h2>

        <div className="about-split-layout">
          {/* Portrait Card */}
          <div className="about-portrait-card">
            <img
              src={`${base}img/profile.jpeg`}
              alt="Punnawit Kotosri"
              className="about-portrait-img"
              loading="lazy"
            />
            <div className="about-portrait-caption">
              <h3 className="caption-name">Punnawit Kotosri</h3>
              <div className="caption-role">Geospatial Engineer & ML Researcher</div>
              <div style={{ fontSize: "0.78rem", color: "#aaa", marginTop: "4px" }}>
                Bangkok, Thailand • Moscow State University Ph.D. Bound
              </div>
            </div>
          </div>

          {/* Biography & Seasons */}
          <div className="about-text-content">
            <p className="about-bio-lead">
              “Most of my engineering starts with a stream of raw observations—multi-spectral satellite bands, centimeter GNSS carrier phase signals, or LiDAR point clouds—and ends with reliable production systems that researchers, farmers, and autonomous vehicles can depend on.”
            </p>

            <p className="about-bio-text">
              My core research centers on satellite crop phenotyping: fitting mathematical growth curves to Sentinel-2 time series, then classifying fragmented sugarcane and rice fields with One-Class SVMs. Beyond algorithms, I construct the full infrastructure: low-latency FastAPI backends, real-time NTRIP casters, Raspberry Pi/ESP32 edge nodes, and automated Airflow data pipelines.
            </p>

            {/* Academic Seasons */}
            <h3 className="seasons-timeline-title">Academic Seasons & Milestones</h3>
            <div className="seasons-timeline">
              {education.map((item, idx) => {
                const seasonNum = idx + 1;
                const isCurrentOrNext = idx === education.length - 1;
                return (
                  <div
                    key={item.degree}
                    className="season-card"
                    onMouseEnter={() => netflixAudio.playHover()}
                  >
                    <div className="season-badge">
                      {isCurrentOrNext ? "SEASON 3" : `SEASON ${seasonNum}`}
                    </div>
                    <div className="season-details">
                      <h4 className="season-degree">
                        {item.degree} <span style={{ color: "#e50914", fontSize: "0.85rem" }}>({item.when})</span>
                      </h4>
                      <p className="season-school">{item.school}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech Stack Genres */}
            <h3 className="seasons-timeline-title" style={{ marginTop: "32px" }}>
              Specialization & Technical Genres
            </h3>
            <div className="genre-tags-wrap">
              {allSkills.map((skill) => (
                <span
                  key={skill}
                  className="genre-pill"
                  onMouseEnter={() => netflixAudio.playHover()}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
