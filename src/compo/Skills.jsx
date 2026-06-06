import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import "../css/skills-grand.css";

const { Title, Paragraph } = Typography;

import { categories, metrics, techStack } from "../data/skillsData";

// --- Framer Motion Variants สำหรับทำ Cinematic Stagger ---
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

export default function Skills() {
  return (
    <div className="premium-container">
      {/* พื้นหลังแบบตารางมีแสงจางๆ */}
      <div className="premium-bg-grid"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="premium-header-section"
      >
        <Title level={2} className="premium-title">Expertise & Achievements</Title>
        <Paragraph className="premium-text">
          A blend of engineering, satellite analytics, GNSS systems, and machine learning — delivered through production-grade systems and real research pipelines.
        </Paragraph>
      </motion.div>

      <Row gutter={[32, 32]}>
        {/* LEFT SIDE — CATEGORY BLOCKS */}
        <Col xs={24} md={15}>
          <motion.div
            className="category-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((cat, index) => (
              <motion.div key={cat.title} variants={itemVariants} className="premium-card-wrapper">
                {/* แสงวิ่งรอบขอบ */}
                <div className="card-laser-border"></div>
                <div className="premium-card-content">
                  <div className="card-header">
                    <div className="glow-dot" style={{ backgroundColor: cat.color, boxShadow: `0 0 15px ${cat.color}` }}></div>
                    <h3 className="premium-cat-title">{cat.title}</h3>
                  </div>
                  <ul className="premium-achievement-list">
                    {cat.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Col>

        {/* RIGHT SIDE — METRICS */}
        <Col xs={24} md={9}>
          <motion.div
            className="metrics-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {metrics.map((m, i) => (
              <motion.div key={i} variants={itemVariants} className="premium-metric-box">
                <div className="metric-glow"></div>
                <div className="premium-metric-value">{m.value}</div>
                <div className="premium-metric-label">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Col>
      </Row>

      {/* TECH STACK GRID */}
      <motion.div
        className="premium-tech-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {techStack.map((t, i) => (
          <motion.div key={i} variants={itemVariants} className="premium-tech-item">
            <span className="tech-icon">{t.icon}</span>
            <span className="tech-name">{t.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}