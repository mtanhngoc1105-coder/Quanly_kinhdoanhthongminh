import React from "react";

export default function NotificationBell({ count = 0 }) {
  return (
    <div className="relative inline-flex items-center">
      <button className="p-2 rounded-full bg-white shadow-sm">
        🔔
      </button>
      {count > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{count}</span>}
    </div>
  );
}
import { FaBell } from "react-icons/fa";
import "../../assets/styles/notification.css";

function NotificationBell() {
  return (
    <div className="notification-bell">
      <FaBell />

      <span className="badge">
        3
      </span>
    </div>
  );
}

export default NotificationBell;