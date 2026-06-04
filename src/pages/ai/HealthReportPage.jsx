import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HealthReportPage() {
  const navigate = useNavigate();
  const [reportData] = useState({
    date: new Date().toLocaleDateString('vi-VN'),
    score: 78,
    weight: 72,
    weightTrend: -2,
    calories: 2100,
    calorieTarget: 2200,
    steps: 8420,
    stepTarget: 10000,
    sleep: 7.5,
    water: 2.1,
    waterTarget: 3
  });

  const [chartData] = useState([
    { day: 'T2', weight: 74, calories: 2150, steps: 7200 },
    { day: 'T3', weight: 73.5, calories: 2280, steps: 9100 },
    { day: 'T4', weight: 73, calories: 2050, steps: 8500 },
    { day: 'T5', weight: 72.5, calories: 2100, steps: 7900 },
    { day: 'T6', weight: 72, calories: 2100, steps: 8420 }
  ]);

  const downloadReport = () => {
    const reportText = `
SmartFood - Daily Health Report
Generated: ${reportData.date}

=== HEALTH SCORE ===
Overall Score: ${reportData.score}/100 ⭐⭐⭐⭐

=== WEIGHT ===
Current: ${reportData.weight}kg
Trend: ${reportData.weightTrend > 0 ? '↑' : '↓'} ${Math.abs(reportData.weightTrend)}kg this week
Status: On track! 💪

=== NUTRITION ===
Calories Today: ${reportData.calories} / ${reportData.calorieTarget} kcal
Status: ${reportData.calories < reportData.calorieTarget ? '✅ Under limit' : '⚠️ Over limit'}

=== ACTIVITY ===
Steps: ${reportData.steps.toLocaleString()} / ${reportData.stepTarget.toLocaleString()}
Status: ${reportData.steps >= reportData.stepTarget ? '🔥 Goal achieved!' : '⏳ Keep going!'}

=== HYDRATION ===
Water: ${reportData.water}L / ${reportData.waterTarget}L
Status: ${reportData.water >= reportData.waterTarget ? '💧 Hydrated!' : '⚠️ Drink more water'}

=== SLEEP ===
Sleep: ${reportData.sleep} hours
Status: ${reportData.sleep >= 7 ? '😴 Good sleep' : '⚠️ Need more sleep'}

---
SmartFood AI - Your Personal Health Assistant
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportText));
    element.setAttribute('download', `health-report-${reportData.date}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const styles = {
    pageWrapper: { 
      width: '100%',
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '24px', 
      boxSizing: 'border-box',
      fontFamily: 'system-ui, sans-serif'
    },
    contentWrapper: { 
      width: '100%', 
      maxWidth: '100%',
      margin: '0 auto',
      padding: '0 24px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '32px'
    },
    backBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '10px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937'
    },
    scoreCard: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      borderRadius: '16px',
      padding: '40px',
      color: 'white',
      marginBottom: '24px',
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(139, 92, 246, 0.3)'
    },
    scoreNumber: {
      fontSize: '56px',
      fontWeight: '800',
      marginBottom: '8px'
    },
    scoreLabel: {
      fontSize: '14px',
      opacity: 0.9
    },
    downloadBtn: {
      marginTop: '20px',
      padding: '12px 24px',
      background: 'white',
      color: '#8b5cf6',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    metricCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      borderLeft: '4px solid #8b5cf6'
    },
    metricTitle: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '8px',
      textTransform: 'uppercase'
    },
    metricValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px'
    },
    metricStatus: {
      fontSize: '12px',
      color: '#10b981'
    },
    chartCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    chartTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    statusBox: {
      background: '#f0fdf4',
      borderRadius: '12px',
      padding: '16px',
      borderLeft: '4px solid #22c55e',
      marginBottom: '16px'
    },
    statusText: {
      fontSize: '14px',
      color: '#166534',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/ai')}
            onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            <FiArrowLeft /> Quay lại
          </button>
          <h1 style={styles.title}>📋 Báo cáo sức khỏe</h1>
        </div>

        <div style={styles.scoreCard}>
          <div style={styles.scoreNumber}>{reportData.score}</div>
          <div style={styles.scoreLabel}>Điểm sức khỏe hôm nay</div>
          <button 
            style={styles.downloadBtn}
            onClick={downloadReport}
          >
            <FiDownload /> Tải báo cáo
          </button>
        </div>

        <div style={styles.statusBox}>
          <div style={styles.statusText}>
            ✅ Bạn đang có sức khỏe tốt! Tiếp tục giữ vững thói quen tốt.
          </div>
        </div>

        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricTitle}>⚖️ Cân nặng</div>
            <div style={styles.metricValue}>{reportData.weight} kg</div>
            <div style={styles.metricStatus}>
              {reportData.weightTrend < 0 ? '📉 Giảm' : '📈 Tăng'} {Math.abs(reportData.weightTrend)}kg tuần này
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricTitle}>🔥 Calories</div>
            <div style={styles.metricValue}>{reportData.calories}/{reportData.calorieTarget}</div>
            <div style={styles.metricStatus}>
              {reportData.calories < reportData.calorieTarget ? '✅ Dưới mục tiêu' : '⚠️ Vượt mục tiêu'}
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricTitle}>👣 Bước</div>
            <div style={styles.metricValue}>{reportData.steps.toLocaleString()}</div>
            <div style={styles.metricStatus}>
              {reportData.steps >= reportData.stepTarget ? '🔥 Đạt mục tiêu!' : '⏳ Cần thêm ' + (reportData.stepTarget - reportData.steps)}
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricTitle}>💧 Nước</div>
            <div style={styles.metricValue}>{reportData.water}L/{reportData.waterTarget}L</div>
            <div style={styles.metricStatus}>
              {reportData.water >= reportData.waterTarget ? '💧 Tốt!' : '⚠️ Uống thêm'}
            </div>
          </div>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>📈 Xu hướng 5 ngày</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8b5cf6" name="Cân nặng (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>🎯 Mục tiêu hôm nay</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Calories', current: reportData.calories, target: reportData.calorieTarget, icon: '🔥' },
              { label: 'Steps', current: reportData.steps, target: reportData.stepTarget, icon: '👣' },
              { label: 'Water', current: Math.round(reportData.water * 100) / 100, target: reportData.waterTarget, icon: '💧' }
            ].map((goal, idx) => {
              const percentage = Math.min(100, (goal.current / goal.target) * 100);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>
                      {goal.icon} {goal.label}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)',
                        width: `${percentage}%`,
                        transition: 'width 0.3s'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthReportPage;
