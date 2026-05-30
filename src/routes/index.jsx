import { Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

/* Home */
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/home/ShopPage";
import ProductDetailPage from "../pages/home/ProductDetailPage";

/* Auth */
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

/* Cart */
import CartPage from "../pages/cart/CartPage";

/* Admin */
import DashboardPage from "../pages/admin/DashboardPage";
import ProductPage from "../pages/admin/ProductPage";
import OrdersPage from "../pages/admin/OrdersPage";
import InventoryPage from "../pages/admin/InventoryPage";
import SuppliersPage from "../pages/admin/SuppliersPage";
import UsersPage from "../pages/admin/UsersPage";
import ReviewsPage from "../pages/admin/ReviewsPage";
import CustomersPage from "../pages/admin/CustomersPage";

/* Error */
import NotFoundPage from "../pages/error/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* USER */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>

      {/* ERROR */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;