import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { categories } from "../../constants/productsData";

function CategoriesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    { id: "giam-can", name: "Giảm cân", emoji: "💪" },
    { id: "tang-co", name: "Tăng cơ", emoji: "🏋️" },
    { id: "eat-clean", name: "Eat Clean", emoji: "🥗" },
    { id: "healthy", name: "Healthy Lifestyle", emoji: "❤️" },
  ];

  // Mock category data with descriptions and product counts
  const categoriesWithData = useMemo(() => {
    return categories.map((cat, idx) => ({
      ...cat,
      description: [
        "Rau quả tươi sạch từ nông trại địa phương",
        "Thịt, cá, hải sản chất lượng cao",
        "Trái cây nhập khẩu và trong nước",
        "Sữa tươi, trứng, phô mai",
        "Nước, trà, cà phê, sữa hạt",
        "Thức ăn nhanh lành mạnh, tiện lợi",
        "Bánh mì tươi, bánh ngọt, kẹo",
        "Ngũ cốc dinh dưỡng, hạt chia, quinoa",
      ][idx] || "Sản phẩm chất lượng",
      count: Math.floor(Math.random() * 20) + 5,
      isFeatured: idx < 3,
      rating: (Math.random() * 0.9 + 4.5).toFixed(1),
    }));
  }, []);

  // AI Recommended categories based on goal
  const aiRecommended = useMemo(() => {
    const recommendations = {
      "giam-can": ["rau-cu", "trai-cay", "do-uong"],
      "tang-co": ["thit-ca", "sua-trung", "ngu-coc"],
      "eat-clean": ["rau-cu", "thit-ca", "trai-cay"],
      "healthy": ["rau-cu", "trai-cay", "sua-trung", "ngu-coc"],
    };

    if (selectedGoal && recommendations[selectedGoal]) {
      return categoriesWithData.filter((cat) =>
        recommendations[selectedGoal].includes(cat.id)
      );
    }
    return categoriesWithData.slice(0, 4);
  }, [selectedGoal, categoriesWithData]);

  // Filter categories by search
  const filteredCategories = categoriesWithData.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Featured categories (Flash Sale, Best Seller, etc.)
  const featured = categoriesWithData.filter((cat) => cat.isFeatured);

  const handleCategoryClick = (categoryId) => {
    navigate(`/?category=${categoryId}`);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <h1 style={styles.pageTitle}>🍎 Danh Mục Sản Phẩm</h1>
          <p style={styles.pageSubtitle}>
            Khám phá hàng trăm sản phẩm sạch, tươi, dinh dưỡng cho bạn và gia đình
          </p>

          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <FiSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* AI Recommended Categories */}
        <div style={styles.aiSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>🤖 AI Gợi Ý Danh Mục Cho Bạn</h2>
            <p style={styles.sectionSubtitle}>
              Chọn mục tiêu sức khỏe để nhận gợi ý danh mục phù hợp
            </p>
          </div>

          {/* Goal Selection */}
          <div style={styles.goalsContainer}>
            <button
              style={{
                ...styles.goalBtn,
                ...(selectedGoal === null && styles.goalBtnActive),
              }}
              onClick={() => setSelectedGoal(null)}
            >
              Xem Tất Cả
            </button>
            {goals.map((goal) => (
              <button
                key={goal.id}
                style={{
                  ...styles.goalBtn,
                  ...(selectedGoal === goal.id && styles.goalBtnActive),
                }}
                onClick={() => setSelectedGoal(goal.id)}
              >
                {goal.emoji} {goal.name}
              </button>
            ))}
          </div>

          {/* AI Recommended Grid */}
          <div style={styles.categoriesGrid}>
            {aiRecommended.map((cat) => (
              <div key={cat.id} style={styles.categoryCard}>
                <div style={styles.cardImage}>
                  <img src={cat.img} alt={cat.title} style={styles.img} />
                  <div style={styles.badge}>AI Pick</div>
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{cat.title}</h3>
                  <p style={styles.cardDescription}>{cat.description}</p>
                  <div style={styles.cardMeta}>
                    <span style={styles.productCount}>{cat.count} sản phẩm</span>
                    <span style={styles.rating}>⭐ {cat.rating}</span>
                  </div>
                  <button
                    style={styles.viewBtn}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    Xem ngay <FiArrowRight style={{ marginLeft: 4 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div style={styles.featuredSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>🔥 Danh Mục Nổi Bật</h2>
          </div>
          <div style={styles.featuredGrid}>
            {featured.map((cat) => (
              <div
                key={cat.id}
                style={styles.featuredCard}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <img src={cat.img} alt={cat.title} style={styles.featuredImg} />
                <div style={styles.featuredOverlay}>
                  <h3 style={styles.featuredTitle}>{cat.title}</h3>
                  <p style={styles.featuredCount}>{cat.count} sản phẩm</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div style={styles.allCategoriesSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>📂 Tất Cả Danh Mục</h2>
            <p style={styles.sectionSubtitle}>
              {filteredCategories.length} danh mục
            </p>
          </div>

          {filteredCategories.length > 0 ? (
            <div style={styles.categoriesGrid}>
              {filteredCategories.map((cat) => (
                <div key={cat.id} style={styles.categoryCard}>
                  <div style={styles.cardImage}>
                    <img src={cat.img} alt={cat.title} style={styles.img} />
                    {cat.isFeatured && (
                      <div style={{ ...styles.badge, background: "#ef4444" }}>
                        HOT
                      </div>
                    )}
                  </div>
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{cat.title}</h3>
                    <p style={styles.cardDescription}>{cat.description}</p>
                    <div style={styles.cardMeta}>
                      <span style={styles.productCount}>{cat.count} sản phẩm</span>
                      <span style={styles.rating}>⭐ {cat.rating}</span>
                    </div>
                    <button
                      style={styles.viewBtn}
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      Xem ngay <FiArrowRight style={{ marginLeft: 4 }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>
                Không tìm thấy danh mục "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🚚</span>
            <h3 style={styles.infoTitle}>Giao hàng nhanh</h3>
            <p style={styles.infoText}>Miễn phí giao hàng từ 100k</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>✓</span>
            <h3 style={styles.infoTitle}>Chất lượng đảm bảo</h3>
            <p style={styles.infoText}>Sản phẩm tươi, sạch, an toàn</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🤖</span>
            <h3 style={styles.infoTitle}>AI Gợi ý</h3>
            <p style={styles.infoText}>Gợi ý cá nhân theo sức khỏe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "0 24px",
  },

  // Header
  headerSection: {
    marginBottom: "40px",
    textAlign: "center",
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: "8px",
  },
  pageSubtitle: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "12px",
    padding: "12px 16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  searchIcon: {
    marginRight: "12px",
    color: "#9ca3af",
    fontSize: "20px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    fontFamily: "inherit",
  },

  // AI Section
  aiSection: {
    marginBottom: "48px",
  },
  sectionHeader: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
  },
  sectionSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },
  goalsContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  goalBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    background: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  goalBtnActive: {
    borderColor: "#10b981",
    background: "#ecfdf5",
    color: "#059669",
  },

  // Categories Grid
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  categoryCard: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  cardImage: {
    position: "relative",
    paddingBottom: "75%",
    overflow: "hidden",
    background: "#f3f4f6",
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#10b981",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
  },
  cardContent: {
    padding: "16px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
    lineHeight: "1.4",
  },
  cardDescription: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "12px",
    lineHeight: "1.4",
  },
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    marginBottom: "12px",
  },
  productCount: {
    color: "#6b7280",
  },
  rating: {
    color: "#f59e0b",
  },
  viewBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease",
  },

  // Featured Section
  featuredSection: {
    marginBottom: "48px",
  },
  featuredGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  featuredCard: {
    position: "relative",
    paddingBottom: "66%",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  featuredImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  featuredOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
    color: "white",
    padding: "24px 16px",
  },
  featuredTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  featuredCount: {
    fontSize: "13px",
    opacity: 0.9,
  },

  // All Categories Section
  allCategoriesSection: {
    marginBottom: "48px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "white",
    borderRadius: "12px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#6b7280",
  },

  // Info Section
  infoSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  infoCard: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  infoIcon: {
    fontSize: "32px",
    display: "block",
    marginBottom: "12px",
  },
  infoTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
  },
  infoText: {
    fontSize: "13px",
    color: "#6b7280",
  },
};

export default CategoriesPage;
