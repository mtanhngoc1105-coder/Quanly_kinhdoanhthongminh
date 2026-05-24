import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "./ChatWidget";

export default function RobotAssistantFloating() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open && <ChatWidget onClose={() => setOpen(false)} />}</AnimatePresence>

      <div className="fixed left-6 bottom-8 z-50 flex flex-col items-center">
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 relative"
          >
            <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl shadow-xl max-w-[200px] text-center border border-gray-100 relative">
              <div className="font-medium text-[15px] mb-1">Xin chào! 👋</div>
              <div className="text-sm text-slate-600">Mình có thể giúp gì cho bạn hôm nay?</div>
              {/* Tooltip arrow pointing down to the robot */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45 shadow-sm z-[-1]"></div>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((v) => !v)}
          className="relative w-56 h-56 flex items-center justify-center focus:outline-none"
          aria-label="Open chat"
        >
          {/* We don't need the white background circle if it's a 3D model, but let's keep it clean without background so the robot floats, or we can keep it inside a circle. The image shows the robot without a circle background, just standing there. So we remove the bg-white and ring-white. */}
          <model-viewer
            src="/futuristic_flying_animated_robot_-_low_poly.glb"
            alt="Robot assistant"
            auto-rotate
            camera-controls
            exposure="1"
            style={{ width: "100%", height: "100%", outline: "none" }}
            shadow-intensity="1"
          ></model-viewer>
        </motion.button>
      </div>
    </>
  );
}
