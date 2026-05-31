import React from 'react';

const styles = {
  header: {
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    maxWidth: '1920px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #2b9346 0%, #059669 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
  },
  logoTextH1: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '2px',
  },
  logoTextP: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  headerCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
    maxWidth: '600px',
    margin: '0 40px',
  },
  categoryDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#f9fafb',
    borderRadius: '8px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    color: '#374151',
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  searchBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    padding: '0 20px',
    background: '#2b9346',
    border: 'none',
    borderRadius: '0 8px 8px 0',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  headerIcon: {
    position: 'relative',
    fontSize: '20px',
    color: '#6b7280',
    cursor: 'pointer',
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
  },
  userInfoImg: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userInfoSpan: {
    fontSize: '14px',
    color: '#374151',
  },
};

function Header({ cartCount, wishlistCount, notificationCount, searchQuery, setSearchQuery }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <i className="fas fa-leaf"></i>
          </div>
          <div>
            <h1 style={styles.logoTextH1}>SmartFood</h1>
            <p style={styles.logoTextP}>Fresh & Healthy</p>
          </div>
        </div>

        <div style={styles.headerCenter}>
          <div style={styles.categoryDropdown}>
            <span>Danh mục</span>
            <i className="fas fa-chevron-down"></i>
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
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.headerIcon}>
            <i className="fas fa-bell"></i>
            {notificationCount > 0 && <span style={styles.badge}>{notificationCount}</span>}
          </div>
          <div style={styles.headerIcon}>
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
          </div>
          <div style={styles.headerIcon}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span style={styles.badgeSuccess}>{cartCount}</span>}
          </div>
          <div style={styles.userInfo}>
            <img src="https://i.pravatar.cc/40" alt="User" style={styles.userInfoImg} />
            <span style={styles.userInfoSpan}>Xin chào, Minh</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;