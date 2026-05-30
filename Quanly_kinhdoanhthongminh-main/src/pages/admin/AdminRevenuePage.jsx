import React from "react";

const sampleOrders = [
  { id: "DH-1001", customer: "Nguyễn Văn A", date: "2026-05-29", total: 185000, status: "Đã giao" },
  { id: "DH-1002", customer: "Trần Thị B", date: "2026-05-29", total: 92000, status: "Đang xử lý" },
  { id: "DH-1003", customer: "Lê Văn C", date: "2026-05-28", total: 240000, status: "Đã giao" },
  { id: "DH-1004", customer: "Phạm Thị D", date: "2026-05-27", total: 134000, status: "Đã giao" },
  { id: "DH-1005", customer: "Hoàng Minh E", date: "2026-05-29", total: 78000, status: "Đã hủy" },
];

function AdminRevenuePage() {
  const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.total, 0);
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayOrders = sampleOrders.filter((order) => order.date === todayKey);
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = sampleOrders.filter((order) => order.status === "Đã giao").length;
  const pendingOrders = sampleOrders.filter((order) => order.status === "Đang xử lý").length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Quản lý doanh thu</h1>
          <p style={styles.subtitle}>Tổng hợp doanh thu và đơn hàng dành cho quản trị viên.</p>
        </div>
      </div>

      <div style={styles.statGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Tổng doanh thu</span>
          <span style={styles.statValue}>{totalRevenue.toLocaleString("vi-VN")} đ</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Doanh thu hôm nay</span>
          <span style={styles.statValue}>{todayRevenue.toLocaleString("vi-VN")} đ</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Đơn hàng thành công</span>
          <span style={styles.statValue}>{completedOrders}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Đơn hàng đang xử lý</span>
          <span style={styles.statValue}>{pendingOrders}</span>
        </div>
      </div>

      <div style={styles.tableSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Đơn hàng gần nhất</h2>
          <span style={styles.sectionSubtitle}>{sampleOrders.length} đơn hàng đã ghi nhận</span>
        </div>

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Mã đơn</th>
                <th style={styles.th}>Khách hàng</th>
                <th style={styles.th}>Ngày</th>
                <th style={styles.th}>Tổng tiền</th>
                <th style={styles.th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map((order) => (
                <tr key={order.id} style={styles.tr}>
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>{order.customer}</td>
                  <td style={styles.td}>{order.date}</td>
                  <td style={styles.td}>{order.total.toLocaleString("vi-VN")} đ</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor:
                        order.status === "Đã giao"
                          ? "#e8f5e9"
                          : order.status === "Đang xử lý"
                          ? "#fff8e1"
                          : "#ffebee",
                      color:
                        order.status === "Đã giao"
                          ? "#2e7d32"
                          : order.status === "Đang xử lý"
                          ? "#ff8f00"
                          : "#c62828",
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "24px", minHeight: "100vh", fontFamily: "system-ui, sans-serif" },
  header: { marginBottom: "22px" },
  title: { margin: 0, fontSize: "28px", fontWeight: 700, color: "#1e293b" },
  subtitle: { margin: "8px 0 0", color: "#475569", fontSize: "14px" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "18px", marginBottom: "26px" },
  statCard: { padding: "20px", borderRadius: "16px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)" },
  statLabel: { display: "block", fontSize: "13px", color: "#64748b", marginBottom: "10px", fontWeight: 600 },
  statValue: { fontSize: "24px", fontWeight: 700, color: "#0f172a" },
  tableSection: { marginTop: "20px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  sectionTitle: { margin: 0, fontSize: "20px", fontWeight: 700, color: "#0f172a" },
  sectionSubtitle: { color: "#475569", fontSize: "13px" },
  tableCard: { backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "640px" },
  th: { textAlign: "left", padding: "16px 20px", fontSize: "13px", color: "#475569", textTransform: "uppercase", letterSpacing: ".03em", borderBottom: "1px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "16px 20px", fontSize: "14px", color: "#334155" },
  statusBadge: { display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
};

export default AdminRevenuePage;
