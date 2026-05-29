// src/components/admin/RevenueTrendChart.jsx
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function RevenueTrendChart() {
  // Data vẽ biểu đồ đường lấy từ phần "Doanh thu tuần qua" của bạn
  const data = [
    { name: 'Thứ 2', revenue: 45 },
    { name: 'Thứ 3', revenue: 65 },
    { name: 'Thứ 4', revenue: 50 },
    { name: 'Thứ 5', revenue: 85 },
    { name: 'Thứ 6', revenue: 70 },
    { name: 'Thứ 7', revenue: 95 },
    { name: 'Chủ Nhật', revenue: 100 },
  ];

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Khung chứa biểu đồ đường (Đã gộp từ ô phía dưới lên) */}
      <div style={{ flex: 1, minHeight: '200px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4caf50" // Màu xanh lá đồng bộ với UI của bạn
              strokeWidth={3}
              dot={{ stroke: '#4caf50', strokeWidth: 2, fill: '#fff', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueTrendChart;