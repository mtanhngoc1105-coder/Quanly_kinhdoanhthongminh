import React, { useState } from 'react';
import { LuPlus, LuPencil, LuTrash2, LuSearch, LuX, LuCheck } from 'react-icons/lu';

// 1. ĐẨY TOÀN BỘ STYLES VÀ CẤU HÌNH RA NGOÀI COMPONENT (Giúp code trong sạch hơn)
const BADGES = {
  'Rau củ': { bg: '#e8f5e9', color: '#1b5e20' },
  'Trái cây': { bg: '#fff3e0', color: '#e65100' },
  'Thịt & Hải sản': { bg: '#fce4ec', color: '#c2185b' },
  'Trứng & Sữa': { bg: '#edf2f7', color: '#4a5568' }
};

const styles = {
  th: { padding: "14px 16px", color: "#475569", fontSize: "13px", fontWeight: "600", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "14px 16px", fontSize: "14px", verticalAlign: "middle" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", boxSizing: "border-box" },
  label: { display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#334155" }
};

function ProductPage() {
  const [products, setProducts] = useState([
    { id: 'PROD-001', name: 'Táo Mỹ nhập khẩu', price: 85000, category: 'Trái cây', stock: 45, supplier: 'Organic Farm Đà Lạt' },
    { id: 'PROD-002', name: 'Bông cải xanh Đà Lạt', price: 35000, category: 'Rau củ', stock: 120, supplier: 'Hợp tác xã Rau sạch Đà Lạt' },
    { id: 'PROD-003', name: 'Cá hồi Na-uy phi lê', price: 290000, category: 'Thịt & Hải sản', stock: 15, supplier: 'Seafood Premium' },
    { id: 'PROD-004', name: 'Sữa tươi hữu cơ Vinamilk', price: 28000, category: 'Trứng & Sữa', stock: 5, supplier: 'Nông trại sữa Mộc Châu' },
    { id: 'PROD-005', name: 'Dâu tây giống New Zealand', price: 150000, category: 'Trái cây', stock: 25, supplier: 'Đại lý hoa quả HN' },
    {id: 'PROD-006', name: 'Cải bắp tím Đà Lạt', price:25000, category: 'Rau củ', stock: 30, supplier: 'Hợp tác xã Rau sạch Đà Lạt'},

  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Rau củ', price: '', stock: '', supplier: '' });

  // Bộ lọc tìm kiếm nhanh
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Logic phân trang rút gọn
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setFormData(product ? { ...product } : { name: '', category: 'Rau củ', price: '', stock: '', supplier: '' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const priceValue = Math.max(0, Number(formData.price));
    const stockValue = Math.max(0, Number(formData.stock));
    const data = { ...formData, price: priceValue, stock: stockValue };
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
    } else {
      setProducts([...products, { id: `PROD-00${products.length + 1}`, ...data }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "12px", fontFamily: "sans-serif" }}>
      {/* Cụm Tiêu Đề Trang Đồng Bộ Giao Diện */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#1b5e20", margin: 0, fontWeight: "700", fontSize: "22px" }}>
                Quản lý Sản phẩm 
        </h2>
        <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
          Quản lý sản phẩm bán chạy nhất trong cửa hàng
        </p>
      </div>
      {/* Nút Thêm Sản Phẩm */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => handleOpenModal()} style={{ background: "#1b5e20", color: "white", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
          <LuPlus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* THANH TÌM KIẾM */}
      <div style={{ marginBottom: "20px", position: "relative", maxWidth: "360px" }}>
        <input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ ...styles.input, paddingLeft: "40px", borderRadius: "10px" }} />
        <LuSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} size={16} />
      </div>

      {/* BẢNG DỮ LIỆU CĂN THẲNG HÀNG TUYỆT ĐỐI */}
      <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            {/* Đổ màu nền xanh nhạt phẳng và chữ xanh đậm */}
            <tr style={{ borderBottom: "2px solid #c1e0c2", height: "52px" }}>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center"}}>Mã sản phẩm</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "160px" }}>Tên sản phẩm</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "160px" }}>Danh mục</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Giá bán</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Tồn kho</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", textAlign: "center" }}>Nhà cung cấp</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "120px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(({ id, name, category, price, stock, supplier }) => {
              const badge = BADGES[category] || { bg: '#f1f5f9', color: '#475569' };
              return (
                <tr key={id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ ...styles.td, textAlign: "center", fontWeight: "600", color: "#333" }}>{id}</td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#333" }}>{name}</td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "6px", backgroundColor: badge.bg, color: badge.color }}>{category}</span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center", fontWeight: "600",fontSize: "12px" }}>{price.toLocaleString('vi-VN')} đ</td>
                  <td style={{ ...styles.td, textAlign: "center", frontWeight: "600",fontSize: "12px" }}>
                    {stock === 0 ? <span style={{ color: '#dc2626', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>Hết hàng</span> : stock}
                  </td>
                  <td style={{ ...styles.td, color: "#333" }}>{supplier || '---'}</td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                      <button onClick={() => handleOpenModal({ id, name, category, price, stock, supplier })} style={{ border: "none", background: "#eff6ff", color: "#2563eb", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><LuPencil size={14} /></button>
                      <button onClick={() => { if(window.confirm('Xóa?')) setProducts(products.filter(p => p.id !== id)) }} style={{ border: "none", background: "#fef2f2", color: "#dc2626", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><LuTrash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PHÂN TRANG GỌN GÀNG */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "6px" }}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>Trước</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid", background: currentPage === i + 1 ? "#1b5e20" : "white", color: currentPage === i + 1 ? "white" : "#334155", borderColor: currentPage === i + 1 ? "#1b5e20" : "#e2e8f0", cursor: "pointer" }}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>Sau</button>
        </div>
      )}

      {/* MODAL THÊM / SỬA RÚT GỌN */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", padding: "24px", borderRadius: "16px", width: "420px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{editingProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
              <LuX size={18} style={{ cursor: "pointer", color: "#64748b" }} onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div><label style={styles.label}>Tên sản phẩm</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} /></div>
              <div>
                <label style={styles.label}>Danh mục</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={styles.input}>
                  {Object.keys(BADGES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}><label style={styles.label}>Giá bán</label><input type="number" min="0" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={styles.input} /></div>
                <div style={{ flex: 1 }}><label style={styles.label}>Số lượng</label><input type="number" min="0" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={styles.input} /></div>
              </div>
              <div><label style={styles.label}>Nhà cung cấp</label><input type="text" required value={formData.supplier || ''} onChange={e => setFormData({...formData, supplier: e.target.value})} style={styles.input} /></div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}>Hủy</button>
                <button type="submit" style={{ padding: "8px 14px", borderRadius: "6px", border: "none", background: "#1b5e20", color: "white", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}><LuCheck size={16} /> Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;