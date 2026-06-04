import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import RobotAssistantSidebar from "../ai/RobotAssistantSidebar";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems } = useCartStore();

  const menuItems = [
    { icon: "🏠", label: "Trang chủ", path: "/" },
    { icon: "🛒", label: "Cửa hàng", path: "/shop" },
    { icon: "📂", label: "Danh mục", path: "/categories" },
    { icon: "🔥", label: "Flash Sale", path: "/flash-sale", badge: "HOT" },
    { icon: "❤️", label: "Yêu thích", path: "/wishlist", badge: wishlistItems.length > 0 ? wishlistItems.length : null },
    { icon: "📦", label: "Đơn hàng", path: "/orders" },
    { icon: "🤖", label: "AI Assistant", path: "/ai", badge: "NEW" },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.menuList}>
        {menuItems.map((item, idx) => {
          const isActive = (item.path === "/shop" && location.pathname.startsWith("/shop"))
            || (item.path === "/categories" && location.pathname.startsWith("/categories"))
            || (item.path !== "/shop" && item.path !== "/categories" && location.pathname === item.path);

          return (
            <div
              key={idx}
              style={{
                ...styles.menuItem,
                backgroundColor: isActive ? "#effaf4" : "transparent",
                color: isActive ? "#14532d" : "#334147",
                borderLeftColor: isActive ? "#16a34a" : "transparent",
              }}
              onClick={() => navigate(item.path)}
            >
              <span style={styles.icon}>{item.icon}</span>
              <span style={styles.label}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: item.badge === "HOT" ? "#dc2626" : "#10b981",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {location.pathname === "/" && (
        <div style={styles.robotArea}>
          <RobotAssistantSidebar />
        </div>
      )}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    minHeight: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "28px",
    padding: "20px 16px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "sticky",
    top: "0px",
    overflow: "visible",
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
    minHeight: "auto",
  },
  robotArea: {
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(15, 23, 42, 0.06)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    overflow: "visible",
    width: "100%",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500,
    borderRadius: "16px",
    transition: "all 0.2s ease",
    borderLeft: "4px solid transparent",
    color: "#334147",
    backgroundColor: "transparent",
    whiteSpace: "nowrap",
  },
  icon: {
    fontSize: "18px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: "0.8rem",
    fontWeight: 500,
  },
  badge: {
    backgroundColor: "#dc2626",
    color: "white",
    fontSize: "0.62rem",
    padding: "3px 7px",
    borderRadius: "999px",
    fontWeight: 700,
    flexShrink: 0,
  },
};

export default Sidebar;
