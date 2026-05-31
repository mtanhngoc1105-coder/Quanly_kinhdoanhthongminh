import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Thêm middleware để tự động lưu dữ liệu vào LocalStorage

// 2. Bọc toàn bộ logic store bên trong hàm persist
const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      wishlistItems: [], // Danh mục sản phẩm yêu thích

      // 1. Thêm sản phẩm hoặc tăng số lượng nếu đã có sẵn
      addToCart: (product) =>
        set((state) => {
          const isExist = state.cartItems.find((item) => item.id === product.id);
          if (isExist) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
        }),

      // 2. Hàm tăng số lượng trực tiếp trong giỏ hàng
      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          ),
        })),

      // 3. Hàm giảm số lượng (Nếu giảm về 0 thì tự động xóa khỏi giỏ)
      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
            )
            .filter((item) => item.quantity > 0), // Giữ lại những món có số lượng lớn hơn 0
        })),

      // 4. Hàm xóa hẳn sản phẩm ra khỏi giỏ hàng
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      // 5. Hàm xóa sạch giỏ hàng
      clearCart: () => set({ cartItems: [] }),

      // 6. Hàm xử lý Bật/Tắt trạng thái yêu thích của sản phẩm (Thêm/Xóa)
      toggleWishlist: (product) =>
        set((state) => {
          const isExist = state.wishlistItems.find((item) => item.id === product.id);
          if (isExist) {
            return {
              wishlistItems: state.wishlistItems.filter((item) => item.id !== product.id),
            };
          }
          return {
            wishlistItems: [...state.wishlistItems, product],
          };
        }),
    }),
    {
      name: "smartfood-storage", // Tên của key lưu trữ dưới LocalStorage (bạn đặt tên gì cũng được)
    }
  )
);

export default useCartStore;