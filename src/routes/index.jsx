import { Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

/* Home */
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/home/ShopPage";
import ProductDetailPage from "../pages/home/ProductDetailPage";
import WishlistPage from "../pages/home/WishlistPage";
import AIPage from "../pages/ai/AIPage";
import CartAnalysisPage from "../pages/ai/CartAnalysisPage";
import MealPlannerPage from "../pages/ai/MealPlannerPage";
import FoodScannerPage from "../pages/ai/FoodScannerPage";
import VoiceAssistantPage from "../pages/ai/VoiceAssistantPage";
import HealthReportPage from "../pages/ai/HealthReportPage";
import AvatarPage from "../pages/ai/AvatarPage";

/* Auth */
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

/* Cart & Orders */
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/cart/CheckoutPage";
import OrderPage from "../pages/order/OrderPage";
import ProfilePage from "../pages/profile/ProfilePage";

/* Admin */
import DashboardPage from "../pages/admin/DashboardPage";
import ProductPage from "../pages/admin/ProductPage";
import OrdersPage from "../pages/admin/OrdersPage";
import InventoryPage from "../pages/admin/InventoryPage";
import SuppliersPage from "../pages/admin/SuppliersPage";
import UsersPage from "../pages/admin/UsersPage";
import ReviewsPage from "../pages/admin/ReviewsPage";
import CustomersPage from "../pages/admin/CustomersPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRevenuePage from "../pages/admin/AdminRevenuePage";

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
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="ai" element={<AIPage />} />
        <Route path="ai/cart-analysis" element={<CartAnalysisPage />} />
        <Route path="ai/meal-planner" element={<MealPlannerPage />} />
        <Route path="ai/food-scanner" element={<FoodScannerPage />} />
        <Route path="ai/voice-assistant" element={<VoiceAssistantPage />} />
        <Route path="ai/health-report" element={<HealthReportPage />} />
        <Route path="ai/avatar" element={<AvatarPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="profile" element={<ProfilePage />} />
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
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="revenue" element={<AdminRevenuePage />} />
      </Route>

      {/* ERROR */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;