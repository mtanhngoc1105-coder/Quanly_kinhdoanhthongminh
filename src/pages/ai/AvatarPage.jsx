import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function AvatarPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState('happy');
  const [message, setMessage] = useState('Xin chào! Tôi là SmartFood AI Assistant. 👋');

  const moods = {
    happy: { emoji: '😊', message: 'Bạn trông vui vẻ hôm nay! Hãy chia sẻ mục tiêu sức khỏe của bạn.' },
    thinking: { emoji: '🤔', message: 'Tôi đang phân tích dữ liệu sức khỏe của bạn...' },
    excited: { emoji: '🤩', message: 'Tuyệt vời! Bạn đã đạt mục tiêu hôm nay!' },
    tired: { emoji: '😴', message: 'Bạn cần nghỉ ngơi. Hãy uống nước và thư giãn.' },
    helpful: { emoji: '🤝', message: 'Tôi luôn sẵn sàng giúp bạn đạt mục tiêu sức khỏe.' }
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
    heroCard: {
      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      borderRadius: '16px',
      padding: '40px',
      color: 'white',
      marginBottom: '32px',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '12px'
    },
    heroText: {
      fontSize: '14px',
      opacity: 0.9
    },
    avatarContainer: {
      background: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px',
      textAlign: 'center'
    },
    avatarDisplay: {
      fontSize: '200px',
      marginBottom: '20px',
      lineHeight: '1'
    },
    avatarName: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    avatarMessage: {
      fontSize: '16px',
      color: '#475569',
      marginBottom: '24px',
      fontStyle: 'italic'
    },
    moodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px',
      marginBottom: '24px'
    },
    moodBtn: {
      padding: '12px 16px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      background: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s'
    },
    moodBtnActive: {
      borderColor: '#06b6d4',
      background: '#ecf7ff'
    },
    interactionCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    actionBtnGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px'
    },
    actionBtn: {
      padding: '12px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 20% { transform: rotate(14deg); }
          30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          40%, 60%, 80% { transform: rotate(10deg); }
        }
        .avatar-wave {
          animation: wave 1s ease-in-out;
          display: inline-block;
          transform-origin: 70% 70%;
        }
      `}</style>

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
          <h1 style={styles.title}>🤖 Avatar 3D tương tác</h1>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroTitle}>Gặp SmartFood AI</div>
          <div style={styles.heroText}>
            Trợ lý ảo tương tác giúp bạn đạt mục tiêu sức khỏe
          </div>
        </div>

        <div style={styles.avatarContainer}>
          <div 
            style={styles.avatarDisplay}
            className={mood === 'happy' ? 'avatar-wave' : ''}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {moods[mood].emoji}
          </div>
          <div style={styles.avatarName}>SmartFood AI</div>
          <div style={styles.avatarMessage}>{moods[mood].message}</div>

          <div style={styles.moodGrid}>
            {Object.entries(moods).map(([key, data]) => (
              <button
                key={key}
                style={{
                  ...styles.moodBtn,
                  ...(mood === key ? styles.moodBtnActive : {})
                }}
                onClick={() => {
                  setMood(key);
                  setMessage(data.message);
                }}
              >
                {data.emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.interactionCard}>
          <div style={styles.cardTitle}>💬 Tương tác với Avatar</div>
          <div style={styles.actionBtnGrid}>
            <button 
              style={styles.actionBtn}
              onClick={() => setMessage('💪 Hôm nay bạn đã ăn đủ protein rồi!')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Kiểm tra Protein
            </button>
            <button 
              style={styles.actionBtn}
              onClick={() => setMessage('🌟 Bạn đã hoàn thành 95% mục tiêu hôm nay. Tuyệt vời!')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Kiểm tra tiến độ
            </button>
            <button 
              style={styles.actionBtn}
              onClick={() => setMessage('🥗 Tôi gợi ý bạn ăn salad gà với rau xanh cho bữa trưa.')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Gợi ý bữa ăn
            </button>
            <button 
              style={styles.actionBtn}
              onClick={() => setMessage('🎯 Tôi đã tạo thực đơn 7 ngày cho bạn. Bạn muốn xem chi tiết?')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Thực đơn 7 ngày
            </button>
            <button 
              style={styles.actionBtn}
              onClick={() => setMessage('📊 Báo cáo sức khỏe của bạn có sẵn. Tổng điểm: 78/100')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Báo cáo hôm nay
            </button>
            <button 
              style={styles.actionBtn}
              onClick={() => setMessage('🛍️ Hãy để tôi gợi ý những sản phẩm healthy phù hợp với bạn!')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Gợi ý sản phẩm
            </button>
          </div>
        </div>

        <div style={styles.interactionCard}>
          <div style={styles.cardTitle}>Tính năng Avatar</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {[
              '✨ Phản ứng theo cảm xúc',
              '🗣️ Hỗ trợ thoại (sắp ra mắt)',
              '🎨 Giao diện 3D tuyệt đẹp',
              '💡 AI thông minh tương tác',
              '📱 Tương thích mọi thiết bị',
              '🌍 Hỗ trợ tiếng Việt'
            ].map((feature, idx) => (
              <div key={idx} style={{ fontSize: '13px', color: '#475569', padding: '12px' }}>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarPage;
