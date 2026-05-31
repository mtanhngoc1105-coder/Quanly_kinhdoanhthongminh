import React from 'react';
import Categories from '../../components/common/Categories';
import Products from './Products';
import Features from '../../components/common/Features';

const styles = {
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  heroBanner: {
    borderRadius: '16px',
    marginBottom: '32px',
    overflow: 'hidden',
  },
  heroImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    objectFit: 'cover',
    display: 'block',
  },
};

function MainContent({ searchQuery, wishlistItems, onToggleWishlist, onAddToCart }) {
  return (
    <main style={styles.mainContent}>
      <section style={styles.heroBanner}>
        <img
          src="/image copy.png"
          alt="Hero Banner"
          style={styles.heroImg}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </section>

      <Categories />

      <Products
        searchQuery={searchQuery}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
      />

      <Features />
    </main>
  );
}

export default MainContent;