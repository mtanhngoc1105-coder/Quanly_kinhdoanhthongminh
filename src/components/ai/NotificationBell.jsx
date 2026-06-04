import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import useNotificationStore from "../../stores/notificationStore";
import "../../assets/styles/notification.css";

function NotificationBell() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { notifications, removeNotification, clearNotifications } = useNotificationStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-bell">
      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaBell size={20} />
        </button>

        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Thông báo ({unreadCount})</h3>
            {notifications.length > 0 && (
              <button 
                onClick={() => {
                  clearNotifications();
                  setShowDropdown(false);
                }}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <p>Không có thông báo mới</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`notification-item ${!notif.read ? 'unread' : ''}`}
                >
                  <div className="notification-content">
                    <p>{notif.message}</p>
                    <span className="notification-time">{notif.time || "Vừa xong"}</span>
                    {notif.orderId && <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Mã đơn: #{notif.orderId}</p>}
                    {notif.totalAmount && <p style={{ fontSize: "12px", color: "#10b981", marginTop: "2px", fontWeight: "600" }}>Tổng: {notif.totalAmount.toLocaleString()}đ</p>}
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#9ca3af",
                      cursor: "pointer",
                      fontSize: "18px",
                      padding: "4px",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;