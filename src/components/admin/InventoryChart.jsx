// src/components/admin/InventoryChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// 1. Dữ liệu chuẩn hóa theo đúng tỷ lệ phần trăm và màu sắc của ảnh mẫu
const data = [
  { name: 'Rau củ hữu cơ', value: 45, percentage: '45%', color: '#4caf50' },
  { name: 'Trái cây nhập khẩu', value: 25, percentage: '25%', color: '#ff9800' },
  { name: 'Thịt & Hải sản tươi', value: 20, percentage: '20%', color: '#f44336' },
  { name: 'Trứng & Sữa sạch', value: 10, percentage: '10%', color: '#2196f3' },
];

function InventoryChart() {
  return (
    <div
      style={{
        background: 'white',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        border: '1px solid #e1ebe2', // Viền mỏng đồng bộ với hệ thống trắng xanh nhẹ
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Dùng Flexbox chia làm 2 cột: Trái là Biểu đồ vòng nhẫn - Phải là Tiến trình phần trăm */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* CỘT TRÁI: BIỂU ĐỒ TRÒN ĐỤC LỖ (DOUGHNUT CHART) */}
        <div style={{ width: '100%', height: '300px', position: 'relative', flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={68}  // Độ rộng lỗ khuyết bên trong (tạo nét thanh mảnh như mẫu)
                outerRadius={88}  // Vòng thắt ngoài của bánh
                paddingAngle={0}  // Triệt tiêu vạch chia cắt màu trắng thô ráp
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Nhãn chữ nằm ẩn chính giữa lòng biểu đồ tròn */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <span style={{ fontSize: '12px', color: '#718096', fontWeight: '500' }}>Tổng kho</span>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1b5e20', marginTop: '1px' }}>100%</div>
          </div>
        </div>

        {/* CỘT PHẢI: THÀNH PHẦN PROGRESS BAR THEO CHÚ THÍCH */}
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {data.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              
              {/* Tên danh mục (bên trái) và Phần trăm sát lề (bên phải) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <span style={{ color: '#4a5568', fontWeight: '600' }}>{item.name}</span>
                <span style={{ color: '#2d3748', fontWeight: '700' }}>{item.percentage}</span>
              </div>
              
              {/* Thanh tiến trình bo tròn mềm mại tương ứng tỷ lệ phần trăm */}
              <div style={{ width: '100%', height: '8px', background: '#f0f4f1', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: item.percentage, 
                    height: '100%', 
                    background: item.color, 
                    borderRadius: '4px',
                    transition: 'width 1s ease-in-out' // Hiệu ứng đẩy thanh chạy mượt mà khi load trang
                  }}
                ></div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default InventoryChart;