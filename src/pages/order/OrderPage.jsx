import { useEffect, useState } from "react";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import useNotificationStore from "../../stores/notificationStore";
import { useNavigate } from "react-router-dom";

const styles = {
  pageWrapper: {
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    paddingBottom: "60px",
    paddingTop: "40px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    background: "#1b4d3e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "20px",
    transition: "background 0.2s",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: "30px",
  },
  successBanner: {
    backgroundColor: "#d1fae5",
    border: "1px solid #6ee7b7",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  successIcon: {
    color: "#059669",
    fontSize: "24px",
    flexShrink: 0,
  },
  successText: {
    color: "#047857",
    fontSize: "14px",
  },
  emptyContainer: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  emptyImg: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
    opacity: 0.6,
  },
  emptyText: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "24px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  orderInfo: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },
  orderInfoLabel: {
    fontWeight: 600,
    color: "#1f2937",
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
  },
  statusProcessing: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
  statusPaid: {
    backgroundColor: "#d1fae5",
    color: "#059669",
  },
  statusPending: {
    backgroundColor: "#fecaca",
    color: "#dc2626",
  },
  orderProducts: {
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
  },
  productItem: {
    display: "flex",
    gap: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f3f4f6",
    marginBottom: "16px",
  },
  productImg: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
    backgroundColor: "#f3f4f6",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: "4px",
  },
  productQty: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "4px",
  },
  productPrice: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#059669",
  },
  orderFooter: {
    padding: "20px 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  footerItem: {
    fontSize: "13px",
  },
  footerLabel: {
    color: "#6b7280",
    marginBottom: "4px",
  },
  footerValue: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1f2937",
  },
  totalAmount: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#059669",
  },
};

function OrderPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const { notifications } = useNotificationStore();

  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  // Get the latest notification if it's an order notification
  const latestOrderNotification = notifications.find(n => n.type === "order");

  useEffect(() => {
    if (!user?.id) return;

    const loadOrders = async () => {
      try {
        const ordersRes = await fetch(`http://localhost:3001/orders?userId=${user.id}`);
        const ordersData = await ordersRes.json();
        setOrders(ordersData || []);

        // Fetch order items for each order
        const items = {};
        for (const order of ordersData || []) {
          const itemsRes = await fetch(`http://localhost:3001/orderItems?orderId=${order.id}`);
          const itemsData = await itemsRes.json();
          items[order.id] = itemsData || [];
        }
        setOrderItems(items);
      } catch (err) {
        console.error("Error loading orders:", err);
      }
    };

    loadOrders();
  }, [user?.id]);

  const getStatusStyle = (status, paymentStatus) => {
    if (status === "completed") {
      return { ...styles.statusBadge, ...styles.statusPaid };
    } else if (paymentStatus === "paid") {
      return { ...styles.statusBadge, ...styles.statusPaid };
    } else if (status === "processing") {
      return { ...styles.statusBadge, ...styles.statusProcessing };
    } else {
      return { ...styles.statusBadge, ...styles.statusPending };
    }
  };

  const getStatusText = (status, paymentStatus) => {
    if (status === "completed") return "✓ Hoàn thành";
    if (paymentStatus === "paid") return "✓ Đã thanh toán";
    if (status === "processing") return "⏳ Đang xử lý";
    return "⏳ Chờ thanh toán";
  };

  if (!user?.id) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentWrapper}>
          <button onClick={() => navigate("/")} style={styles.backBtn}>
            <FiArrowLeft /> Quay lại
          </button>
          <div style={styles.emptyContainer}>
            <img
              src="/image/cart/avatar.png"
              alt="Đơn hàng"
              style={styles.emptyImg}
            />
            <p style={styles.emptyText}>
              Vui lòng đăng nhập để xem đơn hàng của bạn.
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "12px 24px",
                background: "#1b4d3e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          <FiArrowLeft /> Quay lại
        </button>

        <h1 style={styles.title}>📦 Đơn hàng của tôi</h1>

        {latestOrderNotification && (
          <div style={styles.successBanner}>
            <FiCheckCircle style={styles.successIcon} />
            <div>
              <p style={{ ...styles.successText, margin: "0 0 4px 0", fontWeight: 600 }}>
                {latestOrderNotification.message}
              </p>
              <p style={{ ...styles.successText, margin: 0 }}>
                Mã đơn hàng: #{latestOrderNotification.orderId}
              </p>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div style={styles.emptyContainer}>
            <img
              src="/image/cart/avatar.png"
              alt="Chưa có đơn hàng"
              style={styles.emptyImg}
            />
            <p style={styles.emptyText}>Chưa có đơn hàng nào</p>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "12px 24px",
                background: "#1b4d3e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div>
            {orders.map((order) => {
              const items = orderItems[order.id] || [];
              return (
                <div key={order.id} style={styles.orderCard}>
                  <div style={styles.orderHeader}>
                    <div>
                      <p style={styles.orderInfo}>
                        <span style={styles.orderInfoLabel}>Mã đơn: </span>
                        #{order.id}
                      </p>
                      <p style={styles.orderInfo}>
                        <span style={styles.orderInfoLabel}>Ngày đặt: </span>
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div style={getStatusStyle(order.status, order.paymentStatus)}>
                      {getStatusText(order.status, order.paymentStatus)}
                    </div>
                  </div>

                  {items.length > 0 && (
                    <div style={styles.orderProducts}>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "16px" }}>
                        Sản phẩm ({items.length})
                      </p>
                      {items.map((item, idx) => (
                        <div key={idx} style={styles.productItem}>
                          {item.img && (
                            <img
                              src={item.img}
                              alt={item.productName}
                              style={styles.productImg}
                            />
                          )}
                          <div style={styles.productInfo}>
                            <p style={styles.productName}>{item.productName}</p>
                            <p style={styles.productQty}>Số lượng: {item.quantity}</p>
                            <p style={styles.productPrice}>
                              {item.price.toLocaleString()}đ × {item.quantity} = {item.total.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={styles.orderFooter}>
                    <div style={styles.footerItem}>
                      <p style={styles.footerLabel}>Địa chỉ giao hàng</p>
                      <p style={styles.footerValue}>{order.address}</p>
                    </div>
                    <div style={styles.footerItem}>
                      <p style={styles.footerLabel}>Phương thức thanh toán</p>
                      <p style={styles.footerValue}>
                        {order.paymentMethod === "cod" ? "Thanh toán khi nhận hàng" :
                         order.paymentMethod === "card" ? "Thẻ tín dụng" :
                         order.paymentMethod === "momo" ? "MoMo" : order.paymentMethod}
                      </p>
                    </div>
                    <div style={{ ...styles.footerItem, gridColumn: "1 / -1" }}>
                      <p style={styles.footerLabel}>Tổng tiền</p>
                      <p style={styles.totalAmount}>
                        {order.totalAmount.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;