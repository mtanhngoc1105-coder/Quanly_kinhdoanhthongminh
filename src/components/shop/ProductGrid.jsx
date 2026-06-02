import React from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGrid = ({ products, wishlistItems, onToggleWishlist, onAddToCart }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty" className="empty-state-image" />
        <h3 className="empty-state-title">Không tìm thấy sản phẩm nào!</h3>
        <p className="empty-state-description">Vui lòng thử nghiệm bộ lọc khác hoặc tìm kiếm với từ khóa khác.</p>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="product-grid"
    >
      <AnimatePresence>
        {products.map((product) => {
          const isWishlisted = wishlistItems.some((item) => item.id === product.id);
          
          return (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={isWishlisted}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onClick={(id) => navigate(`/product/${id}`)}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductGrid;
