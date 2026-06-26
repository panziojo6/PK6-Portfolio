import { Typography, Row, Col } from "antd";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { aboutInfo } from "../data/aboutData";
import "../css/about-cosmic.css";

const { Title, Paragraph } = Typography;

function About3DTerminal() {
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
      className="about-3d-terminal"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.85, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 80 }}
      viewport={{ once: true }}
    >
      <div className="terminal-glass-bg"></div>
      
      {/* Glowing Frame Overlays */}
      <div className="terminal-corner t-top-left"></div>
      <div className="terminal-corner t-top-right"></div>
      <div className="terminal-corner t-bottom-left"></div>
      <div className="terminal-corner t-bottom-right"></div>

      <div className="terminal-content" style={{ transform: "translateZ(50px)" }}>
        <h3 className="terminal-header">
          <span className="blink-dot"></span> IDENTITY VERIFIED
        </h3>
        <div className="terminal-list">
          {aboutInfo.map((item, i) => (
            <motion.div
              key={i}
              className="terminal-item"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="terminal-icon" style={{ transform: "translateZ(30px)" }}>{item.icon}</div>
              <div className="terminal-text" style={{ transform: "translateZ(10px)" }}>
                <div className="terminal-label">{item.label}</div>
                <div className="terminal-value">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="about-cosmic-section">
      {/* Background Cosmic Grid */}
      <div className="about-cosmic-bg"></div>

      <div className="section-inner" style={{ position: "relative", zIndex: 10 }}>
        <Row gutter={48} align="middle">
          {/* TEXT LEFT */}
          <Col xs={24} md={12}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}>
                <Title level={2} className="about-title-cosmic">
                  <span className="accent">/</span> About Me
                </Title>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Paragraph className="about-text-cosmic">
                  I engineer systems that decode the physical world. With a strong
                  focus on geospatial intelligence and machine learning, I transform
                  large-scale spatial datasets—from Sentinel-2 imagery to
                  high-precision GNSS—into predictive models and actionable
                  insights.
                </Paragraph>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Paragraph className="about-text-cosmic">
                  Fusing Python, cloud-native pipelines, and advanced statistical
                  modeling, I architect end-to-end solutions. From raw data
                  ingestion and feature engineering to interactive visualization, my
                  work empowers robust analysis of agricultural and environmental
                  phenomena.
                </Paragraph>
              </motion.div>
            </motion.div>
          </Col>

          {/* 3D TERMINAL RIGHT */}
          <Col xs={24} md={12} style={{ perspective: "1500px" }}>
            <About3DTerminal />
          </Col>
        </Row>
      </div>
    </div>
  );
}
