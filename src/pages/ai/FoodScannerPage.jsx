import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiUpload } from 'react-icons/fi';

function FoodScannerPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const mockFoodDatabase = {
    'phở': { name: 'Phở bò', calories: 450, protein: 28, carbs: 48, fat: 12, category: 'Noodles' },
    'cơm': { name: 'Cơm Tấm', calories: 380, protein: 12, carbs: 65, fat: 8, category: 'Rice' },
    'spring': { name: 'Cuộn Spring', calories: 280, protein: 8, carbs: 35, fat: 10, category: 'Rolls' },
    'cà phê': { name: 'Cà phê Đen', calories: 35, protein: 0.5, carbs: 0, fat: 0.1, category: 'Beverage' },
    'banana': { name: 'Chuối', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, category: 'Fruit' },
    'apple': { name: 'Táo', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, category: 'Fruit' },
    'salad': { name: 'Salad rau xanh', calories: 180, protein: 6, carbs: 15, fat: 8, category: 'Vegetable' }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result);
        // Mock AI scan - in real app, send to backend ML model
        setTimeout(() => {
          const foods = Object.values(mockFoodDatabase);
          const randomFood = foods[Math.floor(Math.random() * foods.length)];
          setScanResult({
            detected: randomFood.name,
            confidence: (90 + Math.random() * 10).toFixed(0),
            nutrition: randomFood,
            message: `Phát hiện: ${randomFood.name} - Độ chính xác ${(90 + Math.random() * 10).toFixed(0)}%`
          });
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
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
      background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
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
    uploadZone: {
      background: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    uploadBox: {
      border: '2px dashed #e5e7eb',
      borderRadius: '12px',
      padding: '40px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: '#f9fafb'
    },
    uploadBoxActive: {
      borderColor: '#ec4899',
      background: '#fce7f3'
    },
    uploadIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    uploadText: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    uploadSubtext: {
      fontSize: '13px',
      color: '#6b7280'
    },
    previewCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    previewImage: {
      width: '100%',
      maxHeight: '300px',
      borderRadius: '12px',
      objectFit: 'cover',
      marginBottom: '20px'
    },
    resultCard: {
      background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      borderRadius: '16px',
      padding: '24px',
      color: 'white',
      marginBottom: '24px'
    },
    resultTitle: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    resultMessage: {
      fontSize: '14px',
      opacity: 0.95
    },
    nutritionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px',
      marginTop: '20px'
    },
    nutritionBox: {
      background: 'rgba(255,255,255,0.15)',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center'
    },
    nutritionValue: {
      fontSize: '16px',
      fontWeight: '700'
    },
    nutritionLabel: {
      fontSize: '11px',
      opacity: 0.8,
      marginTop: '4px'
    },
    hidden: {
      display: 'none'
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
          <h1 style={styles.title}>📷 Food Scanner</h1>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroTitle}>Quét ảnh thực phẩm</div>
          <div style={styles.heroText}>
            Chụp ảnh và AI sẽ phân tích lượng calories & dinh dưỡng tự động
          </div>
        </div>

        <div style={styles.uploadZone}>
          <div 
            style={{...styles.uploadBox}}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); }}
          >
            <div style={styles.uploadIcon}>📸</div>
            <div style={styles.uploadText}>Tải ảnh lên hoặc kéo thả</div>
            <div style={styles.uploadSubtext}>Hỗ trợ JPG, PNG - Max 5MB</div>
          </div>
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={styles.hidden}
            onChange={handleImageUpload}
          />
        </div>

        {imagePreview && (
          <div style={styles.previewCard}>
            <img src={imagePreview} alt="Preview" style={styles.previewImage} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '12px',
                background: '#ec4899',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <FiUpload style={{ marginRight: '8px', display: 'inline' }} />
              Chọn ảnh khác
            </button>
          </div>
        )}

        {scanResult && (
          <div style={styles.resultCard}>
            <div style={styles.resultTitle}>
              ✅ {scanResult.message}
            </div>
            <div style={styles.resultMessage}>
              Phát hiện: <strong>{scanResult.detected}</strong>
            </div>
            
            <div style={styles.nutritionGrid}>
              <div style={styles.nutritionBox}>
                <div style={styles.nutritionValue}>{scanResult.nutrition.calories}</div>
                <div style={styles.nutritionLabel}>Calories (kcal)</div>
              </div>
              <div style={styles.nutritionBox}>
                <div style={styles.nutritionValue}>{scanResult.nutrition.protein}g</div>
                <div style={styles.nutritionLabel}>Protein</div>
              </div>
              <div style={styles.nutritionBox}>
                <div style={styles.nutritionValue}>{scanResult.nutrition.carbs}g</div>
                <div style={styles.nutritionLabel}>Carbs</div>
              </div>
              <div style={styles.nutritionBox}>
                <div style={styles.nutritionValue}>{scanResult.nutrition.fat}g</div>
                <div style={styles.nutritionLabel}>Fat</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodScannerPage;
