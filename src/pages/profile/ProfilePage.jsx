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
        {/* Profile Card - VIP Style */}
        <div style={styles.profileCardContainer}>
          <div style={styles.profileCard}>
            <img src={formData.avatar} alt="avatar" style={styles.profileAvatar} />
            <h2 style={styles.profileName}>{formData.fullName || 'Khách Hàng VIP'}</h2>
            <p style={styles.profileEmail}>{user?.email || 'customer@smartfood.com'}</p>
            <div style={styles.profileButtons}>
              <button style={styles.btnEdit} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Chỉnh sửa hộ sơ
              </button>
              <button style={styles.btnLogout} onClick={handleLogout}>
                Đăng xuất
              </button>
              <button style={styles.btnOrders} onClick={() => navigate('/orders')}>
                Đơn hàng của tôi
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div style={styles.editProfileSection}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>Chỉnh sửa thông tin cá nhân</div>
            <div style={styles.editForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Ảnh đại diện</label>
                <div style={styles.avatarPreview}>
                  <img src={formData.avatar} alt="preview" style={styles.previewImg} />
                  <input type="file" style={styles.fileInput} accept="image/*" />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tên</label>
                <input 
                  type="text" 
                  value={formData.fullName} 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  style={styles.input}
                  placeholder="Nhập tên của bạn"
                />
              </div>
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
    </div>
  );
}

const styles = {
  pageWrapper: { 
    minHeight: "100vh", 
    backgroundColor: "#f8f9fa", 
    padding: "24px", 
    fontFamily: "system-ui, sans-serif", 
    display: 'flex', 
    justifyContent: 'center' 
  },
  contentWrapper: { 
    width: '100%', 
    maxWidth: '1200px'
  },
  
  // Profile Card Styles
  profileCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px'
  },
  profileCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
    borderRadius: '24px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(16, 185, 129, 0.15)',
    width: '100%',
    maxWidth: '400px',
    border: '2px solid #d1fae5'
  },
  profileAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '24px',
    objectFit: 'cover',
    margin: '0 auto 24px',
    border: '4px solid #10b981',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'
  },
  profileName: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  profileEmail: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 24px 0'
  },
  profileButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  btnEdit: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    background: '#2563eb',
    color: 'white',
    transition: 'all 0.3s ease',
    '&:hover': { background: '#1d4ed8' }
  },
  btnLogout: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    background: '#ef4444',
    color: 'white',
    transition: 'all 0.3s ease',
    '&:hover': { background: '#dc2626' }
  },
  btnOrders: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    background: '#10b981',
    color: 'white',
    transition: 'all 0.3s ease',
    '&:hover': { background: '#059669' }
  },
  
  // Edit Profile Section
  editProfileSection: {
    marginBottom: '32px'
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
  },
  avatarPreview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  previewImg: {
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    objectFit: 'cover',
    border: '2px solid #10b981'
  },
  fileInput: {
    padding: '8px'
  },

  // Grid and existing styles
  grid: { 
    display: 'flex', 
    gap: 18,
    marginTop: '20px'
  },
  leftColumn: { 
    flex: 2, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 18 
  },
  rightColumn: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 18 
  },
  card: { 
    background: '#fff', 
    borderRadius: 12, 
    padding: 12, 
    boxShadow: '0 6px 18px rgba(2,6,23,0.06)' 
  },
  cardHeader: { 
    fontWeight: 700, 
    marginBottom: 8 
  },
  aiBox: { 
    padding: 8, 
    background: '#f8fafc', 
    borderRadius: 8 
  },
  aiBtn: { 
    marginTop: 8, 
    padding: '8px 12px', 
    background: '#2563eb', 
    color: 'white', 
    borderRadius: 8, 
    border: 'none', 
    cursor: 'pointer' 
  },
  badgesRow: { 
    display: 'flex', 
    gap: 8, 
    flexWrap: 'wrap' 
  },
  badgeItem: { 
    background: 'linear-gradient(90deg,#fef3c7,#fff7ed)', 
    padding: '8px 10px', 
    borderRadius: 8, 
    fontWeight: 700 
  },
  productList: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 8 
  },
  productItem: { 
    padding: 10, 
    borderRadius: 8, 
    background: '#f8fafc' 
  },
  mealPlanRow: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr 1fr', 
    gap: 12 
  },
  mealText: { 
    marginTop: 6, 
    background: '#f3f4f6', 
    padding: 8, 
    borderRadius: 6 
  },
  generateBtn: { 
    padding: '8px 12px', 
    background: '#10b981', 
    color: 'white', 
    border: 'none', 
    borderRadius: 8, 
    cursor: 'pointer' 
  },
  modalOverlay: { 
    position: 'fixed', 
    inset: 0, 
    background: 'rgba(2,6,23,0.5)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1400 
  },
  modalContent: { 
    background: 'white', 
    borderRadius: 12, 
    width: '720px', 
    maxHeight: '80vh', 
    overflow: 'auto' 
  },
  modalClose: { 
    background: 'transparent', 
    border: 'none', 
    cursor: 'pointer' 
  },
  textarea: { 
    width: '100%', 
    minHeight: 100, 
    padding: 12, 
    borderRadius: 8, 
    border: '1px solid #e6eef6' 
  },
  askBtn: { 
    padding: '8px 12px', 
    background: '#2563eb', 
    color: 'white', 
    border: 'none', 
    borderRadius: 8, 
    cursor: 'pointer' 
  }
};

export default ProfilePage;