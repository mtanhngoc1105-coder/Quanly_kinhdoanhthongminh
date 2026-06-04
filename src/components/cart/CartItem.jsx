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

  // Dynamic styles based on state
  const dynamicPageWrapperStyle = {
    ...styles.pageWrapper,
    paddingBottom: cartItems.length > 0 ? "120px" : "0"
  };

  return (
    <div style={dynamicPageWrapperStyle} className="h-screen overflow-y-auto">
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
  pageWrapper: { 
    backgroundColor: "#f5f7fa", 
    minHeight: "100vh",
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    display: "block",
    fontFamily: "system-ui, -apple-system, sans-serif",
    overflow: "hidden",
    overflowY: "auto"
  },
  contentWrapper: { 
    width: "100%",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "16px",
    paddingBottom: "16px"
  },
  container: { padding: "30px 40px", fontFamily: "Arial, sans-serif", backgroundColor: "#fafafa", minHeight: "80vh" },
  backBtn: { 
    display: "flex", 
    alignItems: "center", 
    gap: "8px", 
    backgroundColor: "#fff", 
    border: "1px solid #e5e7eb",
    color: "#10b981", 
    cursor: "pointer", 
    fontSize: "14px", 
    fontWeight: "600", 
    marginBottom: "20px",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.2s"
  },
  title: { 
    fontSize: "28px", 
    color: "#111", 
    marginBottom: "20px", 
    fontWeight: "700",
    paddingLeft: "4px"
  },
  
  cartContent: { 
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "24px",
    alignItems: "flex-start"
  },
  listSection: { 
    flex: "2.5", 
    display: "flex", 
    flexDirection: "column", 
    gap: "12px" 
  },
  
  cartRow: { 
    display: "grid",
    gridTemplateColumns: "80px 1fr 120px 100px 100px 40px",
    alignItems: "center", 
    gap: "16px",
    padding: "16px", 
    backgroundColor: "#fff", 
    borderRadius: "12px", 
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    transition: "all 0.2s hover:box-shadow 0 4px 12px rgba(0,0,0,0.1)"
  },
  itemImg: { 
    width: "80px", 
    height: "80px", 
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#f9fafb"
  },
  itemInfo: { 
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  itemTitle: { 
    fontSize: "14px", 
    fontWeight: "600", 
    color: "#1f2937", 
    margin: "0",
    lineHeight: "1.4"
  },
  itemPrice: { 
    fontSize: "13px", 
    color: "#6b7280", 
    margin: "0" 
  },
  
  quantityControl: { 
    display: "flex", 
    alignItems: "center", 
    gap: "8px", 
    border: "1px solid #e5e7eb", 
    borderRadius: "8px", 
    padding: "6px 8px", 
    backgroundColor: "#f9fafb",
    justifyContent: "center"
  },
  actionBtn: { 
    border: "none", 
    backgroundColor: "transparent", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center",
    color: "#6b7280",
    padding: "4px",
    transition: "color 0.2s"
  },
  qtyText: { 
    fontSize: "13px", 
    fontWeight: "600", 
    color: "#1f2937", 
    minWidth: "20px", 
    textAlign: "center" 
  },
  
  itemSubtotal: { 
    textAlign: "center", 
    fontSize: "14px", 
    fontWeight: "700", 
    color: "#10b981"
  },
  deleteBtn: { 
    backgroundColor: "transparent", 
    border: "none", 
    color: "#ef4444", 
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s"
  },
  saveBtn: { 
    backgroundColor: 'transparent', 
    border: 'none', 
    color: '#f43f5e', 
    cursor: 'pointer',
    padding: "8px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s"
  },

  summaryCard: { 
    backgroundColor: "#fff", 
    padding: "24px", 
    borderRadius: "12px", 
    border: "1px solid #e5e7eb", 
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    position: "sticky", 
    top: 20 
  },
  summaryTitle: { 
    fontSize: "16px", 
    fontWeight: "700", 
    color: "#111", 
    marginBottom: "16px" 
  },
  summaryRow: { 
    display: "flex", 
    justifyContent: "space-between", 
    fontSize: "13px", 
    color: "#6b7280", 
    marginBottom: "10px" 
  },
  hr: { 
    border: "0", 
    borderTop: "1px solid #e5e7eb", 
    margin: "12px 0" 
  },
  totalRow: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "16px" 
  },
  totalPrice: { 
    fontSize: "18px", 
    fontWeight: "700", 
    color: "#ef4444" 
  },
  checkoutBtn: { 
    width: "100%", 
    padding: "14px", 
    backgroundColor: "#10b981", 
    color: "#fff", 
    border: "none", 
    borderRadius: "8px", 
    fontWeight: "700", 
    fontSize: "14px", 
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "12px"
  },

  selectAllRow: { 
    padding: '12px 16px', 
    fontSize: 13, 
    color: '#374151', 
    background: '#fff', 
    borderRadius: 8, 
    border: '1px solid #e5e7eb',
    fontWeight: "500"
  },
  couponInput: { 
    flex: 1, 
    padding: '8px 12px', 
    borderRadius: 6, 
    border: '1px solid #e5e7eb',
    fontSize: '13px'
  },
  applyBtn: { 
    padding: '8px 12px', 
    background: '#10b981', 
    color: 'white', 
    border: 'none', 
    borderRadius: 6, 
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px'
  },
  progressBarWrap: { 
    width: '100%', 
    height: 8, 
    background: '#e5e7eb', 
    borderRadius: 6, 
    overflow: 'hidden',
    marginBottom: "8px"
  },
  progressBar: { 
    height: '100%', 
    background: '#10b981', 
    transition: 'width 0.3s' 
  },
  nutriRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: 12, 
    marginTop: 6,
    color: '#6b7280'
  },
  suggestionRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '10px 0', 
    borderTop: '1px solid #f3f4f6',
    fontSize: '13px'
  },
  smallBtn: { 
    padding: '6px 10px', 
    background: '#10b981', 
    color: 'white', 
    border: 'none', 
    borderRadius: 6, 
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '12px'
  },
  stickyBar: { 
    position: 'fixed', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: '#fff', 
    padding: '16px 20px', 
    borderTop: '1px solid #e5e7eb',
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    zIndex: 2000,
    boxShadow: '0 -4px 12px rgba(0,0,0,0.08)'
  },
  stickyPrimary: { 
    padding: '12px 24px', 
    background: '#ef4444', 
    color: 'white', 
    border: 'none', 
    borderRadius: 6, 
    fontWeight: '700', 
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  stickySecondary: { 
    padding: '12px 24px', 
    background: '#f3f4f6', 
    color: '#374151', 
    border: 'none', 
    borderRadius: 6, 
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s'
  },

  emptyContainer: { 
    textAlign: "center", 
    padding: "60px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb"
  },
  emptyImg: { 
    width: "140px", 
    height: "140px", 
    opacity: "0.6", 
    marginBottom: "20px" 
  },
  emptyText: { 
    color: "#6b7280", 
    fontSize: "16px", 
    marginBottom: "24px",
    fontWeight: "500"
  },
  shopNowBtn: { 
    padding: "12px 32px", 
    backgroundColor: "#10b981", 
    color: "#fff", 
    border: "none", 
    borderRadius: "8px", 
    cursor: "pointer", 
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.2s"
  }
};

export default CartItem;