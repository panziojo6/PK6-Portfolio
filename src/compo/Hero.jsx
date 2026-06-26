import { Typography, Row, Col, Tag, Modal } from "antd";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import MotionButton from "./MotionButton";
import { heroTags, educationTimeline } from "../data/heroData";
import "../css/hero-cosmic.css";

const { Title, Paragraph } = Typography;

const base = import.meta.env.BASE_URL;

function Counter({ to, duration = 2 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const step = (timestamp) => {
      const progress = Math.min(timestamp / (duration * 1000), 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);

  return <span className="hero-stat-number">{value}+</span>;
}

// 3D Tilt Card Component for Hero Right Side
function Hero3DCard({ setOpen }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
      className="hero-card-hud"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 80 }}
    >
      <div className="hud-bg-grid"></div>

      {/* 3D Astrolabe & Profile */}
      <motion.div
        className="profile-astrolabe-container"
        style={{ transform: "translateZ(60px)" }}
      >
        {/* 3D Rings */}
        <div className="astrolabe-ring ring-x">
          <div className="orbiter"></div>
        </div>
        <div className="astrolabe-ring ring-y">
          <div className="orbiter"></div>
        </div>
        <div className="astrolabe-ring ring-z">
          <div className="orbiter"></div>
        </div>

        <motion.div
          className="profile-glow-hud"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={`${base}img/profile.jpeg`}
            alt="profile"
            className="profile-img-hud"
            onClick={() => setOpen(true)}
          />
        </motion.div>
      </motion.div>

      {/* Education Timeline */}
      <motion.div
        className="edu-timeline-hud"
        style={{ transform: "translateZ(40px)" }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2, delayChildren: 1.2 } },
        }}
      >
        {educationTimeline.map((item, i) => (
          <motion.div
            className="edu-item-hud"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            key={i}
          >
            <div className="hud-dot" />
            <div className="edu-text-hud">
              <div className="edu-degree-hud">{item.degree}</div>
              <div className="edu-uni-hud">{item.uni}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats */}
      <div className="grand-stats-hud" style={{ transform: "translateZ(50px)" }}>
        <div className="stat-box-hud">
          <Counter to={10} />
          <span className="stat-label-hud">Geo pipelines</span>
        </div>
        <div className="stat-box-hud">
          <Counter to={10} />
          <span className="stat-label-hud">Projects</span>
        </div>
        <div className="stat-box-hud">
          <Counter to={3} />
          <span className="stat-label-hud">Years Code</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yCard = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <>
      <Row gutter={48} align="middle">
        <Col xs={24} md={14} className="hero-left-content">
          <motion.div style={{ y: yText, opacity: opacityText }}>
            {/* RUSSIAN SCHOLAR BADGE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{ marginBottom: "24px" }}
            >
              <div className="scholar-badge">
                <span className="scholar-icon">😎</span>
                <span className="scholar-text">The spacial one</span>
                <div className="scholar-glow"></div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Title level={1} className="hero-title-cosmic">
                Hi, I&apos;m <span className="text-gradient-cosmic">Punnawit KOTOSRI</span>
              </Title>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="hero-subtitle-cosmic">
                Machine Learning <span className="dot-sep">•</span> Full-Stack Developer <span className="dot-sep">•</span> Geospatial Engineer <span className="dot-sep">•</span> GNSS <span className="dot-sep">•</span> Remote Sensing
              </h2>
            </motion.div>

            {/* Paragraph */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Paragraph className="hero-text-cosmic">
                I build data-driven web applications, geospatial analytics tools,
                and high-performance pipelines for satellite imagery, GNSS, and
                cloud-native systems. Passionate about clean architecture, readable
                code, and beautiful interfaces.
              </Paragraph>
            </motion.div>

            {/* 3D TAGS DATA STREAM */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="hero-tags-3d-wrapper"
            >
              <div className="marquee-row marquee-left">
                <div className="marquee-content dur-fast">
                  {[...heroTags.slice(0, 8), ...heroTags.slice(0, 8)].map((tag, i) => (
                    <div className="cosmic-tag" key={i}>
                      <span className="tag-dot" style={{ backgroundColor: tag.c, boxShadow: `0 0 8px ${tag.c}` }}></span>
                      {tag.t}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="marquee-row marquee-right">
                <div className="marquee-content dur-slow">
                  {[...heroTags.slice(8, 16), ...heroTags.slice(8, 16)].map((tag, i) => (
                    <div className="cosmic-tag" key={i}>
                      <span className="tag-dot" style={{ backgroundColor: tag.c, boxShadow: `0 0 8px ${tag.c}` }}></span>
                      {tag.t}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              className="hero-actions-cosmic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <button
                className="cosmic-btn primary"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <div className="btn-glow"></div>
                <span>Initialize Systems</span>
              </button>

              <button
                className="cosmic-btn secondary"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <span>Transmit Signal</span>
              </button>
            </motion.div>
          </motion.div>
        </Col>

        {/* RIGHT SIDE (HUD Profile) */}
        <Col xs={24} md={10} className="hero-right" style={{ perspective: "1500px" }}>
          <motion.div style={{ y: yCard, width: "100%", height: "100%" }}>
            <Hero3DCard setOpen={setOpen} />
          </motion.div>
        </Col>
      </Row>

      {/* MODAL ZOOM PROFILE */}
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        centered
        width={420}
        styles={{ body: { padding: 0, background: "transparent" } }}
        zIndex={2000}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={`${base}img/profile.jpeg`}
            alt="profile"
            style={{
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,0,0,0.35)",
            }}
          />
        </motion.div>
      </Modal>
    </>
  );
}
