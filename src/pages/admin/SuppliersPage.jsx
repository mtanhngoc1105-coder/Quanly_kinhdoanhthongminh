// src/pages/admin/SuppliersPage.jsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const thStyle = {
  background: "#e8f5e9",
  color: "#2e7d32",
  padding: "16px",
  fontWeight: "600",
  fontSize: "14px",
};

const tdStyle = {
  padding: '16px',
  fontSize: '14px',
  color: '#334155',
  borderBottom: '1px solid #f1f5f9',
  verticalAlign: 'middle',
};

// Style cho nút hành động tối giản (Ghost Button)
const actionBtnStyle = {
  border: "none",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f1f5f9", // Nền mặc định siêu nhạt
  color: "#64748b",     // Icon màu trung tính
  transition: "all 0.2s ease",
};

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    { id: 'SPL01', name: 'Hợp tác xã Rau sạch Đà Lạt', contact: '0912.345.xxx', product: 'Rau củ các loại', area: 'TP.Đà Lạt', status: 'Đang hợp tác' },
    { id: 'SPL02', name: 'Trang trại Trái cây Hữu cơ Miền Tây', contact: '0945.678.xxx', product: 'Trái cây nhiệt đới', area: 'Tiền Giang', status: 'Đang hợp tác' },
    { id: 'SPL03', name: 'Công ty Thực phẩm tươi sống CP', contact: '0283.999.xxx', product: 'Thịt heo, gà sạch', area: 'Hà Nội', status: 'Đang hợp tác' },
    { id: 'SPL04', name: 'Nông trại Thảo mộc Việt', contact: '0903.111.xxx', product: 'Gia vị, trà thảo mộc', area: 'Hà Giang', status: 'Tạm ngưng cung cấp' },
    { id: 'SPL05', name: 'Công ty Hải sản Biển Đông', contact: '0908.222.xxx', product: 'Hải sản đông lạnh', area: 'Quảng Ninh', status: 'Đang hợp tác' },
    { id: 'SPL06', name: 'Organic Farm Đà Lạt', contact: '0905.333.xxx', product: 'Rau hữu cơ', area: 'TP.Đà Lạt', status: 'Đang hợp tác' },
    { id: 'SPL07', name: 'Seafood Premium', contact: '0923456789', product: 'Hải sản đông lạnh', area: 'Nha Trang', status: 'Đang hợp tác' },
    { id: 'SPL08', name: 'Nông trại Sữa Mộc Châu', contact: '0932654890', product: 'Sữa & trứng', area: 'Sơn La', status: 'Đang hợp tác' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBtnId, setHoveredBtnId] = useState(null); // Quản lý hover nút bấm

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm đổi trạng thái nhanh
  const toggleStatus = (id) => {
    setSuppliers(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'Đang hợp tác' ? 'Tạm ngưng cung cấp' : 'Đang hợp tác' } : s
    ));
  };

  // Hàm xóa đối tác
  const deleteSupplier = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn ngừng liên kết với nhà cung cấp ${id}?`)) {
      setSuppliers(prev => prev.filter(s => s.id !== id));
    }
  };

  const getStatusStyle = (status) => {
    return status === 'Đang hợp tác'
      ? { bg: 'rgba(46, 125, 50, 0.08)', text: '#2e7d32' }
      : { bg: 'rgba(211, 47, 47, 0.08)', text: '#d32f2f' };
  };

  return (
    <div style={{ background: "transparent", padding: "10px 0", fontFamily: "sans-serif" }}>
      
      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: "#1b5e20", margin: 0, fontWeight: "700", fontSize: "22px" }}>
            Quản lý Nhà cung cấp
          </h2>
          <p style={{ color: "#64748b", margin: "6px 0 0 0", fontSize: "14px" }}>
            Quản lý thông tin liên hệ, nguồn gốc xuất xứ nông sản và trạng thái ký kết với các đối tác cung ứng.
          </p>
        </div>
        
        {/* Nút thêm nhà cung cấp mới xịn sò */}
        <button style={{ 
          display: "flex", alignItems: "center", gap: "8px", background: "#2e7d32", color: "white", 
          border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", 
          cursor: "pointer", boxShadow: "0 2px 8px rgba(46, 125, 50, 0.2)", transition: "background 0.2s" 
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#1b5e20"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#2e7d32"}
        onClick={() => alert("Chức năng thêm Nhà cung cấp mới đang được phát triển!")}
        >
          <Icon icon="lucide:plus" width={18} />
          Thêm đối tác
        </button>
      </div>

      {/* THANH TÌM KIẾM ĐỒNG BỘ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ position: 'relative', width: '350px' }}>
          <Icon icon="lucide:search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Tìm theo mã hoặc tên đối tác..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ fontSize: "13px", color: "#64748b" }}>
          Hiển thị: <strong style={{ color: "#1e293b" }}>{filteredSuppliers.length}</strong> đối tác
        </div>
      </div>

      {/* KHUNG BẢNG QUẢN LÝ TẬP TRUNG */}
      <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid #f1f5f9", boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ height: "48px" }}>
              <th style={{ ...thStyle, width: "100px", textAlign: "center" }}>Mã NCC</th>
              <th style={{ ...thStyle, textAlign: "left", paddingLeft: "20px" }}>Tên đối tác</th>
              <th style={{ ...thStyle, textAlign: "left" }}>Mặt hàng chủ lực</th>
              <th style={{ ...thStyle, textAlign: "center", width: "140px" }}>Khu vực nguồn</th>
              <th style={{ ...thStyle, textAlign: "center", width: "130px" }}>Số điện thoại</th>
              <th style={{ ...thStyle, textAlign: "center", width: "150px" }}>Trạng thái</th>
              <th style={{ ...thStyle, textAlign: "center", width: "120px" }}>Hành động</th>
            </tr>
          </thead>
          
          <tbody>
            {filteredSuppliers.map((supplier) => {
              const badge = getStatusStyle(supplier.status);

              return (
                <tr 
                  key={supplier.id} 
                  style={{ transition: "background 0.15s ease", height: "56px" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  {/* Mã đối tác */}
                  <td style={{ ...tdStyle, textAlign: "center", fontWeight: "600", color: "#64748b" }}>
                    {supplier.id.toUpperCase()}
                  </td>
                  
                  {/* Tên đối tác */}
                  <td style={{ ...tdStyle, textAlign: "left", paddingLeft: "20px", fontWeight: "600", color: "#1e293b" }}>
                    {supplier.name}
                  </td>
                  
                  {/* Mặt hàng chủ lực */}
                  <td style={{ ...tdStyle, textAlign: "left", color: "#475569" }}>
                    {supplier.product}
                  </td>
                  
                  {/* Khu vực */}
                  <td style={{ ...tdStyle, textAlign: "center", color: "#475569" }}>
                      <span style={{ color: "#ef4444" }}>📍</span>{supplier.area}
                  </td>
                  
                  {/* SĐT */}
                  <td style={{ ...tdStyle, textAlign: "center", color: "#475569", fontFamily: "monospace", fontSize: "14px" }}>
                    {supplier.contact}
                  </td>
                  
                  {/* Trạng thái hợp tác */}
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <span 
                      style={{ 
                        background: badge.bg, 
                        color: badge.text, 
                        padding: '5px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '700',
                        display: "inline-block",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {supplier.status}
                    </span>
                  </td>

                  {/* CỘT HÀNH ĐỘNG MỚI - GHOST BUTTON HOVER EFFECT */}
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      
                      {/* Bật tắt trạng thái nhanh (Khóa/Mở) */}
                      <button 
                        title={supplier.status === 'Đang hợp tác' ? "Tạm ngưng cung cấp" : "Kích hoạt hợp tác"} 
                        onClick={() => toggleStatus(supplier.id)} 
                        onMouseEnter={() => setHoveredBtnId(`${supplier.id}-toggle`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{ 
                          ...actionBtnStyle, 
                          background: hoveredBtnId === `${supplier.id}-toggle` 
                            ? (supplier.status === 'Đang hợp tác' ? "#fef3c7" : "#dcfce7") 
                            : "#f1f5f9",
                          color: hoveredBtnId === `${supplier.id}-toggle` 
                            ? (supplier.status === 'Đang hợp tác' ? "#d97706" : "#16a34a") 
                            : "#64748b"
                        }}
                      >
                        <Icon icon={supplier.status === 'Đang hợp tác' ? "lucide:refresh-cw" : "lucide:check-circle"} width={14} />
                      </button>

                      {/* Xóa liên kết */}
                      <button 
                        title="Xóa nhà cung cấp" 
                        onClick={() => deleteSupplier(supplier.id)} 
                        onMouseEnter={() => setHoveredBtnId(`${supplier.id}-delete`)}
                        onMouseLeave={() => setHoveredBtnId(null)}
                        style={{ 
                          ...actionBtnStyle, 
                          background: hoveredBtnId === `${supplier.id}-delete` ? "#fee2e2" : "#f1f5f9",
                          color: hoveredBtnId === `${supplier.id}-delete` ? "#dc2626" : "#64748b"
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

export default SuppliersPage;