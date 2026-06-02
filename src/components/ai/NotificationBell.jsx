import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "../../assets/styles/notification.css";

function NotificationBell() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Đơn hàng #123 đã được xác nhận", time: "5 phút trước", read: false },
    { id: 2, message: "Giao hàng thành công #122", time: "1 giờ trước", read: false },
    { id: 3, message: "Bạn có 20% giảm giá hôm nay", time: "2 giờ trước", read: true },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setShowDropdown(false);
  };

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
                onClick={handleClearAll}
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
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  <div className="notification-content">
                    <p>{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                  {!notif.read && <div className="notification-dot"></div>}
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