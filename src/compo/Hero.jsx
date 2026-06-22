import { Typography, Row, Col, Tag, Modal } from "antd";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import MotionButton from "./MotionButton";
import { heroTags, educationTimeline } from "../data/heroData";
import "../css/hero-cosmic.css";

const { Title, Paragraph, Text } = Typography;

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

            {/* TAGS */}
            <motion.div
              className="hero-tags-cosmic"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.8 },
                },
              }}
            >
              {heroTags.map((tag) => (
                <motion.div
                  key={tag.t}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  <div className="cosmic-tag" style={{ borderLeftColor: tag.c }}>
                    {tag.t}
                  </div>
                </motion.div>
              ))}
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
        <Col xs={24} md={10} className="hero-right">
          <motion.div style={{ y: yCard }}>
            <motion.div
              className="hero-card-hud"
              initial={{ opacity: 0, scale: 0.85, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                delay: 0.4,
                duration: 1,
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Profile with Orbital Rings */}
              <motion.div
                className="profile-hud-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <div className="profile-orbit-ring ring-1"></div>
                <div className="profile-orbit-ring ring-2"></div>
                <div className="profile-orbit-ring ring-3"></div>

                <motion.div
                  className="profile-glow-hud"
                  animate={{ y: [0, -10, 0] }}
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

              <div className="grand-stats-hud">
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
        bodyStyle={{ padding: 0, background: "transparent" }}
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
