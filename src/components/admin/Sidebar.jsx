import React from 'react';

const styles = {
  sidebar: {
    width: '260px',
    flexShrink: 0,
    background: 'rgba(243,244,246,0.7)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    padding: '16px',
    height: 'fit-content',
  },
  sidebarNav: {
    padding: '12px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#6b7280',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '4px',
    fontSize: '14px',
    transition: 'all 0.2s',
    position: 'relative',
  },
  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#2b9346',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#d1fae5',
    position: 'relative',
  },
  navIcon: {
    fontSize: '18px',
    width: '20px',
  },
  badgeHot: {
    background: '#ef4444',
    color: 'white',
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: 600,
    marginLeft: 'auto',
  },
  badgeNew: {
    background: '#2b9346',
    color: 'white',
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: 600,
    marginLeft: 'auto',
  },
  chatbot: {
    marginTop: '20px',
    marginLeft: '-16px',
  },
  speechBubble: {
    background: 'white',
    padding: '14px 18px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#1f2937',
    lineHeight: '1.6',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'relative',
    marginBottom: '8px',
    transform: 'translateX(20%)',
    zIndex: 2,
    display: 'inline-block',
    width: '85%',
  },
  speechTail: {
    position: 'absolute',
    bottom: '-12px',
    left: '30px',
    borderWidth: '12px 12px 0',
    borderStyle: 'solid',
    borderColor: 'white transparent transparent transparent',
    filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.02))',
  },
  chatbotMessage: {
    padding: 0,
    background: 'none',
    textAlign: 'center',
    transform: 'translateX(-20%) scale(1.15)',
    transformOrigin: 'center bottom',
  },
};

const badgeStyleMap = {
  'badge-hot': styles.badgeHot,
  'badge-new': styles.badgeNew,
};

function Sidebar({ activeNav, setActiveNav }) {
  const navItems = [
    { id: 'home', icon: 'fa-home', label: 'Trang chủ' },
    { id: 'store', icon: 'fa-store', label: 'Cửa hàng' },
    { id: 'category', icon: 'fa-th', label: 'Danh mục' },
    { id: 'flash-sale', icon: 'fa-bolt', label: 'Flash Sale', badge: 'HOT', badgeClass: 'badge-hot' },
    { id: 'wishlist', icon: 'fa-heart', label: 'Yêu thích' },
    { id: 'orders', icon: 'fa-file-alt', label: 'Đơn hàng' },
    { id: 'ai-assistant', icon: 'fa-robot', label: 'AI Assistant', badge: 'New', badgeClass: 'badge-new' },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.sidebarNav}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            style={activeNav === item.id ? styles.navItemActive : styles.navItem}
            onClick={(e) => {
              e.preventDefault();
              setActiveNav(item.id);
            }}
          >
            <i className={`fas ${item.icon}`} style={styles.navIcon}></i>
            <span>{item.label}</span>
            {item.badge && (
              <span style={badgeStyleMap[item.badgeClass]}>{item.badge}</span>
            )}
          </a>
        ))}
      </nav>

      <div style={styles.chatbot}>
        <div style={styles.speechBubble}>
          Xin chào! 👋<br />
          Mình có thể giúp gì<br />
          cho bạn hôm nay?
          <div style={styles.speechTail}></div>
        </div>
        <div style={styles.chatbotMessage}>
          <img
            src="/chatbotxinchao.png"
            alt="Bot"
            style={{ maxWidth: '100%', display: 'inline-block' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;