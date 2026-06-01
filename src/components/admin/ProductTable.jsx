// src/components/admin/ProductTable.jsx
import React, { useState } from 'react';

function ProductTable() {
  // 1. Khởi tạo dữ liệu mẫu danh sách thực phẩm sạch SmartFood
  const [products, setProducts] = useState([
    { id: 1, name: 'Táo Mỹ nhập khẩu', price: 85000, category: 'Trái cây', stock: 45 },
    { id: 2, name: 'Bông cải xanh Đà Lạt', price: 35000, category: 'Rau củ', stock: 120 },
    { id: 3, name: 'Cá hồi Na-uy phi lê', price: 290000, category: 'Thịt hải sản', stock: 12 },
    { id: 4, name: 'Sữa tươi hữu cơ Vinamilk', price: 28000, category: 'Sữa & Trứng', stock: 5 },
    { id: 5, name: 'Dâu tây giống New Zealand', price: 150000, category: 'Trái cây', stock: 25 },
    { id: 6, name: 'Ức gà phi lê ăn kiêng', price: 75000, category: 'Thịt hải sản', stock: 60 },
    { id: 7, name: 'Cà chua bi hữu cơ', price: 42000, category: 'Rau củ', stock: 0 },
  ]);

  // 2. Các State quản lý Phân trang (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Hiển thị tối đa 4 sản phẩm trên 1 trang để test phân trang
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // 3. Các State quản lý Hộp thoại (Modal) để Thêm/Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Rau củ', stock: '' });

  // 4. Các hàm xử lý chức năng CRUD
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: 'Rau củ', stock: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm thực phẩm này?")) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      // Reset lại số trang nếu trang hiện tại bị trống sau khi xóa
      const newTotalPages = Math.ceil(updatedProducts.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validatedPrice = Math.max(0, Number(formData.price));
    const validatedStock = Math.max(0, Number(formData.stock));

    if (editingProduct) {
      // Logic UPDATE
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, price: validatedPrice, stock: validatedStock } : p));
    } else {
      // Logic CREATE
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: validatedPrice,
        category: formData.category,
        stock: validatedStock
      };
      setProducts([newProduct, ...products]);
      setCurrentPage(1); // Quay về trang 1 để xem sản phẩm mới thêm
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      {/* Nút Thêm sản phẩm nhanh */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
        <button 
          onClick={handleOpenAdd}
          style={{ background: "#1b5e20", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
        >
          + Thêm sản phẩm mới
        </button>
      </div>

      {/* Bảng hiển thị (Table) */}
      <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"}}>
        <table style={{ width: "100%", borderCollapse: "collapse"}}>
          <thead>
            <tr style={{ background: "#e8f5e9",borderBottom:"2px solid #c1e0c2", height: "50px"}}>
              <th style={{ background: "#e8f5e9", padding: "16px", color: "#2e7d32", fontWeight: "600", textAlign: "center" }}>Tên sản phẩm</th>
              <th style={{ background: "#e8f5e9", padding: "16px", color: "#2e7d32", fontWeight: "600", textAlign: "center", width: "120px" }}>Danh mục</th>
              <th style={{ background: "#e8f5e9", padding: "16px", color: "#2e7d32", fontWeight: "600", textAlign: "center", width: "120px" }}>Giá bán</th>
              <th style={{ background: "#e8f5e9", padding: "16px", color: "#2e7d32", fontWeight: "600", textAlign: "center", width: "120px" }}>Tồn kho</th>
              <th style={{ background: "#e8f5e9", padding: "16px", color: "#2e7d32", fontWeight: "600", textAlign: "center", width: "150px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #eee", height: "50px" }}>
                <td style={{ padding: "12px", fontWeight: "bold", color: "#333" }}>{product.name}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px", fontSize: "13px" }}>
                    {product.category}
                  </span>
                </td>
                <td style={{ padding: "12px", color: "#2e7d32", fontWeight: "bold" }}>
                  {product.price.toLocaleString()} đ
                </td>
                <td style={{ padding: "12px", color: product.stock === 0 ? "red" : product.stock < 10 ? "orange" : "#333", fontWeight: product.stock <= 10 ? "bold" : "normal" }}>
                  {product.stock === 0 ? "Hết hàng" : product.stock < 10 ? `${product.stock} (Sắp hết)` : product.stock}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button onClick={() => handleOpenEdit(product)} style={{ background: "#2196f3", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", marginRight: "6px", cursor: "pointer" }}>Sửa</button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: "#f44336", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Điều khiển Phân trang (Pagination UI) */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", gap: "5px" }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}>Trước</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentPage(idx + 1)}
            style={{ 
              padding: "6px 12px", 
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: currentPage === idx + 1 ? "#1b5e20" : "white", 
              color: currentPage === idx + 1 ? "white" : "black",
              cursor: "pointer"
            }}
          >
            {idx + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}>Sau</button>
      </div>

      {/* MODAL POP-UP (THÊM / SỬA) */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "25px", borderRadius: "8px", width: "380px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#1b5e20" }}>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Tên mặt hàng:
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ width: "100%", padding: "8px", marginTop: "4px", boxSizing: "border-box" }} />
              </label>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Danh mục:
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
                  <option value="Rau củ">Rau củ</option>
                  <option value="Trái cây">Trái cây</option>
                  <option value="Thịt hải sản">Thịt hải sản</option>
                  <option value="Sữa & Trứng">Sữa & Trứng</option>
                </select>
              </label>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Giá bán (đ):
                <input type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={{ width: "100%", padding: "8px", marginTop: "4px", boxSizing: "border-box" }} />
              </label>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Số lượng tồn kho:
                <input type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required style={{ width: "100%", padding: "8px", marginTop: "4px", boxSizing: "border-box" }} />
              </label>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "8px 14px", background: "#aaa", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Đóng</button>
                <button type="submit" style={{ padding: "8px 14px", background: "#1b5e20", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;