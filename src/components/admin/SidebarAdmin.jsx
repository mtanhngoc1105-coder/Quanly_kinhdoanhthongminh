import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import useAuthStore from '../../stores/authStore';

function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [hoveredPath, setHoveredPath] = useState(null);
  // Thêm state để quản lý riêng hiệu ứng hover của nút Đăng xuất
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: 'lucide:layout-dashboard', path: '/admin' },
    { name: 'Products', icon: 'lucide:apple', path: '/admin/products' },
    { name: 'Orders', icon: 'lucide:shopping-cart', path: '/admin/orders' },
    { name: 'Inventory', icon: 'lucide:box', path: '/admin/inventory' },
    { name: 'Suppliers', icon: 'lucide:store', path: '/admin/suppliers' },
    { name: 'Users', icon: 'lucide:users', path: '/admin/users' },
    { name: 'Reviews', icon: 'lucide:star', path: '/admin/reviews' },
    { name: 'Customers', icon: 'lucide:user', path: '/admin/customers' },
  ];

  const colors = {
    bgSidebar: "#f2f9f2",
    primary: "#2e7d32",
    accent: "#ec975a",
    textDefault: "#64748b",
    textActive: "#2e7d32",
    bgActive: "rgba(46, 125, 50, 0.06)",
    bgHover: "#f8fafc",
    textHover: "#1e293b"
  };

  // Hàm xử lý khi người dùng click Đăng xuất
  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?");
    if (confirmLogout) {
      logout(); // Call logout from authStore
      navigate('/login'); // Navigate to login page
    }
  };

  return (
    <aside style={{
      width: "260px",
      background: colors.bgSidebar,
      minHeight: "100vh",
      padding: "24px 16px",
      borderRight: "1px solid #f1f5f9",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      position: "sticky",
      top: 0
    }}>
      
      {/* LOGO SMARTFOOD */}
      <div style={{ 
        marginBottom: "36px", 
        paddingLeft: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #4ade80 0%, #2e7d32 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(46, 125, 50, 0.15)'
        }}>
          <Icon icon="lucide:sprout" width="18" height="18" style={{ color: "#ffffff" }} />
        </div>
        <h2 style={{ 
          margin: 0, 
          fontSize: "19px", 
          fontWeight: "800", 
          letterSpacing: "-0.5px",
          fontFamily: '"Inter", sans-serif'
        }}>
          <span style={{ color: colors.primary }}>Smart</span>
          <span style={{ color: colors.accent }}>Food</span>
        </h2>
      </div>
      
      {/* MENU ĐIỀU HƯỚNG */}
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredPath === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: isActive ? "600" : "500",
                    position: "relative",
                    transition: "all 0.2s ease",
                    color: isActive ? colors.textActive : (isHovered ? colors.textHover : colors.textDefault),
                    backgroundColor: isActive ? colors.bgActive : "transparent",
                  }}
                >
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '25%',
                      height: '50%',
                      width: '4px',
                      background: colors.primary,
                      borderRadius: '0 4px 4px 0'
                    }} />
                  )}

                  <Icon 
                    icon={item.icon} 
                    width="18" 
                    height="18" 
                    style={{ 
                      marginRight: "12px",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      transform: isHovered && !isActive ? "translateX(2px)" : "none",
                      color: isActive ? colors.textActive : (isHovered ? colors.textHover : "#94a3b8")
                    }} 
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* KHU VỰC USER VÀ ĐĂNG XUẤT */}
      <div style={{
        borderTop: '1px solid #f1f5f9',
        paddingTop: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Đẩy phần thông tin sang trái, nút logout sang phải
        paddingLeft: '8px'
      }}>
        {/* Thông tin cá nhân bên trái */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(46, 125, 50, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            color: colors.primary,
            fontSize: '13px'
          }}>
            {user?.fullName?.[0]?.toUpperCase() || 'A'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '120px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.fullName || 'Admin User'}
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user?.email || 'admin@smartfood.com'}
            </span>
          </div>
        </div>

        {/* Nút Đăng xuất dạng biểu tượng Ghost Button màu đỏ nhạt khi rà chuột */}
        <button
          title="Đăng xuất hệ thống"
          onClick={handleLogout}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          style={{
            border: 'none',
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            // Trạng thái bình thường màu xám nhạt, khi hover chuyển sang đỏ nhạt thanh lịch
            background: isLogoutHovered ? '#fee2e2' : '#f1f5f9',
            color: isLogoutHovered ? '#dc2626' : '#64748b',
          }}
        >
          <Icon icon="lucide:log-out" width="16" height="16" style={{ transform: isLogoutHovered ? 'translateX(1px)' : 'none', transition: 'all 0.2s' }} />
        </button>
      </div>

    </aside>
  );
}

export default SidebarAdmin;