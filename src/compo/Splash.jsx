import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuSatellite } from "react-icons/lu";

/* Preloader: counts to 100, then the curtain splits open to reveal the page. */
export default function Splash() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1300);
      setN(Math.round((1 - Math.pow(1 - t, 2)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick); else setTimeout(() => setShow(false), 150);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="splash" exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.7 }}>
          <motion.div className="splash-half top" exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="splash-half bottom" exit={{ y: "100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="splash-inner" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
            <motion.div className="splash-logo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <motion.span className="splash-sat" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }}><LuSatellite size={22} /></motion.span>
              PK6
            </motion.div>
            <div className="splash-bar"><i style={{ width: `${n}%` }} /></div>
            <div className="splash-meta"><small>initialising orbit</small><b>{String(n).padStart(3, "0")}%</b></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
