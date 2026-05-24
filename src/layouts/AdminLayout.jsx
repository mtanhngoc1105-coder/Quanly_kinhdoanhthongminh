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