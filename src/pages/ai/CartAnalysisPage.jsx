import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBarChart2, FiTrendingUp, FiAward } from 'react-icons/fi';
import useCartStore from '../../stores/cartStore';

function CartAnalysisPage() {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  
  const [analysis, setAnalysis] = useState(null);

  const analyzeCart = () => {
    if (cartItems.length === 0) {
      setAnalysis({
        message: 'Giỏ hàng trống! Thêm sản phẩm để nhận phân tích.',
        score: 0,
        insights: []
      });
      return;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const itemCount = cartItems.length;
    const avgPrice = totalPrice / itemCount;
    
    // Phân tích sơ bộ
    const insights = [];
    
    if (totalPrice < 100000) insights.push('💡 Bạn có thể mua thêm để được miễn phí ship (mục tiêu 500k)');
    if (itemCount > 10) insights.push('⚠️ Giỏ hàng có khá nhiều sản phẩm, hãy kiểm tra lại lựa chọn');
    if (avgPrice > 500000) insights.push('🎯 Bạn chọn các sản phẩm premium chất lượng cao');
    
    const healthScore = Math.min(100, 50 + (itemCount * 5) + (totalPrice > 500000 ? 20 : 0));
    
    setAnalysis({
      message: `Phân tích giỏ hàng: ${itemCount} sản phẩm, ${totalPrice.toLocaleString('vi-VN')}đ`,
      score: healthScore,
      insights,
      stats: {
        total: totalPrice,
        items: itemCount,
        average: avgPrice
      }
    });
  };

  const styles = {
    pageWrapper: { 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '24px', 
      display: 'flex', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    },
    contentWrapper: { 
      width: '100%', 
      maxWidth: '900px' 
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
      color: '#374151',
      transition: 'all 0.2s'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937'
    },
    heroCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '40px',
      color: 'white',
      marginBottom: '32px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
    },
    heroTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '12px'
    },
    heroText: {
      fontSize: '14px',
      opacity: 0.9,
      marginBottom: '24px'
    },
    analyzeBtn: {
      background: 'white',
      color: '#667eea',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 28px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    analysisCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    scoreBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      paddingBottom: '24px',
      borderBottom: '1px solid #f3f4f6'
    },
    scoreCircle: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
    },
    scoreText: {
      fontSize: '12px',
      opacity: 0.9
    },
    scoreNumber: {
      fontSize: '32px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginTop: '24px'
    },
    statBox: {
      background: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#667eea',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280'
    },
    insightsList: {
      marginTop: '24px'
    },
    insightItem: {
      padding: '16px',
      marginBottom: '12px',
      background: '#f0f9ff',
      borderLeft: '4px solid #667eea',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1e40af',
      lineHeight: '1.6'
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
          <h1 style={styles.title}>📊 Phân tích Giỏ hàng</h1>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroTitle}>🤖 SmartFood AI Cart Analysis</div>
          <div style={styles.heroText}>
            Phân tích chi tiết giỏ hàng của bạn, lợi ích dinh dưỡng và gợi ý tối ưu
          </div>
          <button 
            style={styles.analyzeBtn}
            onClick={analyzeCart}
            onMouseEnter={(e) => e.target.transform = 'scale(1.05)'}
          >
            <FiBarChart2 style={{ marginRight: '8px', display: 'inline' }} />
            Phân tích giỏ hàng
          </button>
        </div>

        {analysis && (
          <div style={styles.analysisCard}>
            <div style={styles.scoreBox}>
              <div style={styles.scoreCircle}>
                <div style={styles.scoreNumber}>{analysis.score}</div>
                <div style={styles.scoreText}>điểm</div>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  {analysis.message}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  ⭐ {analysis.score >= 80 ? 'Chọn hàng tuyệt vời!' : analysis.score >= 60 ? 'Bộ sưu tập tốt' : 'Cần cân nhắc thêm'}
                </div>
              </div>
            </div>

            {analysis.stats && (
              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <div style={styles.statValue}>{analysis.stats.items}</div>
                  <div style={styles.statLabel}>Sản phẩm</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statValue}>{(analysis.stats.total / 1000).toFixed(0)}k</div>
                  <div style={styles.statLabel}>Tổng tiền</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statValue}>{(analysis.stats.average / 1000).toFixed(0)}k</div>
                  <div style={styles.statLabel}>Giá trung bình</div>
                </div>
              </div>
            )}

            {analysis.insights.length > 0 && (
              <div style={styles.insightsList}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                  💡 Gợi ý thông minh
                </h3>
                {analysis.insights.map((insight, idx) => (
                  <div key={idx} style={styles.insightItem}>
                    {insight}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartAnalysisPage;
