import { useEffect, useState } from "react";
import { netflixAudio } from "./NetflixAudio";

export default function NetflixIntro({ onComplete }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Play the iconic Netflix-style Ta-Dum synthesizer!
    const audioTimer = setTimeout(() => {
      netflixAudio.playTaDum();
    }, 200);

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2400);

    const endTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(audioTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  return (
    <div
      className="netflix-intro-overlay"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
      onClick={handleSkip}
    >
      <div className="intro-logo-container">
        <h1 className="intro-brand-name">PK6</h1>
        <div className="intro-tagline">PUNNAWIT KOTOSRI STUDIOS</div>
      </div>

      <button
        type="button"
        className="intro-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
      >
        Skip Intro ›
      </button>
    </div>
  );
}
