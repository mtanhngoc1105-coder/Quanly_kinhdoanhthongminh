// src/components/admin/CustomerTable.jsx
import React, { useState } from "react";
import { Icon } from '@iconify/react';

const td = { 
  padding: "16px", 
  fontSize: "14px", 
  color: "#334155", 
  borderBottom: "1px solid #f1f5f9",
  verticalAlign: "middle"
};

// Style nút bấm hành động theo phong cách nhẹ nhàng (Ghost Button)
const actionBtnStyle = {
  border: "none",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc", // Nền xám siêu nhẹ mặc định
  color: "#64748b",     // Icon màu trung tính không bị chói
  transition: "all 0.2s ease",
};

export default function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredBtnId, setHoveredBtnId] = useState(null); // Để xử lý hiệu ứng đổi màu hover từng nút riêng biệt
  
  const [customers, setCustomers] = useState([
    { id: "KH001", name: "Nguyễn Văn Hào", email: "hao@gmail.com", phone: "0912345678", orders: 12, points: 320, status: "Bị khóa" },
    { id: "KH002", name: "Vũ Thị Vân", email: "van@gmail.com", phone: "0988888888", orders: 5, points: 120, status: "Hoạt động" },
    { id: "KH003", name: "Nguyễn Hồng Anh", email: "honganh@gmail.com", phone: "0977777777", orders: 20, points: 560, status: "Hoạt động" },
    { id: "KH004", name: "Mai Thị Ánh Ngọc", email: "ngoc@gmail.com", phone: "0966666666", orders: 8, points: 240, status: "Bị khóa" }
  ]);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm)
  );

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: c.status === "Hoạt động" ? "Bị khóa" : "Hoạt động" } : c)
    );
  };

  const addPoints = (id) => {
    setCustomers((prev) =>
      prev.map((c) => c.id === id ? { ...c, points: c.points + 5 } : c)
    );
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const viewHistory = (customer) => {
    alert(`===== LỊCH SỬ MUA HÀNG =====\n\nKhách hàng: ${customer.name}\nTổng đơn hàng: ${customer.orders}\nĐiểm tích lũy: ${customer.points}`);
  };

  const getStatusStyle = (status) => {
    return status === "Hoạt động" 
      ? { bg: "rgba(46, 125, 50, 0.08)", text: "#2e7d32" }
      : { bg: "rgba(211, 47, 47, 0.08)", text: "#d32f2f" };
  };

  return (
    <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
      
      {/* THANH TÌM KIẾM */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ position: "relative", width: "320px" }}>
          <Icon icon="lucide:search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc số điện thoại..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.value)}
            style={{ width: "100%", padding: "10px 12px 10px 40px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none", fontSize: "14px" }}
          />
        </div>
        <div style={{ fontSize: "13px", color: "#64748b" }}>
          Hiển thị: <strong style={{ color: "#1e293b" }}>{filteredCustomers.length}</strong> khách hàng
        </div>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #f1f5f9" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr style={{ height: "50px" }}>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600" }}>Mã khách hàng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center", paddingLeft: "20px" }}>Khách hàng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Email</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600" }}>SĐT</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600" }}>Đơn hàng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600" }}>Điểm thưởng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600" }}>Trạng thái</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "180px" }}>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => {
              const badge = getStatusStyle(customer.status);

              return (
                <tr 
                  key={customer.id}
                  style={{ transition: "background 0.15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ ...td, color: "#64748b" }}>{customer.id}</td>
                  
                  <td style={{ ...td, textAlign: "center", paddingLeft: "20px", fontWeight: "600", color: "#1e293b" }}>
                    {customer.name}
                  </td>
                  
                  <td style={{ ...td, textAlign: "center", color: "#64748b" }}>{customer.email}</td>
                  <td style={td}>{customer.phone}</td>
                  <td style={{ ...td, fontWeight: "600" }}>{customer.orders}</td>
                  <td style={{ ...td, fontWeight: "700", color: "#2e7d32" }}>{customer.points} điểm</td>

                  {/* TRẠNG THÁI */}
                  <td style={td}>
                    <span style={{ ...badge, padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", display: "inline-block" }}>
                      {customer.status}
                    </span>
                  </td>

                  {/* CỘT HÀNH ĐỘNG ĐÃ ĐƯỢC LÀM MỚI SANG TRỌNG */}
                  <td style={td}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      
                      {/* Xem lịch sử */}
                      <button 
                        title="Xem lịch sử" 
                        onClick={() => viewHistory(customer)} 
                        onMouseEnter={() => setHoveredBtnId(`${customer.id}-view`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{ 
                          ...actionBtnStyle, 
                          background: hoveredBtnId === `${customer.id}-view` ? "#e0f2fe" : "#f1f5f9",
                          color: hoveredBtnId === `${customer.id}-view` ? "#0284c7" : "#64748b"
                        }}
                      >
                        <Icon icon="lucide:eye" width={16} />
                      </button>

                      {/* Cộng điểm nhanh */}
                      <button 
                        title="Tặng 5 điểm" 
                        onClick={() => addPoints(customer.id)} 
                        onMouseEnter={() => setHoveredBtnId(`${customer.id}-add`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{ 
                          ...actionBtnStyle, 
                          fontSize: "11px", fontWeight: "700",
                          background: hoveredBtnId === `${customer.id}-add` ? "#dcfce7" : "#f1f5f9",
                          color: hoveredBtnId === `${customer.id}-add` ? "#16a34a" : "#64748b"
                        }}
                      >
                        +5đ
                      </button>

                      {/* Khóa / Mở khóa tài khoản */}
                      <button 
                        title={customer.status === "Hoạt động" ? "Khóa tài khoản" : "Mở tài khoản"} 
                        onClick={() => toggleStatus(customer.id)} 
                        onMouseEnter={() => setHoveredBtnId(`${customer.id}-toggle`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{ 
                          ...actionBtnStyle, 
                          background: hoveredBtnId === `${customer.id}-toggle` 
                            ? (customer.status === "Hoạt động" ? "#fef3c7" : "#dcfce7") 
                            : "#f1f5f9",
                          color: hoveredBtnId === `${customer.id}-toggle` 
                            ? (customer.status === "Hoạt động" ? "#d97706" : "#16a34a") 
                            : "#64748b"
                        }}
                      >
                        <Icon icon={customer.status === "Hoạt động" ? "lucide:lock" : "lucide:lock-open"} width={15} />
                      </button>

                      {/* Xóa khách hàng */}
                      <button 
                        title="Xóa" 
                        onClick={() => deleteCustomer(customer.id)} 
                        onMouseEnter={() => setHoveredBtnId(`${customer.id}-delete`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{ 
                          ...actionBtnStyle, 
                          background: hoveredBtnId === `${customer.id}-delete` ? "#fee2e2" : "#f1f5f9",
                          color: hoveredBtnId === `${customer.id}-delete` ? "#dc2626" : "#64748b"
                        }}
                      >
                        <Icon icon="lucide:trash-2" width={15} />
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}