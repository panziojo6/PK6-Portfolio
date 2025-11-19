import { Typography, Row, Col, Tag } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "./VideoModal";
import "../css/projects-grand.css";

const { Title, Paragraph, Text } = Typography;
const base = import.meta.env.BASE_URL;

const projects = [
  {
    title: "Satellite-based Sugarcane & Rice Classification",
    description:
      "Phenotype-based classification using Sentinel-2 time-series, sinusoidal fitting, One-Class SVM, and geospatial post-processing.",
    tags: ["Sentinel-2", "Python", "OCSVM", "GIS"],
    role: "Research / Algorithm / Pipeline",
    image: `${base}img/cane.png`,
  },
  {
    title:
      "IEEE ICSEC 2025 – Phenotype-Based Crop Classification (One-Class SVM)",
    description:
      "IEEE-accepted phenotype-based crop mapping system using Sentinel-2 and dual One-Class SVM for sugarcane & rice.",
    tags: ["IEEE Paper", "Satellite Analytics", "OCSVM", "Agriculture"],
    role: "Research / Author",
    image: `${base}img/IEEE.jpeg`,
  },
  {
    title: "Cane Yield Estimation Dashboard",
    description:
      "Regional-scale yield estimation using raster analytics, SQL math models, and interactive web visualization.",
    tags: ["Python", "SQL", "Data Viz", "Modeling"],
    role: "Geo-Analytics / Frontend",
    image: `${base}img/Yield.jpg`,
  },
  {
    title: "GNSS RTK, PPP, and NTRIP Caster System",
    description:
      "Real-time GNSS + RTK monitoring with FastAPI backend, NTRIP caster, ESP32 rover, and live geospatial map dashboard.",
    tags: ["GNSS", "FastAPI", "RTK", "WebSocket", "Raspberry Pi"],
    role: "Full-Stack / Systems",
    image: `${base}img/GNSS.jpeg`,
    video: `${base}video/IMG_9253.MOV`,
  },
  {
    title: "Low-Cost u-blox GNSS with RTK/PPP on Raspberry Pi",
    description:
      "A real-time GNSS system combining low-cost u-blox modules with Raspberry Pi for RTK, PPP, NTRIP casting, and live geospatial visualization over WebSocket.",
    tags: ["GNSS", "u-blox", "Raspberry Pi", "PPP", "RTK", "FastAPI"],
    role: "Full-Stack / Embedded Systems",
    image: `${base}img/ublox.png`,
  },
  {
    title: "ROS2 LiDAR Autonomous Navigation",
    description:
      "Low-cost autonomous vehicle system using LiDAR, ROS2, and A* path planning on Raspberry Pi.",
    tags: ["LiDAR", "ROS2", "A*", "Autonomous Vehicle", "Raspberry Pi"],
    role: "Embedded / Robotics",
    image: `${base}img/Lidar.png`,
  },
  {
    title: "Truck Detection & Tracking System",
    description:
      "Unsupervised analysis of truck movement patterns using clustering-based algorithms, with trajectory tracking, anomaly detection, and geospatial behavior insights.",
    tags: ["Unsupervised Learning", "Clustering", "Trajectory Analysis", "Graph Theory"],
    role: "Algorithm",
    image: `${base}img/Cluster.png`,
  },
  {
    title: "Tamroypao Burn Area Detection",
    description: "Time-series Sentinel-2 burn area analytics with SAVI/NBR indices, API-based profile extraction, regression fitting, and interactive charts.",
    tags: ["Sentinel-2", "SAVI & NBR", "Burn Area", "Analytics Dashboard"],
    role: "Backend & UI Development",
    image: `${base}img/tamroupao.png`
  },
  {
    title: "Russian Satellite Roof Detection",
    description:
      "An object detection pipeline that uses high-resolution Russian satellite imagery to automatically detect building rooftops for urban mapping, exposure analysis, and infrastructure planning.",
    tags: ["Object Detection", "Satellite Imagery", "Computer Vision", "Remote Sensing"],
    role: "Deep Learning / Geospatial",
    image: `${base}img/roof_detection.png`
  },
  {
    title: "Airflow-Based Geospatial ETL Pipeline",
    description: "End-to-end time-series Disaster processing with Airflow, API profile extraction, regression modeling, and interactive chart visualizations.",
    tags: ["Flood", "Land Slide", "Regression", "Visualization"],
    role: "Backend / UI",
    image: `${base}img/Airflow.png`
  },
  {
    title: "FarmRak System",
    description:
      "A mobile and web platform that allows farmers to view their own field data, including satellite-derived yield estimates and real-time geospatial analytics.",
    tags: ["Satellite Analytics", "Yield Estimation", "Farmer App", "Geospatial"],
    role: "Backend / Frontend",
    image: `${base}img/Framrak.png`
  },
  {
    title: "PM2.5 Genetic Algorithm Optimization",
    description:
      "A data analytics system that applies genetic algorithms together with Pearson and Spearman correlation to select key factors and optimize PM2.5 prediction models.",
    tags: ["PM2.5", "Genetic Algorithm", "Pearson Correlation", "Spearman Correlation"],
    role: "Algorithm / Backend",
    image: `${base}img/pm25.png`
  },
  {
    title: "InSAR Deformation Viewer",
    description: "Time-series InSAR deformation explorer with API profile extraction, regression fitting, and interactive charts.",
    tags: ["InSAR", "Fast API", "Multiple Linear", "Charts"],
    role: "Backend / UI",
    image: `${base}img/insar.png`
  }




];


export default function Projects() {
  const [videoSrc, setVideoSrc] = useState(null);

  return (
    <div className="section-inner">
      <Title level={2} className="section-title">Builds & Experiments</Title>

      <Paragraph className="section-text">
        A curated collection of experimental and production-ready systems that merge satellite-derived insights,
        GNSS technologies, machine-learning models, and geospatial workflows. Each build demonstrates a full-stack engineering
        approach to analyzing, predicting, and visualizing spatial phenomena in real-world environments.
      </Paragraph>

      <Row gutter={[32, 32]}>
        {projects.map((p, index) => (
          <Col xs={24} sm={12} lg={8} key={p.title}>
            <motion.div
              className="grand-project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="project-thumb">
                <img src={p.image} alt={p.title} className="thumb-img" />

                {p.video && (
                  <motion.div
                    className="play-overlay"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setVideoSrc(p.video)}
                  >
                    ▶
                  </motion.div>
                )}
              </div>

              {/* Text section */}
              <div className="project-content">
                <Text className="project-role">{p.role}</Text>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>

                <div className="project-tags">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>


      {/* Video Modal */}
      <VideoModal
        open={!!videoSrc}
        src={videoSrc}
        onClose={() => setVideoSrc(null)}
      />
    </div>
  );
}
