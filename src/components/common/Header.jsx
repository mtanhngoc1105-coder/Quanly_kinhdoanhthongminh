import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser, FiSearch, FiChevronDown, FiShoppingBag, FiLogOut, FiMapPin, FiPhone, FiX } from 'react-icons/fi';
import useCartStore from '../../stores/cartStore';
import useAuthStore from '../../stores/authStore';
import NotificationBell from '../ai/NotificationBell';

const styles = {
  header: {
    background: '#1b4d3e',
    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.18)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 34px',
    maxWidth: '1920px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  logoIcon: {
    width: '52px',
    height: '52px',
    background: 'linear-gradient(135deg, #f6d169 0%, #ffffff 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#14532d',
    fontSize: '26px',
  },
  logoTextH1: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#fef9c3',
    marginBottom: '2px',
  },
  logoTextP: {
    fontSize: '12px',
    color: '#ecfccb',
    margin: 0,
  },
  headerCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    maxWidth: '620px',
    margin: '0 30px',
  },
  categoryDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 18px',
    background: '#14532d',
    borderRadius: '18px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    color: '#d9f99d',
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '12px 18px',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none',
    background: 'rgba(255,255,255,0.12)',
    color: 'white',
  },
  searchBtn: {
    position: 'absolute',
    right: 4,
    top: 4,
    bottom: 4,
    width: '48px',
    border: 'none',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #bcc0c7 0%, #f3f4f6 30%, #d1d5db 100%)',
    color: '#334155',
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '0 8px 16px rgba(15, 23, 42, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '22px',
  },
  headerIcon: {
    position: 'relative',
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#ef4444',
    color: 'white',
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '10px',
    fontWeight: 600,
  },
  badgeSuccess: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#2b9346',
    color: 'white',
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '10px',
    fontWeight: 600,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    position: 'relative',
  },
  userInfoImg: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userInfoSpan: {
    fontSize: '14px',
    color: 'white',
  },
  userDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '200px',
    overflow: 'hidden',
    zIndex: 1000,
  },
  userDropdownItem: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#374151',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.2s',
    borderBottom: '1px solid #f3f4f6',
  },
  userDropdownItemHover: {
    backgroundColor: '#f9fafb',
    color: '#1f2937',
  },
  userDropdownLogout: {
    borderBottom: 'none',
    color: '#dc2626',
  },
  iconButton: {
    position: 'relative',
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '8px',
    borderRadius: '10px',
    transition: 'background 0.15s, transform 0.08s',
  },
  iconButtonHover: {
    background: 'rgba(255,255,255,0.04)',
    transform: 'translateY(-1px)'
  },
  popover: {
    position: 'absolute',
    top: '110%',
    right: 0,
    marginTop: '8px',
    background: 'white',
    color: '#0f172a',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(2,6,23,0.16)',
    minWidth: '320px',
    zIndex: 1200,
    overflow: 'hidden',
  },
  popoverHeader: {
    padding: '12px 16px',
    borderBottom: '1px solid #eef2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  popoverItem: {
    padding: '12px 16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(2,6,23,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1400,
    padding: '20px',
  },
  modalContent: {
    background: 'white',
    borderRadius: '12px',
    maxWidth: '920px',
    width: '100%',
    maxHeight: '86vh',
    overflow: 'auto',
    boxShadow: '0 12px 40px rgba(2,6,23,0.18)',
  },
  modalClose: {
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
  },
};

function Header({ searchQuery = '', setSearchQuery = () => {} }) {
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.cartItems.length);
  const wishlistCount = useCartStore((state) => state.wishlistItems.length);
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <FiShoppingBag />
            </div>
            <div>
              <h1 style={styles.logoTextH1}>SmartFood</h1>
              <p style={styles.logoTextP}>Fresh & Healthy</p>
            </div>
          </div>
        </Link>

        <div style={styles.headerCenter}>
          <div style={styles.categoryDropdown} onClick={() => navigate('/categories')} title="Xem tất cả danh mục">
            <span>Danh mục</span>
            <FiChevronDown />
          </div>
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn}>
              <FiSearch />
            </button>
          </div>
        </div>

        <div style={styles.headerRight}>
          <NotificationBell />

          <div style={{ position: 'relative' }}>
            <div
              style={{ ...styles.iconButton }}
              title="Bản đồ"
              onClick={() => { setShowMap((s) => !s); setShowContact(false);} }
            >
              <FiMapPin />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{ ...styles.iconButton }}
              title="Liên hệ"
              onClick={() => { setShowContact((s) => !s); setShowMap(false);} }
            >
              <FiPhone />
            </div>
          </div>
          <Link to="/profile" style={styles.headerIcon} title="Tài khoản">
            <FiUser />
          </Link>
          <Link to="/cart" style={styles.headerIcon} title="Giỏ hàng">
            <FiShoppingCart />
            {cartCount > 0 && <span style={styles.badgeSuccess}>{cartCount}</span>}
          </Link>
          <Link to="/" style={styles.headerIcon} title="Yêu thích">
            <FiHeart />
            {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
          </Link>
          <div 
            style={styles.userInfo}
            onClick={() => setShowUserMenu((s) => !s)}
          >
            <img src={user?.avatar || 'https://i.pravatar.cc/40'} alt="User" style={styles.userInfoImg} />
            <span style={styles.userInfoSpan}>Xin chào, {user?.fullName || user?.name || 'Khách'}</span>
            
            {showUserMenu && (
              user ? (
              <div style={styles.userDropdown}>
                <Link 
                  to="/profile"
                  style={styles.userDropdownItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <FiUser size={16} />
                  <span>Hồ sơ cá nhân</span>
                </Link>
                <Link 
                  to="/orders"
                  style={styles.userDropdownItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <span>📦</span>
                  <span>Đơn hàng của tôi</span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{...styles.userDropdownItem, ...styles.userDropdownLogout, border: 'none', width: '100%', textAlign: 'left', backgroundColor: 'white'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <FiLogOut size={16} />
                  <span>Đăng xuất</span>
                </button>
              </div>
              ) : (
                <div style={styles.userDropdown}>
                  <Link to="/login" style={styles.userDropdownItem}>Đăng nhập</Link>
                  <Link to="/login?role=manager" style={styles.userDropdownItem}>Đăng nhập Admin</Link>
                </div>
              )
            )}
          </div>
        </div>
        {showMap && (
          <div style={styles.modalOverlay} onClick={() => setShowMap(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef2f7' }}>
                <strong>Bản đồ cửa hàng</strong>
                <button style={styles.modalClose} onClick={() => setShowMap(false)} aria-label="Đóng"><FiX /></button>
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ marginTop: 0, marginBottom: 8 }}>Địa chỉ: 123 Đường Thực Phẩm, Quận 1, Thành phố</p>
                <div style={{ width: '100%', height: '420px', borderRadius: 8, overflow: 'hidden', border: '1px solid #e6eef6' }}>
                  <iframe
                    title="store-map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src="https://www.google.com/maps?q=Ho+Chi+Minh+City+market&output=embed"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {showContact && (
          <div style={styles.modalOverlay} onClick={() => setShowContact(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef2f7' }}>
                <strong>Liên hệ</strong>
                <button style={styles.modalClose} onClick={() => setShowContact(false)} aria-label="Đóng"><FiX /></button>
              </div>
              <div style={{ padding: 18, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 320px' }}>
                  <h4 style={{ marginTop: 0 }}>Thông tin liên hệ</h4>
                  <p style={{ margin: '6px 0' }}><strong>Điện thoại:</strong> <a href="tel:+84901234567">+84 90 123 4567</a></p>
                  <p style={{ margin: '6px 0' }}><strong>Email:</strong> <a href="mailto:hello@smartfood.vn">hello@smartfood.vn</a></p>
                  <p style={{ margin: '6px 0' }}><strong>Giờ làm việc:</strong> Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
                  <div style={{ marginTop: 12 }}>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                      <button style={{ padding: '10px 14px', borderRadius: 10, border: 'none', background: '#10b981', color: 'white', cursor: 'pointer' }}>Trang liên hệ</button>
                    </Link>
                  </div>
                </div>
                <div style={{ flex: '1 1 360px' }}>
                  <h4 style={{ marginTop: 0 }}>Gửi tin nhắn nhanh</h4>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Đã gửi — demo'); setShowContact(false); }}>
                    <input placeholder="Tên" required style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 8, border: '1px solid #e6eef6' }} />
                    <input placeholder="Email hoặc số điện thoại" required style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 8, border: '1px solid #e6eef6' }} />
                    <textarea placeholder="Tin nhắn" required style={{ width: '100%', padding: 10, marginBottom: 8, minHeight: 100, borderRadius: 8, border: '1px solid #e6eef6' }} />
                    <div style={{ textAlign: 'right' }}>
                      <button type="submit" style={{ padding: '10px 14px', borderRadius: 10, border: 'none', background: '#2563eb', color: 'white', cursor: 'pointer' }}>Gửi</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
