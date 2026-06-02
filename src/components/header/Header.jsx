import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi"; // Thêm icon bánh răng cho nút Admin
import CartLogin from "./CartLogin"; 

function Header() {
  const navigate = useNavigate();
  // State xử lý hiệu ứng hover
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isAdminHovered, setIsAdminHovered] = useState(false);

  return (
    <header style={styles.header}>
      {/* Logo bên trái */}
      <h1 
        style={{
          ...styles.logo,
          opacity: isLogoHovered ? 0.8 : 1 
        }} 
        onClick={() => navigate("/")}
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <span style={{ fontWeight: "bold", color: "#2e7d32" }}>Smart</span>Food
      </h1>

      {/* Khu vực chức năng bên phải */}
      <div style={styles.rightSection}>
        
        {/* NÚT VÀO TRANG ADMIN: Luôn hiển thị khi dev để bạn bấm phát sang luôn */}
        <button
          onClick={() => navigate("/admin")}
          onMouseEnter={() => setIsAdminHovered(true)}
          onMouseLeave={() => setIsAdminHovered(false)}
          style={{
            ...styles.adminBtn,
            backgroundColor: isAdminHovered ? "#1b5e20" : "#2e7d32"
          }}
          title="Vào giao diện quản lý hệ thống"
        >
          <FiSettings style={{ marginRight: "6px" }} />
          <span>Trang quản trị</span>
        </button>

        {/* Khu vực Giỏ hàng & Thông tin cá nhân */}
        <CartLogin />
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #f0f0f0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  logo: {
    fontSize: "22px",
    margin: 0, 
    fontWeight: "normal", 
    cursor: "pointer",
    userSelect: "none",
    transition: "opacity 0.2s ease", 
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px" 
  },
  adminBtn: {
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    boxShadow: "0 2px 6px rgba(46, 125, 50, 0.2)"
  }
};

export default Header;