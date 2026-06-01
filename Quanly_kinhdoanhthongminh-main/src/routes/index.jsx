import React from "react";
import { Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "../layouts/MainLayout";

/* Home */
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/home/ShopPage";
import ProductDetailPage from "../pages/home/ProductDetailPage";

/* Auth */
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

/* Cart & Checkout */
import CartPage from "../pages/cart/CartPage"; 
import CheckoutPage from "../pages/cart/CheckoutPage";
import OrderPage from "../pages/order/OrderPage";

/* Admin - Gọi trực tiếp file Dashboard quản trị của chúng ta */
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRevenuePage from "../pages/admin/AdminRevenuePage";

/* Profile */
import ProfilePage from "../pages/profile/ProfilePage";

/* Error */
import NotFoundPage from "../pages/error/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>

      {/* 1. TOÀN BỘ GIAO DIỆN NGƯỜI DÙNG (USER ROUTES) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 2. GIAO DIỆN QUẢN TRỊ VIÊN (ADMIN ROUTE) */}
      <Route path="/admin" element={<AdminLayout>
        <AdminDashboard />
      </AdminLayout>} />
      <Route path="/admin/revenue" element={<AdminLayout>
        <AdminRevenuePage />
      </AdminLayout>} />

      {/* 3. ĐƯỜNG DẪN LỖI (ERROR ROUTES) */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default AppRoutes;