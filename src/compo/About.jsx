import { Typography, Row, Col } from "antd";
import { motion } from "framer-motion";
import { aboutInfo } from "../data/aboutData";

const { Title, Paragraph, Text } = Typography;

export default function About() {

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

            <Paragraph
              className="section-text"
              style={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              I engineer systems that decode the physical world. With a strong
              focus on geospatial intelligence and machine learning, I transform
              large-scale spatial datasets—from Sentinel-2 imagery to
              high-precision GNSS—into predictive models and actionable
              insights.
            </Paragraph>

            <Paragraph
              className="section-text"
              style={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              Fusing Python, cloud-native pipelines, and advanced statistical
              modeling, I architect end-to-end solutions. From raw data
              ingestion and feature engineering to interactive visualization, my
              work empowers robust analysis of agricultural and environmental
              phenomena.
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

            {aboutInfo.map((item, i) => (
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
