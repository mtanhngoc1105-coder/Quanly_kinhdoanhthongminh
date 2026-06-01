import React, { useState, useEffect } from 'react';
import database from '../../database.json';

const styles = {
  products: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '20px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
  },
  productCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    width: '100%',
  },
  badgeHot: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    color: 'white',
    background: '#ef4444',
    zIndex: 1,
  },
  badgeSale: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    color: 'white',
    background: '#f97316',
    zIndex: 1,
  },
  wishlistBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '32px',
    height: '32px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#6b7280',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  wishlistBtnActive: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '32px',
    height: '32px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#ef4444',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: '308px',
    marginBottom: '8px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  productImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: '8px',
    minHeight: '40px',
  },
  productPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  priceCurrent: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#2b9346',
  },
  priceOld: {
    fontSize: '14px',
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  productFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: '#6b7280',
  },
  starIcon: {
    color: '#fbbf24',
  },
  btnAddCart: {
    width: '36px',
    height: '36px',
    background: '#d1fae5',
    border: 'none',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#2b9346',
    fontSize: '16px',
    transition: 'all 0.2s',
  },
};

const badgeStyleMap = {
  hot: styles.badgeHot,
  sale: styles.badgeSale,
};

function Products({ searchQuery, wishlistItems, onToggleWishlist, onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Map database products to component format
    const mappedProducts = database.products
      .filter(p => p.isFeatured) // Only show featured products
      .map((product) => {
        // Get the first image for this product
        const productImage = database.productImages.find(
          (img) => img.productId === product.id
        );

        // Determine badge based on discount logic
        let badge = null;
        let badgeClass = null;

        if (product.oldPrice) {
          const discountPercent = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
          );
          badge = `-${discountPercent}%`;
          badgeClass = 'sale';
        } else {
          // You can add logic here to mark specific products as HOT
          badge = 'HOT';
          badgeClass = 'hot';
        }

        return {
          id: product.id,
          name: product.title,
          price: product.price,
          oldPrice: product.oldPrice || null,
          rating: 4.9, // Default rating since DB doesn't have product ratings
          image: productImage?.url || 'https://via.placeholder.com/300',
          badge: badge,
          badgeClass: badgeClass,
        };
      });

    setProducts(mappedProducts);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => price.toLocaleString('vi-VN') + 'đ';

  return (
    <section style={styles.products}>
      <h3 style={styles.title}>Sản phẩm gợi ý cho bạn</h3>
      <div style={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={styles.productCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            {product.badge && (
              <div style={badgeStyleMap[product.badgeClass]}>{product.badge}</div>
            )}
            <button
              style={wishlistItems.includes(product.id) ? styles.wishlistBtnActive : styles.wishlistBtn}
              onClick={() => onToggleWishlist(product.id)}
            >
              <i className={wishlistItems.includes(product.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
            </button>
            <div style={styles.productImage}>
              <img src={product.image} alt={product.name} style={styles.productImg} />
            </div>
            <div>
              <h4 style={styles.productName}>{product.name}</h4>
              <div style={styles.productPrice}>
                <span style={styles.priceCurrent}>{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span style={styles.priceOld}>{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              <div style={styles.productFooter}>
                <div style={styles.productRating}>
                  <i className="fas fa-star" style={styles.starIcon}></i>
                  <span>{product.rating}</span>
                </div>
                <button
                  style={styles.btnAddCart}
                  onClick={() => onAddToCart(product)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2b9346';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#d1fae5';
                    e.currentTarget.style.color = '#2b9346';
                  }}
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
