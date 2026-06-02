import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMic } from 'react-icons/fi';

function VoiceAssistantPage() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const mockCommands = {
    'thực đơn': 'Tôi gợi ý thực đơn cân bằng với phở bò sáng, cơm tấm trưa, và cá hấp tối.',
    'calories': 'Lượng calories hôm nay của bạn là 2100 cal, mục tiêu 2200 cal. Bạn đang đúng đặc!',
    'sản phẩm': 'Có 45 sản phẩm healthy mới được thêm. Bạn muốn tìm gì?',
    'giỏ hàng': 'Giỏ hàng của bạn có 5 sản phẩm, tổng 1.2 triệu đồng. Bạn sẽ được miễn ship!',
    'thanh toán': 'Tiếp tục đến trang thanh toán? Tôi sẽ hướng dẫn bạn.',
    'hôm nay': 'Hôm nay bạn đã ăn 2100 calories. Còn 100 calories để đạt mục tiêu.'
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('Đang lắng nghe...');
    
    setTimeout(() => {
      const commands = Object.keys(mockCommands);
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(`Bạn nói: "${randomCommand}"`);
      setResponse(mockCommands[randomCommand]);
      setIsListening(false);
    }, 2000);
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
      color: '#374151'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937'
    },
    heroCard: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
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
      opacity: 0.9,
      marginBottom: '24px'
    },
    micButton: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      border: 'none',
      background: isListening 
        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' 
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      fontSize: '48px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      transition: 'all 0.2s',
      boxShadow: isListening 
        ? '0 0 40px rgba(255,107,107,0.5)' 
        : '0 12px 24px rgba(16, 185, 129, 0.3)'
    },
    listeningDot: isListening ? {
      width: '16px',
      height: '16px',
      background: '#fff',
      borderRadius: '50%',
      position: 'absolute',
      animation: 'pulse 1s infinite',
      top: '-30px'
    } : {},
    commandCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    commandTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    commandItem: {
      padding: '12px 16px',
      background: '#f3f4f6',
      borderRadius: '12px',
      marginBottom: '8px',
      fontSize: '13px',
      color: '#4b5563',
      borderLeft: '4px solid #3b82f6',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    transcriptBox: {
      background: '#eff6ff',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      borderLeft: '4px solid #3b82f6',
      fontSize: '14px',
      color: '#1e40af'
    },
    responseBox: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      borderRadius: '12px',
      padding: '16px',
      borderLeft: '4px solid #10b981',
      fontSize: '14px',
      color: '#065f46'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes pulse-ring {
          0% { 
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 30px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
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
          <h1 style={styles.title}>🎤 Voice Assistant</h1>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroTitle}>Trợ lý thoại thông minh</div>
          <div style={styles.heroText}>
            Nói lệnh để điều khiển SmartFood. "Thực đơn", "Calories", "Giỏ hàng"...
          </div>
          
          <button 
            style={styles.micButton}
            onClick={startListening}
            disabled={isListening}
          >
            <FiMic />
          </button>
          
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            {isListening ? 'Đang lắng nghe... 🔴' : 'Nhấp để bắt đầu lắng nghe'}
          </div>
        </div>

        {transcript && (
          <div style={styles.commandCard}>
            <div style={styles.transcriptBox}>
              🎤 <strong>{transcript}</strong>
            </div>
            
            {response && (
              <div style={styles.responseBox}>
                ✨ <strong>SmartFood:</strong> {response}
              </div>
            )}
          </div>
        )}

        <div style={styles.commandCard}>
          <div style={styles.commandTitle}>💡 Các lệnh phổ biến</div>
          {[
            'Gợi ý thực đơn hôm nay',
            'Tính calories của tôi',
            'Sản phẩm mới',
            'Kiểm tra giỏ hàng',
            'Thanh toán',
            'Thông tin hôm nay'
          ].map((cmd, idx) => (
            <div 
              key={idx}
              style={styles.commandItem}
              onClick={() => {
                setTranscript(`Bạn nói: "${cmd}"`);
                setResponse(mockCommands[cmd.toLowerCase()] || 'Tôi không hiểu. Hãy thử lệnh khác.');
              }}
              onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
            >
              {cmd}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoiceAssistantPage;
