import React, { useState } from 'react';
import Categories from '../../components/common/Categories';
import Products from './Products';
import Features from '../../components/common/Features';

const styles = {
  mainContent: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
};

function MainContent({ searchQuery, wishlistItems, onToggleWishlist, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <main style={styles.mainContent}>
      <Categories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

      <Products
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
      />

      <Features />
    </main>
  );
}

export default MainContent;