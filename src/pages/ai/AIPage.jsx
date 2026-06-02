import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from "../../components/ai/ChatBot";

const features = [
  {
    title: "AI phân tích giỏ hàng",
    description: "Phân tích chi tiết giỏ hàng, dinh dưỡng và gợi ý tối ưu.",
    icon: "📊",
    path: "/ai/cart-analysis",
    color: "#667eea"
  },
  {
    title: "AI tạo thực đơn",
    description: "Tạo thực đơn tự động theo mục tiêu sức khỏe của bạn.",
    icon: "🍽️",
    path: "/ai/meal-planner",
    color: "#f97316"
  },
  {
    title: "Food Scanner AI",
    description: "Quét ảnh thực phẩm để phân tích calories và dinh dưỡng.",
    icon: "📷",
    path: "/ai/food-scanner",
    color: "#ec4899"
  },
  {
    title: "Voice Assistant",
    description: "Điều khiển ứng dụng bằng giọng nói một cách thông minh.",
    icon: "🎤",
    path: "/ai/voice-assistant",
    color: "#3b82f6"
  },
  {
    title: "Daily Health Report",
    description: "Báo cáo sức khỏe hàng ngày với tất cả chỉ số quan trọng.",
    icon: "📋",
    path: "/ai/health-report",
    color: "#8b5cf6"
  },
  {
    title: "Avatar 3D tương tác",
    description: "Gặp gỡ trợ lý AI 3D thông minh của SmartFood.",
    icon: "🤖",
    path: "/ai/avatar",
    color: "#06b6d4"
  }
];

function AIPage() {
  const navigate = useNavigate();
  return (
    <div className="ai-page-wrapper">
      <style>{enhancedResponsiveStyles}</style>
      
      <div className="ai-hero-panel">
        <div className="ai-hero-content">
          
          {/* Column Left: Content & Visual Features */}
          <div className="ai-hero-text">
            <div className="ai-badge">
              <span className="ai-badge-icon">✨</span>
              <span className="ai-badge-text">AI Assistant</span>
            </div>

            <h1 className="ai-title">
              Trợ lý ảo <span className="ai-highlight-text">Smart Food</span>
            </h1>

            <p className="ai-description">
              Hỏi ngay trợ lý về món ăn healthy, gợi ý thực đơn, thông tin sản phẩm 
              và chăm sóc sức khỏe. Luôn sẵn sàng hỗ trợ bạn 24/7.
            </p>

            <div className="ai-feature-grid">
              {features.map((item, index) => (
                <div 
                  key={item.title} 
                  className="ai-feature-card"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    borderLeft: `4px solid ${item.color}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 40px ${item.color}20`;
                    e.currentTarget.style.borderColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  <div className="ai-card-body" style={{ textAlign: 'center', padding: '28px 20px' }}>
                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>
                      {item.icon}
                    </span>
                    <h3 className="ai-feature-title">{item.title}</h3>
                    <p className="ai-feature-description">{item.description}</p>
                  </div>
                  <div style={{ 
                    padding: '12px 20px', 
                    background: `${item.color}10`,
                    color: item.color,
                    fontWeight: '600',
                    fontSize: '12px',
                    textAlign: 'center',
                    borderTop: `1px solid ${item.color}20`
                  }}>
                    Khám phá →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Right: Chat Interface */}
          <div className="ai-chat-panel">
            <div className="ai-chat-shell">
              <div className="ai-chat-header">
                <div className="ai-chat-header-left">
                  <div className="ai-avatar">
                    <span className="ai-avatar-icon">🤖</span>
                  </div>
                  <div>
                    <h4 className="ai-chat-title">Smart Food AI</h4>
                    <p className="ai-chat-status">
                      <span className="ai-status-dot"></span>
                      Trực tuyến
                    </p>
                  </div>
                </div>
                <button className="ai-menu-button">☰</button>
              </div>

              <div className="ai-chat-content">
                <ChatBot />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Hệ thống CSS mới bao quát giao diện chứa ảnh và Responsive chuẩn hóa cho Mobile
const enhancedResponsiveStyles = `
  .ai-page-wrapper {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  
  .ai-hero-panel {
    background: linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%);
    border-radius: 32px;
    padding: 40px;
    margin-bottom: 24px;
    box-shadow: 0 28px 70px rgba(15, 23, 42, 0.06);
  }
  
  .ai-hero-content {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 48px;
    align-items: flex-start;
  }
  
  .ai-hero-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .ai-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border-radius: 50px;
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(34, 197, 94, 0.35);
    width: fit-content;
  }
  
  .ai-badge-icon {
    font-size: 1rem;
  }
  
  .ai-title {
    margin: 0 0 16px;
    color: #0f172a;
    font-size: 2.75rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  
  .ai-highlight-text {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .ai-description {
    margin: 0 0 32px;
    color: #475569;
    font-size: 1.05rem;
    line-height: 1.8;
    max-width: 600px;
  }
  
  .ai-feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .ai-feature-card {
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
    border: 1px solid rgba(15, 23, 42, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    animation: ai-fadeInUp 0.6s ease forwards;
    opacity: 0;
  }
  
  .ai-feature-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(34, 197, 94, 0.12);
    border-color: rgba(34, 197, 94, 0.25);
  }

  .ai-feature-card:hover .ai-card-image {
    transform: scale(1.06);
  }
  
  .ai-card-image-wrapper {
    position: relative;
    width: 100%;
    height: 140px;
    overflow: hidden;
    background: #f1f5f9;
  }

  .ai-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .ai-card-icon-badge {
    position: absolute;
    bottom: -16px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    z-index: 2;
  }

  .ai-card-body {
    padding: 28px 20px 20px;
    flex-grow: 1;
  }
  
  .ai-feature-title {
    margin: 0;
    color: #0f172a;
    font-size: 1.05rem;
    font-weight: 700;
  }
  
  .ai-feature-description {
    margin: 8px 0 0;
    color: #64748b;
    line-height: 1.6;
    font-size: 0.875rem;
  }
  
  .ai-chat-panel {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 24px;
  }
  
  .ai-chat-shell {
    width: 100%;
    max-width: 460px;
    height: 620px;
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.06);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .ai-chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) ;
  }
  
  .ai-chat-header-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  
  .ai-avatar {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }
  
  .ai-avatar-icon {
    font-size: 1.4rem;
  }
  
  .ai-chat-title {
    margin: 0 0 4px;
    color: #0f172a;
    font-size: 1rem;
    font-weight: 700;
  }
  
  .ai-chat-status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    color: #22c55e;
    font-size: 0.813rem;
    font-weight: 500;
  }
  
  .ai-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    position: relative;
  }
  
  .ai-status-dot::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: ai-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .ai-menu-button {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    background: #ffffff;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;
  }
  
  .ai-menu-button:hover {
    background: #f8fafc;
    transform: scale(1.05);
  }
  
  .ai-chat-content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }

  /* --- RESPONSIVE MEDIA QUERIES --- */
  @media (max-width: 1200px) {
    .ai-hero-content {
      grid-template-columns: 1.1fr 1fr;
      gap: 32px;
    }
    .ai-title {
      font-size: 2.4rem;
    }
  }
  
  @media (max-width: 1024px) {
    .ai-hero-content {
      grid-template-columns: 1fr;
    }
    
    .ai-hero-panel {
      padding: 32px;
    }
    
    .ai-chat-panel {
      justify-content: center;
      margin-top: 24px;
      position: relative;
      top: 0;
    }
    
    .ai-chat-shell {
      max-width: 100%;
      height: 580px;
    }
  }
  
  @media (max-width: 640px) {
    .ai-page-wrapper {
      padding: 12px;
    }
    
    .ai-hero-panel {
      padding: 20px;
      border-radius: 24px;
    }
    
    .ai-title {
      font-size: 1.85rem;
    }
    
    .ai-feature-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .ai-card-image-wrapper {
      height: 160px;
    }
  }
  
  /* --- ANIMATIONS --- */
  @keyframes ai-pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2.6);
      opacity: 0;
    }
  }
  
  @keyframes ai-fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default AIPage;