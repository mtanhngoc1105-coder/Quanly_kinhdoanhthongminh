# SmartFood - Tính Năng & Hướng Dẫn Sử Dụng

## 📋 Tổng Quan Tính Năng

Đây là tài liệu tổng hợp tất cả các tính năng đã được triển khai trong ứng dụng SmartFood.

---

## ✅ Các Tính Năng Đã Hoàn Thành

### 1. **Xác thực & Đăng nhập**
- ✅ **Trang Đăng Nhập** (`/login`) - Hỗ trợ 2 vai trò: Người mua & Quản lý
- ✅ **Trang Đăng Ký** (`/register`) - Đăng ký tài khoản mới
- ✅ **Đăng Xuất** - Cả cho người dùng bình thường và quản lý viên

#### Tài Khoản Thử Nghiệm:
```
Tài khoản Admin:
  Email: admin@smartfood.com
  Mật khẩu: admin123
  Vai trò: Quản lý (Manager)

Tài khoản Khách:
  Email: customer@smartfood.com
  Mật khẩu: password
  Vai trò: Người mua
```

#### Các Tệp Liên Quan:
- [src/components/auth/LoginForm.jsx](src/components/auth/LoginForm.jsx) - Form đăng nhập
- [src/components/auth/RegisterForm.jsx](src/components/auth/RegisterForm.jsx) - Form đăng ký
- [src/stores/authStore.js](src/stores/authStore.js) - Quản lý trạng thái xác thực

---

### 2. **Trang Sản Phẩm**
- ✅ **Chi Tiết Sản Phẩm** (`/product/:id`) - Xem thông tin đầy đủ sản phẩm
- ✅ **Danh Sách Sản Phẩm** (`/shop`) - Xem tất cả sản phẩm
- ✅ **Danh Sách Danh Mục** - Phân loại theo danh mục
- ✅ **Quick View Modal** - Xem nhanh chi tiết sản phẩm

#### Tính Năng Chi Tiết Sản Phẩm:
- Hình ảnh sản phẩm
- Giá cả và giá gốc
- Mô tả sản phẩm
- Tình trạng kho hàng
- Nút thêm vào giỏ hàng
- Nút yêu thích

#### Các Tệp Liên Quan:
- [src/pages/cart/ProductDetailPage.jsx](src/pages/cart/ProductDetailPage.jsx)
- [src/components/ai/QuickViewModal.jsx](src/components/ai/QuickViewModal.jsx)
- [src/assets/styles/quickview.css](src/assets/styles/quickview.css)

---

### 3. **Giỏ Hàng & Thanh Toán**
- ✅ **Trang Giỏ Hàng** (`/cart`) - Xem & quản lý giỏ hàng
- ✅ **Trang Thanh Toán** (`/checkout`) - Hoàn tất đơn hàng
- ✅ **Các Phương Thức Thanh Toán** - COD (Thanh toán khi nhận) & Thẻ

#### Các Tệp Liên Quan:
- [src/components/cart/CartItem.jsx](src/components/cart/CartItem.jsx)
- [src/pages/cart/CartPage.jsx](src/pages/cart/CartPage.jsx)

---

### 4. **Quản Lý Hồ Sơ & Đơn Hàng**
- ✅ **Hồ Sơ Cá Nhân** (`/profile`) - Xem & chỉnh sửa thông tin tài khoản
- ✅ **Đơn Hàng Của Tôi** (`/orders`) - Xem lịch sử đơn hàng
- ✅ **Dõi Theo Đơn Hàng** - Xem trạng thái giao hàng

#### Trạng Thái Đơn Hàng:
1. ✓ **Đã đặt hàng** - Xanh
2. ✓ **Đang xác nhận** - Xanh
3. 🟡 **Đang giao** - Vàng (In Progress)
4. ⚪ **Đã giao** - Chờ xử lý

#### Các Tệp Liên Quan:
- [src/components/ai/TrackingTimeline.jsx](src/components/ai/TrackingTimeline.jsx)
- [src/assets/styles/tracking.css](src/assets/styles/tracking.css)
- [src/pages/profile/ProfilePage.jsx](src/pages/profile/ProfilePage.jsx)

---

### 5. **Bảng Điều Khiển Quản Lý** (`/admin`)
Gồm 10 trang quản lý chính:

#### 📊 **Dashboard** (`/admin`)
- Biểu đồ doanh thu theo thời gian (Ngày/Tuần/Tháng)
- Thống kê hôm nay
- Bảng doanh thu nhà cung cấp

#### 🛍️ **Sản Phẩm** (`/admin/products`)
- Danh sách sản phẩm
- Tìm kiếm & lọc
- Thêm/Chỉnh sửa/Xóa sản phẩm
- Hiển thị theo danh mục

#### 📦 **Đơn Hàng** (`/admin/orders`)
- Quản lý tất cả đơn hàng
- Cập nhật trạng thái đơn hàng
- Xem chi tiết đơn hàng

#### 📥 **Kho Hàng** (`/admin/inventory`)
- Quản lý tồn kho
- Thêm/Giảm số lượng
- Cảnh báo hàng tồn kho thấp

#### 🏭 **Nhà Cung Cấp** (`/admin/suppliers`)
- Danh sách nhà cung cấp
- Quản lý liên hệ
- Cập nhật trạng thái

#### 👥 **Người Dùng** (`/admin/users`)
- Quản lý nhân viên
- Thêm/Chỉnh sửa/Xóa người dùng
- Phân quyền (Admin/Staff)

#### ⭐ **Đánh Giá** (`/admin/reviews`)
- Xem các bình luận & đánh giá
- Lọc theo rating
- Trả lời đánh giá

#### 👨‍👩‍👧‍👦 **Khách Hàng** (`/admin/customers`)
- Danh sách khách hàng
- Thống kê thành viên
- Phân loại mức thành viên (Kim cương, Vàng, Bạc, Thân thiết)

#### 🔍 **Tìm Kiếm** & **Phân Trang** - Tất cả các trang quản lý

---

### 6. **Thông Báo**
- ✅ **Chuông Thông Báo** - Hiển thị số lượng thông báo chưa đọc
- ✅ **Dropdown Thông Báo** - Xem danh sách thông báo
- ✅ **Đánh Dấu Đã Đọc** - Nhấp vào thông báo để đánh dấu
- ✅ **Xóa Tất Cả** - Xóa hết thông báo

#### Các Tệp Liên Quan:
- [src/components/ai/NotificationBell.jsx](src/components/ai/NotificationBell.jsx)
- [src/assets/styles/notification.css](src/assets/styles/notification.css)

#### Ví Dụ Thông Báo Mặc Định:
```
- ✓ Đơn hàng #123 đã được xác nhận (5 phút trước)
- ✓ Giao hàng thành công #122 (1 giờ trước)
- ✓ Bạn có 20% giảm giá hôm nay (2 giờ trước)
```

---

### 7. **Các Trang Khác**
- ✅ **Trang Chủ** (`/`) - Trang bắt đầu
- ✅ **Trang AI** (`/ai`) - Chatbot & Robot hỗ trợ
- ✅ **Trang Wishlist** (`/wishlist`) - Danh sách yêu thích

---

## 🐛 Các Lỗi Đã Sửa

### 1. **Lỗi Đăng Xuất Admin**
**Vấn đề:** Nút Đăng Xuất trong Sidebar Admin không hoạt động
**Giải Pháp:** 
- Thêm import `useNavigate` và `useAuthStore`
- Gọi hàm `logout()` từ auth store
- Chuyển hướng tới trang `/login`
- Tệp: [src/components/admin/SidebarAdmin.jsx](src/components/admin/SidebarAdmin.jsx)

### 2. **Không Có Logout Trên Header Người Dùng**
**Vấn đề:** Người dùng không thể đăng xuất từ header chính
**Giải Pháp:**
- Thêm dropdown menu khi hover vào thông tin người dùng
- Hiển thị options: "Hồ sơ cá nhân", "Đơn hàng của tôi", "Đăng xuất"
- Tệp: [src/components/common/Header.jsx](src/components/common/Header.jsx)

### 3. **NotificationBell Có Mã Trùng Lặp**
**Vấn đề:** Tệp có hai implementation khác nhau
**Giải Pháp:**
- Dọn dẹp & hợp nhất thành implementation duy nhất
- Thêm chức năng dropdown thông báo
- Cải thiện CSS
- Tệp: [src/components/ai/NotificationBell.jsx](src/components/ai/NotificationBell.jsx)

### 4. **QuickViewModal Không Hoàn Chỉnh**
**Vấn đề:** Có mã trùng lặp & thiếu tính năng
**Giải Pháp:**
- Tạo implementation mới với đầy đủ tính năng
- Thêm selector số lượng sản phẩm
- Thêm nút thêm vào giỏ hàng
- Cải thiện CSS styling
- Tệp: [src/components/ai/QuickViewModal.jsx](src/components/ai/QuickViewModal.jsx)

### 5. **TrackingTimeline Không Hoàn Chỉnh**
**Vấn đề:** Có mã trùng lặp & thiếu tính năng
**Giải Pháp:**
- Tạo implementation mới với đầy đủ tính năng
- Thêm timeline connector (đường nối)
- Thêm status badge (In Progress, Completed)
- Thêm animation cho trạng thái đang xử lý
- Cải thiện CSS & responsive design
- Tệp: [src/components/ai/TrackingTimeline.jsx](src/components/ai/TrackingTimeline.jsx)

---

## 🎯 Hướng Dẫn Sử Dụng

### Đăng Nhập Là Quản Lý:
```
1. Truy cập: http://localhost:3000/login
2. Chọn: "Quản lý" (Manager role)
3. Email: admin@smartfood.com
4. Mật khẩu: admin123
5. Nhấp: "Đăng nhập"
→ Sẽ chuyển tới Dashboard Admin (/admin)
```

### Đăng Nhập Là Khách:
```
1. Truy cập: http://localhost:3000/login
2. Chọn: "Người mua" (User role)
3. Email: customer@smartfood.com
4. Mật khẩu: password
5. Nhấp: "Đăng nhập"
→ Sẽ chuyển tới Trang Chủ (/)
```

### Đăng Xuất:
```
Admin: Nhấp vào nút đăng xuất 🚪 ở sidebar phải
Khách: Hover vào tên tài khoản ở header → Nhấp "Đăng xuất"
```

---

## 📱 Cấu Trúc Thư Mục

```
src/
├── components/
│   ├── admin/          # ✅ 8 component quản lý
│   ├── auth/           # ✅ Đăng nhập/Đăng ký
│   ├── ai/             # ✅ Thông báo, Quick View, Tracking
│   ├── cart/           # ✅ Sản phẩm, Giỏ hàng
│   ├── common/         # ✅ Header, Navbar, Footer
│   └── header/         # ✅ Header variants
├── pages/              # ✅ 20+ trang
├── stores/             # ✅ Zustand stores
├── services/           # ✅ API services
├── assets/styles/      # ✅ CSS files (improved)
└── constants/          # ✅ Routes, data
```

---

## 🚀 Tính Năng Kế Tiếp (Tùy Chọn)

- [ ] Xác thực Google/Facebook
- [ ] Tích hợp thanh toán thực tế (Stripe, VNPay)
- [ ] Email confirmation
- [ ] Two-factor authentication (2FA)
- [ ] Wish list chia sẻ
- [ ] Product reviews & ratings
- [ ] Inventory management real-time

---

## 📝 Ghi Chú Quan Trọng

1. **Bảo Lưu Dữ Liệu:** Sử dụng localStorage - dữ liệu sẽ mất khi xóa cache
2. **API Fallback:** Ứng dụng có API fallback, không cần backend thực tế
3. **CSS Responsive:** Tất cả component đều responsive trên mobile
4. **Zustand Store:** State management được sử dụng (dễ dàng mở rộng)

---

## 🔗 Liên Kết Nhanh

- **Đăng Nhập:** http://localhost:3000/login
- **Đăng Ký:** http://localhost:3000/register
- **Admin Dashboard:** http://localhost:3000/admin
- **Cửa Hàng:** http://localhost:3000/shop
- **Giỏ Hàng:** http://localhost:3000/cart
- **Hồ Sơ:** http://localhost:3000/profile

---

**Cuối cùng cập nhật:** 02/06/2026
**Phiên bản:** 1.0
