import React from "react";
import useCartStore from "../../stores/cartStore";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCartStore();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={product.img} alt={product.title} style={styles.image} />
        {product.discount && (
          <span style={styles.discount}>{product.discount}</span>
        )}
        <button
          style={{...styles.wishlistBtn, backgroundColor: isWishlisted ? "#ffebee" : "#fff"}}
          onClick={handleWishlist}
          title={isWishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
      
      <div style={styles.content}>
        <p style={styles.title}>{product.title}</p>
        
        <div style={styles.priceSection}>
          <span style={styles.price}>{product.price.toLocaleString()}đ</span>
          {product.oldPrice && (
            <span style={styles.oldPrice}>{product.oldPrice.toLocaleString()}đ</span>
          )}
        </div>
        
        <div style={styles.footer}>
          <span style={styles.rating}>⭐ {product.rating}</span>
          <button style={styles.addBtn} onClick={handleAddToCart}>
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#10e569",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingBottom: "100%",
    backgroundColor: "#10e569",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  discount: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#ff4d4f",
    color: "#ffff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  wishlistBtn: {
    position: "absolute",
    top: "8px",
    left: "8px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  content: {
    padding: "12px",
  },
  title: {
    fontSize: "13px",
    color: "#333",
    margin: "0 0 8px 0",
    lineHeight: "1.4",
    minHeight: "26px",
  },
  priceSection: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "8px",
  },
  price: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#2e7d32",
  },
  oldPrice: {
    fontSize: "12px",
    color: "#999",
    textDecoration: "line-through",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: "12px",
    color: "#ffa500",
  },
  addBtn: {
    backgroundColor: "transparent",
    border: "1px solid #2e7d32",
    color: "#2e7d32",
    borderRadius: "4px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default ProductCard;