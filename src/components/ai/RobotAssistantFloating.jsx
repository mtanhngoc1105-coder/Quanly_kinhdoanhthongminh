import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "./ChatWidget";
import "../../assets/styles/robot.css";

export default function RobotAssistantFloating() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open && <ChatWidget onClose={() => setOpen(false)} />}</AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className="robot-floating robot-button"
        aria-label="Open chat"
      >
        <model-viewer
          src="/futuristic_flying_animated_robot_-_low_poly.glb"
          alt="Robot assistant"
          auto-rotate
          camera-controls
          exposure="1"
          shadow-intensity="1"
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            outline: "none",
          }}
        />
      </motion.div>
    </>
  );
}
