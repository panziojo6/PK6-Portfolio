import { Typography } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LeftOutlined, RightOutlined, CloseOutlined } from "@ant-design/icons";
import "../css/projects-grand.css";
import { projects } from "../data/projectsData";

const { Title, Paragraph } = Typography;

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch Swipe Handlers for Mobile
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextProject();
    if (distance < -minSwipeDistance) prevProject();
  };

  // Convert youtube watch URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    return url.replace("watch?v=", "embed/") + "?autoplay=1&mute=1&loop=1";
  };

  return (
    <div className="artistic-projects-container">
      {/* Giant Background Typography */}
      <div className="bg-typography">ARCHIVES</div>

      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          className="premium-header-section"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="premium-title">
            Builds <span style={{ color: "#00f0ff" }}>&</span> Experiments
          </Title>
        </motion.div>

        {/* 3D CAROUSEL */}
        <div 
          className="carousel-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button className="carousel-btn left" onClick={prevProject}>
            <LeftOutlined />
          </button>

          <div className="carousel-track">
            <AnimatePresence initial={false}>
              {projects.map((p, index) => {
                let offset = index - currentIndex;
                const total = projects.length;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                // Only render immediate neighbors and center
                if (Math.abs(offset) > 2) return null;

                const isCenter = offset === 0;
                // Move neighbors left/right, and push outer ones further away
                const xPos = offset * 80; 
                const rotateY = offset * -35; 
                const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.5;
                const zIndex = 10 - Math.abs(offset);
                const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.5 : 0;

                // Do not render full overlay in the track
                if (selectedProject && selectedProject.title === p.title) return null;

                return (
                  <motion.div
                    key={p.title}
                    layoutId={`project-card-${p.title}`}
                    className={`carousel-card ${isCenter ? "active" : ""}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      x: `${xPos}%`,
                      rotateY: rotateY,
                      scale: scale,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => {
                      if (isCenter) setSelectedProject(p);
                      else if (offset > 0) nextProject();
                      else prevProject();
                    }}
                  >
                    <div className="card-laser-border"></div>
                    {isCenter && <div className="card-aurora"></div>}

                    <div className="premium-project-content">
                      <img src={p.image} alt={p.title} className="thumb-img" />
                      <div className="thumb-overlay"></div>
                      <span className="premium-role-badge">{p.role}</span>
                      <div className="project-info-minimal">
                        <h3 className="project-title-art">{p.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button className="carousel-btn right" onClick={nextProject}>
            <RightOutlined />
          </button>
        </div>
      </div>

      {/* FULL SCREEN OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="full-screen-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              layoutId={`project-card-${selectedProject.title}`}
              className="expanded-project-card"
            >
              <button
                className="close-expanded"
                onClick={() => setSelectedProject(null)}
              >
                <CloseOutlined />
              </button>

              <div className="expanded-content">
                <div className="expanded-media-container">
                  {selectedProject.video ? (
                    <iframe
                      className="expanded-video"
                      src={getEmbedUrl(selectedProject.video)}
                      allow="autoplay; encrypted-media"
                      frameBorder="0"
                      title={selectedProject.title}
                    />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="expanded-img"
                    />
                  )}
                </div>
                <div className="expanded-info">
                  <h2 className="expanded-title">{selectedProject.title}</h2>
                  <span className="expanded-role">{selectedProject.role}</span>
                  <div className="expanded-tags">
                    {selectedProject.tags.map((t) => (
                      <span className="premium-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Paragraph className="expanded-desc">
                    {selectedProject.description}
                  </Paragraph>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}