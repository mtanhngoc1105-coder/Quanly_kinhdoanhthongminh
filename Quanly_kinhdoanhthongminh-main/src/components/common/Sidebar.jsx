import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartStore";

function Sidebar() {
  const navigate = useNavigate();
  const { wishlistItems } = useCartStore();

  const menuItems = [
    { icon: "🏠", label: "Trang chủ", path: "/" },
    { icon: "🛒", label: "Cửa hàng", path: "/shop" },
    { icon: "📂", label: "Danh mục", path: "/category" },
    { icon: "🔥", label: "Flash Sale", path: "/flash-sale", badge: "HOT" },
    { icon: "❤️", label: "Yêu thích", path: "/wishlist", badge: wishlistItems.length > 0 ? wishlistItems.length : null },
    { icon: "📦", label: "Đơn hàng", path: "/orders" },
    { icon: "🤖", label: "AI Assistant", path: "/ai", badge: "NEW" },
  ];

  return (
    <div style={styles.sidebar}>
      {menuItems.map((item, idx) => (
        <div key={idx} style={styles.menuItem} onClick={() => navigate(item.path)}>
          <span style={styles.icon}>{item.icon}</span>
          <span style={styles.label}>{item.label}</span>
          {item.badge && <span style={styles.badge}>{item.badge}</span>}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #f0f0f0",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#555",
    transition: "background 0.2s",
    borderLeft: "4px solid transparent",
  },
  icon: {
    fontSize: "18px",
  },
  label: {
    flex: 1,
  },
  badge: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "12px",
    fontWeight: "bold",
  },
};

export default Sidebar;
