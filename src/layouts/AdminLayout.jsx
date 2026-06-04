import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

import SidebarAdmin from "../components/admin/SidebarAdmin";

function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user || !(user.roleId === 2 || user.role === "manager")) {
    return <Navigate to="/login?role=manager" replace state={{ from: location }} />;
  }

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
      </div>

    </div>
  );
}

export default AdminLayout;