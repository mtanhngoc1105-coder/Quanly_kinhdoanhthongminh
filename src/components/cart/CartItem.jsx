import React, { useState, useMemo } from "react";
import useCartStore from "../../stores/cartStore"; // Đảm bảo đúng đường dẫn tới store của bạn
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft, FiHeart, FiShoppingCart } from "react-icons/fi";
import { allProducts } from "../../constants/productsData";

function CartItem() {
  const navigate = useNavigate();
  
  // Lấy dữ liệu và các hàm điều khiển từ cartStore
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, toggleWishlist, addToCart } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const FREE_SHIPPING_THRESHOLD = 500000; // demo

  // Tính tổng số tiền của toàn bộ giỏ hàng
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        {/* Nút quay lại mua sắm */}
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          <FiArrowLeft /> Tiếp tục mua sắm
        </button>

        <h2 style={styles.title}>🛒 Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h2>

        {cartItems.length === 0 ? (
          <div style={styles.emptyContainer}>
            <img 
              src="/image/cart/avatar.png"
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
            <div style={styles.selectAllRow}>
              <label><input type="checkbox" /> Chọn tất cả</label>
            </div>
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
                <button title="Lưu để mua sau" style={styles.saveBtn} onClick={() => { toggleWishlist(item); removeFromCart(item.id); }}>
                  <FiHeart size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* BẢNG TỔNG KẾT TIỀN HOÁ ĐƠN Ở BÊN PHẢI */}
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Tóm tắt đơn hàng</h3>

            {/* Coupon */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Mã giảm giá</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Nhập mã (SMART10)" style={styles.couponInput} />
                <button onClick={() => {
                  if (coupon.trim().toUpperCase() === 'SMART10') { setAppliedCoupon({ code: 'SMART10', type: 'percent', value: 10 }); } else { setAppliedCoupon({ code: coupon, type: 'none' }); }
                }} style={styles.applyBtn}>Áp dụng</button>
              </div>
              {appliedCoupon && appliedCoupon.type === 'percent' && <div style={{ color: '#10b981', marginTop: 8 }}>✓ Giảm {appliedCoupon.value}%</div>}
            </div>

            {/* Free shipping progress */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Miễn phí vận chuyển</div>
              <div style={styles.progressBarWrap}>
                <div style={{ ...styles.progressBar, width: `${Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
              </div>
              {totalAmount >= FREE_SHIPPING_THRESHOLD ? <div style={{ color: '#10b981' }}>Bạn đã đủ điều kiện miễn phí vận chuyển</div> : <div>Bạn còn thiếu <strong>{(FREE_SHIPPING_THRESHOLD - totalAmount).toLocaleString()}đ</strong> để được miễn phí</div>}
            </div>

            {/* Nutrition summary & Health score (demo) */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Tổng dinh dưỡng (ước tính)</div>
              <div style={styles.nutriRow}><span>Calories</span><strong>{Math.round(totalAmount/10)} kcal</strong></div>
              <div style={styles.nutriRow}><span>Protein</span><strong>{Math.round(totalAmount/30)} g</strong></div>
              <div style={styles.nutriRow}><span>Carb</span><strong>{Math.round(totalAmount/20)} g</strong></div>
              <div style={{ marginTop: 8 }}>Điểm sức khỏe giỏ hàng: <strong>75/100</strong></div>
            </div>

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
              <span style={styles.totalPrice}>{(appliedCoupon && appliedCoupon.type === 'percent') ? Math.round(totalAmount * (1 - appliedCoupon.value/100)).toLocaleString() + 'đ' : totalAmount.toLocaleString() + 'đ'}</span>
            </div>
            <button onClick={() => navigate("/checkout")} style={styles.checkoutBtn}>
              Thanh toán ngay
            </button>

            {/* AI Combo suggestions */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>AI Gợi ý mua thêm</div>
              {allProducts.slice(0,3).map(p => (
                <div key={p.id} style={styles.suggestionRow}>
                  <div>{p.title}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => addToCart(p)} style={styles.smallBtn}>+ Thêm</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Sticky checkout bar */}
      {cartItems.length > 0 && (
        <div style={styles.stickyBar}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <FiShoppingCart />
            <div>{cartItems.length} sản phẩm</div>
            <div style={{ fontWeight: 700 }}>{totalAmount.toLocaleString()}đ</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/')} style={styles.stickySecondary}>Tiếp tục mua</button>
            <button onClick={() => navigate('/checkout')} style={styles.stickyPrimary}>THANH TOÁN</button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= HỆ THỐNG STYLES HIỆN ĐẠI CHO TRANG GIỎ HÀNG =================
const styles = {
  pageWrapper: { backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "24px", display: "flex", justifyContent: "center", fontFamily: "system-ui, sans-serif" },
  contentWrapper: { width: "100%", maxWidth: "1400px" },
  container: { padding: "30px 40px", fontFamily: "Arial, sans-serif", backgroundColor: "#fafafa", minHeight: "80vh" },
  backBtn: { display: "flex", alignItems: "center", gap: "6px", backgroundColor: "transparent", border: "none", color: "#2e7d32", cursor: "pointer", fontSize: "14px", fontWeight: "650", marginBottom: "15px" },
  title: { fontSize: "24px", color: "#222", marginBottom: "25px", fontWeight: "bold" },
  
  cartContent: { display: "flex", gap: "32px", alignItems: "flex-start" },
  listSection: { flex: "2.5", display: "flex", flexDirection: "column", gap: "16px" },
  
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
  saveBtn: { backgroundColor: 'transparent', border: 'none', color: '#ff6b81', cursor: 'pointer' },

  summaryCard: { flex: "1.2", backgroundColor: "#fff", padding: "24px", borderRadius: "14px", border: "1px solid #f0f0f0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", position: "sticky", top: 100 },
  summaryTitle: { fontSize: "18px", fontWeight: "bold", color: "#222", marginBottom: "18px" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "12px" },
  hr: { border: "0", borderTop: "1px solid #f0f0f0", margin: "15px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  totalPrice: { fontSize: "20px", fontWeight: "bold", color: "#ff4d4f" },
  checkoutBtn: { width: "100%", padding: "12px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "25px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" },

  selectAllRow: { padding: '12px 16px', fontSize: 14, color: '#374151', background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0' },
  couponInput: { flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #e6eef6' },
  applyBtn: { padding: '8px 12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' },
  progressBarWrap: { width: '100%', height: 10, background: '#f1f5f9', borderRadius: 8, overflow: 'hidden' },
  progressBar: { height: '100%', background: '#10b981', transition: 'width 0.3s' },
  nutriRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 },
  suggestionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #f3f4f6' },
  smallBtn: { padding: '6px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' },
  stickyBar: { position: 'fixed', left: 24, right: 24, bottom: 20, background: '#fff', padding: '12px 18px', borderRadius: 12, boxShadow: '0 12px 40px rgba(2,6,23,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2000 },
  stickyPrimary: { padding: '10px 16px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: 8, fontWeight: 800, cursor: 'pointer' },
  stickySecondary: { padding: '10px 16px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, cursor: 'pointer' },

  emptyContainer: { textAlign: "center", padding: "5px 0" },
  emptyImg: { width: "120px", height: "120px", opacity: "0.5", marginBottom: "15px" },
  emptyText: { color: "#8c8c8c", fontSize: "16px", marginBottom: "20px" },
  shopNowBtn: { padding: "10px 25px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }
};

export default CartItem;