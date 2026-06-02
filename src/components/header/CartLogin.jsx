// src/components/hearder/CartLogin.jsx
import React from "react";
import useCartStore from "../../stores/cartStore";
import useAuthStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiBell } from "react-icons/fi";

function CartLogin({ onOpenCart }) {
  // Lấy thông tin user từ store
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Lấy danh sách sản phẩm trong giỏ để tính tổng số lượng
  const { cartItems } = useCartStore();
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleCartClick = () => {
    if (typeof onOpenCart === "function") onOpenCart();
    else navigate("/cart");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={styles.headerRight}>
      {/* 3 Icons tiện ích bên góc phải */}
      <div style={styles.iconGroup}>
        <div style={styles.iconWrapper} title="Thông báo">
          <FiBell size={20} />
          <span style={styles.badgeRed}>1</span>
        </div>
        
        <div style={styles.iconWrapper} title="Yêu thích">
          <FiHeart size={20} />
        </div>

        {/* ICON GIỎ HÀNG: Khi click chuột vào sẽ kích hoạt mở giỏ hàng */}
        <div style={{...styles.iconWrapper, cursor: "pointer"}} onClick={handleCartClick} title="Xem giỏ hàng">
          <FiShoppingCart size={20} />
          {totalItems > 0 && <span style={styles.badgeGreen}>{totalItems}</span>}
        </div>
      </div>

      {/* KHU VỰC ĐĂNG NHẬP (FIX LỖI): Nếu chưa đăng nhập hiện nút, nếu rồi hiện tên + avatar chuẩn UI */}
      <div style={styles.authSection}>
        {!user ? (
          <button onClick={handleLoginClick} style={styles.loginBtn}>
            Đăng nhập
          </button>
        ) : (
          <div style={styles.userInfo} title="Bấm để đăng xuất">
            <img src={user.avatar || "/image/cart/avatar.png"} alt="Avatar" style={styles.avatar} />
            <span style={styles.userName}>{user.name || user.fullName || user.email}</span>
            <button onClick={handleLogout} style={{ marginLeft: 10, background: "transparent", border: "none", color: "#ff4d4f", cursor: "pointer" }}>Đăng xuất</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  headerRight: { display: "flex", alignItems: "center", gap: "25px" },
  iconGroup: { display: "flex", alignItems: "center", gap: "18px" },
  iconWrapper: { position: "relative", color: "#555", display: "flex", alignItems: "center" },
  badgeRed: { position: "absolute", top: "-6px", right: "-6px", backgroundColor: "#ff4d4f", color: "#fff", fontSize: "10px", borderRadius: "50%", padding: "2px 5px", fontWeight: "bold" },
  badgeGreen: { position: "absolute", top: "-6px", right: "-6px", backgroundColor: "#2e7d32", color: "#fff", fontSize: "10px", borderRadius: "50%", padding: "2px 5px", fontWeight: "bold" },
  authSection: { display: "flex", alignItems: "center" },
  loginBtn: { padding: "6px 16px", backgroundColor: "#2e7d32", color: "#ffffff", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
  
  // Styles hiển thị thông tin người dùng sau khi đăng nhập thành công giống thiết kế
  userInfo: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" },
  avatar: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "1px solid #e0e0e0" },
  userName: { fontSize: "13px", color: "#333", fontWeight: "500" }
};

export default CartLogin;