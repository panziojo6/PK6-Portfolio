import { Row, Col, Card, Tag, Typography } from "antd";
import { motion } from "framer-motion";
import "../css/skills-grand.css";

const { Title, Paragraph, Text } = Typography;

const categories = [
  {
    title: "Full-Stack Engineering",
    color: "#a855f7",
    achievements: [
      "Designed scalable React + FastAPI architectures",
      "Built real-time GNSS dashboard with live map & data streams",
      "Created full-stack authentication systems",
      "Developed reusable design-system components",
    ],
  },
  {
    title: "Geospatial Intelligence",
    color: "#38bdf8",
    achievements: [
      "Automated Sentinel-2 SAVI/MNDWI pipelines",
      "Developed InSAR time-series profile API",
      "Built UBX parser & real-time NTRIP caster system",
      "GNSS→ESP32→TCP→Python→Web pipeline",
    ],
  },
  {
    title: "Machine Learning & Remote Sensing",
    color: "#22c55e",
    achievements: [
      "Implemented sinusoidal phenology models",
      "Designed two-stage OCSVM classification pipeline",
      "Built crop classification ML system (rice/sugarcane)",
      "Migrated Random Forest → LSTM time-series model",
    ],
  },
];

const metrics = [
  { label: "Satellite Pipelines", value: "12+" },
  { label: "Full-Stack Projects", value: "10+" },
  { label: "Years of Coding", value: "3+" },
  { label: "GNSS/NTRIP Systems", value: "6+" },
  { label: "Research Systems", value: "4" },
  { label: "IEEE Papers", value: "2" },
];

const techStack = [
  "React", "FastAPI", "PostGIS", "Sentinel-2", "InSAR",
  "GNSS", "NTRIP", "Docker", "AWS", "ESP32",
  "Python", "LSTM", "OCSVM", "TensorFlow", "QGIS",
];

export default function Skills() {
  return (
    <div className="skills-grand-container">

      <Title level={2} className="grand-title">Expertise & Achievements</Title>
      <Paragraph className="grand-text">
        A blend of engineering, satellite analytics, GNSS systems, and machine learning — delivered through production-grade systems and real research pipelines.
      </Paragraph>

      <Row gutter={[32, 32]}>
        {/* LEFT SIDE — CATEGORY BLOCKS */}
        <Col xs={24} md={14}>
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              className="grand-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="grand-cat-title" style={{ color: cat.color }}>
                {cat.title}
              </h3>

              <ul className="achievement-list">
                {cat.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Col>

        {/* RIGHT SIDE — METRICS PANEL */}
        <Col xs={24} md={10}>
          <motion.div
            className="metrics-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="metric-box"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Col>
      </Row>

      {/* TECH STACK GRID */}
      <div className="tech-grid">
        {techStack.map((t, i) => (
          <motion.div
            className="tech-item"
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            {t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
