import { Typography, Row, Col } from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  EnvironmentOutlined,
  CodeOutlined,
  BulbOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function About() {
  const info = [
    { icon: <UserOutlined />, label: "Name", value: "PUNNAWIT KOTOSRI" },
    { icon: <EnvironmentOutlined />, label: "Location", value: "Bangkok, Thailand" },
    { icon: <CodeOutlined />, label: "Role", value: "Machine Learning Engineer / Full-Stack / Geospatial Developer" },
    { icon: <BulbOutlined />, label: "Focus", value: " Machine Learning · GIS · Remote Sensing · GNSS · Math Model · Cloud Computing" },
    { icon: <RocketOutlined />, label: "Interests", value: "Remote Sensing, GNSS, Data Pipelines" },
  ];

  return (
    <div className="section-inner">

      {/* TEXT LEFT */}
      <Row gutter={48} align="middle">
        <Col xs={24} md={14}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="section-title">
              About Me
            </Title>

            <Paragraph className="section-text">
              I&apos;m a full-stack developer and geospatial engineer who loves building
              high-performance pipelines and beautiful, intuitive interfaces for satellite
              imagery, GNSS, and agricultural analytics.
            </Paragraph>

            <Paragraph className="section-text">
              My work blends Python, React, FastAPI, cloud infrastructure, and advanced
              geospatial methods like Sentinel-2 processing, InSAR time series, and land-use
              classification — turning massive datasets into tools that actually make sense.
            </Paragraph>
          </motion.div>
        </Col>

        {/* INFO CARD RIGHT */}
        <Col xs={24} md={10}>
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="about-aurora"></div>

            {info.map((item, i) => (
              <motion.div
                key={i}
                className="about-item"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="about-icon">{item.icon}</div>
                <div className="about-text">
                  <div className="about-label">{item.label}</div>
                  <div className="about-value">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
