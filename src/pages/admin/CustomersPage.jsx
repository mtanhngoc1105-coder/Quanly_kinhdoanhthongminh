// src/pages/admin/CustomersPage.jsx
import React, { useState } from "react";
import CustomerTable from "../../components/admin/CustomerTable";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";

const MOCK_CUSTOMERS = [
  { id: "KH001", name: "Nguyễn Văn Hào", email: "hao@gmail.com", phone: "0912345678", orders: 12, points: 320, status: "Bị khóa", rank: "Kim cương" },
  { id: "KH002", name: "Vũ Thị Vân", email: "van@gmail.com", phone: "0988888888", orders: 5, points: 120, status: "Hoạt động", rank: "Vàng" },
  { id: "KH003", name: "Nguyễn Hồng Anh", email: "honganh@gmail.com", phone: "0977777777", orders: 20, points: 560, status: "Hoạt động", rank: "Kim cương" },
  { id: "KH004", name: "Mai Thị Ánh Ngọc", email: "ngoc@gmail.com", phone: "0966666666", orders: 8, points: 240, status: "Bị khóa", rank: "Bạc" },
  { id: "KH005", name: "Phạm Minh D", email: "minhd@gmail.com", phone: "0934567890", orders: 3, points: 150, status: "Hoạt động", rank: "Thân thiết" },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRank, setSelectedRank] = useState("All");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRank = selectedRank === "All" || customer.rank === selectedRank;

    return matchesSearch && matchesRank;
  });

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
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const viewHistory = (customer) => {
    alert(`===== LỊCH SỬ MUA HÀNG =====\n\nKhách hàng: ${customer.name}\nTổng đơn hàng: ${customer.orders}\nĐiểm tích lũy: ${customer.points}\nHạng: ${customer.rank}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerActions}>
        <div>
          <h2 style={styles.title}>Quản lý Khách hàng</h2>
          <p style={styles.subtitle}>Theo dõi thông tin khách hàng, hạng thành viên và tích điểm hệ thống.</p>
        </div>
        <button style={styles.addBtn} onClick={() => alert("Tính năng Thêm khách hàng đang được phát triển!")}>
          <FiPlus size={18} /> Thêm khách hàng
        </button>
      </div>

      <div style={styles.filtersContainer}>
        <div style={styles.searchBox}>
          <FiSearch color="#94a3b8" size={18} />
          <input
            type="text"
            placeholder="Tìm theo Mã, Tên hoặc Số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterBox}>
          <FiFilter color="#94a3b8" size={18} />
          <select
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
            style={styles.selectInput}
          >
            <option value="All">Tất cả Hạng thành viên</option>
            <option value="Kim cương">Kim cương</option>
            <option value="Vàng">Vàng</option>
            <option value="Bạc">Bạc</option>
            <option value="Thân thiết">Thân thiết</option>
          </select>
        </div>
      </div>

      <CustomerTable 
        customers={filteredCustomers}
        onToggleStatus={toggleStatus}
        onAddPoints={addPoints}
        onDelete={deleteCustomer}
        onViewHistory={viewHistory}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
    borderRadius: "16px"
  },
  headerActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px"
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b"
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#64748b"
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#2e7d32",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    boxShadow: "0 2px 4px rgba(46, 125, 50, 0.2)"
  },
  filtersContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap"
  },
  searchBox: {
    flex: 1,
    minWidth: "250px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "10px 16px",
    borderRadius: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#334155"
  },
  filterBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "10px 16px",
    borderRadius: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
  },
  selectInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#334155",
    backgroundColor: "transparent",
    cursor: "pointer",
    paddingRight: "8px"
  }
};