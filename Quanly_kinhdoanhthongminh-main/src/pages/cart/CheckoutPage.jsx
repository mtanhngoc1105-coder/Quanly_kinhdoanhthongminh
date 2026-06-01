
import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchCart = useCallback(async () => {
    try {
      const cartRes = await fetch(
        `http://localhost:3001/carts?userId=${user.id}`
      );

      const cartData = await cartRes.json();

      if (cartData.length === 0) return;

      const currentCart = cartData[0];

      setCart(currentCart);

      const productPromises =
        currentCart.items.map(async (item) => {
          const res = await fetch(
            `http://localhost:3001/products/${item.productId}`
          );

          const product = await res.json();

          return {
            ...product,
            quantity: item.quantity,
          };
        });

      const productData = await Promise.all(
        productPromises
      );

      setProducts(productData);
    } catch (err) {
      console.log(err);
    }
  }, [user.id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalPrice = products.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      if (!address) {
        alert("Vui lòng nhập địa chỉ");
        return;
      }

      // If user not logged in, redirect to login
      if (!user || !user.id) {
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
          return;
        }

        if (cardCVC.length < 3) {
          setPaymentError("CVC không hợp lệ");
          return;
        }

        setProcessingPayment(true);

        // simulate calling payment gateway
        await new Promise((res) => setTimeout(res, 1200));

        setProcessingPayment(false);

        // success
        paymentStatus = "paid";
      } else if (paymentMethod === "momo") {
        setProcessingPayment(true);

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

      const newOrder = await orderRes.json();

      for (const item of products) {
        await fetch("http://localhost:3001/orderItems", {
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
          }),
        });
      }

      await fetch(`http://localhost:3001/carts/${cart.id}`, {
        method: "DELETE",
      });

      alert(paymentStatus === "paid" ? "Thanh toán và đặt hàng thành công!" : "Đặt hàng thành công! Vui lòng thanh toán khi nhận hàng.");

      navigate("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Thanh toán đơn hàng
      </h1>

      {/* SẢN PHẨM */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <h2 className="text-2xl font-bold mb-5">
          Sản phẩm
        </h2>

        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-500">
                  Số lượng:
                  {item.quantity}
                </p>
              </div>

              <div className="font-bold text-red-500 text-lg">
                {(
                  item.price *
                  item.quantity
                ).toLocaleString()}
                đ
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ĐỊA CHỈ */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <h2 className="text-2xl font-bold mb-5">
          Địa chỉ nhận hàng
        </h2>

        <textarea
          placeholder="Nhập địa chỉ giao hàng..."
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full border rounded-xl p-4 outline-none min-h-[120px]"
        />

      </div>

      {/* THANH TOÁN */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <h2 className="text-2xl font-bold mb-5">
          Phương thức thanh toán
        </h2>

        <div className="space-y-4">

          {/* COD */}
          <label className="flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-green-600">

            <input
              type="radio"
              name="payment"
              value="cod"
              checked={
                paymentMethod === "cod"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />

            <div>
              <h3 className="font-bold">
                💵 Thanh toán tiền mặt
              </h3>

              <p className="text-gray-500">
                Thanh toán khi nhận hàng
              </p>
            </div>

          </label>

          {/* CARD */}
          <label className="flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-green-600">

            <input
              type="radio"
              name="payment"
              value="card"
              checked={
                paymentMethod === "card"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />

            <div>
              <h3 className="font-bold">
                💳 Thanh toán bằng thẻ
              </h3>

              <p className="text-gray-500">
                Visa / Mastercard
              </p>
            </div>

          </label>

          {/* MOMO */}
          <label className="flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-green-600">

            <input
              type="radio"
              name="payment"
              value="momo"
              checked={
                paymentMethod === "momo"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />

            <div>
              <h3 className="font-bold">
                📱 Ví điện tử
              </h3>

              <p className="text-gray-500">
                MoMo / ZaloPay / VNPay
              </p>
            </div>

          </label>

          {paymentMethod === "card" && (
            <div className="mt-4 space-y-3 p-4 border rounded-xl">
              {paymentError && (
                <p className="text-red-500">{paymentError}</p>
              )}

              <input
                className="w-full border rounded-xl p-3 outline-none"
                placeholder="Số thẻ (ví dụ 4111 1111 1111)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                disabled={processingPayment}
              />

              <div className="flex gap-3">
                <input
                  className="flex-1 border rounded-xl p-3 outline-none"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  disabled={processingPayment}
                />

                <input
                  className="w-32 border rounded-xl p-3 outline-none"
                  placeholder="CVC"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  disabled={processingPayment}
                />
              </div>

              {processingPayment && (
                <p className="text-gray-600">Đang xử lý thanh toán...</p>
              )}
            </div>
          )}

          {paymentMethod === "momo" && (
            <div className="mt-4 p-4 border rounded-xl">
              <p className="text-gray-600">Chọn ví điện tử — hệ thống sẽ mô phỏng chuyển hướng và xử lý thanh toán tự động khi xác nhận.</p>
            </div>
          )}
        </div>

      </div>

      {/* TỔNG TIỀN */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Tổng thanh toán
          </h2>

          <div className="text-3xl font-bold text-red-500">
            {totalPrice.toLocaleString()}
            đ
          </div>

        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-xl font-bold transition"
        >
          Xác nhận đặt hàng
        </button>

      </div>

    </div>
  );
}

export default CheckoutPage;