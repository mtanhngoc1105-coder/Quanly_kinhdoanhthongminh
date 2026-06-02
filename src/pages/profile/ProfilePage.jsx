import React, { useState, useEffect, useMemo } from "react";
import useAuthStore from "../../stores/authStore";
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import "../../assets/styles/profile.css";

function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "/image/cart/avatar.png",
  });

  // Dashboard state
  const [weightHistory, setWeightHistory] = useState([
    { date: '25/05', weight: 74 },
    { date: '26/05', weight: 73.5 },
    { date: '27/05', weight: 73 },
    { date: '28/05', weight: 72.6 },
    { date: '29/05', weight: 72.2 },
    { date: '30/05', weight: 72 },
    { date: '31/05', weight: 71.6 },
    { date: '01/06', weight: 71.2 },
    { date: '02/06', weight: 71 },
  ]);

  const [caloriesToday, setCaloriesToday] = useState(1450);
  const dailyCalGoal = 2200;
  const [bmi, setBmi] = useState(23.4);
  const [weight, setWeight] = useState(72);
  const [goal, setGoal] = useState('Tăng cơ');

  const recommendedProducts = useMemo(() => [
    'Granola High Protein',
    'Almond Milk',
    'Mixed Nuts',
  ], []);

  const mealPlan = useMemo(() => ({
    breakfast: 'Granola + Sữa hạt',
    lunch: 'Ức gà + Rau củ',
    dinner: 'Salad cá ngừ',
  }), []);

  const badges = useMemo(() => ([
    { id: 1, title: 'Healthy Beginner' },
    { id: 2, title: '7 Days Healthy' },
    { id: 3, title: 'First Order' },
    { id: 4, title: 'Protein Master' },
  ]), []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setFormData({
          fullName: parsedUser.fullName || parsedUser.name || '',
          avatar: parsedUser.avatar || '/image/cart/avatar.png',
        });
      } catch (e) {
        console.error('Error loading user data', e);
      }
    } else if (user) {
      setFormData({ fullName: user.fullName || user.name || '', avatar: user.avatar || '/image/cart/avatar.png' });
    }
  }, [user]);

  // Simple health score calculation
  const healthScore = useMemo(() => {
    let score = 80;
    if (bmi >= 25) score -= 8;
    if (caloriesToday > dailyCalGoal) score -= 5;
    // small tweak based on recent weight trend
    const recent = weightHistory.slice(-3);
    const trend = recent[recent.length - 1].weight - recent[0].weight;
    if (trend < 0) score += 3;
    return Math.max(45, Math.min(98, Math.round(score)));
  }, [bmi, caloriesToday, weightHistory]);

  const aiInsights = useMemo(() => {
    const insights = [];
    if (bmi >= 25) insights.push('Bạn đang ở ngưỡng thừa cân nhẹ — cân nhắc tăng hoạt động thể chất.');
    if (caloriesToday < dailyCalGoal * 0.7) insights.push('Có vẻ bạn chưa đủ năng lượng hôm nay; tăng protein cho bữa trưa.');
    insights.push('Nên tăng lượng protein thêm 15%.');
    insights.push('Giảm tiêu thụ đường 12% so với tuần trước.');
    return insights;
  }, [bmi, caloriesToday]);

  const [showAI, setShowAI] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const askAI = (q) => {
    // demo -- simulate AI response
    setAiResponse('Đang suy nghĩ...');
    setTimeout(() => {
      setAiResponse('Gợi ý: Tập cardio 3 lần/tuần, tăng protein vào bữa tối.');
    }, 900);
  };

  const handleLogout = () => {
    try {
      if (logout) logout();
    } catch (e) {
      console.warn('Logout error', e);
    }
    navigate('/login');
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <div style={styles.headerCard}>
        <div style={styles.headerLeft}>
          <img src={formData.avatar} alt="avatar" style={styles.headerAvatar} />
          <div>
            <div style={styles.greeting}>Xin chào, <strong>{formData.fullName || 'Khách'}</strong></div>
            <div style={styles.healthScoreBox}>
              <div style={styles.healthLabel}>Health Score</div>
              <div style={styles.healthNumber}>{healthScore}/100</div>
              <div style={styles.stars}>★★★★★</div>
            </div>
          </div>
        </div>
        <div style={styles.headerRightStats}>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Cân nặng</div>
            <div style={styles.statValue}>{weight} kg</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>BMI</div>
            <div style={styles.statValue}>{bmi}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Calo hôm nay</div>
            <div style={styles.statValue}>{caloriesToday} / {dailyCalGoal}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Mục tiêu</div>
            <div style={styles.statValue}>{goal}</div>
          </div>
        </div>
      </div>

        <div style={styles.grid}>
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>Tiến độ giảm cân</div>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightHistory} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>AI Health Insights</div>
            <div style={styles.aiBox}>
              <ul>
                {aiInsights.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <div style={{ marginTop: 12 }}>
                <button onClick={() => { setShowAI(true); setAiQuery('Tôi muốn giảm mỡ bụng'); askAI('Tôi muốn giảm mỡ bụng'); }} style={styles.aiBtn}>Ask SmartFood AI</button>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>Thành tích</div>
            <div style={styles.badgesRow}>
              {badges.map(b => (
                <div key={b.id} style={styles.badgeItem}>🏆 {b.title}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>AI Recommended Products</div>
            <div style={styles.productList}>
              {recommendedProducts.map((p, i) => (
                <div key={i} style={styles.productItem}>✓ {p}</div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>Meal Plan Hôm Nay</div>
            <div style={styles.mealPlanRow}>
              <div><strong>Breakfast</strong><div style={styles.mealText}>{mealPlan.breakfast}</div></div>
              <div><strong>Lunch</strong><div style={styles.mealText}>{mealPlan.lunch}</div></div>
              <div><strong>Dinner</strong><div style={styles.mealText}>{mealPlan.dinner}</div></div>
            </div>
            <div style={{ textAlign: 'right', marginTop: 10 }}>
              <button style={styles.generateBtn} onClick={() => alert('Generate New Plan — demo')}>Generate New Plan</button>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>Nhật ký dinh dưỡng (Hôm nay)</div>
            <div style={{ padding: 12 }}>
              <div>Breakfast — 350 kcal</div>
              <div>Lunch — 650 kcal</div>
              <div>Dinner — 500 kcal</div>
              <div style={{ marginTop: 8, color: '#6b7280' }}>Tổng: 1500 kcal</div>
            </div>
          </div>
        </div>
      </div>

      </div>

      {showAI && (
        <div style={styles.modalOverlay} onClick={() => setShowAI(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: 12, borderBottom: '1px solid #eef2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Ask SmartFood AI</strong>
              <button onClick={() => setShowAI(false)} style={styles.modalClose}>Đóng</button>
            </div>
            <div style={{ padding: 16 }}>
              <textarea value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} style={styles.textarea} />
              <div style={{ marginTop: 8, textAlign: 'right' }}>
                <button onClick={() => askAI(aiQuery)} style={styles.askBtn}>Gửi</button>
              </div>
              <div style={{ marginTop: 12, background: '#f8fafc', padding: 12, borderRadius: 8 }}>{aiResponse}</div>
            </div>
          </div>
        </div>
      )}
      
      <aside style={styles.rightSidebar}>
        <div style={styles.sidebarCard}>
          <img src={formData.avatar} alt="avatar" style={styles.sidebarAvatar} />
          <div style={styles.sidebarName}>{formData.fullName || (user && (user.fullName || user.name)) || 'Khách'}</div>
          <div style={styles.sidebarEmail}>{user?.email || formData.email || ''}</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexDirection: 'column' }}>
            <button style={styles.sidebarBtn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Chỉnh sửa hồ sơ</button>
            <button style={{ ...styles.sidebarBtn, background: '#ef4444' }} onClick={handleLogout}>Đăng xuất</button>
            <button style={{ ...styles.sidebarBtn, background: '#10b981' }} onClick={() => navigate('/orders')}>Đơn hàng của tôi</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

const styles = {
  alertBox: { padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", fontWeight: "500" },
  pageWrapper: { minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "24px", fontFamily: "system-ui, sans-serif", display: 'flex', justifyContent: 'center' },
  contentWrapper: { width: '100%', maxWidth: '100%', padding: '0 24px' },
  headerCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(180deg, #14532d 0%, #163a2b 100%)', color: 'white', padding: 18, borderRadius: 12, boxShadow: '0 8px 30px rgba(2,6,23,0.12)', marginBottom: 18 },
  headerLeft: { display: 'flex', gap: 16, alignItems: 'center' },
  headerAvatar: { width: 84, height: 84, borderRadius: 16, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.12)' },
  greeting: { fontSize: 18, marginBottom: 6 },
  healthScoreBox: { display: 'flex', gap: 12, alignItems: 'center' },
  healthLabel: { fontSize: 12, opacity: 0.9 },
  healthNumber: { fontSize: 24, fontWeight: 800 },
  stars: { color: '#fbbf24' },
  headerRightStats: { display: 'flex', gap: 12 },
  statCard: { background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 10, minWidth: 120, textAlign: 'center' },
  statTitle: { fontSize: 12, opacity: 0.9 },
  statValue: { fontSize: 16, fontWeight: 700 },
  grid: { display: 'flex', gap: 18 },
  leftColumn: { flex: 2, display: 'flex', flexDirection: 'column', gap: 18 },
  rightColumn: { flex: 1, display: 'flex', flexDirection: 'column', gap: 18 },
  card: { background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.06)' },
  cardHeader: { fontWeight: 700, marginBottom: 8 },
  aiBox: { padding: 8, background: '#f8fafc', borderRadius: 8 },
  aiBtn: { marginTop: 8, padding: '8px 12px', background: '#2563eb', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer' },
  badgesRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  badgeItem: { background: 'linear-gradient(90deg,#fef3c7,#fff7ed)', padding: '8px 10px', borderRadius: 8, fontWeight: 700 },
  productList: { display: 'flex', flexDirection: 'column', gap: 8 },
  productItem: { padding: 10, borderRadius: 8, background: '#f8fafc' },
  mealPlanRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
  mealText: { marginTop: 6, background: '#f3f4f6', padding: 8, borderRadius: 6 },
  generateBtn: { padding: '8px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1400 },
  modalContent: { background: 'white', borderRadius: 12, width: '720px', maxHeight: '80vh', overflow: 'auto' },
  modalClose: { background: 'transparent', border: 'none', cursor: 'pointer' },
  textarea: { width: '100%', minHeight: 100, padding: 12, borderRadius: 8, border: '1px solid #e6eef6' },
  askBtn: { padding: '8px 12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' },
  rightSidebar: { position: 'fixed', right: 24, top: 120, width: 260, zIndex: 1300 },
  sidebarCard: { background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 8px 30px rgba(2,6,23,0.08)', textAlign: 'center' },
  sidebarAvatar: { width: 84, height: 84, borderRadius: 12, objectFit: 'cover', margin: '0 auto', border: '3px solid #10b981' },
  sidebarName: { fontWeight: 800, marginTop: 8 },
  sidebarEmail: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  sidebarBtn: { padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: '#2563eb', color: 'white', fontWeight: 700 },
};

export default ProfilePage;