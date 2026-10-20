import { useState, useEffect, useRef } from "react";
import { netflixAudio } from "./NetflixAudio";

export default function NetflixHeroBillboard({ featuredList, onSelectProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef(null);

  const currentProject = featuredList[currentIndex] || featuredList[0];

  // Rotate featured project every 12 seconds if not interacted
  useEffect(() => {
    if (!featuredList || featuredList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 14000);
    return () => clearInterval(timer);
  }, [featuredList]);

  // Handle sound toggle on video
  const toggleVideoSound = () => {
    netflixAudio.playClick();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVideoMuted(videoRef.current.muted);
    } else {
      setVideoMuted((prev) => !prev);
    }
  };

  const handleSelectSlide = (index) => {
    netflixAudio.playClick();
    setCurrentIndex(index);
  };

  if (!currentProject) return null;

  return (
    <section id="top" className="netflix-billboard">
      <div className="billboard-media-wrap">
        {currentProject.video ? (
          <video
            ref={videoRef}
            key={currentProject.video}
            src={currentProject.video}
            poster={currentProject.image}
            autoPlay
            loop
            muted={videoMuted}
            playsInline
            className="billboard-bg-video"
          />
        ) : (
          <img
            key={currentProject.image}
            src={currentProject.image}
            alt={currentProject.title}
            className="billboard-bg-img"
          />
        )}
      </div>

      {/* Multi-gradient Cinematic Vignettes */}
      <div className="billboard-vignette-bottom" />
      <div className="billboard-vignette-left" />
      <div className="billboard-vignette-top" />

      {/* Billboard Main Content */}
      <div className="billboard-content">
        <div className="billboard-badge-row">
          <div className="badge-netflix-n">
            <span className="badge-netflix-n-icon">N</span>
            <span>ORIGINAL RESEARCH</span>
          </div>

          {currentProject.topRank && (
            <div className="badge-top10">
              <span className="badge-top10-icon">#1</span>
              <span>TOP 10 TODAY</span>
            </div>
          )}

          <span className="badge-match">{currentProject.match || "99% Match"}</span>
        </div>

        <h1 className="billboard-title">{currentProject.title}</h1>

        <p className="billboard-synopsis">{currentProject.description}</p>

        <div className="billboard-actions">
          <button
            type="button"
            className="btn-netflix-play"
            onClick={() => {
              netflixAudio.playClick();
              onSelectProject(currentProject);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>{currentProject.video ? "Watch Live Reel" : "Explore Project"}</span>
          </button>

          <button
            type="button"
            className="btn-netflix-info"
            onClick={() => {
              netflixAudio.playClick();
              onSelectProject(currentProject);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Side Controls: Audio & Maturity Tag */}
      <div className="billboard-side-controls">
        {currentProject.video && (
          <button
            type="button"
            className="billboard-sound-btn"
            onClick={toggleVideoSound}
            aria-label={videoMuted ? "Unmute Video" : "Mute Video"}
            title={videoMuted ? "Video Muted - Click for Sound" : "Video Playing Sound"}
          >
            {videoMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        )}

        <div className="billboard-rating-badge">
          {currentProject.rating || "Ph.D. Bound · Spatial AI"}
        </div>
      </div>

      {/* Slide Indicators */}
      {featuredList.length > 1 && (
        <div className="billboard-slide-indicators">
          {featuredList.map((item, idx) => (
            <button
              type="button"
              key={item.id || idx}
              className={`slide-dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => handleSelectSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
