import Sidebar from "../components/admin/Sidebar";
//import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
       
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;