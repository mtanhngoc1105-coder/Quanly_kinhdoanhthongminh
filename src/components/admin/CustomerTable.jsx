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

const actionBtnStyle = {
  border: "none",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  color: "#64748b",
  transition: "all 0.2s ease",
};

export default function CustomerTable({ customers, onToggleStatus, onAddPoints, onDelete, onViewHistory }) {
  const [hoveredBtnId, setHoveredBtnId] = useState(null);

  const getStatusStyle = (status) => {
    return status === "Hoạt động" 
      ? { bg: "rgba(46, 125, 50, 0.08)", text: "#2e7d32" }
      : { bg: "rgba(211, 47, 47, 0.08)", text: "#d32f2f" };
  };

  if (!customers || customers.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#64748b", background: "white", borderRadius: "16px" }}>
        <Icon icon="lucide:users" width={48} style={{ color: "#cbd5e1", marginBottom: "16px" }} />
        <p>Không tìm thấy khách hàng nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)", overflow: "hidden", border: "1px solid #f1f5f9" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ height: "50px" }}>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Mã khách hàng</th>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase", textAlign: "left", paddingLeft: "20px" }}>Khách hàng</th>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase", textAlign: "left" }}>Email & SĐT</th>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Đơn hàng</th>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Hạng / Điểm</th>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Trạng thái</th>
            <th style={{ background: "#f8fafc", color: "#475569", padding: "16px", fontWeight: "600", fontSize: "13px", textTransform: "uppercase", width: "180px" }}>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => {
            const badge = getStatusStyle(customer.status);

            return (
              <tr 
                key={customer.id}
                style={{ transition: "background 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <td style={{ ...td, color: "#64748b", fontWeight: "500" }}>{customer.id}</td>
                
                <td style={{ ...td, textAlign: "left", paddingLeft: "20px", fontWeight: "600", color: "#1e293b" }}>
                  {customer.name}
                </td>
                
                <td style={{ ...td, textAlign: "left" }}>
                  <div style={{ color: "#334155", fontWeight: "500" }}>{customer.phone}</div>
                  <div style={{ color: "#94a3b8", fontSize: "12px", marginTop: "2px" }}>{customer.email}</div>
                </td>
                
                <td style={{ ...td, fontWeight: "600", color: "#334155" }}>{customer.orders}</td>
                
                <td style={{ ...td }}>
                  <div style={{ fontWeight: "700", color: "#d97706" }}>{customer.rank || "Chưa có"}</div>
                  <div style={{ fontWeight: "600", color: "#2e7d32", fontSize: "13px", marginTop: "2px" }}>{customer.points} đ</div>
                </td>

                <td style={td}>
                  <span style={{ background: badge.bg, color: badge.text, padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", display: "inline-block" }}>
                    {customer.status}
                  </span>
                </td>

                <td style={td}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <button 
                      title="Xem lịch sử" 
                      onClick={() => onViewHistory && onViewHistory(customer)} 
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

                    <button 
                      title="Tặng 5 điểm" 
                      onClick={() => onAddPoints && onAddPoints(customer.id)} 
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

                    <button 
                      title={customer.status === "Hoạt động" ? "Khóa tài khoản" : "Mở tài khoản"} 
                      onClick={() => onToggleStatus && onToggleStatus(customer.id)} 
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

                    <button 
                      title="Xóa" 
                      onClick={() => onDelete && onDelete(customer.id)} 
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
  );
}