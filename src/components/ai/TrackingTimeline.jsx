import React from "react";
import "../../assets/styles/tracking.css";

function TrackingTimeline({ events = [], orderStatus = "pending" }) {
  // Default events if none provided
  const defaultEvents = [
    { title: "Đã đặt hàng", time: "2024-01-15 10:30", status: "completed" },
    { title: "Đang xác nhận", time: "2024-01-15 11:00", status: "completed" },
    { title: "Đang giao", time: "2024-01-15 14:00", status: "in-progress" },
    { title: "Đã giao", time: "", status: "pending" },
  ];

  const trackingEvents = events.length > 0 ? events : defaultEvents;

  return (
    <div className="tracking-timeline">
      <h3 className="tracking-title">📦 Trạng thái đơn hàng</h3>
      
      <div className="timeline-container">
        {trackingEvents.map((event, index) => (
          <div 
            key={index} 
            className={`timeline-item ${event.status}`}
          >
            {/* Timeline Connector */}
            {index !== trackingEvents.length - 1 && (
              <div className={`timeline-connector ${event.status}`}></div>
            )}

            {/* Timeline Dot */}
            <div className={`timeline-dot ${event.status}`}>
              {event.status === "completed" && <span>✓</span>}
              {event.status === "in-progress" && <span>⟳</span>}
              {event.status === "pending" && <span></span>}
            </div>

            {/* Timeline Content */}
            <div className="timeline-content">
              <h4 className="timeline-title-text">{event.title}</h4>
              {event.time && (
                <p className="timeline-time">{event.time}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Status Badge */}
      <div className="tracking-status">
        {orderStatus === "pending" && (
          <span className="status-badge pending">⏳ Đang xử lý</span>
        )}
        {orderStatus === "shipped" && (
          <span className="status-badge shipped">📦 Đang giao</span>
        )}
        {orderStatus === "delivered" && (
          <span className="status-badge delivered">✓ Đã giao</span>
        )}
        {orderStatus === "cancelled" && (
          <span className="status-badge cancelled">✗ Đã hủy</span>
        )}
      </div>
    </div>
  );
}

export default TrackingTimeline;