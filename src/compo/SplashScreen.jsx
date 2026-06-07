import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#02010A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        overflow: "hidden"
      }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: [0.1, 1, 30], opacity: [0, 1, 0] }}
        transition={{ duration: 2, ease: "easeIn" }}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "0 0 80px 40px #00f0ff, 0 0 150px 80px #a855f7",
          background: "#fff"
        }}
      />
      <motion.div
        initial={{ opacity: 0, letterSpacing: "2px" }}
        animate={{ opacity: [0, 1, 0], letterSpacing: "15px" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: 900,
          textTransform: "uppercase",
          textShadow: "0 0 10px #00f0ff"
        }}
      >
        Warp Drive Active
      </motion.div>
    </motion.div>
  );
}
