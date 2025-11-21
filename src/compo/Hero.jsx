import { Typography, Row, Col, Tag, Modal } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MotionButton from "./MotionButton";

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

  return (
    <>
      <Row gutter={48} align="middle">
        <Col xs={24} md={14}>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title level={1} className="hero-title">
              Hi, I&apos;m <span className="accent">Punnawit KOTOSRI</span>
            </Title>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Title level={4} className="hero-subtitle">
              Machine Learning · Full-Stack Developer · Geospatial Engineer · GNSS · Remote Sensing
            </Title>
          </motion.div>

          {/* Paragraph */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Paragraph className="hero-text">
              I build data-driven web applications geospatial analytics tools
              and high-performance pipelines for satellite imagery GNSS and
              cloud-native systems. Passionate about clean architecture readable
              code and beautiful interfaces.
            </Paragraph>
          </motion.div>

          {/* TAGS */}
          <motion.div
            className="hero-tags"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {[
                // AI & ML
                { c: "geekblue", t: "Deep Learning" },
                { c: "cyan", t: "Machine Learning" },
                { c: "lime", t: "Time-Series Modeling" },

                // Geospatial
                { c: "magenta", t: "Geospatial Intelligence" },
                { c: "gold", t: "Remote Sensing" },
                { c: "geekblue", t: "Crop Phenotyping / Agriculture" },

                // Satellite & GNSS
                { c: "orange", t: "Satellite Analytics" },
                { c: "volcano", t: "GNSS · RTK · NTRIP · PPP" },

                // Data Engineering
                { c: "red", t: "Airflow ETL Pipelines" },
                { c: "cyan", t: "Big Data Processing" },

                // Engineering / Dev
                { c: "blue", t: "JavaScript · React" },
                { c: "purple", t: "Python · ML Stack" },
                { c: "lime", t: "Full-Stack Engineering" },

                // Cloud & Infra
                { c: "gold", t: "Cloud-Native · Docker" },
                { c: "green", t: "AWS · GCP · Azure" },
                { c: "volcano", t: "CI/CD · DevOps" },
                { c: "red", t: "Kubernetes" }
            ].map((tag) => (
              <motion.div
                key={tag.t}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Tag color={tag.c}>{tag.t}</Tag>
              </motion.div>
            ))}
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ display: "flex", gap: "16px", marginTop: "20px" }}
          >
            <MotionButton
              type="primary"
              size="large"
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              View Projects
            </MotionButton>

            <MotionButton
              size="large"
              ghost
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              Contact Me
            </MotionButton>
          </motion.div>
        </Col>

        {/* RIGHT SIDE */}
        <Col xs={24} md={10} className="hero-right">
          <motion.div
            className="hero-card grand-card"
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.9,
              type: "spring",
              stiffness: 80
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aurora-bg"></div>

            {/* Profile */}
            <motion.div
              className="profile-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="profile-glow">
                <img
                  src={`${base}img/profile.jpeg`}
                  alt="profile"
                  className="profile-img grand"
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              className="edu-timeline"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {[
                {
                  degree: "Bachelor of Engineering",
                  uni: "Kasetsart University, Bangkok Thailand · April 2024"
                },
                {
                  degree: "Master of Engineering",
                  uni: "Kasetsart University, Bangkok Thailand · Dec 2025 (Expected)"
                }
              ].map((item, i) => (
                <motion.div
                  className="edu-item"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  key={i}
                >
                  <div className="dot" />
                  <div className="edu-text">
                    <div className="edu-degree">{item.degree}</div>
                    <div className="edu-uni">{item.uni}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Paragraph className="hero-meta">
              Satellite imagery · GNSS · Machine Learning · Deep Learning · Python
            </Paragraph>

            <div className="grand-stats">
              <div className="stat-box">
                <Counter to={10} />
                <span className="stat-label">Geo pipelines</span>
              </div>
              <div className="stat-box">
                <Counter to={10} />
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-box">
                <Counter to={3} />
                <span className="stat-label">Years of coding</span>
              </div>
            </div>
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
              boxShadow: "0 0 25px rgba(0,0,0,0.35)"
            }}
          />
        </motion.div>
      </Modal>
    </>
  );
}
