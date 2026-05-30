# 🚀 Hướng Dẫn Chạy Ứng Dụng

## ✅ Yêu Cầu Trước

- Node.js v14+ + npm
- Mở 2 terminal (Terminal 1 cho backend, Terminal 2 cho frontend)

---

## 🏃 Khởi Động

### Terminal 1: Backend (json-server)

```bash
cd d:\Quanly_kinhdoanhthongminh-main\Quanly_kinhdoanhthongminh-main
npm run server
```

**Kết quả mong đợi:**
```
✓ watch mode started. keep focus on the terminal.
✓ Listening on 3001
```

### Terminal 2: Frontend (React Dev Server)

```bash
cd d:\Quanly_kinhdoanhthongminh-main\Quanly_kinhdoanhthongminh-main
npm start
```

**Kết quả mong đợi:**
```
Compiled successfully!

You can now view ngaymoi in the browser.

  http://localhost:3000
```

---

## 🌐 Truy Cập Ứng Dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

---

## 📋 Tài Khoản Test

| Email | Mật khẩu | Vai trò |
|-------|-----------|--------|
| user@gmail.com | 123456 | Customer |
| tranb@gmail.com | 123456 | Customer |
| admin@gmail.com | 123456 | Admin |

---

## 🧪 Kiểm Tra Nhanh

### 1. Đăng Nhập
1. Nhấp "Đăng Nhập"
2. Nhập: `user@gmail.com` / `123456`
3. Xác nhận ✅

### 2. Thêm Sản Phẩm
1. Ở trang chủ, nhấp icon giỏ hàng bên phải mỗi sản phẩm
2. Giỏ hàng hiển thị ở cột phải

### 3. Thanh Toán (CartPage)
1. Chọn phương thức (COD / Ngân hàng / MoMo)
2. Nhấp "Tiến hành đặt hàng"
3. Thấy thông báo ✅

### 4. Thanh Toán Chi Tiết (CheckoutPage)
1. Truy cập: `http://localhost:3000/checkout`
2. Nhập địa chỉ
3. Chọn phương thức
4. Nhấp "Xác nhận đặt hàng"
5. Redirect `/orders` ✅

---

## 🔧 Build Production

```bash
npm run build
```

**Output:** `build/` folder (147KB gzip)

---

## 📚 Tài Liệu

- `AUTH_GUIDE.md` - Hướng dẫn auth & login
- `PAYMENT_GUIDE.md` - Hướng dẫn thanh toán
- `CHANGES_SUMMARY.md` - Tóm tắt thay đổi
- `README.md` - Tổng quan dự án

---

Chúc bạn thành công! 🎉
