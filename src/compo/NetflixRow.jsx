import { useRef } from "react";
import { netflixAudio } from "./NetflixAudio";

export default function NetflixRow({
  id,
  title,
  subtitle,
  items,
  isTop10 = false,
  onSelectProject,
}) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    netflixAudio.playClick();
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollAmount = clientWidth * 0.75;
    sliderRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section id={id} className="netflix-row">
      <div className="row-header">
        <div className="row-title-wrap">
          <h2 className="row-title">
            <span>{title}</span>
            <span className="row-see-all">Explore All ›</span>
          </h2>
        </div>
        {subtitle && <span className="episodes-subtitle">{subtitle}</span>}
      </div>

      <div className="row-slider-wrapper">
        {/* Left Paddle */}
        <button
          type="button"
          className="slider-paddle paddle-left"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
        >
          ‹
        </button>

        {/* Scrollable Track */}
        <div className="row-slider" ref={sliderRef}>
          {items.map((project, index) => {
            if (isTop10) {
              const rank = index + 1;
              return (
                <div
                  key={project.id || project.title}
                  className="top10-card-wrap"
                  onClick={() => {
                    netflixAudio.playClick();
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => netflixAudio.playHover()}
                >
                  <span className="top10-rank-number">{rank}</span>
                  <div className="top10-card-inner">
                    <span className="top10-badge-flag">TOP 10</span>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-thumbnail"
                      loading="lazy"
                    />
                    <div className="card-overlay-info">
                      <div className="card-quick-actions">
                        <span className="card-action-btn">▶</span>
                        <span className="card-action-btn btn-outline">＋</span>
                        <span className="card-action-btn btn-outline">ⓘ</span>
                      </div>
                      <div className="card-meta-row">
                        <span className="card-match-pct">{project.match || "98% Match"}</span>
                        <span className="card-rating-badge">{project.rating || "HD"}</span>
                      </div>
                      <div className="card-title-preview">{project.shortTitle || project.title}</div>
                      <div className="card-tags-preview">{project.tags.slice(0, 3).join(" • ")}</div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={project.id || project.title}
                className="netflix-card"
                onClick={() => {
                  netflixAudio.playClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => netflixAudio.playHover()}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-thumbnail"
                  loading="lazy"
                />
                <div className="card-overlay-info">
                  <div className="card-quick-actions">
                    <span className="card-action-btn">▶</span>
                    <span className="card-action-btn btn-outline">＋</span>
                    <span className="card-action-btn btn-outline">ⓘ</span>
                  </div>
                  <div className="card-meta-row">
                    <span className="card-match-pct">{project.match || "98% Match"}</span>
                    <span className="card-rating-badge">{project.rating || "HD"}</span>
                    {project.video && <span className="card-rating-badge">VIDEO</span>}
                  </div>
                  <div className="card-title-preview">{project.shortTitle || project.title}</div>
                  <div className="card-tags-preview">{project.tags.slice(0, 3).join(" • ")}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Paddle */}
        <button
          type="button"
          className="slider-paddle paddle-right"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
        >
          ›
        </button>
      </div>
    </section>
  );
}
