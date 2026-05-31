import { motion } from "framer-motion";
import "../../assets/styles/robot.css";

function RobotAssistant({ onRobotClick }) {
  return (
    <motion.div
      className="robot-assistant"
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      onClick={onRobotClick}
    >
      <model-viewer
        src="/futuristic_flying_animated_robot_-_low_poly.glb"
        alt="robot"
        auto-rotate
        camera-controls
        style={{
          width: "150px",
          height: "150px",
          cursor: "pointer",
        }}
      />
    </motion.div>
  );
}

export default RobotAssistant;