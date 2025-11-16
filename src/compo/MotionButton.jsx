import { Button } from "antd";
import { motion } from "framer-motion";

export default function MotionButton({ children, ...props }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.07,
        boxShadow: "0 0 12px rgba(146, 84, 222, 0.5)"
      }}
      whileTap={{
        scale: 0.96
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{ display: "inline-block" }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
