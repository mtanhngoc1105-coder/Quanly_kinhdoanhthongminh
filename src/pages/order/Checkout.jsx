import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/carts?userId=${user.id}`
        );

        const data = await res.json();

        if (data.length > 0) {
          setCart(data[0]);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [user.id]);

  const handleOrder = async () => {
    if (!fullName || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!cart || cart.items.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }

    const total = cart.items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      userId: user.id,
      customerName: fullName,
      phone,
      address,
      paymentMethod,
      items: cart.items,
      total,
      status: "Đang xử lý",
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      await fetch(
        `http://localhost:3001/carts/${cart.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...cart,
            items: [],
          }),
        }
      );

      alert("Đặt hàng thành công");

      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert("Lỗi đặt hàng");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center mt-10">
        Đang tải...
      </h2>
    );
  }

  const total =
    cart?.items?.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Thanh Toán
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Thông tin khách hàng
          </h2>

          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
            rows="4"
          />

          <h2 className="text-xl font-semibold mb-3">
            Phương thức thanh toán
          </h2>

          <div className="space-y-3">

            <label className="flex items-center gap-2 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              💵 Tiền mặt
            </label>

            <label className="flex items-center gap-2 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              💳 Thẻ ngân hàng
            </label>

            <label className="flex items-center gap-2 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              📱 Ví điện tử
            </label>

          </div>
        </div>

        {/* ORDER */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Đơn hàng của bạn
          </h2>

          {cart?.items?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-3"
            >
              <div>
                <p className="font-medium">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  Số lượng: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                {(
                  item.price * item.quantity
                ).toLocaleString()}
                đ
              </p>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold mt-6">
            <span>Tổng:</span>

            <span>
              {total.toLocaleString()}đ
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-6 text-lg font-semibold"
          >
            Mua Hàng
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;