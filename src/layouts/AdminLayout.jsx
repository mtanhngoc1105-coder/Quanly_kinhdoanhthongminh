import React from "react";
import { Outlet } from "react-router-dom";

import SidebarAdmin from "../components/admin/SidebarAdmin";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>

      <SidebarAdmin />

      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f4f6f8",
          minHeight: "100vh"
        }}
      >
        <Outlet />
import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">
        <AdminNavbar />

        <main>
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;
