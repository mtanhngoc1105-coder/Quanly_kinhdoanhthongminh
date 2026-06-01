# Hướng Dẫn Đăng Nhập và Đăng Ký

## ✅ Đã Cài Đặt

Tôi đã cải thiện hệ thống xác thực cho ứng dụng của bạn:

### 1. **Backend (json-server)**
- Chạy trên: `http://localhost:3001`
- Cơ sở dữ liệu: `database.json`
- Bảng users: Chứa danh sách người dùng

### 2. **Frontend (React)**
- Chạy trên: `http://localhost:3000`
- API được cấu hình tại: `src/services/api.js`

### 3. **Các Cải Thiện Đã Thực Hiện**

#### 📝 LoginForm.jsx
- ✅ Thêm trạng thái loading (hiển thị "Đang đăng nhập...")
- ✅ Vô hiệu hóa input khi đang xử lý
- ✅ Xóa lỗi khi người dùng bắt đầu nhập
- ✅ Hiệu ứng visual khi đang tải
- ✅ Thông báo lỗi rõ ràng và có màu nền
- ✅ Link đến trang đăng ký

#### 🔐 RegisterForm.jsx
- ✅ Thêm trạng thái loading
- ✅ Kiểm tra độ dài mật khẩu (tối thiểu 6 ký tự)
- ✅ Hiển thị thông báo thành công khi đăng ký thành công
- ✅ Tự động chuyển hướng đến trang đăng nhập sau 2 giây
- ✅ Link đến trang đăng nhập
- ✅ Xóa lỗi khi người dùng bắt đầu nhập

#### 🔧 authService.js
- ✅ Cải thiện thông báo lỗi
- ✅ Avatar ngẫu nhiên cho người dùng mới
- ✅ Kiểm tra email trùng lặp
- ✅ Log console để dễ debug

#### 🎯 authStore.js (Zustand)
- ✅ Tích hợp localStorage tốt hơn
- ✅ Thêm loading state
- ✅ Nhất quán với login/logout

---

## 🧪 Kiểm Tra Đăng Nhập

### Tài Khoản Test

Dưới đây là các tài khoản mẫu bạn có thể sử dụng để kiểm tra:

| Email | Mật khẩu | Vai trò |
|-------|-----------|--------|
| user@gmail.com | 123456 | Customer |
| tranb@gmail.com | 123456 | Customer |
| levanc@gmail.com | 123456 | Customer |
| admin@gmail.com | 123456 | Admin |
| vuthivan16011996@gmail.com | 123456 | Customer |

### Hướng Dẫn Kiểm Tra

1. **Mở trình duyệt** và truy cập: `http://localhost:3000`

2. **Kiểm Tra Đăng Nhập**:
   - Nhấp vào trang "Đăng Nhập"
   - Nhập email: `user@gmail.com`
   - Nhập mật khẩu: `123456`
   - Nhấp "Đăng Nhập"
   - ✅ Sẽ thấy thông báo "Đăng nhập thành công" và chuyển về trang chủ

3. **Kiểm Tra Đăng Ký**:
   - Nhấp vào trang "Đăng Ký"
   - Nhập thông tin:
     - Họ tên: (bất kỳ)
     - Email: (email chưa tồn tại, ví dụ: `test@example.com`)
     - Mật khẩu: (tối thiểu 6 ký tự)
   - Nhấp "Đăng Ký"
   - ✅ Sẽ thấy thông báo "Đăng ký thành công!" và tự động chuyển đến trang đăng nhập

4. **Kiểm Tra Lỗi**:
   - Email trùng: Nhập email đã tồn tại → hiển thị lỗi "Email này đã được đăng ký"
   - Mật khẩu ngắn: Nhập mật khẩu < 6 ký tự → hiển thị lỗi "Mật khẩu phải có ít nhất 6 ký tự"
   - Trường trống: Bỏ trống trường nào → hiển thị lỗi "Vui lòng nhập đầy đủ thông tin"

---

## 🔍 Gỡ Lỗi (Debugging)

### Kiểm Tra Console Browser
Nhấp F12 để mở Developer Tools → Tab "Console", sẽ thấy các log:
- `Login response: [...]` - Phản hồi từ API
- `Register success: {...}` - User mới tạo thành công
- `User logged in and saved to localStorage: {...}` - Đăng nhập thành công

### Kiểm Tra json-server
- Terminal chạy `npm run server` sẽ hiển thị các request:
  - `GET /users?email=...&password=...` - Đăng nhập
  - `POST /users` - Tạo user mới

### Kiểm Tra localStorage
1. Mở DevTools (F12)
2. Đi tới Tab "Application" → "Local Storage" → `http://localhost:3000`
3. Sẽ thấy key `user` chứa JSON của người dùng đã đăng nhập

---

## 📊 Tình Trạng API

Các endpoint được sử dụng:

| Phương Thức | Endpoint | Mô Tả |
|------------|----------|-------|
| GET | `/users?email=X&password=Y` | Tìm user theo email và password |
| GET | `/users?email=X` | Kiểm tra email tồn tại |
| POST | `/users` | Tạo user mới |

---

## 💳 Thanh toán (Mock)

Ứng dụng hiện có một luồng thanh toán mô phỏng trên trang `Checkout`:

- Khi chọn **Thẻ**, sẽ hiển thị form nhập `Số thẻ`, `MM/YY`, `CVC` (mô phỏng). Hệ thống kiểm tra số ký tự cơ bản và mô phỏng gọi cổng thanh toán trước khi tạo đơn với `paymentStatus: paid`.
- Khi chọn **Ví điện tử (MoMo/ZaloPay/VNPay)**, hệ thống mô phỏng chuyển hướng và xử lý, sau đó tạo đơn với `paymentStatus: paid`.
- Khi chọn **Thanh toán tiền mặt (COD)**, đơn được tạo với `paymentStatus: pending` và khách trả khi nhận hàng.

Lưu ý: Đây là mô phỏng để kiểm thử; để tích hợp cổng thật, cần server-side endpoint để tạo session (Stripe/VNPay/MoMo) và webhook xác thực thanh toán.

## 🚀 Bước Tiếp Theo (Tuỳ Chọn)

1. **Thêm Reset Form**:
   - Xóa dữ liệu form sau khi đăng ký/đăng nhập thành công

2. **Thêm Remember Me**:
   - Lưu email trên trình duyệt

3. **Thêm Forgot Password**:
   - Chức năng khôi phục mật khẩu

4. **Xác Thực Email**:
   - Gửi email xác nhận sau khi đăng ký

5. **Kích Hoạt 2FA**:
   - Xác thực hai nhân tốc độ

---

## ❓ Hỏi Đáp Nhanh

**Q: Tôi quên mật khẩu làm sao?**
A: Hiện tại chưa có chức năng reset password. Bạn có thể chỉnh sửa `database.json` hoặc liên hệ admin.

**Q: Tại sao tôi không thể đăng ký với email cũ?**
A: Hệ thống đã kiểm tra email trùng lặp để tránh duplicate tài khoản.

**Q: Dữ liệu của tôi có được bảo mật?**
A: Hiện tại mật khẩu được lưu ở dạng plain text trong database.json. Trong production, phải hash mật khẩu!

---

Chúc bạn sử dụng tốt! 🎉
