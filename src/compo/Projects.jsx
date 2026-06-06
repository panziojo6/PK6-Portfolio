import { Typography, Row, Col } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "./VideoModal";
import "../css/projects-grand.css";

const { Title, Paragraph } = Typography;
import { projects } from "../data/projectsData";

// --- Framer Motion Cinematic Stagger ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Projects() {
  const [videoSrc, setVideoSrc] = useState(null);

  return (
    <div className="premium-projects-container">
      {/* Background Grid Pattern */}
      <div className="premium-bg-grid"></div>

      <div className="section-inner">
        <motion.div
          className="premium-header-section"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Title level={2} className="premium-title">
            Builds & Experiments
          </Title>
          <Paragraph className="premium-text">
            A curated collection of experimental and production-ready systems
            that merge satellite-derived insights, GNSS technologies,
            machine-learning models, and geospatial workflows.
          </Paragraph>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Row gutter={[32, 32]}>
            {projects.map((p) => (
              <Col xs={24} sm={12} lg={8} key={p.title}>
                {/* ใช้ wrapper แบบเดียวกับหน้า Skills 
                  เพื่อให้มี Laser Border วิ่งรอบการ์ด 
                */}
                <motion.div variants={cardVariants} className="premium-card-wrapper">
                  <div className="card-laser-border"></div>

                  <div className="premium-project-content">
                    {/* Thumbnail Section */}
                    <div className="project-thumb">
                      <img src={p.image} alt={p.title} className="thumb-img" />
                      <div className="thumb-overlay"></div>

                      <span className="premium-role-badge">{p.role}</span>

                      {p.video && (
                        <motion.div
                          className="premium-play-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setVideoSrc(p.video)}
                        >
                          <span className="play-icon">▶</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Text & Tags Section */}
                    <div className="project-info">
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-desc">{p.description}</p>

                      <div className="project-tags">
                        {p.tags.map((t) => (
                          <span className="premium-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        <VideoModal
          open={!!videoSrc}
          src={videoSrc}
          onClose={() => setVideoSrc(null)}
        />
      </div>
    </div>
  );
}