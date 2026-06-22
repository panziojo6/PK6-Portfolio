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

// 3D Tilt Panel Component for Categories
function TiltPanel({ cat }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="holo-panel-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="holo-bg-grid"></div>
      <div className="holo-panel-content" style={{ transform: "translateZ(30px)" }}>
        <div className="card-header">
          <div className="glow-dot" style={{ backgroundColor: "#00f0ff", boxShadow: `0 0 15px #00f0ff` }}></div>
          <h3 className="premium-cat-title">{cat.title}</h3>
        </div>
        <ul className="premium-achievement-list">
          {cat.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

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

      <div className="gnss-content-wrapper">
        <Row gutter={[48, 48]} style={{ width: '100%', margin: 0 }}>
          {/* LEFT SIDE — 3D HOLOGRAPHIC PANELS */}
          <Col xs={24} lg={12}>
            <motion.div
              className="category-wrapper"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((cat) => (
                <TiltPanel key={cat.title} cat={cat} />
              ))}
            </motion.div>
          </Col>

          {/* RIGHT SIDE — RADAR METRICS */}
          <Col xs={24} lg={12}>
            <motion.div
              className="radar-metrics-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {metrics.map((m, i) => (
                <motion.div key={i} variants={itemVariants} className="radar-box">
                  <div className="radar-scanner"></div>
                  <div className="radar-content">
                    <div className="radar-value">{m.value}</div>
                    <div className="radar-label">{m.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Col>
        </Row>
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