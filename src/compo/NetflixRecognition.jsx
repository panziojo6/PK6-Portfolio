import { useState } from "react";
import { recognition } from "../data/site";
import { netflixAudio } from "./NetflixAudio";

const base = import.meta.env.BASE_URL;

export default function NetflixRecognition() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="recognition" className="netflix-awards-section">
      <div className="awards-inner">
        <div className="about-header-badge">
          <span className="badge-netflix-n-icon">★</span>
          <span>FESTIVAL LAURELS · CRITICAL ACCLAIM</span>
        </div>

        <h2 className="awards-title">International Publications & Recognition</h2>

        <div className="awards-grid">
          {recognition.map((item) => (
            <div
              key={item.id}
              className="award-item-card"
              onClick={() => {
                netflixAudio.playClick();
                setSelectedCert(item);
              }}
              onMouseEnter={() => netflixAudio.playHover()}
            >
              <img
                src={`${base}${item.img}`}
                alt={item.title}
                className="award-card-media"
                loading="lazy"
              />
              <div className="award-card-body">
                <div className="award-laurel-badge">
                  <span>🏆 OFFICIAL SELECTION · {item.when}</span>
                </div>
                <h3 className="award-name">{item.title}</h3>
                <div className="award-venue">{item.where}</div>
                <p className="award-note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom View */}
      {selectedCert && (
        <div
          className="netflix-modal-backdrop"
          style={{ alignItems: "center" }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "850px",
              width: "90%",
              background: "#181818",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #444",
              boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedCert(null)}
            >
              ✕
            </button>
            <img
              src={`${base}${selectedCert.img}`}
              alt={selectedCert.title}
              style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", background: "#000" }}
            />
            <div style={{ padding: "20px 24px" }}>
              <div style={{ color: "#E50914", fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase" }}>
                {selectedCert.where} • {selectedCert.when}
              </div>
              <h3 style={{ margin: "6px 0 10px 0", fontSize: "1.4rem", color: "#fff" }}>
                {selectedCert.title}
              </h3>
              <p style={{ margin: 0, color: "#ccc", fontSize: "0.95rem" }}>
                {selectedCert.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
