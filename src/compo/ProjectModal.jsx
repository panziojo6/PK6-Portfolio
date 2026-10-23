import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";
import { categoryMeta } from "../data/categories.js";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("pk6:lock"));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("pk6:unlock"));
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.article
            className="modal__card"
            initial={{ y: 40, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close">
              <LuX />
            </button>

            <div className="modal__media">
              {project.video ? (
                <video src={project.video} poster={project.image} controls playsInline />
              ) : (
                <img src={project.image} alt="" />
              )}
            </div>

            <div className="modal__body">
              <span className="chip" style={{ background: categoryMeta[project.category]?.color }}>
                {project.category} · {project.year}
              </span>
              <h3 id="modal-title">{project.title}</h3>
              <p className="modal__role">{project.role}</p>
              <p>{project.longDescription || project.description}</p>

              {project.specs && (
                <dl className="specs">
                  {Object.entries(project.specs).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.episodes?.length > 0 && (
                <ol className="steps">
                  {project.episodes.map((e, i) => (
                    <li key={e.ep || i}>
                      <strong>{e.title}</strong>
                      <span>{e.desc}</span>
                    </li>
                  ))}
                </ol>
              )}

              <div className="tags">
                {project.tags?.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
