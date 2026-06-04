import React, { useEffect } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

function Toast({ message, type = "success", duration = 4000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: "#10b981",
      border: "#059669",
      icon: <FiCheckCircle size={20} />,
    },
    error: {
      bg: "#ef4444",
      border: "#dc2626",
      icon: <FiAlertCircle size={20} />,
    },
    info: {
      bg: "#3b82f6",
      border: "#2563eb",
      icon: <FiInfo size={20} />,
    },
  };

  const style = styles[type] || styles.success;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        backgroundColor: style.bg,
        color: "white",
        padding: "16px 20px",
        borderRadius: "8px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 10000,
        animation: "slideIn 0.3s ease-in-out",
        maxWidth: "400px",
        wordWrap: "break-word",
      }}
    >
      {style.icon}
      <span style={{ flex: 1, fontSize: "14px", fontWeight: "500" }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FiX size={16} />
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Toast;
