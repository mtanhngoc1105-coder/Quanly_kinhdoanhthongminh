import React from "react";
import OrderTable from "../../components/admin/OrderTable";

function OrdersPage() {
  return (
     <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "12px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#1b5e20", margin: 0, fontWeight: "700", fontSize: "22px" }}>
                Quản lý Đơn hàng 
        </h2>
        <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
            Theo dõi đơn hàng của khách hàng
        </p>
      </div>

      <OrderTable />

    </div>
  );
}

export default OrdersPage;