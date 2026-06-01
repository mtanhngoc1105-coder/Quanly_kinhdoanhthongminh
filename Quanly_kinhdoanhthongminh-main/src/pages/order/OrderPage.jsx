import { useEffect, useState } from "react";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:3001/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user.id]);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Đơn hàng của tôi
      </h1>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow"
            >
              <p>
                <strong>Mã đơn:</strong> #{order.id}
              </p>

              <p>
                <strong>Tổng tiền:</strong>{" "}
                {order.totalAmount.toLocaleString()}đ
              </p>

              <p>
                <strong>Thanh toán:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Trạng thái:</strong>{" "}
                {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;