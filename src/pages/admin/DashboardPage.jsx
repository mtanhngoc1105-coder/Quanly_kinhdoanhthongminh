// src/pages/admin/DashboardPage.jsx
import React, { useState } from 'react';
import DashboardCard from '../../components/admin/DashboardCard'; 
import RevenueChart from '../../components/admin/RevenueChart';
import InventoryChart from '../../components/admin/InventoryChart';
import { Icon } from '@iconify/react';

function DashboardPage() {
  // --- CHỨC NĂNG 1: STATE BỘ LỌC THỜI GIAN ---
  const [timeFrame, setTimeFrame] = useState('day');
  // Giả lập dữ liệu thay đổi theo bộ lọc thời gian
  const statsData = {
    day: { revenue: "12.450.000 đ", orders: "38 đơn hàng", trendRev: "▲ +15% so với hôm qua", trendOrd: "▲ +10% hôm nay" },
    week: { revenue: "88.200.000 đ", orders: "245 đơn hàng", trendRev: "▲ +8% so với tuần trước", trendOrd: "▲ +5% tuần này" },
    month: { revenue: "342.000.000 đ", orders: "1,120 đơn hàng", trendRev: "▲ +22% so với tháng trước", trendOrd: "▲ +12% tháng này" }
  };

  // --- CHỨC NĂNG 2: STATE QUẢN LÝ VÀ CẬP NHẬT TRẠNG THÁI BẢNG ---
  const [supplierRevenueData, setSupplierRevenueData] = useState([
    { id: 1, name: "Fresh Farms Co.", category: "Nông sản sạch", orders: 142, revenue: "4.250.000 đ", status: "Đã đối soát" },
    { id: 2, name: "Dairy Best Ltd.", category: "Sữa & Bơ sữa", orders: 98, revenue: "3.100.000 đ", status: "Đang xử lý" },
    { id: 3, name: "Meat Masters", category: "Thịt tươi sống", orders: 115, revenue: "3.800.000 đ", status: "Đã đối soát" },
    { id: 4, name: "SeaGift Seafood", category: "Hải sản đông lạnh", orders: 45, revenue: "1.300.000 đ", status: "Chờ thanh toán" },
  ]);

  // Hàm toggle trạng thái nhanh khi click
  const handleToggleStatus = (id) => {
    const updatedData = supplierRevenueData.map(sup => {
      if (sup.id === id) {
        // Luân chuyển trạng thái để test demo
        const nextStatus = sup.status === "Đang xử lý" ? "Đã đối soát" : (sup.status === "Đã đối soát" ? "Chờ thanh toán" : "Đang xử lý");
        return { ...sup, status: nextStatus };
      }
      return sup;
    });
    setSupplierRevenueData(updatedData);
  };

  // --- CHỨC NĂNG 3: HÀM XUẤT BÁO CÁO (MOCK EXPORT) ---
  const handleExportData = () => {
    alert("📊 Hệ thống đang khởi tạo file Excel báo cáo doanh thu đối tác...");
    // Sau này kết nối thư viện xlsx hoặc gọi API backend download file ở đây
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "24px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* 1. Tiêu đề trang & Thanh bộ lọc */}
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "md-center", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1b5e20", fontWeight: "bold" }}>Hệ thống Quản lý SmartFood</h1>
          <p style={{ margin: "6px 0 0 0", color: "#637381", fontSize: "14px" }}>Chào mừng quản trị viên. Dưới đây là hoạt động kinh doanh tổng quan.</p>
        </div>
        
        {/* Nhóm tương tác: Gồm bộ lọc thời gian và chế độ Admin */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Tích hợp Chức năng 1: Cụm nút chọn thời gian */}
          <div style={{ background: "#eee", padding: "4px", borderRadius: "10px", display: "flex", gap: "4px" }}>
            {['day', 'week', 'month'].map((type) => (
              <button
                key={type}
                onClick={() => setTimeFrame(type)}
                style={{
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: timeFrame === type ? "#ffffff" : "transparent",
                  color: timeFrame === type ? "#1b5e20" : "#637381",
                  boxShadow: timeFrame === type ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.2s"
                }}
              >
                {type === 'day' ? 'Hôm nay' : type === 'week' ? 'Tuần này' : 'Tháng này'}
              </button>
            ))}
          </div>

          <div style={{ background: "#e8f5e9", color: "#1b5e20", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold", fontSize: "13px" }}>🟢 Admin Mode</div>
        </div>
      </div>

      {/* 2. Thẻ thống kê nhanh (Data thay đổi động theo State timeFrame) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        <DashboardCard 
          title="Tổng Doanh Thu" 
          value={statsData[timeFrame].revenue} 
          icon={<div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon icon="lucide:banknote" color="#1b5e20" width="24" /></div>} 
          trend={statsData[timeFrame].trendRev} 
          trendColor="#10b981" 
        />
        <DashboardCard 
          title="Đơn Hàng Mới" 
          value={statsData[timeFrame].orders} 
          icon={<div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#e7f1ff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon icon="lucide:shopping-bag" color="#2196f3" width="24" /></div>} 
          trend={statsData[timeFrame].trendOrd} 
          trendColor="#2196f3" 
        />
        <DashboardCard 
          title="Sản Phẩm Tồn Kho" 
          value="1,2500 mặt hàng" 
          icon={<div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#fff3e0", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon icon="lucide:package" color="#ff9800" width="24" /></div>} 
          trend="● Khối lượng ổn định" 
          trendColor="#ff9800" 
        />
        <DashboardCard 
          title="Nhà Cung Cấp" 
          value="24 đối tác" 
          icon={<div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f3e5f5", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon icon="lucide:store" color="#9c27b0" width="24" /></div>} 
          trend="✓ Kết nối hoạt động tốt" 
          trendColor="#9c27b0" 
        />
      </div>

      {/* 3. Khu vực biểu đồ */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "stretch", marginBottom: "32px" }}>
        <div style={{ flex: 2, minWidth: "400px", background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#212121", fontSize: "18px", fontWeight: "bold" }}>Xu hướng doanh thu</h3>
          <RevenueChart/>
        </div>
        
        <div style={{ flex: 1, minWidth: "300px", background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#212121", fontSize: "18px", fontWeight: "bold" }}>Cơ cấu kho hàng</h3>
          <InventoryChart/>
        </div>
      </div>

      {/* 4. Bảng chi tiết doanh thu */}
      <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#212121" }}>Báo cáo Doanh thu theo Nhà cung cấp</h3>
            <p style={{ margin: "4px 0 0 0", color: "#637381", fontSize: "13px" }}>Chi tiết phân bổ doanh thu và trạng thái thanh toán đối tác tháng này</p>
          </div>
          
          {/* Nhóm nút hành động */}
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Tích hợp Chức năng 3: Nút xuất báo cáo Excel */}
            <button 
              onClick={handleExportData}
              style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f4f6f8", color: "#637381", border: "1px solid #e3e8ec", padding: "10px 16px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}
            >
              <Icon icon="lucide:download" /> Xuất dữ liệu
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "#e8f5e9", color: "#1b5e20", border: "none", padding: "10px 16px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>
              Xem tất cả <Icon icon="lucide:arrow-up-right" />
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f4f6f8" }}>
                <th style={{ padding: "14px 16px", color: "#637381", fontSize: "13px", fontWeight: "bold" }}>Nhà cung cấp</th>
                <th style={{ padding: "14px 16px", color: "#637381", fontSize: "13px", fontWeight: "bold" }}>Danh mục</th>
                <th style={{ padding: "14px 16px", color: "#637381", fontSize: "13px", fontWeight: "bold", textAlign: "center" }}>Số đơn giao</th>
                <th style={{ padding: "14px 16px", color: "#637381", fontSize: "13px", fontWeight: "bold", textAlign: "right" }}>Doanh thu</th>
                <th style={{ padding: "14px 16px", color: "#637381", fontSize: "13px", fontWeight: "bold", textAlign: "center" }}>Trạng thái (Click để đổi)</th>
              </tr>
            </thead>
            <tbody>
              {supplierRevenueData.map((sup) => (
                <tr key={sup.id} style={{ borderBottom: "1px solid #f4f6f8" }}>
                  <td style={{ padding: "16px", fontWeight: "bold", color: "#212121" }}>{sup.name}</td>
                  <td style={{ padding: "16px", color: "#637381" }}>{sup.category}</td>
                  <td style={{ padding: "16px", textAlign: "center", fontWeight: "600" }}>{sup.orders}</td>
                  <td style={{ padding: "16px", textAlign: "right", fontWeight: "bold", color: "#1b5e20" }}>{sup.revenue}</td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    {/* Tích hợp Chức năng 2: Bấm vào tag để thay đổi trạng thái nhanh */}
                    <span 
                      onClick={() => handleToggleStatus(sup.id)}
                      style={{ 
                        fontSize: "12px", 
                        fontWeight: "bold",
                        padding: "6px 12px", 
                        borderRadius: "8px", 
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor: sup.status === "Đã đối soát" ? "#e8f5e9" : (sup.status === "Đang xử lý" ? "#e7f1ff" : "#fff3e0"), 
                        color: sup.status === "Đã đối soát" ? "#1b5e20" : (sup.status === "Đang xử lý" ? "#0d6efd" : "#e65100") 
                      }}
                    >
                      {sup.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
function DashboardPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}

export default DashboardPage;
