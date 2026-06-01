
import { useState } from 'react';
import './App.css';
import Header from './components/common/Header';
import Sidebar from './components/admin/Sidebar';
import MainContent from './pages/home/MainContent';

const styles = {
  mainContainer: {
    display: 'flex',
    maxWidth: '1920px',
    margin: '0 auto',
    gap: '24px',
    padding: '24px',
  },
};

function App() {
  const [cartCount, setCartCount] = useState(5);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notificationCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setCartCount(cartCount + 1);
  };

  const handleToggleWishlist = (productId) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId));
      setWishlistCount(wishlistCount - 1);
    } else {
      setWishlistItems([...wishlistItems, productId]);
      setWishlistCount(wishlistCount + 1);
    }
  };

  return (
    <div>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        notificationCount={notificationCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div style={styles.mainContainer}>
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

        <MainContent
          searchQuery={searchQuery}
          wishlistItems={wishlistItems}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </div>

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
//import RobotAssistantFloating from "./components/ai/RobotAssistantFloating";

import "./App.css";

function App() {
  return (

    </div>

    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Định tuyến toàn bộ các trang trong ứng dụng */}
        <AppRoutes />
  
      </div>
    </BrowserRouter>

  );
}

export default App;