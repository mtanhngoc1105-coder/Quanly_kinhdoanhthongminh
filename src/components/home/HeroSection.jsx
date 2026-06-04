import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";

function HeroSection() {
  const navigate = useNavigate();

  const styles = {
    heroContainer: {
      width: "100%",
      background: "linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)",
      padding: "40px 24px",
      overflow: "hidden",
    },
    heroContent: {
      maxWidth: "1400px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "48px",
      alignItems: "center",
      "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
        gap: "24px",
      },
    },
    leftSection: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    tagline: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "#d1fae5",
      color: "#059669",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      width: "fit-content",
    },
    title: {
      fontSize: "48px",
      fontWeight: "800",
      color: "#1f2937",
      lineHeight: "1.2",
      margin: 0,
    },
    description: {
      fontSize: "16px",
      color: "#6b7280",
      lineHeight: "1.6",
      margin: 0,
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
    },
    btnPrimary: {
      background: "#059669",
      color: "white",
      border: "none",
      padding: "14px 32px",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
    },
    btnSecondary: {
      background: "#ecfdf5",
      color: "#059669",
      border: "2px solid #d1fae5",
      padding: "12px 28px",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
    },
    priceTag: {
      background: "#fef3c7",
      color: "#92400e",
      padding: "12px 20px",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      width: "fit-content",
    },
    benefits: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "16px",
    },
    benefitItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "14px",
      color: "#374151",
    },
    benefitIcon: {
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "#d1fae5",
      color: "#059669",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    rightSection: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    heroImage: {
      width: "100%",
      maxWidth: "500px",
      height: "auto",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      objectFit: "cover",
      animation: "float 3s ease-in-out infinite",
    },
    floatingCard: {
      position: "absolute",
      background: "white",
      borderRadius: "16px",
      padding: "16px 24px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#1f2937",
    },
    floatingCardBottom: {
      bottom: "-20px",
      left: "-30px",
    },
    floatingCardTop: {
      top: "-20px",
      right: "-30px",
    },
    productGrid: {
      marginTop: "60px",
      paddingTop: "40px",
      borderTop: "1px solid #e5e7eb",
    },
    gridTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "24px",
    },
    productsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
    },
    productCard: {
      background: "white",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    productImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      background: "#f3f4f6",
    },
    productInfo: {
      padding: "16px",
    },
    productName: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "8px",
    },
    productPrice: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#059669",
    },
  };

  const sampleProducts = [
    {
      id: 1,
      name: "Cá hồi phi lê Nauy",
      price: "185.000₫",
      image: "/image/cart/anh9.png",
    },
    {
      id: 2,
      name: "Bông cải xanh Đà Lạt",
      price: "35.000₫",
      image: "/image/cart/anh8.png",
    },
    {
      id: 3,
      name: "Táo đỏ nhập khẩu",
      price: "85.000₫",
      image: "/image/cart/anh7.png",
    },
    {
      id: 4,
      name: "Burger gà nướng BBQ",
      price: "55.000₫",
      image: "/image/cart/burger.png",
    },
  ];

  return (
    <div style={styles.heroContainer}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          [data-hero-grid] {
            grid-template-columns: 1fr !important;
          }
          [data-hero-title] {
            font-size: 32px !important;
          }
        }
      `}</style>

      <div data-hero-grid style={styles.heroContent}>
        {/* Left Section */}
        <div style={styles.leftSection}>
          <div style={styles.tagline}>
            <span style={{ fontSize: "18px" }}>🌟</span>
            Ăn sạch - Sống khỏe
          </div>

          <h1 data-hero-title style={styles.title}>
            Ăn sạch - Sống khỏe cùng SmartFood
          </h1>

          <p style={styles.description}>
            Thực phẩm sạch ngay, chất lượng từ giao dịch địa phương, không dư lượng
            hóa chất. Khiến nhà mua mình, gợi ý từ AI healthy và các hàng đặc chủng.
          </p>

          <div style={styles.buttonGroup}>
            <button
              style={styles.btnPrimary}
              onClick={() => navigate("/shop")}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 24px rgba(5, 150, 105, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
              }}
            >
              🛒 Mua ngay
              <FiArrowRight />
            </button>
            <button
              style={styles.btnSecondary}
              onClick={() => navigate("/ai")}
              onMouseEnter={(e) => {
                e.target.style.background = "#d1fae5";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ecfdf5";
              }}
            >
              🤖 AI Assistant
            </button>
          </div>

          <div style={styles.priceTag}>
            💰 120.000₫
          </div>

          <div style={styles.benefits}>
            <div style={styles.benefitItem}>
              <div style={styles.benefitIcon}>
                <FiCheck size={14} />
              </div>
              <span>Giao hàng miễn phí từ 100k</span>
            </div>
            <div style={styles.benefitItem}>
              <div style={styles.benefitIcon}>
                <FiCheck size={14} />
              </div>
              <span>Sản phẩm 100% chính hãng, sạch sẽ</span>
            </div>
            <div style={styles.benefitItem}>
              <div style={styles.benefitIcon}>
                <FiCheck size={14} />
              </div>
              <span>Hỗ trợ 24/7 từ AI Assistant</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <img
            src="/image copy.png"
            alt="SmartFood Hero"
            style={styles.heroImage}
          />

          <div style={{ ...styles.floatingCard, ...styles.floatingCardBottom }}>
            ✨ Đầu tiên lựa chọn thực phẩm sạch
          </div>
          <div style={{ ...styles.floatingCard, ...styles.floatingCardTop }}>
            ⭐ Đánh giá 4.9/5
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        <h2 style={styles.gridTitle}>Sản phẩm nổi bật hôm nay</h2>
        <div style={styles.productsContainer}>
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              style={styles.productCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={styles.productImage}
              />
              <div style={styles.productInfo}>
                <div style={styles.productName}>{product.name}</div>
                <div style={styles.productPrice}>{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
