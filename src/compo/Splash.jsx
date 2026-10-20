import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Splash() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const done = () => setShow(false);
    const t = setTimeout(done, 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="splash" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.5 }}>
          <div>
            <motion.div className="splash-logo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>PK6</motion.div>
            <div className="splash-bar"><motion.i initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeInOut" }} /></div>
            <small>initialising orbit</small>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
