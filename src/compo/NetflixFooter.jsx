import { profile } from "../data/site";
import { netflixAudio } from "./NetflixAudio";

export default function NetflixFooter() {
  return (
    <footer id="contact" className="netflix-footer">
      <div className="footer-inner">
        <div className="footer-contact-banner">
          <div className="footer-contact-title">Questions or Opportunities? Write to the Engineer:</div>
          <a
            href={`mailto:${profile.email}`}
            className="footer-contact-link"
            onClick={() => netflixAudio.playClick()}
          >
            {profile.email}
          </a>
        </div>

        <div className="footer-links-grid">
          <div>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-link-item"
            >
              LinkedIn Profile
            </a>
          </div>
          <div>
            <a href="#about" className="footer-link-item">
              Behind the Scenes (Bio)
            </a>
          </div>
          <div>
            <a href="#trending" className="footer-link-item">
              Satellite Intelligence
            </a>
          </div>
          <div>
            <a href="#top10" className="footer-link-item">
              Top 10 Research Systems
            </a>
          </div>

          <div>
            <a href="#robotics" className="footer-link-item">
              GNSS & Robotics
            </a>
          </div>
          <div>
            <a href="#pipelines" className="footer-link-item">
              Pipelines & Cloud ETL
            </a>
          </div>
          <div>
            <a href="#recognition" className="footer-link-item">
              IEEE & MIIGAiK Awards
            </a>
          </div>
          <div>
            <span className="footer-link-item">Bangkok, TH • Moscow, RU</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="service-code-btn"
            onClick={() => {
              netflixAudio.playClick();
              alert("Service Code: PK6-GEOSPATIAL-RESEARCH-2026\nStatus: Systems Operational\nLocation: Bangkok & Moscow");
            }}
          >
            Service Code: PK6-GEO-2026
          </button>
        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} PK6 Studios • Punnawit Kotosri. Designed with Netflix-level Grand Aesthetic.
        </div>
      </div>
    </footer>
  );
}
