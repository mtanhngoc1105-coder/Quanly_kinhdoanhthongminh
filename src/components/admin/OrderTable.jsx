import React, { useState } from 'react';

export default function OrderTable() {
  // 1. Dữ liệu thô gọn gàng (Đúng theo ảnh mẫu của bạn)
  const [orders, setOrders] = useState([
    { id: 'ORD001', name: 'Nguyễn Văn Hào', date: '10/05/2026', total: 122000, status: 'Đang xử lý' },
    { id: 'ORD002', name: 'Vũ Thị Vân', date: '09/05/2026', total: 180000, status: 'Đã giao' },
    { id: 'ORD003', name: 'Nguyễn Hồng Anh', date: '24/05/2026', total: 890000, status: 'Đã giao' },
    { id: 'ORD004', name: 'Mai Thị Ánh Ngọc', date: '23/05/2026', total: 420000, status: 'Đã hủy' },
  ]);

  // 2. Hàm đổi trạng thái cực ngắn
  const changeStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  // 3. Hàm lấy màu sắc cho nhãn trạng thái (Dùng object map thay vì switch-case dài dòng)
  const getBadgeStyle = (status) => {
    const colors = {
      'Đã giao': { bg: '#e8f5e9', text: '#1b5e20' },
      'Đang xử lý': { bg: '#fff3e0', text: '#e65100' },
      'Đã hủy': { bg: '#ffebee', text: '#c62828' }
    };
    return colors[status] || { bg: '#f5f5f5', text: '#616161' };
  };

  return (
    <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #c1e0c2", height: "52px" }}>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center"}}>Mã đơn</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Khách hàng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "160px" }}>Ngày đặt hàng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Tổng tiền</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Trạng thái</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "120px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const badge = getBadgeStyle(order.status);
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#333' }}>{order.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#333' }}>{order.name}</td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: '#333' }}>{order.date}</td>
                  
                  {/* Căn phải số tiền để nhìn thẳng hàng, đẹp như kế toán */}
                  <td style={{ ...tdStyle, textAlign: 'center', fontWeight: '600', color: '#1a202c' }}>
                    {order.total.toLocaleString()} đ
                  </td>
                  
                  {/* Nhãn trạng thái - Có thêm whiteSpace: 'nowrap' để ép chữ KHÔNG nhảy dòng */}
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: badge.bg, color: badge.text,
                      padding: '6px 12px', borderRadius: '20px', fontSize: '13px', 
                      fontWeight: '600', display: 'inline-block', whiteSpace: 'nowrap'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  
                  {/* Thanh chọn select được làm mượt viền, nhìn rất sang */}
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <select 
                      value={order.status} 
                      onChange={(e) => changeStatus(order.id, e.target.value)}
                      style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontWeight: '600', color: '#4a5568', cursor: 'pointer' }}
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}
export const tdStyle = { padding: '16px', fontSize: '14px', fontWeight: '500' };