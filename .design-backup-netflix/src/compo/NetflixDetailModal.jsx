import { useEffect, useRef } from "react";
import { netflixAudio } from "./NetflixAudio";

export default function NetflixDetailModal({ project, allProjects, onClose, onSelectProject }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  // Find 3 related projects
  const related = (allProjects || [])
    .filter((p) => p.id !== project.id && (p.category === project.category || p.tags.some((t) => project.tags.includes(t))))
    .slice(0, 3);

  return (
    <div
      className="netflix-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="netflix-modal" ref={modalRef}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close dialog"
          onClick={() => {
            netflixAudio.playClick();
            onClose();
          }}
        >
          ✕
        </button>

        {/* Hero Media */}
        <div className="modal-hero-media">
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img src={project.image} alt={project.title} />
          )}

          <div className="modal-media-vignette" />

          <div className="modal-title-overlay">
            <h2 className="modal-title-text">{project.title}</h2>
          </div>

          <div className="modal-media-actions">
            <a
              href={`mailto:punnawit.kot@ku.th?subject=Inquiry about ${encodeURIComponent(project.title)}`}
              className="btn-netflix-play"
              onClick={() => netflixAudio.playClick()}
            >
              <span>Discuss Project</span>
            </a>
            <button
              type="button"
              className="card-action-btn btn-outline"
              style={{ width: "42px", height: "42px", fontSize: "1.1rem" }}
              title="Add to Favorites"
              onClick={() => netflixAudio.playClick()}
            >
              ＋
            </button>
            <button
              type="button"
              className="card-action-btn btn-outline"
              style={{ width: "42px", height: "42px", fontSize: "1.1rem" }}
              title="Recommend"
              onClick={() => netflixAudio.playClick()}
            >
              👍
            </button>
          </div>
        </div>

        {/* Body Details */}
        <div className="modal-body">
          <div className="modal-meta-grid">
            {/* Left Column */}
            <div className="modal-left-col">
              <div className="modal-badges-bar">
                <span className="modal-match">{project.match || "99% Match"}</span>
                <span className="modal-year">{project.year || "2025"}</span>
                <span className="modal-rating">{project.rating || "Research Grade"}</span>
                <span className="modal-quality">ULTRA HD 4K</span>
                <span className="modal-duration">{project.duration || "End-to-End Pipeline"}</span>
              </div>

              <p className="modal-description">{project.description}</p>

              {project.longDescription && (
                <p className="modal-description" style={{ color: "#c0c0c0", fontSize: "0.95rem" }}>
                  {project.longDescription}
                </p>
              )}

              {/* Specifications */}
              {project.specs && (
                <div style={{ background: "#222", padding: "16px", borderRadius: "6px", marginTop: "12px" }}>
                  <div style={{ fontSize: "0.82rem", color: "#e50914", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>
                    System Specifications & Highlights
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px", fontSize: "0.85rem" }}>
                    {Object.entries(project.specs).map(([k, v]) => (
                      <div key={k}>
                        <strong style={{ color: "#888", textTransform: "capitalize" }}>{k}: </strong>
                        <span style={{ color: "#ddd" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Cast / Meta) */}
            <div className="modal-right-col">
              <div className="metadata-field">
                <strong>Lead Role: </strong>
                <span>{project.role || "Punnawit Kotosri (Engineer & Researcher)"}</span>
              </div>
              <div className="metadata-field">
                <strong>Category: </strong>
                <span>{project.category}</span>
              </div>
              <div className="metadata-field">
                <strong>Technologies: </strong>
                <span>{project.tags.join(", ")}</span>
              </div>
              <div className="metadata-field">
                <strong>Project Character: </strong>
                <span>Data-Driven, Autonomous, Peer-Reviewed, Full-Stack</span>
              </div>
            </div>
          </div>

          {/* Episodes / Milestones */}
          {project.episodes && project.episodes.length > 0 && (
            <div className="modal-episodes-section">
              <div className="episodes-header">
                <h3 className="episodes-title">Project Phases & Milestones</h3>
                <span className="episodes-subtitle">{project.episodes.length} Episodes</span>
              </div>
              <div className="episodes-list">
                {project.episodes.map((ep, i) => (
                  <div className="episode-item" key={ep.ep || i}>
                    <div className="episode-number">{ep.ep || `${i + 1}`}</div>
                    <div className="episode-info">
                      <div className="episode-title-row">
                        <span className="episode-name">{ep.title}</span>
                        <span className="episode-time">{ep.time}</span>
                      </div>
                      <p className="episode-desc">{ep.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This */}
          {related.length > 0 && (
            <div className="modal-related-section">
              <h3 className="episodes-title">More Like This</h3>
              <div className="related-grid">
                {related.map((item) => (
                  <div
                    key={item.id}
                    className="related-card"
                    onClick={() => {
                      netflixAudio.playClick();
                      onSelectProject(item);
                    }}
                  >
                    <img src={item.image} alt={item.title} className="related-thumb" />
                    <div className="related-card-body">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ color: "#46d369", fontWeight: "700", fontSize: "0.8rem" }}>{item.match}</span>
                        <span style={{ fontSize: "0.75rem", color: "#888" }}>{item.year}</span>
                      </div>
                      <h4 className="related-title">{item.shortTitle || item.title}</h4>
                      <p className="related-snippet">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
