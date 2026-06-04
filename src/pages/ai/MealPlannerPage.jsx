import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function MealPlannerPage() {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState(null);
  const [dietType, setDietType] = useState('balanced');

  const generateMealPlan = () => {
    const plans = {
      balanced: {
        name: 'Cân bằng',
        meals: [
          { time: 'Sáng 7:00', dish: 'Cơm tấm sườn nước mắm + canh chua cá', calories: 650, protein: 28 },
          { time: 'Xế chiều 10:00', dish: 'Chè hạt sen đậu xanh', calories: 180, protein: 5 },
          { time: 'Trưa 12:30', dish: 'Bún chả Hà Nội + nước chấm', calories: 720, protein: 32 },
          { time: 'Tối 17:00', dish: 'Yogurt + trái cây tươi', calories: 220, protein: 8 },
          { time: 'Tối 19:30', dish: 'Canh rau cải + cá hấp ginger', calories: 520, protein: 35 }
        ],
        totalCalories: 2290,
        totalProtein: 108
      },
      healthyLosing: {
        name: 'Giảm cân healthy',
        meals: [
          { time: 'Sáng 7:00', dish: 'Trứng cuộn rau + nước chanh', calories: 380, protein: 22 },
          { time: 'Xế chiều 10:00', dish: 'Trái cây tươi (táo, lê)', calories: 140, protein: 1 },
          { time: 'Trưa 12:30', dish: 'Salad gà nướng + dressing lạnh', calories: 450, protein: 35 },
          { time: 'Tối 17:00', dish: 'Sữa chua Hy Lạp', calories: 120, protein: 15 },
          { time: 'Tối 19:30', dish: 'Soup rau quả + cá trắng hấp', calories: 350, protein: 28 }
        ],
        totalCalories: 1440,
        totalProtein: 101
      },
      muscleGain: {
        name: 'Tăng cơ bắp',
        meals: [
          { time: 'Sáng 7:00', dish: 'Trứng tươi + bánh mỳ ngũ cốc + sữa', calories: 580, protein: 40 },
          { time: 'Xế chiều 10:00', dish: 'Protein shake + hạt nhân', calories: 350, protein: 30 },
          { time: 'Trưa 12:30', dish: 'Gà nướng + cơm lứt + rau luộc', calories: 850, protein: 50 },
          { time: 'Tối 17:00', dish: 'Phô mai + hạt hạnh nhân + táo', calories: 380, protein: 22 },
          { time: 'Tối 19:30', dish: 'Cá hồi nướng + khoai lang + brocoli', calories: 720, protein: 48 }
        ],
        totalCalories: 2880,
        totalProtein: 190
      }
    };
    setMealPlan(plans[dietType]);
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
      color: '#374151',
      transition: 'all 0.2s'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937'
    },
    heroCard: {
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
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
    dietSelector: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '24px'
    },
    dietBtn: {
      padding: '10px 20px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s',
      background: 'rgba(255,255,255,0.2)'
    },
    generateBtn: {
      background: 'white',
      color: '#f97316',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 28px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '12px'
    },
    mealCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '24px'
    },
    mealPlanTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '24px'
    },
    mealItem: {
      padding: '16px',
      marginBottom: '12px',
      background: '#f9fafb',
      borderRadius: '12px',
      borderLeft: '4px solid #f97316'
    },
    mealTime: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#f97316',
      marginBottom: '4px'
    },
    mealDish: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    mealStats: {
      display: 'flex',
      gap: '20px',
      fontSize: '12px',
      color: '#6b7280'
    },
    summary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginTop: '24px'
    },
    summaryBox: {
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      borderRadius: '12px',
      padding: '20px',
      color: 'white',
      textAlign: 'center'
    },
    summaryValue: {
      fontSize: '24px',
      fontWeight: '700'
    },
    summaryLabel: {
      fontSize: '12px',
      opacity: 0.9,
      marginTop: '4px'
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
          <h1 style={styles.title}>🍽️ Thực đơn AI</h1>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroTitle}>Tạo thực đơn tự động theo mục tiêu</div>
          <div style={styles.heroText}>
            Nhận gợi ý bữa ăn cân bằng từ AI SmartFood
          </div>
          <div style={styles.dietSelector}>
            {[
              { id: 'balanced', label: 'Cân bằng' },
              { id: 'healthyLosing', label: 'Giảm cân' },
              { id: 'muscleGain', label: 'Tăng cơ' }
            ].map(diet => (
              <button
                key={diet.id}
                style={{
                  ...styles.dietBtn,
                  background: dietType === diet.id ? 'white' : 'rgba(255,255,255,0.2)',
                  color: dietType === diet.id ? '#f97316' : 'white'
                }}
                onClick={() => setDietType(diet.id)}
              >
                {diet.label}
              </button>
            ))}
          </div>
          <button 
            style={styles.generateBtn}
            onClick={generateMealPlan}
          >
            🍽️ Tạo thực đơn
          </button>
        </div>

        {mealPlan && (
          <div style={styles.mealCard}>
            <div style={styles.mealPlanTitle}>
              📅 Thực đơn {mealPlan.name} - Hôm nay
            </div>
            
            {mealPlan.meals.map((meal, idx) => (
              <div key={idx} style={styles.mealItem}>
                <div style={styles.mealTime}>{meal.time}</div>
                <div style={styles.mealDish}>{meal.dish}</div>
                <div style={styles.mealStats}>
                  <span>🔥 {meal.calories} kcal</span>
                  <span>🥚 {meal.protein}g protein</span>
                </div>
              </div>
            ))}

            <div style={styles.summary}>
              <div style={styles.summaryBox}>
                <div style={styles.summaryValue}>{mealPlan.totalCalories}</div>
                <div style={styles.summaryLabel}>Tổng Calories</div>
              </div>
              <div style={styles.summaryBox}>
                <div style={styles.summaryValue}>{mealPlan.totalProtein}g</div>
                <div style={styles.summaryLabel}>Tổng Protein</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealPlannerPage;
