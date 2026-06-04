
import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import Toast from "../../components/common/Toast";
import OrderSuccessToast from "../../components/common/OrderSuccessToast";
import useToast from "../../hooks/useToast";
import useCartStore from "../../stores/cartStore";
import useNotificationStore from "../../stores/notificationStore";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

function CheckoutPage() {
  const [cart, setCart] = useState(null);

  const [products, setProducts] = useState([]);

  const [address, setAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  // card payment fields (mock)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);

  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const { addNotification } = useNotificationStore();

  const user = JSON.parse(
    localStorage.getItem("user") ?? "null"
  );

  // Get cart from store
  const { cartItems, clearCart } = useCartStore();

  // Fetch cart data when component mounts or user changes
  useEffect(() => {
    const loadCart = async () => {
      // First, try to get from cart store (local state)
      if (cartItems && cartItems.length > 0) {
        console.log("Loading cart from store:", cartItems);
        setProducts(cartItems);
        
        if (!cart && user?.id) {
          setCart({
            id: `temp-${user.id}`,
            userId: user.id,
            items: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          });
        }
        return;
      }

      // If store is empty, try to fetch from API
      if (!user?.id) {
        console.log("No user ID found");
        return;
      }

      try {
        console.log("Fetching cart from API for user:", user.id);
        const cartRes = await fetch(
          `http://localhost:3001/carts?userId=${user.id}`
        );

        const cartData = await cartRes.json();
        console.log("Cart API data:", cartData);

        if (!cartData || cartData.length === 0) {
          console.log("No cart found in API");
          return;
        }

        const currentCart = cartData[0];
        setCart(currentCart);

        if (!currentCart.items || currentCart.items.length === 0) {
          console.log("Cart has no items");
          return;
        }

        // Fetch all products in cart
        const productPromises = currentCart.items.map(async (item) => {
          try {
            const res = await fetch(
              `http://localhost:3001/products/${item.productId}`
            );
            const product = await res.json();
            console.log("Fetched product:", product);

            return {
              ...product,
              quantity: item.quantity,
            };
          } catch (err) {
            console.error("Error fetching product:", err);
            return null;
          }
        });

        const productData = await Promise.all(productPromises);
        const validProducts = productData.filter((p) => p !== null);
        console.log("All products:", validProducts);
        
        setProducts(validProducts);
      } catch (err) {
        console.error("Error loading cart from API:", err);
      }
    };

    loadCart();
  }, [cartItems, user?.id]);

  const totalPrice = products.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      if (!address) {
        addToast("Vui lòng nhập địa chỉ giao hàng", "error");
        return;
      }

      if (!user?.id) {
        navigate("/login");
        return;
      }

      // Handle payment flow based on method (mock implementations)
      let paymentStatus = "pending";

      if (paymentMethod === "card") {
        setPaymentError("");

        // basic validations
        if (cardNumber.replace(/\s+/g, "").length < 12) {
          setPaymentError("Số thẻ không hợp lệ");
          addToast("Số thẻ không hợp lệ", "error");
          return;
        }

        if (cardCVC.length < 3) {
          setPaymentError("CVC không hợp lệ");
          addToast("CVC không hợp lệ", "error");
          return;
        }

        setProcessingPayment(true);
        addToast("Đang xử lý thanh toán thẻ...", "info");

        // simulate calling payment gateway
        await new Promise((res) => setTimeout(res, 1200));

        setProcessingPayment(false);

        // success
        paymentStatus = "paid";
      } else if (paymentMethod === "momo") {
        setProcessingPayment(true);
        addToast("Chuyển hướng đến MoMo...", "info");

        // simulate redirect to mobile wallet and success
        await new Promise((res) => setTimeout(res, 1000));

        setProcessingPayment(false);

        paymentStatus = "paid";
      } else {
        // COD
        paymentStatus = "pending";
      }

      const order = {
        userId: user.id,
        totalAmount: totalPrice,
        status: "processing",
        paymentStatus: paymentStatus,
        paymentMethod: paymentMethod,
        address: address,
        createdAt: new Date().toISOString(),
      };

      const orderRes = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        console.error("Order creation failed:", errorData);
        throw new Error(errorData.message || "Không thể tạo đơn hàng");
      }

      const newOrder = await orderRes.json();
      console.log("Order created successfully:", newOrder);

      for (const item of products) {
        const itemRes = await fetch("http://localhost:3001/orderItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: newOrder.id,
            productId: item.id,
            productName: item.title,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
            img: item.img,
          }),
        });
        
        if (!itemRes.ok) {
          const errorData = await itemRes.json();
          console.error("OrderItem creation failed:", errorData);
          throw new Error(errorData.message || "Không thể thêm sản phẩm vào đơn hàng");
        }
      }
      console.log("All order items created successfully");

      if (cart?.id) {
        const cartRes = await fetch(`http://localhost:3001/carts/${cart.id}`, {
          method: "DELETE",
        });
        if (!cartRes.ok) {
          console.warn("Warning: Could not delete cart");
        }
      }

      // Add notification
      const productNames = products.map(p => p.title).join(", ");
      addNotification({
        message: `✓ Đã đặt hàng thành công: ${productNames}`,
        type: "order",
        orderId: newOrder.id,
        totalAmount: totalPrice,
        paymentStatus: paymentStatus,
        read: false,
      });

      // Clear cart from store
      clearCart();

      // Show order success toast
      setOrderSuccess({
        order: newOrder,
        products: products,
      });

      // Navigate after showing toast
      setTimeout(() => {
        setOrderSuccess(null);
        navigate("/orders");
      }, 4000);
    } catch (err) {
      console.error("Order processing error:", err);
      addToast(err.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
      setProcessingPayment(false);
    }
  };

  if (!user?.id) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentWrapper}>
          <button onClick={() => navigate("/")} style={styles.backBtn}>
            <FiArrowLeft /> Quay lại
          </button>
          <div style={styles.emptyContainer}>
            <h1 style={styles.title}>Thanh toán đơn hàng</h1>
            <p style={styles.emptyText}>
              Vui lòng đăng nhập để tiếp tục thanh toán.
            </p>
            <button
              className="mt-6"
              style={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.contentWrapper}>
          <button onClick={() => navigate("/cart")} style={styles.backBtn}>
            <FiArrowLeft /> Quay lại giỏ hàng
          </button>
          <div style={styles.emptyContainer}>
            <h1 style={styles.title}>Thanh toán đơn hàng</h1>
            <p style={styles.emptyText}>
              Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm từ giỏ hàng.
            </p>
            <button
              style={styles.loginBtn}
              onClick={() => navigate("/cart")}
            >
              ← Quay lại giỏ hàng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {orderSuccess && (
        <OrderSuccessToast
          order={orderSuccess.order}
          products={orderSuccess.products}
          duration={4000}
          onClose={() => setOrderSuccess(null)}
        />
      )}
      
      <div style={styles.contentWrapper}>
        <button onClick={() => navigate("/cart")} style={styles.backBtn}>
          <FiArrowLeft /> Quay lại giỏ hàng
        </button>

        <h1 style={styles.title}>💳 Thanh toán đơn hàng</h1>

        <div style={styles.mainContent}>
          {/* SẢN PHẨM */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📦 Sản phẩm ({products.length})</h2>
            <div style={styles.productList}>
              {products.map((item) => (
                <div key={item.id} style={styles.productItem}>
                  <img src={item.img} alt={item.title} style={styles.productImg} />
                  <div style={styles.productInfo}>
                    <h3 style={styles.productName}>{item.title}</h3>
                    <p style={styles.productQty}>Số lượng: {item.quantity}</p>
                  </div>
                  <div style={styles.productMeta}>
                    <p style={styles.priceLabel}>{item.price.toLocaleString()}đ × {item.quantity}</p>
                    <p style={styles.productPrice}>{(item.price * item.quantity).toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ĐỊA CHỈ */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📍 Địa chỉ nhận hàng</h2>
            <textarea
              placeholder="Nhập địa chỉ giao hàng của bạn..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.textarea}
            />
          </div>

          {/* THANH TOÁN */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>💳 Phương thức thanh toán</h2>

            {/* COD */}
            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <div>
                <h3 style={styles.paymentTitle}>💵 Thanh toán tiền mặt</h3>
                <p style={styles.paymentDesc}>Thanh toán khi nhận hàng (COD)</p>
              </div>
            </label>

            {/* CARD */}
            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <div>
                <h3 style={styles.paymentTitle}>💳 Thanh toán bằng thẻ</h3>
                <p style={styles.paymentDesc}>Visa / Mastercard</p>
              </div>
            </label>

            {/* MOMO */}
            <label style={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.radio}
              />
              <div>
                <h3 style={styles.paymentTitle}>📱 Ví điện tử</h3>
                <p style={styles.paymentDesc}>MoMo / ZaloPay / VNPay</p>
              </div>
            </label>

            {paymentMethod === "card" && (
              <div style={styles.cardFields}>
                {paymentError && (
                  <p style={styles.errorMsg}>{paymentError}</p>
                )}
                <input
                  style={styles.input}
                  placeholder="Số thẻ (ví dụ 4111 1111 1111 1111)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  disabled={processingPayment}
                />
                <div style={styles.cardRow}>
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    disabled={processingPayment}
                  />
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    placeholder="CVC"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    disabled={processingPayment}
                  />
                </div>
                {processingPayment && (
                  <p style={styles.processingMsg}>⏳ Đang xử lý thanh toán...</p>
                )}
              </div>
            )}

            {paymentMethod === "momo" && (
              <div style={styles.infoBox}>
                <p>Chọn ví điện tử — hệ thống sẽ chuyển hướng khi bạn xác nhận.</p>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div style={styles.summaryCard}>
          <div style={styles.summarySection}>
            <p style={styles.summaryLabel}>Tạm tính</p>
            <p style={styles.summaryValue}>{totalPrice.toLocaleString()}đ</p>
          </div>
          <div style={styles.summarySection}>
            <p style={styles.summaryLabel}>Phí vận chuyển</p>
            <p style={{...styles.summaryValue, color: "#10b981"}}>Miễn phí</p>
          </div>
          <div style={styles.divider}></div>
          <div style={styles.totalSection}>
            <p style={styles.totalLabel}>Tổng cộng</p>
            <p style={styles.totalAmount}>{totalPrice.toLocaleString()}đ</p>
          </div>
          <button
            onClick={handleOrder}
            disabled={processingPayment}
            style={{
              ...styles.checkoutBtn,
              opacity: processingPayment ? 0.7 : 1,
              cursor: processingPayment ? "not-allowed" : "pointer"
            }}
          >
            {processingPayment ? "⏳ Đang xử lý..." : "Xác nhận đặt hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    display: "block",
    fontFamily: "system-ui, -apple-system, sans-serif",
    paddingBottom: "20px",
    overflow: "hidden",
    overflowY: "auto"
  },
  contentWrapper: {
    width: "100%",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "16px"
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    color: "#10b981",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "20px",
    padding: "10px 16px",
    borderRadius: "8px",
    transition: "all 0.2s"
  },
  title: {
    fontSize: "28px",
    color: "#111",
    marginBottom: "20px",
    fontWeight: "700"
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "24px",
    marginBottom: "24px"
  },
  section: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111",
    marginBottom: "16px"
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  productItem: {
    display: "grid",
    gridTemplateColumns: "80px 1fr auto",
    gap: "16px",
    alignItems: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid #f3f4f6"
  },
  productImg: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#f9fafb"
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  productName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0",
    lineHeight: "1.4"
  },
  productQty: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0"
  },
  productMeta: {
    textAlign: "right"
  },
  priceLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: "0 0 4px 0"
  },
  productPrice: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#10b981",
    margin: "0"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "system-ui",
    minHeight: "100px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  paymentOption: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  radio: {
    marginTop: "2px",
    cursor: "pointer"
  },
  paymentTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 4px 0"
  },
  paymentDesc: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0"
  },
  cardFields: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  cardRow: {
    display: "flex",
    gap: "12px"
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  errorMsg: {
    color: "#ef4444",
    fontSize: "13px",
    margin: "0"
  },
  processingMsg: {
    color: "#3b82f6",
    fontSize: "13px",
    margin: "0"
  },
  infoBox: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: "#f0f9ff",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#0c4a6e",
    border: "1px solid #e0f2fe"
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 20
  },
  summarySection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  summaryLabel: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0",
    fontWeight: "500"
  },
  summaryValue: {
    fontSize: "14px",
    color: "#1f2937",
    margin: "0",
    fontWeight: "600"
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "12px 0"
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  totalLabel: {
    fontSize: "15px",
    color: "#1f2937",
    margin: "0",
    fontWeight: "700"
  },
  totalAmount: {
    fontSize: "18px",
    color: "#ef4444",
    margin: "0",
    fontWeight: "700"
  },
  checkoutBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  emptyContainer: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb"
  },
  emptyText: {
    color: "#6b7280",
    fontSize: "16px",
    marginBottom: "24px",
    fontWeight: "500"
  },
  loginBtn: {
    padding: "12px 32px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.2s"
  }
};

export default CheckoutPage;