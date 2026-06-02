import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
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

function Products({ searchQuery = '', selectedCategory = 'all', wishlistItems = [], onToggleWishlist, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mappedProducts = database.products
      .filter((product) => product.isFeatured)
      .map((product) => {
        const productImage = database.productImages.find(
          (img) => img.productId === product.id
        );

        let badge = null;
        let badgeClass = null;

        if (product.oldPrice) {
          const discountPercent = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
          );
          badge = `-${discountPercent}%`;
          badgeClass = 'sale';
        } else {
          badge = 'HOT';
          badgeClass = 'hot';
        }

        return {
          id: product.id,
          title: product.title,
          category: product.category || 'all',
          price: product.price,
          oldPrice: product.oldPrice || null,
          rating: 4.9,
          img: productImage?.url || 'https://via.placeholder.com/300',
          badge,
          badgeClass,
        };
      });

    setProducts(mappedProducts);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => price.toLocaleString('vi-VN') + 'đ';

  return (
    <section style={styles.products}>
      <h3 style={styles.title}>Sản phẩm gợi ý cho bạn</h3>
      <div style={styles.productGrid}>
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistItems.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              style={styles.productCard}
              onClick={() => navigate(`/product/${product.id}`)}
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
                style={isWishlisted ? styles.wishlistBtnActive : styles.wishlistBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product);
                }}
              >
                <i className={isWishlisted ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
              <div style={styles.productImage}>
                <img src={product.img} alt={product.title} style={styles.productImg} />
              </div>
              <div>
                <h4 style={styles.productName}>{product.title}</h4>
                <div style={styles.productPrice}>
                  <span style={styles.priceCurrent}>{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span style={styles.priceOld}>{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
                <div style={styles.productFooter}>
                  <div style={styles.productRating}>
                    <span style={styles.starIcon}>★</span>
                    <span>{product.rating}</span>
                  </div>
                  <button
                    style={styles.btnAddCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2b9346';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#d1fae5';
                      e.currentTarget.style.color = '#2b9346';
                    }}
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Products;
