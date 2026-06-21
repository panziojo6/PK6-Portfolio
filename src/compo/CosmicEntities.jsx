import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../css/cosmic.css";

const Satellite = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))" }}>
    <path d="M13 7 9 3 5 7l4 4"/>
    <path d="m17 11 4 4-4 4-4-4"/>
    <path d="m8 12 4 4 6-6-4-4Z"/>
    <path d="m16 8 3-3"/>
    <path d="M9 21a6 6 0 0 0-6-6"/>
  </svg>
);

const Rocket = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 240, 255, 0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 12px rgba(0, 240, 255, 0.8))" }}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    {/* Rocket Engine Flame */}
    <path d="M5 19l-2 2" stroke="rgba(255, 100, 0, 0.9)" strokeWidth="2" style={{ filter: "drop-shadow(0 0 5px rgba(255, 100, 0, 1))" }} />
  </svg>
);

const UFO = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(56, 189, 248, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))" }}>
    <path d="M12 4a5 5 0 0 0-4.54 2.83C4.44 7.6 2 9.5 2 12c0 2.76 4.48 5 10 5s10-2.24 10-5c0-2.5-2.44-4.4-5.46-5.17A5 5 0 0 0 12 4z"/>
    <path d="M12 17v4"/>
    <path d="M8 16v3"/>
    <path d="M16 16v3"/>
  </svg>
);

export default function CosmicEntities() {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="cosmic-entities-container">
      {/* Slow Satellite orbiting the background */}
      <motion.div
        className="cosmic-entity"
        initial={{ x: -100, y: dimensions.height * 0.2, rotate: 0 }}
        animate={{ 
          x: dimensions.width + 100, 
          y: [dimensions.height * 0.2, dimensions.height * 0.3, dimensions.height * 0.2],
          rotate: 360 
        }}
        transition={{ 
          x: { duration: 40, repeat: Infinity, ease: "linear" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        style={{ top: 0, left: 0, opacity: 0.6 }}
      >
        <Satellite />
      </motion.div>

      {/* UFO Hovering and zooming across */}
      <motion.div
        className="cosmic-entity"
        initial={{ x: dimensions.width + 100, y: dimensions.height * 0.6 }}
        animate={{ 
          x: [-100, dimensions.width * 0.5, dimensions.width * 0.5, dimensions.width + 100], 
          y: [dimensions.height * 0.6, dimensions.height * 0.4, dimensions.height * 0.4, dimensions.height * 0.8] 
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
        style={{ top: 0, left: 0, opacity: 0.5 }}
      >
        <UFO />
      </motion.div>

      {/* Fast Rocket zooming diagonally */}
      <motion.div
        className="cosmic-entity"
        initial={{ x: -100, y: dimensions.height + 100 }}
        animate={{ x: dimensions.width + 100, y: -100 }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatDelay: 18, // Rocket appears every 18 seconds
          ease: "easeIn"
        }}
        style={{ top: 0, left: 0, opacity: 0.8 }}
      >
        <Rocket />
      </motion.div>
      
      {/* Shooting Stars layer */}
      <div className="shooting-stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
    </div>
  );
}
