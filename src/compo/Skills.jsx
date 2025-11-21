import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import "../css/skills-grand.css";

const { Title, Paragraph } = Typography;

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
  /* ————————————————
     MACHINE LEARNING & AI
  ———————————————— */
  { icon: "🤖", name: "Machine Learning" },
  { icon: "🧠", name: "Deep Learning" },
  { icon: "🔮", name: "LSTM" },
  { icon: "📈", name: "Time-Series Modeling" },
  { icon: "🧪", name: "OCSVM" },
  { icon: "🌲", name: "Random Forest" },
  { icon: "🔥", name: "XGBoost" },
  { icon: "🧊", name: "Isolation Forest" },
  { icon: "⚙️", name: "Gradient Boosting" },
  { icon: "🎛️", name: "Ensemble Learning" },
  { icon: "🔍", name: "Unsupervised Learning" },
  { icon: "🧩", name: "Representation Learning" },
  { icon: "🧬", name: "CNN Models" },
  { icon: "📡", name: "Attention Mechanisms" },
  { icon: "🌀", name: "Autoencoders" },

  /* ————————————————
     GEOAI / REMOTE SENSING
  ———————————————— */
  { icon: "🛰️", name: "Sentinel-2" },
  { icon: "🌾", name: "SAVI / MNDWI" },
  { icon: "📡", name: "InSAR" },
  { icon: "🗺️", name: "Land-Use Classification" },
  { icon: "🌤️", name: "Phenology Modeling" },
  { icon: "🧭", name: "Geospatial Analytics" },
  { icon: "🌏", name: "RasterIO" },
  { icon: "🧱", name: "GDAL" },
  { icon: "📊", name: "QGIS" },
  { icon: "🚜", name: "Crop Classification" },
  { icon: "🧮", name: "Time-Series Phenotyping" },

  /* ————————————————
     GNSS / REAL-TIME SYSTEMS
  ———————————————— */
  { icon: "📡", name: "GNSS" },
  { icon: "🛰️", name: "RTK" },
  { icon: "🔗", name: "NTRIP" },
  { icon: "📶", name: "PPP" },
  { icon: "🧭", name: "u-blox ZED-F9P" },
  { icon: "📟", name: "UBX Parsing" },
  { icon: "🌐", name: "Real-Time Mapping" },

  /* ————————————————
     BACKEND & DATABASE
  ———————————————— */
  { icon: "⚡", name: "FastAPI" },
  { icon: "🧩", name: "Node.js" },
  { icon: "🛠️", name: "Express" },
  { icon: "🗄️", name: "PostGIS" },
  { icon: "🧱", name: "PostgreSQL" },
  { icon: "🦆", name: "DuckDB" },

  /* ————————————————
     CLOUD / DEVOPS / INFRA
  ———————————————— */
  { icon: "🐳", name: "Docker" },
  { icon: "☁️", name: "AWS" },
  { icon: "🚀", name: "GCP" },
  { icon: "🔧", name: "CI/CD" },
  { icon: "📦", name: "Kubernetes" },
  { icon: "🛰️", name: "Cloud-Native Systems" },
  { icon: "⏳", name: "Airflow ETL" },

  /* ————————————————
     FRONTEND & UI/UX
  ———————————————— */
  { icon: "⚛️", name: "React" },
  { icon: "⚡", name: "Vite" },
  { icon: "🎨", name: "Framer Motion" },
  { icon: "🧩", name: "Component Design System" },

  /* ————————————————
     EMBEDDED / IoT
  ———————————————— */
  { icon: "⚙️", name: "ESP32" },
  { icon: "🐍", name: "MicroPython" },
  { icon: "🔌", name: "UART / Serial" },

  /* ————————————————
     LANGUAGES
  ———————————————— */
  { icon: "🐍", name: "Python" },
  { icon: "🟨", name: "JavaScript" },
  { icon: "📘", name: "C++" },
  { icon: "🔵", name: "C" },
  { icon: "⚙️", name: "Assembly" },
  { icon: "📐", name: "MATLAB" },
  { icon: "☕", name: "Java" },
  { icon: "🗄️", name: "SQL" },

];

export default function Skills() {
  return (
    <div className="skills-grand-container">
      <div className="skills-aurora-bg"></div>

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
              className="grand-card enhanced-card"
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

        {/* RIGHT SIDE — METRICS */}
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
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="metric-value"
                >
                  {m.value}
                </motion.div>
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
            key={i}
            className="tech-item floating-tech"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              opacity: { duration: 0.4, delay: i * 0.05 },
              y: { duration: 2, repeat: Infinity, repeatType: "mirror" }
            }}
          >
            <span className="tech-label">{t.icon} {t.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
