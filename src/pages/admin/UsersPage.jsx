// src/pages/admin/UsersPage.jsx
import React, { useState } from "react";
import { LuPencil, LuTrash2, LuX, LuCheck, LuUserPlus } from "react-icons/lu";

const styles = {
  th: { padding: "16px", color: "#2e7d32", fontWeight: "600", borderBottom: "2px solid #c1e0c2" },
  td: { padding: "16px", verticalAlign: "middle", fontSize: "14px" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", boxSizing: "border-box", marginTop: "6px", fontFamily: "sans-serif" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#334155" }
};

function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Hồng Anh", email: "nghganh217@gmail.com", role: "Admin" },
    { id: 2, name: "Trần Hà Anh", email: "haanh123@gmail.com", role: "Staff" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = Thêm mới, có giá trị = Đang sửa
  const [formData, setFormData] = useState({ name: "", email: "", role: "Staff" });

  const deleteUser = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thành viên [${name}] không?`)) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // --- HÀM MỞ MODAL THÊM MỚI ---
  const handleOpenAddModal = () => {
    setEditingUser(null); // Đánh dấu là đang thêm mới
    setFormData({ name: "", email: "", role: "Staff" }); // Reset trắng form
    setIsModalOpen(true);
  };

  // --- HÀM MỞ MODAL SỬA THÀNH VIÊN ---
  const handleOpenEditModal = (user) => {
    setEditingUser(user); // Đánh dấu là đang sửa user này
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  // --- HÀM XỬ LÝ LƯU (DÙNG CHUNG CHO CẢ THÊM & SỬA) ---
  const handleSaveUser = (e) => {
    e.preventDefault();

    if (editingUser) {
      // Trường hợp: Sửa thành viên cũ
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)));
    } else {
      // Trường hợp: Thêm mới thành viên (Tự sinh ID lớn nhất + 1)
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { id: newId, ...formData }]);
    }

    setIsModalOpen(false);
  };

  return (
    <div style={{ background: "#f8f9fa", padding: "24px", borderRadius: "12px", fontFamily: "sans-serif", minHeight: "100vh" }}>
      
      {/* Cụm tiêu đề trang tích hợp nút Thêm Thành Viên */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ color: "#1b5e20", margin: 0, fontWeight: "700", fontSize: "24px" }}>
            Quản lý Người dùng
          </h2>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
            Phân quyền tài khoản quản trị và nhân viên vận hành hệ thống.
          </p>
        </div>

        {/* NÚT THÊM THÀNH VIÊN MỚI */}
        <button
          onClick={handleOpenAddModal}
          style={{
            background: "#1b5e20", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px",
            fontWeight: "600", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
            boxShadow: "0 2px 4px rgba(27,94,32,0.15)", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#144517"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#1b5e20"}
        >
          <LuUserPlus size={16} /> Thêm thành viên
        </button>
      </div>

      {/* BẢNG DỮ LIỆU NGƯỜI DÙNG */}
      <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e8f5e9" }}>
              <th style={{ ...styles.th, textAlign: "center", width: "80px" }}>ID</th>
              <th style={{ ...styles.th, textAlign: "left" }}>Thông tin tài khoản</th>
              <th style={{ ...styles.th, textAlign: "center", width: "140px" }}>Vai trò</th>
              <th style={{ ...styles.th, textAlign: "center", width: "140px" }}>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fbf9"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <td style={{ ...styles.td, textAlign: "center", color: "#64748b", fontWeight: "600" }}>
                  {user.id}
                </td>
                
                {/* Thiết kế gộp Tên + Email */}
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                    <div>
                      <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "15px" }}>{user.name}</div>
                      <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{user.email}</div>
                    </div>
                  </div>
                </td>

                <td style={{ ...styles.td, textAlign: "center" }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block",
                    background: user.role === "Admin" ? "#e3f2fd" : "#f1f5f9",
                    color: user.role === "Admin" ? "#0d47a1" : "#475569",
                  }}>
                    {user.role}
                  </span>
                </td>

                <td style={styles.td}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                    <button
                      onClick={() => handleOpenEditModal(user)}
                      title="Sửa thông tin"
                      style={{ border: "none", background: "#eff6ff", color: "#2563eb", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                    >
                      <LuPencil size={14} />
                    </button>

                    <button
                      onClick={() => deleteUser(user.id, user.name)}
                      title="Xóa tài khoản"
                      style={{ border: "none", background: "#fef2f2", color: "#dc2626", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }}
                    >
                      <LuTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL FORM THÔNG MINH (DÙNG CHUNG CHO CẢ THÊM VÀ SỬA) --- */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.3)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "24px", borderRadius: "16px", width: "400px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", boxSizing: "border-box" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
                {editingUser ? "Cập Nhật Thành Viên" : "Thêm Thành Viên Mới"}
              </h3>
              <LuX size={20} style={{ cursor: "pointer", color: "#64748b" }} onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleSaveUser} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={styles.label}>Họ và tên</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Nhập họ và tên..."
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  style={styles.input} 
                />
              </div>

              <div>
                <label style={styles.label}>Địa chỉ Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="example@gmail.com"
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  style={styles.input} 
                />
              </div>

              <div>
                <label style={styles.label}>Phân quyền vai trò</label>
                <select 
                  value={formData.role} 
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                  style={{ ...styles.input, cursor: "pointer" }}
                >
                  <option value="Staff">Staff (Nhân viên)</option>
                  <option value="Admin">Admin (Quản trị viên)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "white", color: "#475569", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "none", background: "#1b5e20", color: "white", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}
                >
                  <LuCheck size={16} /> {editingUser ? "Lưu lại" : "Thêm mới"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;