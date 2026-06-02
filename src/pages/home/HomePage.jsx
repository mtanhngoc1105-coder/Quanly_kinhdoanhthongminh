import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import Sidebar from "../../components/common/Sidebar";
import MainContent from "./MainContent";
import useCartStore from "../../stores/cartStore";

const featuredProducts = [
  {
    title: "Quinoa fruit salad",
    price: "120.000",
    image: "/image/cart/anh9.png",
  },
  {
    title: "Fresh fruit bowl",
    price: "125.000",
    image: "/image/cart/anh8.png",
  },
  {
    title: "Green smoothie",
    price: "105.000",
    image: "/image/cart/anh7.png",
  },
  {
    title: "Avocado toast",
    price: "135.000",
    image: "/image/cart/anh6.png",
  },
];

const achievements = [
  {
    label: "+1.2M",
    title: "Đơn hàng thành công",
    description: "Giao hàng nhanh, chính xác và an toàn."
  },
  {
    label: "98%",
    title: "Khách hàng hài lòng",
    description: "Không ngừng nâng cao trải nghiệm mua sắm healthy."
  },
  {
    label: "250+",
    title: "Sản phẩm sạch",
    description: "Nguồn thực phẩm được kiểm định và chọn lọc kỹ lưỡng."
  },
  {
    label: "24/7",
    title: "Hỗ trợ AI tự động",
    description: "Trợ lý chăm sóc, gợi ý và theo dõi sức khỏe cả ngày."
  }
];

const systemHighlights = [
  {
    title: "Hệ thống phân loại nguồn hàng",
    description: "Mỗi sản phẩm được kiểm tra theo tiêu chuẩn sạch và tươi."
  },
  {
    title: "Chuỗi lạnh bảo quản",
    description: "Giữ thực phẩm tươi ngon từ nông trại đến tay bạn."
  },
  {
    title: "Giao hàng tối ưu",
    description: "Lộ trình nhanh nhất với theo dõi thời gian thực."
  },
  {
    title: "AI Health Engine",
    description: "Tư vấn dinh dưỡng tự động dựa trên nhu cầu của bạn."
  }
];

const timelineItems = [
  {
    year: "2018",
    title: "Khởi nguồn Smart Food",
    detail: "Bắt đầu với sứ mệnh đưa thực phẩm sạch đến mọi nhà."
  },
  {
    year: "2020",
    title: "Mở rộng nguồn hàng",
    detail: "Liên kết với hơn 120 trang trại hữu cơ và nhà cung cấp đáng tin cậy."
  },
  {
    year: "2022",
    title: "Ra mắt AI Health",
    detail: "Giúp người dùng xây dựng thực đơn và chọn sản phẩm thông minh."
  },
  {
    year: "2025",
    title: "Hệ thống trải nghiệm toàn diện",
    detail: "Tích hợp mua sắm, sức khỏe và ứng dụng di động tiện lợi."
  }
];

function HomePage() {
  const searchQuery = "";
  const wishlistItems = useCartStore((state) => state.wishlistItems);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.homeGrid}>
        <Sidebar />

        <div style={styles.homeBody}>
          <section style={styles.heroSection}>
            <div style={styles.heroText}>
              <span style={styles.heroBadge}>Ăn sạch - Sống khỏe</span>
              <h1 style={styles.heroTitle}>Ăn sạch - Sống khỏe cùng Smart Food</h1>
              <p style={styles.heroDescription}>
                Thực phẩm tươi ngon, chất lượng và giao đến tận nơi nhanh chóng. Khám phá mùa mới, gợi ý món ăn healthy và đặt hàng chỉ với vài cú nhấp.
              </p>
              <div style={styles.heroActions}>
                <button style={styles.ctaButton} onClick={() => navigate("/shop")}>Mua ngay</button>
                <button style={styles.secondaryButton} onClick={() => navigate("/ai")}>AI Assistant</button>
              </div>
            </div>

            <div style={styles.productGrid}>
              {featuredProducts.map((product, index) => (
                <div key={index} style={styles.productCard}>
                  <div style={styles.productImageWrapper}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={styles.productImage}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div style={styles.productInfo}>
                    <div style={styles.productName}>{product.title}</div>
                    <div style={styles.productFooter}>
                      <div style={styles.productPrice}>{product.price}đ</div>
                      <button style={styles.productFavorite} aria-label="Yêu thích">
                        <FiHeart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.achievementSection}>
            <div style={styles.sectionHeader}>
              <div style={styles.subTitle}>Thành tựu hệ thống</div>
              <h2 style={styles.sectionTitle}>Kết quả đáng tự hào của Smart Food</h2>
            </div>
            <div style={styles.achievementGrid}>
              {achievements.map((item) => (
                <div key={item.title} style={styles.achievementCard}>
                  <div style={styles.achievementBadge}>{item.label}</div>
                  <h3 style={styles.achievementTitle}>{item.title}</h3>
                  <p style={styles.achievementText}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.systemSection}>
            <div style={styles.systemLeft}>
              <div style={styles.sectionBadge}>Hệ thống</div>
              <h2 style={styles.sectionTitle}>Nền tảng an toàn, minh bạch và hiện đại</h2>
              <p style={styles.sectionDescription}>Smart Food vận hành trên chuỗi cung ứng thông minh, giúp bạn theo dõi nguồn gốc, chất lượng và quy trình giao hàng từng bước.</p>
              <div style={styles.systemList}>
                {systemHighlights.map((item) => (
                  <div key={item.title} style={styles.systemItem}>
                    <div style={styles.systemItemIcon}>✓</div>
                    <div>
                      <h4 style={styles.systemItemTitle}>{item.title}</h4>
                      <p style={styles.systemItemText}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.systemRight}>
              <div style={styles.videoCard}>
                <div style={styles.videoOverlay} />
                <iframe
                  title="Smart Food giới thiệu"
                  src="https://www.youtube.com/embed/5qap5aO4i9A"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={styles.videoEmbed}
                />
              </div>
            </div>
          </section>

          <section style={styles.beforeAfterSection}>
            <div style={styles.beforeAfterCard}>
              <div style={styles.beforeLabel}>Trước</div>
              <h3 style={styles.cardTitle}>Ăn uống thiếu cân bằng</h3>
              <p style={styles.cardText}>Thực phẩm không rõ nguồn gốc, thiếu dinh dưỡng và khó kiểm soát calories.</p>
              <ul style={styles.bulletList}>
                <li>Đồ ăn nhanh, chua ngọt</li>
                <li>Thiếu rau củ tươi</li>
                <li>Không có hướng dẫn dinh dưỡng</li>
              </ul>
            </div>
            <div style={styles.beforeAfterCard}>
              <div style={styles.afterLabel}>Sau</div>
              <h3 style={styles.cardTitle}>Chế độ ăn chuẩn sạch</h3>
              <p style={styles.cardText}>Thực phẩm tươi, nguồn gốc rõ ràng, AI gợi ý thực đơn và đánh giá sức khỏe mỗi ngày.</p>
              <ul style={styles.bulletList}>
                <li>Thực phẩm hữu cơ, không chất bảo quản</li>
                <li>Đầy đủ protein, rau xanh, chất xơ</li>
                <li>Dễ dàng theo dõi qua ứng dụng</li>
              </ul>
            </div>
          </section>

          <section style={styles.timelineSection}>
            <div style={styles.sectionHeader}>
              <div style={styles.subTitle}>Nguồn gốc thực phẩm</div>
              <h2 style={styles.sectionTitle}>Hành trình từ nông trại đến bàn ăn</h2>
            </div>
            <div style={styles.timelineWrapper}>
              {timelineItems.map((item, index) => (
                <div key={item.year} style={styles.timelineItem}>
                  <div style={styles.timelineYear}>{item.year}</div>
                  <div style={styles.timelineDot} />
                  <div style={styles.timelineContent}>
                    <h4 style={styles.timelineTitle}>{item.title}</h4>
                    <p style={styles.timelineText}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.downloadSection}>
            <div style={styles.downloadCard}>
              <div>
                <div style={styles.sectionBadge}>Tải App</div>
                <h2 style={styles.sectionTitle}>Mang Smart Food trong túi bạn</h2>
                <p style={styles.sectionDescription}>Đặt hàng, theo dõi đơn, nhận gợi ý sức khỏe và quét thực phẩm nhanh chóng trên mobile.</p>
                <div style={styles.storeButtons}>
                  <a style={styles.storeButton} href="#">
                    <div>Download</div>
                    <strong>App Store</strong>
                  </a>
                  <a style={styles.storeButton} href="#">
                    <div>Download</div>
                    <strong>Google Play</strong>
                  </a>
                </div>
              </div>
              <div style={styles.phoneMockup}>
                <img src="/image/cart/anh6.png" alt="App preview" style={styles.phoneImage} />
              </div>
            </div>
          </section>

          <MainContent
            searchQuery={searchQuery}
            wishlistItems={wishlistItems}
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    padding: "28px 32px 480px",
    boxSizing: "border-box",
    background: "#f5ecd7",
    overflow: "visible",
  },
  homeGrid: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: "32px",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
  },
  homeBody: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 1.2fr) minmax(420px, 1.1fr)",
    gap: "30px",
    padding: "36px",
    borderRadius: "32px",
    background: "#ffffff",
    boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)",
    overflow: "hidden",
  },
  heroText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "24px",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 18px",
    borderRadius: "999px",
    background: "#1b4d3e",
    color: "#f8f3d4",
    fontWeight: 700,
    fontSize: "0.9rem",
    letterSpacing: "0.01em",
  },
  heroTitle: {
    fontSize: "clamp(2.8rem, 4vw, 3.8rem)",
    lineHeight: 1.02,
    color: "#082a18",
    margin: 0,
  },
  heroDescription: {
    fontSize: "1rem",
    color: "#3b4b39",
    maxWidth: "680px",
    lineHeight: 1.85,
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },
  ctaButton: {
    minWidth: "170px",
    border: "none",
    borderRadius: "18px",
    padding: "16px 30px",
    background: "#047857",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 18px 40px rgba(4, 120, 87, 0.18)",
  },
  secondaryButton: {
    minWidth: "170px",
    border: "none",
    borderRadius: "18px",
    padding: "16px 30px",
    background: "rgba(6, 95, 70, 0.12)",
    color: "#065f46",
    fontWeight: 700,
    cursor: "pointer",
  },
  heroVisual: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },
  productCard: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
    minHeight: "320px",
  },
  productImageWrapper: {
    width: "100%",
    minHeight: "200px",
    overflow: "hidden",
    background: "#f8f3e9",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  productInfo: {
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: "1rem",
    lineHeight: 1.4,
    color: "#11281d",
    fontWeight: 700,
    marginBottom: "8px",
  },
  productFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  productPrice: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#14532d",
  },
  productFavorite: {
    width: "38px",
    height: "38px",
    borderRadius: "14px",
    border: "1px solid rgba(20, 83, 45, 0.14)",
    background: "rgba(235, 250, 240, 0.9)",
    color: "#14532d",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  sectionBadge: {
    display: "inline-block",
    marginBottom: "14px",
    padding: "10px 18px",
    borderRadius: "999px",
    background: "#e6f4ea",
    color: "#047857",
    fontWeight: 700,
    fontSize: "0.85rem",
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "24px",
  },
  subTitle: {
    color: "#047857",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.8rem",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "2rem",
    lineHeight: 1.15,
    color: "#0f172a",
  },
  sectionDescription: {
    maxWidth: "680px",
    color: "#475569",
    fontSize: "1rem",
    lineHeight: 1.8,
  },
  achievementSection: {
    background: "#ffffff",
    borderRadius: "28px",
    padding: "36px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
  },
  achievementGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "20px",
  },
  achievementCard: {
    padding: "26px",
    borderRadius: "24px",
    background: "#f8faf9",
    minHeight: "210px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
  },
  achievementBadge: {
    fontSize: "1.9rem",
    fontWeight: 800,
    color: "#065f46",
  },
  achievementTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  achievementText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.7,
  },
  systemSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "36px",
    alignItems: "center",
    marginTop: "24px",
    background: "#ffffff",
    borderRadius: "28px",
    padding: "36px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
  },
  systemLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  systemList: {
    display: "grid",
    gap: "18px",
  },
  systemItem: {
    display: "flex",
    gap: "18px",
    alignItems: "flex-start",
    background: "#f8faf9",
    borderRadius: "20px",
    padding: "18px 20px",
  },
  systemItemIcon: {
    width: "42px",
    minHeight: "42px",
    borderRadius: "14px",
    display: "grid",
    placeItems: "center",
    background: "#d1fae5",
    color: "#047857",
    fontWeight: 700,
    flexShrink: 0,
  },
  systemItemTitle: {
    margin: 0,
    fontWeight: 700,
    color: "#0f172a",
  },
  systemItemText: {
    margin: "6px 0 0",
    color: "#475569",
    lineHeight: 1.8,
  },
  systemRight: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoCard: {
    position: "relative",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)",
    minHeight: "420px",
    width: "100%",
    background: "#000",
  },
  videoOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.35))",
    pointerEvents: "none",
  },
  videoEmbed: {
    width: "100%",
    height: "100%",
    minHeight: "420px",
  },
  beforeAfterSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "24px",
  },
  beforeAfterCard: {
    background: "#ffffff",
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
    minHeight: "320px",
    position: "relative",
  },
  beforeLabel: {
    display: "inline-block",
    marginBottom: "18px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "#fef3c7",
    color: "#92400e",
    fontWeight: 700,
    fontSize: "0.85rem",
  },
  afterLabel: {
    display: "inline-block",
    marginBottom: "18px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "#d1fae5",
    color: "#047857",
    fontWeight: 700,
    fontSize: "0.85rem",
  },
  cardTitle: {
    margin: "0 0 16px",
    fontSize: "1.35rem",
    color: "#0f172a",
  },
  cardText: {
    color: "#475569",
    lineHeight: 1.8,
    marginBottom: "20px",
  },
  bulletList: {
    listStyle: "disc",
    paddingLeft: "20px",
    color: "#475569",
    lineHeight: 1.8,
  },
  timelineSection: {
    marginTop: "24px",
    background: "#ffffff",
    borderRadius: "28px",
    padding: "36px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
  },
  timelineWrapper: {
    display: "grid",
    gap: "24px",
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "100px minmax(0, 1fr)",
    gap: "18px",
    alignItems: "flex-start",
  },
  timelineYear: {
    fontSize: "1.15rem",
    fontWeight: 800,
    color: "#065f46",
  },
  timelineDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#047857",
    marginTop: "8px",
  },
  timelineContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  timelineTitle: {
    margin: 0,
    fontSize: "1.1rem",
    color: "#0f172a",
  },
  timelineText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.75,
  },
  downloadSection: {
    marginTop: "24px",
  },
  downloadCard: {
    background: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    borderRadius: "28px",
    padding: "36px",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "24px",
    alignItems: "center",
    color: "white",
    boxShadow: "0 24px 70px rgba(4, 120, 87, 0.22)",
  },
  storeButtons: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  storeButton: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "4px",
    textDecoration: "none",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "18px",
    padding: "16px 22px",
    minWidth: "150px",
    transition: "all 0.2s",
  },
  storeButtonHover: {
    background: "rgba(255,255,255,0.12)",
  },
  phoneMockup: {
    display: "flex",
    justifyContent: "center",
  },
  phoneImage: {
    width: "100%",
    borderRadius: "28px",
    boxShadow: "0 24px 40px rgba(0,0,0,0.18)",
  },
};

export default HomePage;
