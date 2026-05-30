# 💳 Hướng Dẫn Thanh Toán

## 🎯 Tổng Quan

Ứng dụng có **hai luồng thanh toán**:

### 1️⃣ **CartPage** - Giỏ Hàng Nhanh (Modal)
- Trang: `/cart`
- Hiển thị giỏ hàng bên phải màn hình
- Lựa chọn phương thức thanh toán:
  - 💵 **COD** (Thanh toán khi nhận hàng)
  - 💳 **Chuyển khoản Ngân hàng** (quét QR)
  - 📱 **Ví điện tử** (MoMo, ZaloPay)
- Nhấp "Tiến hành đặt hàng" → tạo đơn + xóa giỏ → hiển thị thành công

### 2️⃣ **CheckoutPage** - Thanh Toán Chi Tiết
- Trang: `/checkout`  
- Biểu mẫu đầy đủ:
  - Danh sách sản phẩm
  - Nhập địa chỉ
  - Lựa chọn phương thức:
    - 💵 **COD** (status: pending)
    - 💳 **Thẻ** (nhập số thẻ, MM/YY, CVC) → mô phỏng → status: paid
    - 📱 **Ví điện tử** (MoMo) → mô phỏng → status: paid
- Nhấp "Xác nhận đặt hàng" → xử lý thanh toán → tạo order + orderItems → redirect `/orders`

---

## 🧪 Kiểm Tra

### Từ CartPage

1. Truy cập: `http://localhost:3000`
2. Thêm sản phẩm vào giỏ hàng
3. Giỏ hàng pop-up bên phải, chọn phương thức thanh toán
4. Nhấp "Tiến hành đặt hàng"
5. Thấy thông báo thành công ✅

### Từ CheckoutPage

1. Sau khi có giỏ hàng, truy cập: `http://localhost:3000/checkout`
2. Nhập địa chỉ giao hàng
3. Chọn phương thức:
   - **COD**: Nhấp nút → đơn được tạo với status `pending`
   - **Thẻ**: Nhập thẻ (số ≥12 ký tự), MM/YY, CVC → chờ 1.2s (mô phỏng) → status `paid`
   - **MoMo**: Chọn → chờ 1s (mô phỏng) → status `paid`
4. Nhấp "Xác nhận đặt hàng"
5. Redirect đến `/orders` nếu thành công

---

## 📊 Trạng Thái Đơn

| Status | Ý Nghĩa |
|--------|---------|
| `pending` | Chờ thanh toán (COD) |
| `paid` | Đã thanh toán (Card/MoMo) |
| `processing` | Đang xử lý |
| `shipped` | Đã giao |
| `cancelled` | Bị hủy |

---

## 🔐 Mock vs Thực

### Hiện Tại (Mock)
- **Thẻ**: Kiểm tra độ dài, mô phỏng gọi API (~1.2s delay)
- **MoMo**: Mô phỏng chuyển hướng (~1s delay)  
- **COD**: Không xử lý, chỉ ghi "pending"

### Tích Hợp Thực
Cần:
- **Stripe/Paypal**: Tạo session trên backend, nhận token thanh toán
- **MoMo API**: Tạo link thanh toán, webhook xác nhận
- **VNPay**: Khác, cấp IPN endpoint để xác thực
- **Database webhook**: Cập nhật status sau xác nhận từ cổng

---

## 🚀 API Endpoints Được Sử Dụng

| Phương Thức | URL | Mục Đích |
|-------------|-----|---------|
| GET | `/carts?userId=X` | Lấy giỏ của user |
| POST | `/orders` | Tạo đơn hàng |
| POST | `/orderItems` | Tạo chi tiết đơn |
| DELETE | `/carts/X` | Xóa giỏ sau thanh toán |

---

Chúc thanh toán mượt mà! 🎉
