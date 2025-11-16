import { Typography, Row, Col, Tag } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "./VideoModal";
import "../css/projects-grand.css";

const { Title, Paragraph, Text } = Typography;

// const projects = [
//   {
//     title: "Satellite-based Sugarcane & Rice Classification",
//     description:
//       "Phenotype-based classification using Sentinel-2, SAVI/MNDWI time-series, sinusoidal fitting, One-Class SVM, and post-processing.",
//     tags: ["Sentinel-2", "Python", "OCSVM", "GIS"],
//     role: "Research / Algorithm / Pipeline",
//     image: "/img/KSL_นำ้พอง.png",
//   },
//   {
//     title: "IEEE ICCSE 2025 Paper: Phenotype-Based Classification of Sugarcane and Rice Fields Using One-Class SVM from Satellite Imagery",
//     description:
//       "Phenotype-based crop classification system using Sentinel-2 SAVI/MNDWI time-series and dual One-Class SVM for sugarcane and rice. \
//       Accepted for publication at IEEE ICCSE 2025, demonstrating scalable, high-precision agricultural analytics.",
//     tags: ["IEEE Paper", "Satellite Analytics", "One-Class SVM", "Agriculture"],
//     role: "Research / Author",
//     image: "/img/IEEE.jpeg",
//   },
//   {
//     title: "GNSS RTK, PPP, and NTRIP Caster System",
//     description:
//       "Real-time GNSS + RTK monitoring system with map visualization, FastAPI backend, NTRIP integration, and ESP32 rover pipeline.",
//     tags: ["GNSS", "FastAPI", "RTK", "WebSocket", "Low-cost GNSS", "Rasberry Pi"],
//     role: "Full-Stack / Systems",
//     image: "/img/GNSS.jpeg",
//     video: "/video/IMG_9253.MOV"
//   },

//   {
//     title: "Cane Yield Estimation Dashboard",
//     description:
//       "End-to-end sugarcane yield estimation from raster analytics → interactive dashboard with spatial layers.",
//     tags: ["Python", "SQL", "Data Viz", "Math Model"],
//     role: "Geo-Analytics / Frontend",
//     image: "/img/Yield.jpg",
//   },
//   {
//     title: "InSAR Deformation Viewer",
//     description:
//       "Time-series InSAR deformation explorer with API profile extraction, regression fitting, and interactive charts.",
//     tags: ["InSAR", "Fast API", "Multiple Linear", "Charts"],
//     role: "Backend / UI",
//     image: "/img/insar.png",
//   },
//   {
//     title: "Graph-Based Shortest Path Analyzer",
//     description:
//       "A high-performance shortest-path engine implementing Dijkstra’s algorithm and graph optimization techniques for large-scale network analysis.",
//     tags: ["Shortest Path", "Dijkstra", "Graph Theory"],
//     role: "Algorithm",
//     image: "/img/Cluster.png",
//   }


// ];
const base = import.meta.env.BASE_URL;

const projects = [
  {
    title: "Satellite-based Sugarcane & Rice Classification",
    description:
      "Phenotype-based classification using Sentinel-2 time-series, sinusoidal fitting, One-Class SVM, and geospatial post-processing.",
    tags: ["Sentinel-2", "Python", "OCSVM", "GIS"],
    role: "Research / Algorithm / Pipeline",
    image: `${base}img/KSL_นำ้พอง.png`,
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
    title: "Cane Yield Estimation Dashboard",
    description:
      "Regional-scale yield estimation using raster analytics, SQL math models, and interactive web visualization.",
    tags: ["Python", "SQL", "Data Viz", "Modeling"],
    role: "Geo-Analytics / Frontend",
    image: `${base}img/Yield.jpg`,
  },

  {
    title: "InSAR Deformation Viewer",
    description:
      "Time-series deformation explorer with API-based profile extraction, regression fitting, and multi-chart visualization.",
    tags: ["Shortest Path", "Dijkstra", "Graph Theory"],
    role: "Algorithm",
    image: `${base}img/Cluster.png`,
  },

  {
    title:
      "IEEE ICCSE 2025 – Phenotype-Based Crop Classification (One-Class SVM)",
    description:
      "IEEE-accepted phenotype-based crop mapping system using Sentinel-2 and dual One-Class SVM for sugarcane & rice.",
    tags: ["IEEE Paper", "Satellite Analytics", "OCSVM", "Agriculture"],
    role: "Research / Author",
    image: `${base}img/IEEE.jpeg`,
  },
  { 
    title: "InSAR Deformation Viewer", 
    description: "Time-series InSAR deformation explorer with API profile extraction, regression fitting, and interactive charts.", 
    tags: ["InSAR", "Fast API", "Multiple Linear", "Charts"], 
    role: "Backend / UI", 
    image: `${base}img/insar.png"` }
];


export default function Projects() {
  const [videoSrc, setVideoSrc] = useState(null);

  return (
    <div className="section-inner">
      <Title level={2} className="section-title">Builds & Experiments</Title>

      <Paragraph className="section-text">
        A showcase of systems that combine satellite analytics, GNSS, machine
        learning, geospatial pipelines, and full-stack engineering.
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
              {/* Thumbnail */}
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
