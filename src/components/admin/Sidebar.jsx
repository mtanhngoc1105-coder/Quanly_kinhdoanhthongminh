import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#1b5e20",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Admin</h2>

      <ul style={{ marginTop: "20px" }}>
        <li>
          <Link to="/admin">
            Dashboard
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;