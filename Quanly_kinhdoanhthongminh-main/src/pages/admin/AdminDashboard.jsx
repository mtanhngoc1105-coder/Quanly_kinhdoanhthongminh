import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

function AdminDashboard() {
  // Dữ liệu mẫu danh sách sản phẩm trong kho thực phẩm
  const [products, setProducts] = useState([
    { id: "001", name: "Bông cải xanh Đà Lạt", category: "Rau củ", price: 35000, stock: 120, status: "Còn hàng" },
    { id: "002", name: "Xà lách thủy canh mỡ", category: "Rau xanh", price: 25000, stock: 80, status: "Còn hàng" },
    { id: "003", name: "Cà chua cherry organic", category: "Quả hữu cơ", price: 42000, stock: 0, status: "Hết hàng" },
    { id: "004", name: "Khoai tây sạch", category: "Củ quả", price: 28000, stock: 45, status: "Còn hàng" },
  ]);

  // Hàm xử lý xóa sản phẩm nhanh
  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi kho không?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      {/* Thẻ thống kê nhanh phía trên bảng */}
      <div style={styles.statGrid}>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>Tổng sản phẩm</span>
          <span style={styles.statNumber}>{products.length} loại</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>Tổng kho hàng</span>
          <span style={styles.statNumber}>245 kg</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>Sản phẩm hết hàng</span>
          <span style={{...styles.statNumber, color: "#e53935"}}>1 loại</span>
        </div>
      </div>

      {/* Khu vực chức năng chính */}
      <div style={styles.headerActions}>
        <h2 style={styles.tableTitle}>Danh sách kho thực phẩm</h2>
        <button style={styles.addBtn} onClick={() => alert("Chức năng thêm sản phẩm đang được xây dựng!")}>
          <FiPlus /> Thêm sản phẩm mới
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div style={styles.searchBox}>
        <FiSearch color="#888" size={16} />
        <input type="text" placeholder="Tìm kiếm rau, củ, quả sạch trong kho..." style={styles.searchInput} />
      </div>

      {/* Bảng hiển thị sản phẩm */}
      <div style={styles.tableCard}>
        <table style={styles.adminTable}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.tableTh}>ID</th>
              <th style={styles.tableTh}>Tên sản phẩm</th>
              <th style={styles.tableTh}>Danh mục</th>
              <th style={styles.tableTh}>Giá bán</th>
              <th style={styles.tableTh}>Số lượng</th>
              <th style={styles.tableTh}>Trạng thái</th>
              <th style={{ ...styles.tableTh, textAlign: "center" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={styles.tableBodyRow}>
                <td style={styles.tableTd}>{product.id}</td>
                <td style={{ ...styles.tableTd, fontWeight: "600", color: "#2e7d32" }}>{product.name}</td>
                <td style={styles.tableTd}>{product.category}</td>
                <td style={{ ...styles.tableTd, fontWeight: "600" }}>{product.price.toLocaleString()}đ</td>
                <td style={styles.tableTd}>{product.stock}kg</td>
                <td style={styles.tableTd}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: product.stock > 0 ? "#e8f5e9" : "#ffebee",
                    color: product.stock > 0 ? "#2e7d32" : "#c62828"
                  }}>
                    {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </td>
                <td style={{ ...styles.tableTd, textAlign: "center" }}>
                  <button style={{ ...styles.actionBtn, color: "#1976d2" }} title="Sửa">
                    <FiEdit2 size={16} />
                  </button>
                  <button 
                    style={{ ...styles.actionBtn, color: "#e53935", marginLeft: "12px" }} 
                    title="Xóa"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "10px", fontFamily: "system-ui, sans-serif" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "25px" },
  statCard: { backgroundColor: "#fff", padding: "18px 24px", borderRadius: "10px", border: "1px solid #eef2f6", display: "flex", flexDirection: "column", gap: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" },
  statTitle: { fontSize: "13px", color: "#64748b", fontWeight: "500" },
  statNumber: { fontSize: "20px", fontWeight: "700", color: "#1e293b" },
  headerActions: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  tableTitle: { margin: 0, fontSize: "20px", fontWeight: "700", color: "#1e293b" },
  addBtn: { display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#2e7d32", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "13px", transition: "background 0.2s" },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "10px 16px", borderRadius: "8px", marginBottom: "20px", width: "320px" },
  searchInput: { border: "none", outline: "none", width: "100%", fontSize: "13px" },
  tableCard: { backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" },
  adminTable: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  tableHeadRow: { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  tableTh: { padding: "14px 20px", fontSize: "13px", fontWeight: "600", color: "#64748b" },
  tableBodyRow: { borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" },
  tableTd: { padding: "14px 20px", fontSize: "14px", color: "#334155" },
  statusBadge: { fontSize: "12px", padding: "4px 10px", borderRadius: "6px", fontWeight: "500" },
  actionBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px" }
};

export default AdminDashboard;