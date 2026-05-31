import React from "react";
import useCartStore from "../../stores/cartStore"; // Đảm bảo đúng đường dẫn tới store của bạn
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft } from "react-icons/fi";

function CartItem() {
  const navigate = useNavigate();
  
  // Lấy dữ liệu và các hàm điều khiển từ cartStore
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  // Tính tổng số tiền của toàn bộ giỏ hàng
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.container}>
      {/* Nút quay lại mua sắm */}
      <button onClick={() => navigate("/")} style={styles.backBtn}>
        <FiArrowLeft /> Tiếp tục mua sắm
      </button>

      <h2 style={styles.title}>Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <div style={styles.emptyContainer}>
          <img 
            src="/image/cart/avatar.png" // Bạn có thể thay bằng ảnh giỏ hàng trống nếu có
            alt="Giỏ hàng trống" 
            style={styles.emptyImg} 
          />
          <p style={styles.emptyText}>Giỏ hàng của bạn đang trống rỗng!</p>
          <button onClick={() => navigate("/")} style={styles.shopNowBtn}>
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div style={styles.cartContent}>
          
          {/* DANH SÁCH SẢN PHẨM Ở BÊN TRÁI */}
          <div style={styles.listSection}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.cartRow}>
                {/* Ảnh sản phẩm */}
                <img src={item.img} alt={item.title} style={styles.itemImg} />
                
                {/* Thông tin tên và giá đơn lẻ */}
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemTitle}>{item.title}</h4>
                  <p style={styles.itemPrice}>{item.price.toLocaleString()}đ</p>
                </div>

                {/* Bộ nút tăng giảm số lượng */}
                <div style={styles.quantityControl}>
                  <button 
                    onClick={() => decreaseQuantity(item.id)} 
                    style={styles.actionBtn}
                    title="Giảm 1"
                  >
                    <FiMinus size={12} />
                  </button>
                  <span style={styles.qtyText}>{item.quantity || 1}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)} 
                    style={styles.actionBtn}
                    title="Thêm 1"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>

                {/* Tính tổng tiền của riêng sản phẩm đó */}
                <div style={styles.itemSubtotal}>
                  {((item.price) * (item.quantity || 1)).toLocaleString()}đ
                </div>

                {/* Nút xóa hẳn sản phẩm */}
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={styles.deleteBtn}
                  title="Xóa khỏi giỏ hàng"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* BẢNG TỔNG KẾT TIỀN HOÁ ĐƠN Ở BÊN PHẢI */}
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Tóm tắt đơn hàng</h3>
            <div style={styles.summaryRow}>
              <span>Tạm tính:</span>
              <span>{totalAmount.toLocaleString()}đ</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Phí vận chuyển:</span>
              <span style={{ color: "#2e7d32", fontWeight: "bold" }}>Miễn phí</span>
            </div>
            <hr style={styles.hr} />
            <div style={styles.totalRow}>
              <span>Tổng cộng:</span>
              <span style={styles.totalPrice}>{totalAmount.toLocaleString()}đ</span>
            </div>
            <button onClick={() => navigate("/checkout")} style={styles.checkoutBtn}>
              Tiến hành thanh toán
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

// ================= HỆ THỐNG STYLES HIỆN ĐẠI CHO TRANG GIỎ HÀNG =================
const styles = {
  container: { padding: "30px 40px", fontFamily: "Arial, sans-serif", backgroundColor: "#fafafa", minHeight: "80vh" },
  backBtn: { display: "flex", alignItems: "center", gap: "6px", backgroundColor: "transparent", border: "none", color: "#2e7d32", cursor: "pointer", fontSize: "14px", fontWeight: "650", marginBottom: "15px" },
  title: { fontSize: "24px", color: "#222", marginBottom: "25px", fontWeight: "bold" },
  
  cartContent: { display: "flex", gap: "30px", alignItems: "flex-start" },
  listSection: { flex: "2", display: "flex", flexDirection: "column", gap: "15px" },
  
  cartRow: { display: "flex", alignItems: "center", padding: "15px", backgroundColor: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" },
  itemImg: { width: "65px", height: "65px", objectFit: "contain", marginRight: "15px" },
  itemInfo: { flex: "1.5" },
  itemTitle: { fontSize: "15px", fontWeight: "600", color: "#333", margin: "0 0 5px 0" },
  itemPrice: { fontSize: "14px", color: "#8c8c8c", margin: "0" },
  
  quantityControl: { display: "flex", alignItems: "center", gap: "10px", border: "1px solid #e8e8e8", borderRadius: "20px", padding: "4px 10px", backgroundColor: "#f9f9f9" },
  actionBtn: { border: "none", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", color: "#555" },
  qtyText: { fontSize: "14px", fontWeight: "bold", color: "#333", minWidth: "16px", textAlign: "center" },
  
  itemSubtotal: { flex: "1", textAlign: "right", fontSize: "16px", fontWeight: "bold", color: "#2e7d32", paddingRight: "20px" },
  deleteBtn: { backgroundColor: "transparent", border: "none", color: "#ff4d4f", cursor: "pointer", transition: "color 0.2s" },

  summaryCard: { flex: "1", backgroundColor: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #f0f0f0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" },
  summaryTitle: { fontSize: "18px", fontWeight: "bold", color: "#222", marginBottom: "18px" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "12px" },
  hr: { border: "0", borderTop: "1px solid #f0f0f0", margin: "15px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  totalPrice: { fontSize: "20px", fontWeight: "bold", color: "#ff4d4f" },
  checkoutBtn: { width: "100%", padding: "12px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "25px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" },

  emptyContainer: { textAlign: "center", padding: "5px 0" },
  emptyImg: { width: "120px", height: "120px", opacity: "0.5", marginBottom: "15px" },
  emptyText: { color: "#8c8c8c", fontSize: "16px", marginBottom: "20px" },
  shopNowBtn: { padding: "10px 25px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }
};

export default CartItem;