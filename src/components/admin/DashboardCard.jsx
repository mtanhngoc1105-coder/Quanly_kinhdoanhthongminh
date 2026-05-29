// src/components/admin/DashboardCard.jsx
import React from 'react';

function DashboardCard({ title, value, icon, trend, trendColor }) {
  // trendColor dùng để đổi màu cho thanh viền đứng bên trái thẻ và chữ xu hướng
  const currentBorderColor = trendColor || "#1b5e20"; 

  return (
    <div
      style={{
        flex: "1",
        minWidth: "240px",
        background: "white",
        padding: "20px 24px",           
        borderRadius: "12px",         
        
        // ĐỔI VIỀN TRÁI DÀY 5PX MANG MÀU ĐẶC TRƯNG CỦA TỪNG THẺ
        borderLeft: `5px solid ${currentBorderColor}`, 
        borderTop: "1px solid #e1ebe2",
        borderRight: "1px solid #e1ebe2",
        borderBottom: "1px solid #e1ebe2",
        
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        height: "140px"                
      }}
    >
      {/* Hàng 1: Tiêu đề danh mục và Icon 3D nằm góc phải */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#718096", fontSize: "14px", fontWeight: "500" }}>
          {title}
        </span>
        {/* Khu vực chứa Icon nổi 3D */}
        <div style={{ fontSize: "22px", display: "flex", alignItems: "center" }}>
          {icon}
        </div>
      </div>

      {/* Hàng 2: Chỉ số thống kê chính */}
      <div style={{ fontSize: "24px", fontWeight: "750", color: "#1a251c", margin: "8px 0" }}>
        {value}
      </div>
      
      {/* Hàng 3: Chỉ số tăng trưởng, xu hướng nhỏ sát lề dưới */}
      <div style={{ 
        fontSize: "12px", 
        color: trendColor || "#4caf50", 
        fontWeight: "600", 
        display: "flex", 
        alignItems: "center", 
        gap: "4px" 
      }}>
        {trend}
      </div>
    </div>
  );
}

export default DashboardCard;