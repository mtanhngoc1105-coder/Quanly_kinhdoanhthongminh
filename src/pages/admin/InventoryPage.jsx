// src/pages/admin/InventoryPage.jsx
import React, { useState } from "react";
import { LuSearch, LuPlus, LuMinus, LuRefreshCw } from "react-icons/lu";

const styles = {
  th: { background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", fontSize: "14px", borderBottom: "2px solid #c1e0c2" },
  td: { padding: "16px", verticalAlign: "middle", fontSize: "14px", color: "#333" },
  badge: { padding: "6px 14px", borderRadius: "20px", fontWeight: "600", fontSize: "12px", display: "inline-block" },
  actionBtn: { border: "none", width: "28px", height: "28px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }
};

function InventoryPage() {
  // Mock data gốc dựa trên dự án SmartFood thực tế của bạn
  const [inventory, setInventory] = useState([
    { id: 1, name: "Táo Mỹ nhập khẩu", category: "Trái cây", stock: 45 },
    { id: 2, name: "Bông cải xanh Đà Lạt", category: "Rau củ", stock: 12 },
    { id: 3, name: "Cá hồi Na Uy phi lê", category: "Hải sản", stock: 5 },
    { id: 4, name: "Sữa tươi hữu cơ", category: "Sữa", stock: 2 },
    { id: 5, name: "Cà chua bi hữu cơ", category: "Rau củ", stock: 0 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, IN_STOCK, LOW_STOCK, OUT_OF_STOCK

  // Hàm tính toán nhãn trạng thái và màu sắc thông minh
  const getStockStatus = (stock) => {
    if (stock === 0) return { key: "OUT_OF_STOCK", text: "Hết hàng", color: "#d32f2f", bg: "rgba(211, 47, 47, 0.1)" };
    if (stock <= 5) return { key: "LOW_STOCK", text: "Sắp hết", color: "#f57c00", bg: "rgba(245, 124, 0, 0.1)" };
    return { key: "IN_STOCK", text: "Còn hàng", color: "#2e7d32", bg: "rgba(46, 125, 50, 0.1)" };
  };

  // Hàm cập nhật nhanh số lượng sản phẩm trực tiếp trên bảng
  const handleUpdateStock = (id, amount) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + amount); // Không cho phép âm số lượng kho
          return { ...item, stock: newStock };
        }
        return item;
      })
    );
  };

  // Tính toán số lượng cho từng tab bộ lọc
  const counts = {
    ALL: inventory.length,
    IN_STOCK: inventory.filter(i => i.stock > 5).length,
    LOW_STOCK: inventory.filter(i => i.stock > 0 && i.stock <= 5).length,
    OUT_OF_STOCK: inventory.filter(i => i.stock === 0).length,
  };

  // Tiến hành lọc dữ liệu kết hợp Tìm kiếm + Lọc Tab trạng thái
  const filteredData = inventory.filter(item => {
    const status = getStockStatus(item.stock);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "ALL") return matchesSearch;
    return matchesSearch && status.key === activeTab;
  });

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      
      {/* 1. KHU VỰC TIÊU ĐỀ TRANG CHUẨN ĐỒNG BỘ */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#1b5e20", margin: 0, fontWeight: "700", fontSize: "24px" }}>
          Quản lý Kho hàng
        </h2>
        <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
          Theo dõi số lượng hàng hóa tồn dư, kiểm soát trạng thái cảnh báo báo động đỏ hết hàng thực tế.
        </p>
      </div>

      {/* 2. KHU VỰC TÁC VỤ: SEARCH BAR & FILTER TABS GỘP CHUNG */}
      <div style={{ background: "white", padding: "16px 24px", borderRadius: "16px 16px 0 0", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }}>
        
        {/* Hệ thống Tab lọc phân loại nhanh trạng thái kho */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "ALL", label: "Tất cả", color: "#475569" },
            { id: "IN_STOCK", label: "Còn hàng", color: "#2e7d32" },
            { id: "LOW_STOCK", label: "Sắp hết", color: "#f57c00" },
            { id: "OUT_OF_STOCK", label: "Hết hàng", color: "#d32f2f" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 16px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s",
                background: activeTab === tab.id ? tab.color : "#f1f5f9",
                color: activeTab === tab.id ? "white" : "#475569"
              }}
            >
              {tab.label}
              <span style={{ padding: "1px 6px", borderRadius: "10px", fontSize: "11px", background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)", color: activeTab === tab.id ? "white" : "#64748b" }}>
                {counts[tab.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Thanh tìm kiếm ô Input bo góc kèm kính lúp bên góc phải */}
        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "10px 16px 10px 40px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
          />
          <LuSearch size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
        </div>

      </div>

      {/* 3. BẢNG DỮ LIỆU ĐÃ ĐƯỢC NÂNG CẤP HÀNH ĐỘNG */}
      <div style={{ background: "white", borderRadius: "0 0 16px 16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...styles.th, textAlign: "left", paddingLeft: "24px" }}>Tên sản phẩm</th>
              <th style={{ ...styles.th, textAlign: "center", width: "160px" }}>Danh mục</th>
              <th style={{ ...styles.th, textAlign: "center", width: "180px" }}>Điều chỉnh tồn kho</th>
              <th style={{ ...styles.th, textAlign: "center", width: "140px" }}>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const status = getStockStatus(item.stock);

                return (
                  <tr
                    key={item.id}
                    style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fbf9")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {/* Tên sản phẩm căn lề trái chuyên nghiệp */}
                    <td style={{ ...styles.td, textAlign: "left", paddingLeft: "24px", fontWeight: "600", color: "#1e293b" }}>
                      {item.name}
                    </td>

                    {/* Danh mục */}
                    <td style={{ ...styles.td, textAlign: "center", color: "#475569" }}>
                      {item.category}
                    </td>

                    {/* Cụm nút tương tác cộng trừ số lượng tồn kho tức thì */}
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                        <button
                          onClick={() => handleUpdateStock(item.id, -1)}
                          title="Giảm 1 đơn vị"
                          disabled={item.stock === 0}
                          style={{ ...styles.actionBtn, background: item.stock === 0 ? "#f1f5f9" : "#fee2e2", color: item.stock === 0 ? "#cbd5e1" : "#ef4444", cursor: item.stock === 0 ? "not-allowed" : "pointer" }}
                        >
                          <LuMinus size={14} />
                        </button>
                        
                        <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "700", fontSize: "15px", color: "#1e293b" }}>
                          {item.stock}
                        </span>

                        <button
                          onClick={() => handleUpdateStock(item.id, 1)}
                          title="Tăng 1 đơn vị"
                          style={{ ...styles.actionBtn, background: "#dcfce7", color: "#22c55e" }}
                        >
                          <LuPlus size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Nhãn trạng thái tự động biến đổi thời gian thực */}
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <span style={{ ...styles.badge, background: status.bg, color: status.color }}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              // Trạng thái hiển thị khi không tìm thấy kết quả phù hợp
              <tr>
                <td colSpan="4" style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                  <LuRefreshCw size={24} style={{ animation: "spin 2s linear infinite", marginBottom: "8px", color: "#cbd5e1" }} />
                  <div>Không tìm thấy sản phẩm nào khớp với điều kiện lọc!</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default InventoryPage;