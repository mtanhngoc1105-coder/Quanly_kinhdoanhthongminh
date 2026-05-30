import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      {/* Thanh menu bên trái */}
      <Sidebar />
      
      {/* Khối nội dung bên phải */}
      <div className="admin-content" style={{ flex: 1, minHeight: "100vh" }}>
        {/* Thanh thanh điều hướng trên cùng */}
        <AdminNavbar />
        
        {/* Nơi hiển thị nội dung các trang con */}
        <main style={{ padding: "20px", background: "#f4f6f8" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
