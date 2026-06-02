import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartStore";

function WishlistPage() {
  const wishlistItems = useCartStore((state) => state.wishlistItems);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Danh sách yêu thích</h1>
          <p style={styles.subtitle}>Lưu sản phẩm bạn muốn mua sau và đặt hàng nhanh chóng khi cần.</p>
        </div>
        <button style={styles.shopButton} onClick={() => navigate("/shop")}>Tiếp tục mua sắm</button>
      </div>

      {wishlistItems.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>Bạn chưa thêm sản phẩm nào vào yêu thích.</p>
          <button style={styles.ctaButton} onClick={() => navigate("/shop")}>Khám phá cửa hàng</button>
        </div>
      ) : (
        <div style={styles.grid}>
          {wishlistItems.map((product) => (
            <div key={product.id} style={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
              <img src={product.img || "https://via.placeholder.com/320"} alt={product.title} style={styles.productImage} />
              <div style={styles.cardBody}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.productName}>{product.title}</h2>
                  <button
                    style={styles.heartButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                  >
                    ❤️
                  </button>
                </div>

                <p style={styles.price}>{product.price?.toLocaleString('vi-VN')}đ</p>
                <div style={styles.cardActions}>
                  <button
                    style={styles.addButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >Thêm vào giỏ</button>
                  <button
                    style={styles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                  >Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: '100%',
    padding: '24px',
    boxSizing: 'border-box',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '2rem',
    margin: 0,
    color: '#0f172a',
  },
  subtitle: {
    margin: '8px 0 0',
    color: '#475569',
  },
  shopButton: {
    background: '#047857',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '320px',
    borderRadius: '24px',
    background: '#f8fafc',
    padding: '40px',
    textAlign: 'center',
  },
  emptyText: {
    marginBottom: '20px',
    color: '#475569',
    fontSize: '1.05rem',
  },
  ctaButton: {
    background: '#047857',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.06)',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  productImage: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  productName: {
    margin: 0,
    fontSize: '1.05rem',
    color: '#0f172a',
  },
  heartButton: {
    border: 'none',
    background: '#fef2f2',
    color: '#ef4444',
    borderRadius: '12px',
    width: '38px',
    height: '38px',
    cursor: 'pointer',
  },
  price: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#16a34a',
  },
  cardActions: {
    display: 'flex',
    gap: '12px',
  },
  addButton: {
    flex: 1,
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  removeButton: {
    flex: 1,
    background: '#f3f4f6',
    color: '#334155',
    border: 'none',
    borderRadius: '14px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
};

export default WishlistPage;
