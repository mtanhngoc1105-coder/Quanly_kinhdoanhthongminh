import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product, isWishlisted, onToggleWishlist, onAddToCart, onClick }) => {
  const formatPrice = (price) => price.toLocaleString('vi-VN') + 'đ';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -6 }}
      className="product-card"
      onClick={() => onClick(product.id)}
    >
      {/* Badge */}
      {product.badge && (
        <div className={`product-card-badge ${product.badgeClass === 'sale' ? 'sale' : 'hot'}`}>
          {product.badge}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={`product-card-wishlist ${isWishlisted ? 'wishlisted' : ''}`}
      >
        {isWishlisted ? <FaHeart /> : <FiHeart />}
      </button>

      {/* Image */}
      <div className="product-card-image-wrapper">
        <img
          src={encodeURI(product.img)}
          alt={product.title}
          className="product-card-image"
          loading="lazy"
        />
        <div className="product-card-image-overlay"></div>
      </div>

      {/* Content */}
      <div className="product-card-content">
        <h3 className="product-card-title">
          {product.title}
        </h3>
        
        <div className="product-card-rating">
          <FiStar className="product-card-rating-star" style={{ fill: 'currentColor' }} />
          <span className="product-card-rating-value">{product.rating}</span>
          <span>•</span>
          <span>Đã bán 1.2k</span>
        </div>
        
        <div className="product-card-bottom">
          <div className="product-card-price-section">
            <div className="product-card-price">
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && (
              <div className="product-card-old-price">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="product-card-add-btn"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
