import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import useAuthStore from "../../stores/authStore";
import { categories, allProducts } from "../../constants/productsData"; 
import { 
  FiPlus, FiMinus, FiTrash2, FiX, FiShoppingCart, FiHome, FiGrid,
  FiTruck, FiCreditCard, FiCheckCircle, FiClock, FiMapPin, FiUser, FiPhone, FiSearch, FiBell, FiHeart, FiLogOut, FiSmartphone
} from "react-icons/fi";

function CartPage() {
  const { 
    cartItems, 
    addToCart, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    clearCart 
  } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(true); 
  const [activeTab, setActiveTab] = useState("shop"); 
  const [searchQuery, setSearchQuery] = useState(""); 

  // ĐÓNG/MỞ DROPDOWN
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // FAVORITE
  const [favoriteIds, setFavoriteIds] = useState([1, 3, 5]); 

  const toggleFavorite = (product) => {
    if (favoriteIds.includes(product.id)) {
      setFavoriteIds(prev => prev.filter(id => id !== product.id));
      triggerToast(`Đã xóa "${product.title}" khỏi danh sách yêu thích`, "info");
      addSystemNotification(`💔 Bạn đã bỏ yêu thích sản phẩm "${product.title}".`);
    } else {
      setFavoriteIds(prev => [...prev, product.id]);
      triggerToast(`Đã thêm "${product.title}" vào yêu thích!`, "success");
      addSystemNotification(`❤️ Bạn đã thêm sản phẩm "${product.title}" vào danh sách yêu thích.`);
    }
  };

  const favoriteProducts = allProducts.filter(p => favoriteIds.includes(p.id));

  // NOTIFICATION
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Chào mừng bạn đến với hệ thống SmartFood!", time: "Vừa xong", isRead: false },
    { id: 2, text: "Giảm giá 10% cho đơn hàng rau xanh đầu tiên nhập mã GreenFood.", time: "10 phút trước", isRead: false },
    { id: 3, text: "Đơn hàng DH9482 đã giao thành công.", time: "1 giờ trước", isRead: true }
  ]);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const notiRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setIsNotiOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addSystemNotification = (text) => {
    const newNoti = { id: Date.now(), text, time: "Vừa xong", isRead: false };
    setNotifications(prev => [newNoti, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // TOAST
  const [toastNotis, setToastNotis] = useState([]);
  const triggerToast = (message, type = "success") => {
    const id = Date.now();
    setToastNotis((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToastNotis((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // CHECKOUT
  const [paymentMethod, setPaymentMethod] = useState("cod"); 
  const [isOrderSuccess, setIsOrderSuccess] = useState(false); 
  const [shippingAddress, setShippingAddress] = useState({ name: "", phone: "", detail: "" });
  const [formError, setFormError] = useState("");

  const [orderHistory, setOrderHistory] = useState([
    {
      id: "DH9482",
      date: "26/05/2026",
      itemsCount: 2,
      total: 125000,
      payment: "Thanh toán khi nhận hàng",
      address: "Nguyễn Văn A - 0912345678 - 123 Lê Lợi, Quận 1, TP. HCM",
      status: "Đã giao thành công"
    }
  ]);

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalAmount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handleAddToCart = (product) => {
    addToCart({ id: product.id, title: product.title, price: product.price, img: product.img });
    triggerToast(`Đã thêm "${product.title}" vào giỏ hàng!`, "success");
    addSystemNotification(`Bạn đã thêm sản phẩm "${product.title}" vào giỏ hàng.`);
  };

  const handleRemoveFromCart = (id, title) => {
    removeFromCart(id);
    triggerToast(`Đã xóa "${title}" khỏi giỏ hàng.`, "info");
    addSystemNotification(`Đã xóa sản phẩm "${title}" khỏi giỏ hàng.`);
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "cod": return "Thanh toán khi nhận hàng";
      case "wallet": return "Thanh toán trực tiếp qua ví điện tử";
      case "bank": return "Thanh toán bằng ngân hàng";
      default: return "Chưa xác định";
    }
  };

  const handleSwitchAccount = () => {
    triggerToast("Đang kết nối để chuyển sang tài khoản khác...", "info");
    setIsUserMenuOpen(false);
    if (logout) logout();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (!shippingAddress.name.trim() || !shippingAddress.phone.trim() || !shippingAddress.detail.trim()) {
      setFormError("Vui lòng điền đầy đủ thông tin và địa chỉ nhận hàng!");
      triggerToast("Đặt hàng thất bại. Vui lòng kiểm tra lại thông tin!", "error");
      return;
    }
    setFormError("");
    setIsOrderSuccess(true);
    triggerToast("Đặt đơn hàng thành công!", "success");

    const randomOrderId = `DH${Math.floor(1000 + Math.random() * 9000)}`;
    addSystemNotification(`🎉 Đơn hàng ${randomOrderId} của bạn đã được khởi tạo thành công.`);

    const newOrder = {
      id: randomOrderId,
      date: new Date().toLocaleDateString("vi-VN"),
      itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      total: totalAmount,
      payment: getPaymentMethodText(paymentMethod),
      address: `${shippingAddress.name} - ${shippingAddress.phone} - ${shippingAddress.detail}`,
      status: "Chờ xác nhận hệ thống"
    };

    setOrderHistory([newOrder, ...orderHistory]);

    setTimeout(() => {
      setOrderHistory(prev => prev.map(o => o.id === randomOrderId ? { ...o, status: "Đã giao thành công" } : o));
      addSystemNotification(`🚚 Đơn hàng ${randomOrderId} đã được giao thành công! Cảm ơn bạn.`);
    }, 6000);

    setTimeout(() => {
      setIsOrderSuccess(false);
      setIsCartOpen(false);
      setShippingAddress({ name: "", phone: "", detail: "" });
      if (clearCart) clearCart(); 
    }, 3500);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.appLayout}>
      
      {/* TOAST NOTIFICATIONS */}
      <div style={styles.toastContainer}>
        {toastNotis.map((t) => (
          <div key={t.id} style={{...styles.toastItem, ...(t.type === "success" ? styles.toastSuccess : t.type === "error" ? styles.toastError : styles.toastInfo)}}>
            <span style={{ fontSize: "13px" }}>{t.message}</span>
          </div>
        ))}
      </div>

      {/* BÊN TRÁI: SIDEBAR MENU */}
      <div style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>🌱</span>
          <div>
            <h1 style={styles.brandName}>SmartFood</h1>
            <p style={styles.brandSub}>Fresh & Healthy</p>
          </div>
        </div>

        <div style={styles.menuList}>
          <div 
            style={{...styles.menuItem, ...(activeTab === "shop" && selectedCategory === null ? styles.menuActive : {})}} 
            onClick={() => { setActiveTab("shop"); setSelectedCategory(null); setSearchQuery(""); }}
          >
            <FiHome size={18} /> <span>Danh mục sản phẩm</span>
          </div>

          <div 
            style={{...styles.menuItem, ...(activeTab === "favorite" ? styles.menuActive : {})}} 
            onClick={() => setActiveTab("favorite")}
          >
            <FiHeart size={18} color={activeTab === "favorite" ? "#e53935" : "#555"} /> 
            <span>Thực phẩm yêu thích ({favoriteIds.length})</span>
          </div>

          <div 
            style={{...styles.menuItem, ...(activeTab === "history" ? styles.menuActive : {})}} 
            onClick={() => setActiveTab("history")}
          >
            <FiClock size={18} /> <span>Lịch sử bán hàng</span>
          </div>

          {activeTab === "shop" && (
            <>
              <div style={styles.menuDividerTitle}>Danh mục sản phẩm</div>
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  style={{...styles.menuItem, ...(selectedCategory === cat.id ? styles.menuActive : {})}}
                  onClick={() => { setSelectedCategory(cat.id); }}
                >
                  <FiGrid size={16} /> <span>{cat.title}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div style={styles.aiBriefCard}>
          <p style={styles.aiBriefText}>SmartFood luôn đồng hành cùng bữa ăn sạch của bạn.</p>
        </div>
      </div>

      {/* Ở GIỮA: NỘI DUNG CHÍNH */}
      <div style={styles.mainContent}>
        <div style={styles.fakeHeader}>
          <div style={styles.searchBarWrapper}>
            <FiSearch size={16} color="#888" style={{ marginRight: "8px" }} />
            <input 
              type="text" 
              placeholder="Tìm kiếm rau, củ, quả sạch..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              style={styles.searchInput} 
            />
            {searchQuery && (
              <FiX size={16} color="#888" style={{ cursor: "pointer" }} onClick={() => setSearchQuery("")} />
            )}
          </div>

          <div style={styles.headerRight}>
            <div style={styles.notiIconWrapper} ref={notiRef}>
              <button style={styles.iconBtn} title="Thông báo" onClick={() => setIsNotiOpen(!isNotiOpen)}>
                <FiBell size={20} />
                {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
              </button>

              {/* DROPDOWN CHUÔNG THÔNG BÁO */}
              {isNotiOpen && (
                <div style={styles.notiDropdown}>
                  <div style={styles.notiHeader}>
                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>Thông báo mới nhận</span>
                    {unreadCount > 0 && (
                      <button style={styles.markReadBtn} onClick={markAllAsRead}>Đọc tất cả</button>
                    )}
                  </div>
                  <div style={styles.notiBodyList}>
                    {notifications.length === 0 ? (
                      <p style={styles.emptyNotiText}>Không có thông báo nào.</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} style={{...styles.notiItemCard, ...(n.isRead ? {} : styles.notiUnreadBg)}}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <p style={{...styles.notiItemText, ...(n.isRead ? {} : {fontWeight: "500", color: "#111"})}}>{n.text}</p>
                            {!n.isRead && <span style={styles.unreadDot}></span>}
                          </div>
                          <span style={styles.notiItemTime}>{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button style={styles.iconBtn} title="Yêu thích" onClick={() => setActiveTab("favorite")}>
              <FiHeart size={20} color={favoriteIds.length > 0 ? "#e53935" : "#444"} fill={favoriteIds.length > 0 ? "#e53935" : "transparent"} />
              {favoriteIds.length > 0 && <span style={styles.badge}>{favoriteIds.length}</span>}
            </button>

            <button style={styles.iconBtn} title="Giỏ hàng" onClick={() => setIsCartOpen(true)}>
              <FiShoppingCart size={20} />
              <span style={styles.badge}>{cartItems.length}</span>
            </button>

            {/* KHU VỰC AVATAR & DROPDOWN - ĐÃ SỬA: CHỈ HIỆN KHI CÓ USER */}
            {user ? (
              <div style={{ position: "relative" }} ref={menuRef}>
                <div 
                  style={styles.userBadge} 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-badge-hover"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" style={styles.userAvatarImg} />
                  ) : (
                    <div style={styles.userAvatarPlaceholder}><FiUser size={16} /></div>
                  )}
                  <span style={styles.username}>{user.name || user.fullName}</span>
                </div>

                {isUserMenuOpen && (
                  <div style={styles.userDropdown}>
                    <div style={styles.dropdownHeader}>
                      <h4 style={styles.profileName}>{user.name || user.fullName}</h4>
                      <p style={styles.profileRole}>Khách hàng thành viên</p>
                    </div>
                    
                    <div style={styles.dropdownDivider} />
                    
                    <div style={styles.dropdownBody}>
                      <button 
                        style={styles.dropdownItem} 
                        className="dropdown-item-hover"
                        onClick={() => { 
                          setIsUserMenuOpen(false);
                          navigate("/profile");
                        }}
                      >
                        <FiUser size={15} style={{ marginRight: "10px", color: "#217421" }} />
                        <span>Hồ sơ của bạn</span>
                      </button>

                      <button style={styles.dropdownItem} className="dropdown-item-hover" onClick={handleSwitchAccount}>
                        <FiLogOut size={15} style={{ marginRight: "10px", color: "#1976d2" }} />
                        <span style={{ color: "#1976d2", fontWeight: "500" }}>Chuyển sang tài khoản khác</span>
                      </button>
                    </div>
                    
                    <div style={styles.dropdownDivider} />
                    
                    <div style={styles.dropdownFooter}>
                      <button 
                        style={{ ...styles.dropdownItem, color: "#d32f2f" }} 
                        className="dropdown-item-hover" 
                        onClick={() => { 
                          setIsUserMenuOpen(false); 
                          if (logout) logout(); 
                        }}
                      >
                        <FiLogOut size={15} style={{ marginRight: "10px" }} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* NẾU CHƯA ĐĂNG NHẬP HOẶC ĐÃ ĐĂNG XUẤT: HIỂN THỊ NÚT NÀY */
              <button 
                style={styles.loginSubmitBtn}
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            )}

          </div>
        </div>

        {/* HIỂN THỊ THEO TAB HOẠT ĐỘNG */}
        {activeTab === "shop" ? (
          <>
            {!searchQuery && (
              <>
                <h2 style={styles.title}>Danh mục nổi bật</h2>
                <div style={styles.categoryScroll} className="category-scroll">
                  {categories.map((category) => (
                    <div key={category.id} style={styles.categoryCard} onClick={() => setSelectedCategory(category.id)}>
                      <div style={styles.categoryImageLarge}><img src={category.img} alt={category.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} /></div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#222" }}>{category.title}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h2 style={styles.title}>
              {searchQuery ? `Kết quả tìm kiếm cho: "${searchQuery}"` : "Sản phẩm gợi ý cho bạn"}
            </h2>

            <div style={styles.productGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isFav = favoriteIds.includes(product.id);
                  const discountText = product.discount || (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) + "%" : null);
                  return (
                    <div key={product.id} style={styles.productCard}>
                      {discountText && <div style={styles.productDiscountBadge}>{discountText}</div>}
                      <button onClick={() => toggleFavorite(product)} style={styles.favHeartButton} title="Yêu thích">
                        <FiHeart size={16} color={isFav ? "#e53935" : "#ccc"} fill={isFav ? "#e53935" : "transparent"} />
                      </button>

                      <div style={styles.productImageWrapper}><img src={product.img} alt={product.title} style={styles.image} /></div>
                      <h4 style={styles.productTitle}>{product.title}</h4>
                      <div style={styles.priceRow}>
                        <span style={styles.currentPrice}>{product.price.toLocaleString()}đ</span>
                        {product.oldPrice && <span style={styles.oldPrice}>{product.oldPrice.toLocaleString()}đ</span>}
                      </div>

                      <div style={styles.productRating}>★ {product.rating ? product.rating.toFixed(1) : "—"}</div>

                      <button onClick={() => handleAddToCart(product)} style={styles.circleCartButton}>
                        <FiShoppingCart size={14} color="#16ae23" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div style={styles.noResultCard}>
                  ❌ Không tìm thấy sản phẩm rau củ quả nào phù hợp với từ khóa của bạn!
                </div>
              )}
            </div>
          </>
        ) : activeTab === "favorite" ? (
          <div>
            <h2 style={styles.title}>❤️ Thực phẩm bạn đã yêu thích ({favoriteProducts.length})</h2>
            <div style={styles.productGrid}>
              {favoriteProducts.length > 0 ? (
                favoriteProducts.map((product) => (
                  <div key={product.id} style={styles.productCard}>
                    <button onClick={() => toggleFavorite(product)} style={styles.favHeartButton} title="Bỏ yêu thích">
                      <FiHeart size={16} color="#e53935" fill="#e53935" />
                    </button>
                    <div style={styles.productImageWrapper}><img src={product.img} alt={product.title} style={styles.image} /></div>
                    <h4 style={styles.productTitle}>{product.title}</h4>
                    <span style={styles.currentPrice}>{product.price.toLocaleString()}đ</span>
                    <button onClick={() => handleAddToCart(product)} style={styles.circleCartButton}>
                      <FiShoppingCart size={14} color="#2e7d32" />
                    </button>
                  </div>
                ))
              ) : (
                <div style={styles.noResultCard}>
                  Bạn chưa có sản phẩm yêu thích nào. Hãy nhấn biểu tượng ❤️ ở các sản phẩm ngoài trang chủ nhé!
                </div>
              )}
            </div>
          </div>
        ) : (
          /* BẢNG LỊCH SỬ BÁN HÀNG */
          <div style={styles.historyContainer}>
            <h2 style={styles.title}>Nhật ký đơn hàng / Lịch sử bán hàng</h2>
            <div style={styles.tableCard}>
              <table style={styles.historyTable}>
                <thead>
                  <tr style={styles.tableHeadRow}>
                    <th style={styles.tableTh}>Mã Đơn</th>
                    <th style={styles.tableTh}>Ngày Mua</th>
                    <th style={styles.tableTh}>Thông Tin & Địa Chỉ Giao Nhận</th>
                    <th style={styles.tableTh}>Thanh Toán</th>
                    <th style={styles.tableTh}>Tổng Tiền</th>
                    <th style={styles.tableTh}>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order, index) => (
                    <tr key={index} style={styles.tableBodyRow}>
                      <td style={{ ...styles.tableTd, fontWeight: "bold", color: "#1565c0" }}>{order.id}</td>
                      <td style={styles.tableTd}>{order.date}</td>
                      <td style={{ ...styles.tableTd, fontSize: "12px", maxWidth: "260px", lineHeight: "1.4" }}>
                        <span style={{ fontWeight: "500", color: "#333" }}>{order.address}</span>
                      </td>
                      <td style={styles.tableTd}><span style={styles.badgePayment}>{order.payment}</span></td>
                      <td style={{ ...styles.tableTd, fontWeight: "bold", color: "#d32f2f" }}>{order.total.toLocaleString()}đ</td>
                      <td style={styles.tableTd}>
                        <span style={{
                          ...styles.badgeStatus,
                          backgroundColor: order.status.includes("thành công") ? "#e8f5e9" : "#fff3e0",
                          color: order.status.includes("thành công") ? "#2e7d32" : "#ef6c00"
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
        )}
      </div>

      {/* BÊN PHẢI: GIỎ HÀNG POP-UP */}
      {isCartOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Giỏ hàng chi tiết ({cartItems.length} món)</h3>
              <button onClick={() => setIsCartOpen(false)} style={styles.closeBtn}><FiX size={22} /></button>
            </div>

            {isOrderSuccess ? (
              <div style={styles.successWrapper}>
                <FiCheckCircle size={60} color="#2e7d32" />
                <h4 style={{ marginTop: "15px" }}>Đặt hàng thành công!</h4>
                <p style={{ fontSize: "13px", color: "#555", marginTop: "8px", padding: "0 15px" }}>
                  Đơn hàng của bạn đã được gửi hệ thống thành công. Bạn có thể kiểm tra ở tab Lịch sử bán hàng.
                </p>
              </div>
            ) : (
              <>
                <div style={styles.modalBody}>
                  {cartItems.length === 0 ? (
                    <p style={styles.emptyCartText}>Giỏ hàng đang trống.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} style={styles.cartItemRow}>
                        <img src={item.img} alt={item.title} style={styles.cartItemImg} />
                        <div style={styles.cartItemInfo}>
                          <h5>{item.title}</h5>
                          <p>{item.price.toLocaleString()}đ</p>
                        </div>
                        <div style={styles.qtyGroup}>
                          <button onClick={() => decreaseQuantity(item.id)} style={styles.qtyBtn}><FiMinus size={10} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => { increaseQuantity(item.id); triggerToast("Đã tăng số lượng", "info"); }} style={styles.qtyBtn}><FiPlus size={10} /></button>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id, item.title)} style={styles.trashBtn}><FiTrash2 size={15} /></button>
                      </div>
                    ))
                  )}

                  {/* ĐỊA CHỈ */}
                  {cartItems.length > 0 && (
                    <div style={styles.addressSection}>
                      <h4 style={styles.addressTitle}><FiMapPin size={15} style={{ marginRight: "6px" }} /> Địa chỉ người nhận hàng</h4>
                      {formError && <p style={styles.errorText}>{formError}</p>}
                      <div style={styles.inputRow}>
                        <div style={styles.inputField}><FiUser size={13} style={styles.inputIcon} /><input type="text" placeholder="Tên" value={shippingAddress.name} onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })} style={styles.inputStyle} /></div>
                        <div style={styles.inputField}><FiPhone size={13} style={styles.inputIcon} /><input type="text" placeholder="SĐT" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} style={styles.inputStyle} /></div>
                      </div>
                      <div style={{ ...styles.inputField, marginTop: "10px" }}><FiMapPin size={13} style={styles.inputIcon} /><input type="text" placeholder="Địa chỉ chi tiết..." value={shippingAddress.detail} onChange={(e) => setShippingAddress({ ...shippingAddress, detail: e.target.value })} style={styles.inputStyle} /></div>
                    </div>
                  )}

                  {/* PHƯƠNG THỨC THANH TOÁN */}
                  {cartItems.length > 0 && (
                    <div style={styles.paymentSection}>
                      <h4 style={styles.paymentTitle}>Phương thức thanh toán</h4>
                      
                      <label style={{...styles.paymentOption, ...(paymentMethod === "cod" ? styles.paymentOptionActive : {})}} onClick={() => setPaymentMethod("cod")}>
                        <input type="radio" checked={paymentMethod === "cod"} readOnly style={styles.radioInput} />
                        <FiTruck size={18} color="#2e7d32" />
                        <div><strong style={styles.optionName}>Thanh toán khi nhận hàng (COD)</strong></div>
                      </label>
                      
                      <label style={{...styles.paymentOption, ...(paymentMethod === "wallet" ? styles.paymentOptionActive : {})}} onClick={() => setPaymentMethod("wallet")}>
                        <input type="radio" checked={paymentMethod === "wallet"} readOnly style={styles.radioInput} />
                        <FiSmartphone size={18} color="#e91e63" />
                        <div><strong style={styles.optionName}>Thanh toán qua ví điện tử (Momo/ZaloPay)</strong></div>
                      </label>
                      
                      <label style={{...styles.paymentOption, ...(paymentMethod === "bank" ? styles.paymentOptionActive : {})}} onClick={() => setPaymentMethod("bank")}>
                        <input type="radio" checked={paymentMethod === "bank"} readOnly style={styles.radioInput} />
                        <FiCreditCard size={18} color="#1565c0" />
                        <div><strong style={styles.optionName}>Thanh toán bằng ngân hàng (Chuyển khoản)</strong></div>
                      </label>
                    </div>
                  )}
                </div>

                <div style={styles.modalFooter}>
                  <div style={styles.totalRow}><span>Tổng tiền:</span><span style={styles.totalPrice}>{totalAmount.toLocaleString()}đ</span></div>
                  <button onClick={handleCheckout} style={styles.checkoutBtn}>Tiến hành đặt hàng ngay</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      </div>

      <style>{`
        .user-badge-hover { transition: background-color 0.2s ease, border-color 0.2s ease; cursor: pointer; }
        .user-badge-hover:hover { background-color: #f1f8e9 !important; border-color: #a5d6a7 !important; }
        .dropdown-item-hover { transition: background 0.15s ease; }
        .dropdown-item-hover:hover { background-color: #f5f5f5 !important; }

        /* category scroll custom scrollbar */
        .category-scroll { -webkit-overflow-scrolling: touch; }
        .category-scroll::-webkit-scrollbar { height: 8px; }
        .category-scroll::-webkit-scrollbar-track { background: transparent; }
        .category-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 6px; }
      `}</style>
    </div>
  );
}

const styles = {
  pageWrapper: { display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "system-ui, sans-serif" },
  appLayout: { display: "flex", width: "100%", backgroundColor: "#f8f9fa", minHeight: "100vh", position: "relative" },
  toastContainer: { position: "fixed", top: "20px", right: "20px", zIndex: 10000, display: "flex", flexDirection: "column", gap: "10px" },
  toastItem: { display: "flex", alignItems: "center", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#333", color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: "220px" },
  toastSuccess: { backgroundColor: "#2e7d32" },
  toastError: { backgroundColor: "#d32f2f" },
  toastInfo: { backgroundColor: "#1976d2" },

  sidebar: { width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #eaeaea", padding: "20px", display: "flex", flexDirection: "column" },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" },
  brandIcon: { fontSize: "24px" },
  brandName: { fontSize: "18px", fontWeight: "bold", color: "#2e7d32", margin: 0 },
  brandSub: { fontSize: "11px", color: "#888", margin: 0 },
  menuList: { flex: 1, display: "flex", flexDirection: "column", gap: "5px" },
  menuDividerTitle: { fontSize: "11px", fontWeight: "bold", color: "#bbb", textTransform: "uppercase", margin: "15px 0 5px 5px" },
  menuItem: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", cursor: "pointer", color: "#555", fontSize: "14px", transition: "all 0.2s ease" },
  menuActive: { backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: "600" },
  aiBriefCard: { padding: "12px", backgroundColor: "#f1f8e9", borderRadius: "8px", marginTop: "20px" },
  aiBriefText: { margin: 0, fontSize: "12px", color: "#558b2f", lineHeight: "1.4" },

  mainContent: { flex: 1, padding: "24px", overflowY: "auto" },
  fakeHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  searchBarWrapper: { display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "8px 14px", borderRadius: "999px", border: "1px solid #e0e0e0", width: "300px" },
  searchInput: { border: "none", outline: "none", fontSize: "13px", width: "100%" },
  headerRight: { display: "flex", alignItems: "center", gap: "14px" },
  iconBtn: { position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e0e0e0", backgroundColor: "#fff", cursor: "pointer", color: "#444" },
  badge: { position: "absolute", top: "-4px", right: "-4px", minWidth: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#d32f2f", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700" },

  userBadge: { display: "inline-flex", alignItems: "center", gap: "10px", padding: "4px 12px 4px 4px", borderRadius: "999px", border: "1px solid #e0e0e0", backgroundColor: "#fff" },
  userAvatarImg: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" },
  userAvatarPlaceholder: { width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#f1f8f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#2e7d32" },
  username: { fontSize: "13px", fontWeight: "600", color: "#333" },
  userDropdown: { position: "absolute", top: "50px", right: "0", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: "230px", zIndex: 9999 },
  dropdownHeader: { padding: "12px 16px", backgroundColor: "#f9f9f9", borderRadius: "12px 12px 0 0" },
  profileName: { margin: "0 0 2px 0", fontSize: "13px", fontWeight: "600" },
  profileRole: { margin: 0, fontSize: "11px", color: "#888" },
  dropdownDivider: { height: "1px", backgroundColor: "#f0f0f0" },
  dropdownBody: { padding: "4px 0" },
  dropdownItem: { display: "flex", alignItems: "center", width: "100%", padding: "10px 16px", border: "none", backgroundColor: "transparent", fontSize: "13px", color: "#444", textAlign: "left", cursor: "pointer" },
  dropdownFooter: { padding: "4px 0" },

  loginSubmitBtn: { padding: "8px 20px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" },

  notiIconWrapper: { position: "relative" },
  notiDropdown: { position: "absolute", top: "46px", right: "0", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: "320px", zIndex: 9999, overflow: "hidden" },
  notiHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #f0f0f0" },
  markReadBtn: { background: "none", border: "none", color: "#2e7d32", fontSize: "12px", cursor: "pointer", fontWeight: "500" },
  notiBodyList: { maxHeight: "300px", overflowY: "auto" },
  notiItemCard: { padding: "12px 16px", borderBottom: "1px solid #f9f9f9" },
  notiUnreadBg: { backgroundColor: "#f1f8e9" },
  notiItemText: { margin: "0 0 4px 0", fontSize: "12.5px", color: "#555", lineHeight: "1.4" },
  notiItemTime: { fontSize: "11px", color: "#999" },
  unreadDot: { width: "6px", height: "6px", backgroundColor: "#2e7d32", borderRadius: "50%", marginTop: "5px" },
  emptyNotiText: { padding: "20px", textAlign: "center", color: "#999", fontSize: "13px" },

  title: { fontSize: "18px", fontWeight: "700", color: "#222", marginBottom: "16px", marginTop: "24px" },
  grid: { display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" },
  /* New horizontal category styles */
  categoryScroll: { display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px", marginBottom: "18px", WebkitOverflowScrolling: "touch" },
  categoryCard: { minWidth: "160px", flex: "0 0 auto", backgroundColor: "#fff", padding: "12px", borderRadius: "12px", border: "1px solid #eaeaea", textAlign: "center", cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
  categoryImageLarge: { width: "140px", height: "100px", margin: "0 auto 10px", borderRadius: "8px", overflow: "hidden" },
  imageWrapper: { width: "60px", height: "60px", margin: "0 auto 8px" },
  image: { width: "100%", height: "100%", objectFit: "contain" },
  categoryTitle: { margin: 0, fontSize: "13px", fontWeight: "500" },

  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" },
  productCard: { backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "14px", position: "relative" },
  favHeartButton: { position: "absolute", top: "10px", right: "10px", background: "none", border: "none", cursor: "pointer" },
  productDiscountBadge: { position: "absolute", top: "10px", left: "10px", backgroundColor: "#ff7043", color: "#0c0c0c", padding: "6px 8px", fontSize: "12px", fontWeight: "700", borderRadius: "8px" },
  productImageWrapper: { width: "100%", height: "120px", marginBottom: "10px" },
  productTitle: { fontSize: "14px", margin: "0 0 6px 0", fontWeight: "600", color: "#333" },
  currentPrice: { fontSize: "14px", fontWeight: "700", color: "#e53935" },
  oldPrice: { fontSize: "12px", color: "#999", textDecoration: "line-through", marginLeft: "8px" },
  priceRow: { display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" },
  productRating: { fontSize: "12px", color: "#ffba0df1", backgroundColor: "#f4eeeee7", display: "inline-block", padding: "4px 8px", borderRadius: "8px", fontWeight: "600" },
  circleCartButton: { position: "absolute", bottom: "12px", right: "12px", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #a5d6a7", backgroundColor: "#f1f8e9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  noResultCard: { gridColumn: "1/-1", padding: "30px", textAlign: "center", backgroundColor: "#ffff", border: "1px solid #e0e0e0", borderRadius: "12px", color: "#666" },

  historyContainer: { width: "100%" },
  tableCard: { backgroundColor: "#12b830", borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden" },
  historyTable: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  tableHeadRow: { backgroundColor: "#f4efef", borderBottom: "1px solid #eaeaea" },
  tableTh: { padding: "12px 16px", fontSize: "13px", fontWeight: "600", color: "#555" },
  tableBodyRow: { borderBottom: "1px solid #f5f5f5" },
  tableTd: { padding: "14px 16px", fontSize: "13.5px", color: "#444" },
  badgePayment: { fontSize: "11px", padding: "3px 8px", backgroundColor: "#f0f4f8", color: "#475569", borderRadius: "4px" },
  badgeStatus: { fontSize: "11px", padding: "4px 8px", borderRadius: "4px", fontWeight: "500" },

  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 10000, display: "flex", justifyContent: "flex-end" },
  modalContent: { width: "380px", backgroundColor: "#fff", height: "100%", display: "flex", flexDirection: "column", boxShadow: "-5px 0 25px rgba(0,0,0,0.15)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #e0e0e0" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#666" },
  modalBody: { flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" },
  emptyCartText: { textAlign: "center", color: "#999", padding: "4px" },
  cartItemRow: { display: "flex", alignItems: "center", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid #f5f5f5" },
  cartItemImg: { width: "50px", height: "50px", objectFit: "contain" },
  cartItemInfo: { flex: 1 },
  qtyGroup: { display: "flex", alignItems: "center", gap: "8px", border: "1px solid #e0e0e0", borderRadius: "4px", padding: "2px" },
  qtyBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  trashBtn: { background: "none", border: "none", color: "#999", cursor: "pointer" },

  addressSection: { borderTop: "1px dashed #e0e0e0", paddingTop: "16px" },
  addressTitle: { margin: "0 0 12px 0", fontSize: "14px", display: "flex", alignItems: "center" },
  errorText: { color: "#d32f2f", fontSize: "12px", margin: "0 0 10px 0" },
  inputRow: { display: "flex", gap: "10px" },
  inputField: { display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "6px 10px", flex: 1, backgroundColor: "#fafafa" },
  inputIcon: { color: "#888", marginRight: "6px" },
  inputStyle: { border: "none", background: "none", outline: "none", fontSize: "12.5px", width: "100%" },

  paymentSection: { borderTop: "1px dashed #e0e0e0", paddingTop: "16px" },
  paymentTitle: { margin: "0 0 12px 0", fontSize: "14px" },
  paymentOption: { display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #e0e0e0", borderRadius: "8px", marginBottom: "8px", cursor: "pointer" },
  paymentOptionActive: { borderColor: "#2e7d32", backgroundColor: "#f1f8e9" },
  radioInput: { cursor: "pointer" },
  optionName: { fontSize: "12px", color: "#333" },

  modalFooter: { padding: "20px", borderTop: "1px solid #e0e0e0", backgroundColor: "#fafafa" },
  totalRow: { display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "12px" },
  totalPrice: { color: "#d32f2f", fontSize: "18px", fontWeight: "700" },
  checkoutBtn: { width: "100%", padding: "12px", backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
  successWrapper: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center" }
};

export default CartPage;