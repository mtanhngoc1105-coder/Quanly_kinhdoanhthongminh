import React, { useState } from "react";
import "../../assets/styles/quickview.css";

function QuickViewModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view-close" onClick={onClose}>✕</button>
        
        <div className="quick-view-content">
          {/* Product Image */}
          <div className="quick-view-image">
            <img 
              src={product.image || "https://via.placeholder.com/250"} 
              alt={product.name}
              onError={(e) => e.target.src = "https://via.placeholder.com/250"}
            />
          </div>

          {/* Product Info */}
          <div className="quick-view-info">
            <h2 className="quick-view-name">{product.name}</h2>
            
            <div className="quick-view-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-text">(45 đánh giá)</span>
            </div>

            <div className="quick-view-price">
              <span className="price-current">{product.price?.toLocaleString()}đ</span>
              {product.originalPrice && (
                <span className="price-original">{product.originalPrice?.toLocaleString()}đ</span>
              )}
            </div>

            <p className="quick-view-description">
              {product.description || "Sản phẩm chất lượng cao, được kiểm duyệt kỹ lưỡng"}
            </p>

            {/* Stock Info */}
            <div className="quick-view-stock">
              <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="quick-view-quantity">
              <label>Số lượng:</label>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)}>−</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="quick-view-actions">
              <button 
                className="btn-add-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                🛒 Thêm vào giỏ
              </button>
              <button 
                className="btn-wishlist"
                onClick={onClose}
              >
                ❤️
              </button>
            </div>

            {/* Additional Info */}
            <div className="quick-view-extra">
              <p>✓ Giao hàng miễn phí cho đơn từ 50.000đ</p>
              <p>✓ Đảm bảo chất lượng 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;