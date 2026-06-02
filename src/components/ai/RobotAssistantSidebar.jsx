import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "./ChatWidget";
import "../../assets/styles/robot.css";

const styles = {
  shell: {
    width: "100%",
    height: "260px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    cursor: "pointer",
  },
  circle: {
    position: "absolute",
    bottom: "4px",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.18), rgba(220, 255, 226, 0.06) 50%, transparent 75%)",
    filter: "blur(1.2px)",
  },
  robot: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "visible",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    outline: "none",
  },
  model: {
    width: "100%",
    height: "100%",
    background: "transparent",
    outline: "none",
    objectFit: "contain",
  },
};

export default function RobotAssistantSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open && <ChatWidget onClose={() => setOpen(false)} />}</AnimatePresence>

      <div style={styles.shell}>
        <div style={styles.circle} />
        <motion.div
          className="robot-sidebar"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          style={styles.robot}
          aria-label="Open chat"
        >
          <model-viewer
            src="/futuristic_flying_animated_robot_-_low_poly.glb"
            alt="Robot assistant"
            auto-rotate
            camera-controls
            camera-orbit="0deg 85deg 2.4m"
            field-of-view="45deg"
            exposure="1"
            shadow-intensity="1"
            style={styles.model}
          />
        </motion.div>
      </div>
    </>
  );
}
