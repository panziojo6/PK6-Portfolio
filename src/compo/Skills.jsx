import { Row, Col, Typography } from "antd";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../css/skills-grand.css";

const { Title, Paragraph } = Typography;

import { categories, metrics, techStack } from "../data/skillsData";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Orbiting Tech Stack Logic
const innerOrbitSize = 6;
const midOrbitSize = 10;
// remaining goes to outer orbit
const innerOrbitItems = techStack.slice(0, innerOrbitSize);
const midOrbitItems = techStack.slice(innerOrbitSize, innerOrbitSize + midOrbitSize);
const outerOrbitItems = techStack.slice(innerOrbitSize + midOrbitSize);

const innerOrbitRadius = 150;
const midOrbitRadius = 250;
const outerOrbitRadius = 350;

const renderOrbit = (items, radius, duration) => {
  return (
    <div className="orbit-ring" style={{ width: radius * 2, height: radius * 2 }}>
      {items.map((t, i) => {
        const delay = (i / items.length) * -duration;
        return (
          <div
            key={i}
            className={`orbit-satellite-wrapper r-${radius}`}
            style={{
              animation: `spin-orbit-${radius} ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <div className="orbit-satellite-content">
              <span className="tech-icon">{t.icon}</span>
              <span className="tech-name">{t.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Unified 3D Dashboard Component
function Unified3DDashboard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="gnss-unified-dashboard"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* SVG Connecting Lines (Circuitry) */}
      <svg className="dashboard-connections" width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 0 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Abstract lines connecting panels to radars */}
        <path d="M 45% 20% L 55% 25%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.5" />
        <path d="M 45% 50% L 55% 50%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.5" />
        <path d="M 45% 80% L 55% 75%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.5" />
      </svg>

      <Row gutter={[48, 48]} style={{ width: '100%', margin: 0, transformStyle: "preserve-3d" }}>
        {/* LEFT SIDE — 3D HOLOGRAPHIC PANELS */}
        <Col xs={24} lg={12} style={{ transformStyle: "preserve-3d" }}>
          <div className="category-wrapper" style={{ transformStyle: "preserve-3d" }}>
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.title} 
                className="holo-panel-wrapper" 
                variants={itemVariants}
                style={{ transform: `translateZ(${30 + i * 10}px)`, transformStyle: "preserve-3d" }}
              >
                <div className="holo-bg-grid"></div>
                <div className="holo-panel-content" style={{ transform: "translateZ(20px)" }}>
                  <div className="card-header">
                    <div className="glow-dot" style={{ backgroundColor: "#00f0ff", boxShadow: `0 0 15px #00f0ff` }}></div>
                    <h3 className="premium-cat-title">{cat.title}</h3>
                  </div>
                  <ul className="premium-achievement-list">
                    {cat.achievements.map((a, idx) => (
                      <li key={idx} style={{ transform: `translateZ(${idx * 5}px)` }}>{a}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Col>

        {/* RIGHT SIDE — ISOMETRIC RADAR METRICS */}
        <Col xs={24} lg={12} style={{ transformStyle: "preserve-3d" }}>
          <div className="radar-metrics-grid isometric-radars">
            {metrics.map((m, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="radar-box-isometric"
                style={{ transform: `translateZ(${50 + (i % 2) * 20}px)` }}
              >
                <div className="radar-base"></div>
                <div className="radar-scanner"></div>
                <div className="radar-content-isometric" style={{ transform: "translateZ(40px)" }}>
                  <div className="radar-value">{m.value}</div>
                  <div className="radar-label">{m.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Col>
      </Row>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div className="gnss-command-center">
      {/* Background Topographic Map */}
      <div className="topo-bg"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="premium-header-section"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Title level={2} className="premium-title">
          GNSS <span style={{ color: "#00f0ff" }}>Command Center</span>
        </Title>
        <Paragraph className="premium-text" style={{ maxWidth: 800, margin: '0 auto' }}>
          Real-time tracking of expertise across Satellite Analytics, Machine Learning, and Full-Stack Architecture.
        </Paragraph>
      </motion.div>

      <div className="gnss-content-wrapper" style={{ perspective: "2000px" }}>
        <Unified3DDashboard />
      </div>

      {/* ORBITING TECH STACK */}
      <div className="orbital-system-container">
        <h3 className="orbital-title">Deployed Technologies</h3>
        <div className="orbital-system">
          {/* Central Planet */}
          <div className="core-planet">
            <div className="planet-glow"></div>
            <div className="planet-core"></div>
          </div>

          {/* Orbits */}
          {renderOrbit(innerOrbitItems, innerOrbitRadius, 25)}
          {renderOrbit(midOrbitItems, midOrbitRadius, 40)}
          {renderOrbit(outerOrbitItems, outerOrbitRadius, 60)}
        </div>
      </div>
    </div>
  );
}