import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import database from "../../database.json";
import useCartStore from "../../stores/cartStore";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const product = useMemo(() => {
    return database.products.find((item) => item.id === id);
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Sản phẩm không tồn tại</h1>
        <p>Xin lỗi, chúng tôi không tìm thấy sản phẩm bạn yêu cầu.</p>
      </div>
    );
  }

  const productImage = database.productImages.find((img) => img.productId === product.id)?.url || "https://via.placeholder.com/600";

  return (
    <div style={{ padding: "32px", maxWidth: 1080, margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: 24, padding: "10px 18px", borderRadius: 10, border: "1px solid #d1d5db", background: "white", cursor: "pointer" }}
      >
        Quay lại
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32 }}>
        <div>
          <img src={productImage} alt={product.title} style={{ width: "100%", borderRadius: 20, objectFit: "cover", minHeight: 420 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <span style={{ display: "inline-block", padding: "8px 14px", background: "#d1fae5", color: "#166534", borderRadius: 9999, fontWeight: 700, marginBottom: 12 }}>
              {product.category}
            </span>
            <h1 style={{ margin: "16px 0 12px", fontSize: "2rem", color: "#111827" }}>{product.title}</h1>
            <p style={{ color: "#4b5563", lineHeight: 1.8 }}>{product.description || "Sản phẩm tươi sạch, đảm bảo nguồn gốc rõ ràng."}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#16a34a" }}>{product.price.toLocaleString()}đ</span>
            {product.oldPrice && <del style={{ color: "#9ca3af" }}>{product.oldPrice.toLocaleString()}đ</del>}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ background: "#eef2ff", color: "#1d4ed8", padding: "8px 12px", borderRadius: 9999, fontWeight: 700 }}>Kho: {product.stock}</span>
            <span style={{ background: "#f5f3ff", color: "#6d28d9", padding: "8px 12px", borderRadius: 9999, fontWeight: 700 }}>SKU: {product.sku}</span>
          </div>

          <button
            onClick={() => addToCart({ ...product, img: productImage })}
            style={{ marginTop: 24, padding: "14px 22px", borderRadius: 16, border: "none", background: "#16a34a", color: "white", fontWeight: 700, cursor: "pointer" }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
