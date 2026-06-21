import { Typography, Row, Col } from "antd";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import "../css/certificates.css";

const { Title, Paragraph } = Typography;
const base = import.meta.env.BASE_URL;

const certs = [
  {
    id: "russia",
    title: "Russian Conference",
    issuer: "International Conference",
    img: `${base}img/Russia_Conf.png`,
    desc: "Recognized for outstanding presentation and research contributions in the international geospatial and GNSS community."
  },
  {
    id: "icsec",
    title: "ICSEC 2025",
    issuer: "IEEE",
    img: `${base}img/ICSEC.png`,
    desc: "Certificate of Achievement for technical paper and presentation at the International Computer Science and Engineering Conference."
  }
];

// 3D Tilt Card Component
function TiltCard({ cert }) {
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
      className="cert-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="cert-glow-backdrop"></div>

      <div className="cert-card-inner" style={{ transform: "translateZ(50px)" }}>
        <img src={cert.img} alt={cert.title} className="cert-img" />
        <div className="cert-glass-overlay"></div>

        <div className="cert-info" style={{ transform: "translateZ(80px)" }}>
          <div className="cert-issuer">{cert.issuer}</div>
          <h3 className="cert-title">{cert.title}</h3>
          <p className="cert-desc">{cert.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  return (
    <div className="certificates-container">
      <div className="bg-typography-cert">HONORS</div>

      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          className="premium-header-section"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="premium-title" style={{ textAlign: "center" }}>
            Certificates <span style={{ color: "#a855f7" }}>&</span> Awards
          </Title>
          <Paragraph className="premium-text" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px auto" }}>
            Global recognitions and technical publications validating expertise in Machine Learning and Computer Science.
          </Paragraph>
        </motion.div>

        <Row gutter={[48, 48]} justify="center">
          {certs.map((cert) => (
            <Col xs={24} md={12} lg={10} key={cert.id} style={{ display: "flex", justifyContent: "center" }}>
              <TiltCard cert={cert} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
