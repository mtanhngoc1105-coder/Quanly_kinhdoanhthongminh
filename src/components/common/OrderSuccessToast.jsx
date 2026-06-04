import React, { useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

function OrderSuccessToast({ order, products, duration = 6000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        backgroundColor: "#fff",
        borderLeft: "4px solid #10b981",
        boxShadow: "0 15px 50px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        zIndex: 10000,
        animation: "slideInRight 0.4s ease-out",
        maxWidth: "420px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          backgroundColor: "#f0fdf4",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <FiCheckCircle size={24} color="#10b981" />
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0 0 2px 0",
              fontSize: "15px",
              fontWeight: "700",
              color: "#10b981",
            }}
          >
            Đặt hàng thành công!
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            Mã đơn hàng: #{order.id}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "4px",
          }}
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Products */}
      <div style={{ padding: "16px 20px", maxHeight: "300px", overflowY: "auto" }}>
        <p
          style={{
            margin: "0 0 12px 0",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          📦 Sản phẩm ({products.length})
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {products.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 80px",
                gap: "12px",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
              }}
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                }}
              />

              {/* Info */}
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#1f2937",
                    lineHeight: "1.3",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  x{item.quantity}
                </p>
              </div>

              {/* Price */}
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#6b7280",
                  }}
                >
                  {item.price.toLocaleString()}đ
                </p>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {(item.price * item.quantity).toLocaleString()}đ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          padding: "12px 20px",
          backgroundColor: "#f3f4f6",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#6b7280" }}>Tạm tính:</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            {order.totalAmount.toLocaleString()}đ
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            Phí vận chuyển:
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#10b981",
            }}
          >
            Miễn phí
          </span>
        </div>
        <div
          style={{
            borderTop: "1px solid #d1d5db",
            paddingTop: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#1f2937",
            }}
          >
            Tổng cộng:
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#ef4444",
            }}
          >
            {order.totalAmount.toLocaleString()}đ
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          backgroundColor: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <p style={{ margin: "0 0 4px 0" }}>
          📍 Địa chỉ: {order.address}
        </p>
        <p style={{ margin: "0 0 4px 0" }}>
          💳 Thanh toán: {order.paymentMethod === "cod" ? "Tiền mặt" : order.paymentMethod === "card" ? "Thẻ" : "Ví điện tử"}
        </p>
        <p style={{ margin: 0 }}>
          ✓ Tình trạng:{" "}
          <span style={{ color: "#3b82f6", fontWeight: "600" }}>
            {order.paymentStatus === "paid"
              ? "Đã thanh toán"
              : "Chờ thanh toán"}
          </span>
        </p>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(450px);
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

export default OrderSuccessToast;
