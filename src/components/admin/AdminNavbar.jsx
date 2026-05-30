import React from 'react';
import { Icon } from '@iconify/react';
function AdminNavbar() {
  return (
    <div
      style={{
        background: "white",
        padding: "12px 24px",
        marginBottom: "0px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        zIndex: 10
      }}
    >
      {/* Ô tìm kiếm nhanh */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#f4f7f6', padding: '8px 15px', borderRadius: '8px', width: '300px' }}>
        <Icon icon="lucide:search" style={{ color: '#718096', marginRight: '10px' }} />
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm" 
          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }}
        />
      </div>

      {/* Icon thông báo và Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', cursor: 'pointer', color: '#4a5568' }}>
          <Icon icon="lucide:bell" width="20" />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ef4444', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid white' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1b5e20' }}>
            <Icon icon="lucide:user" width="20" style={{ margin: 'auto' }} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Quản trị viên</span>
        </div>
      </div>
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Admin Panel</h3>
    </div>
  );
}
