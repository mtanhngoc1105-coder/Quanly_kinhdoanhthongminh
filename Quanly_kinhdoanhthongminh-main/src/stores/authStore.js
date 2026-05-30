import { create } from "zustand";

const persistedUser = (() => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.log("Error parsing user from localStorage:", e);
    return null;
  }
})();

const useAuthStore = create((set) => ({
  // Trạng thái ban đầu: lấy từ localStorage nếu có
  user: persistedUser,
  isLoading: false,

  // Hàm xử lý đăng nhập thành công (lưu vào store + localStorage)
  login: (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User logged in and saved to localStorage:", userData);
    } catch (e) {
      console.warn("Could not persist user to localStorage", e);
    }
    set({ user: userData, isLoading: false });
  },

  // Hàm xử lý đăng xuất (xóa khỏi localStorage)
  logout: () => {
    try {
      localStorage.removeItem("user");
      console.log("User logged out");
    } catch (e) {
      /* ignore */
    }
    set({ user: null });
  },

  // Hàm đăng ký (gọi service, không tự động login)
  register: async (userData) => {
    try {
      set({ isLoading: true });
      const { registerApi } = await import("../services/authService");
      const res = await registerApi(userData);
      set({ isLoading: false });
      return res;
    } catch (e) {
      console.error("Register error", e);
      set({ isLoading: false });
      return { success: false, message: "Đăng ký thất bại. Vui lòng thử lại." };
    }
  },

  // Hàm cập nhật loading state
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));

export default useAuthStore;