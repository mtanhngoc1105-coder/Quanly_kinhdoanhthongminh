import React, { useEffect, useMemo, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { categories, allProducts } from "../../constants/productsData";

function FlashSalePage() {
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Build mock sale products: take first 12 products and add sale fields
  const saleProducts = useMemo(() => {
    const items = (allProducts || []).slice(0, 12).map((p, idx) => {
      const discount = [0.15, 0.25, 0.35, 0.5][idx % 4];
      const stock = 200 - idx * 5;
      const sold = Math.min(Math.floor(Math.random() * 120) + 20, stock);
      const saleEnd = Date.now() + (idx + 1) * 1000 * 60 * 60 * 6; // staggered end times
      return {
        ...p,
        discount,
        stock,
        sold,
        saleEnd,
        discountedPrice: Math.round(p.price * (1 - discount)),
      };
    });
    return items;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    const iv = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  const mainEnd = useMemo(() => Date.now() + 1000 * 60 * 60 * 6, []);

  const remaining = (ts) => Math.max(0, ts - now);

  const formatRemaining = (ms) => {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / 1000 / 60) % 60;
    const hrs = Math.floor(ms / 1000 / 60 / 60);
    return `${hrs}h ${min}m ${sec}s`;
  };

  const stats = useMemo(() => {
    const total = saleProducts.length;
    const maxDiscount = Math.max(...saleProducts.map((s) => s.discount * 100));
    const totalSold = saleProducts.reduce((a, b) => a + b.sold, 0);
    return { total, maxDiscount, totalSold };
  }, [saleProducts]);

  return (
    <div style={{ width: "100%", minHeight: "100vh", padding: 24, boxSizing: "border-box", background: darkMode ? "#0f1724" : "#f8fafc" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h1 style={{ fontSize: 28, color: darkMode ? "#e6f6ff" : "#0f1724" }}>⚡ Trang Flash Sale SmartFood</h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setDarkMode((s) => !s)} style={{ padding: "8px 12px", borderRadius: 8 }}>{darkMode ? "Light" : "Dark"}</button>
            <div style={{ textAlign: "right", color: darkMode ? "#cbd5e1" : "#374151" }}>
              <div style={{ fontWeight: 700 }}>{stats.total} sản phẩm đang sale</div>
              <div style={{ fontSize: 12 }}>Mức giảm cao nhất: {stats.maxDiscount}%</div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={{ background: darkMode ? "linear-gradient(90deg,#1f2937,#0f1724)" : "linear-gradient(90deg,#fef3c7,#fee2e2)", borderRadius: 12, padding: 20, marginBottom: 20, display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: 0 }}>🔥 Banner Flash Sale</h2>
            <p style={{ margin: "6px 0", color: darkMode ? "#cbd5e1" : "#6b7280" }}>Săn ngay ưu đãi cực sốc trong thời gian có hạn!</p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ background: "white", padding: "8px 12px", borderRadius: 8, fontWeight: 700 }}>{Math.max(...saleProducts.map(s=>Math.round(s.discount*100)))}% GIẢM</div>
              <div style={{ fontWeight: 700 }}>Slogan: Siêu khuyến mãi mỗi ngày</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>Đếm ngược</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{formatRemaining(remaining(mainEnd))}</div>
          </div>
        </div>

        {/* Voucher and Filters */}
        <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ background: "#ffffff", padding: 12, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 700 }}>Voucher: GIAM10</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Giảm 10% cho đơn từ 200k</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select style={{ padding: 10, borderRadius: 8 }} defaultValue="all">
              <option value="all">Tất cả danh mục</option>
              {categories.map((c) => (<option key={c.id} value={c.id}>{c.title}</option>))}
            </select>
            <select style={{ padding: 10, borderRadius: 8 }} defaultValue="all">
              <option value="all">Tất cả mức giảm</option>
              <option value="20">>=20%</option>
              <option value="35">>=35%</option>
            </select>
            <select style={{ padding: 10, borderRadius: 8 }} defaultValue="all">
              <option value="all">Mức giá</option>
              <option value="low">Dưới 50k</option>
              <option value="mid">50k - 200k</option>
              <option value="high">Trên 200k</option>
            </select>
          </div>
        </div>

        {/* Hot Deal Today */}
        <div style={{ marginBottom: 24 }}>
          <h3>Hot Deal Hôm Nay</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {loading ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", height: 120, borderRadius: 8 }} />
            )) : saleProducts.slice(0,3).map((p) => (
              <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", padding: 12, borderRadius: 8 }}>
                <img src={p.img} alt={p.title} style={{ width: 96, height: 72, objectFit: "cover", borderRadius: 8 }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{p.title}</div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>Giảm {Math.round(p.discount*100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h3>Danh sách sản phẩm Flash Sale</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            {loading ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", height: 260, borderRadius: 12 }} />
            )) : saleProducts.map((p) => (
              <div key={p.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 18px rgba(2,6,23,0.06)", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", paddingBottom: "56%", background: "#f3f4f6" }}>
                  <img src={p.img} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 10, left: 10, background: "#10b981", color: "white", padding: "6px 8px", borderRadius: 8, fontWeight: 700 }}>{Math.round(p.discount*100)}% OFF</div>
                </div>
                <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.title}</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>{p.rating ? `⭐ ${p.rating}` : ""}</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ fontWeight: 800, color: "#dc2626" }}>{p.discountedPrice.toLocaleString()} đ</div>
                      <div style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: 13 }}>{p.price.toLocaleString()} đ</div>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                      <div style={{ height: 8, background: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${Math.round((p.sold / p.stock) * 100)}%`, height: "100%", background: "#f97316" }} />
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{p.sold}/{p.stock} đã bán</div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#2563eb", color: "white", border: "none", cursor: "pointer" }} onClick={()=>alert('Đã thêm vào giỏ hàng') }>
                        <FiShoppingCart style={{ marginRight: 8 }} /> Thêm vào giỏ
                      </button>
                      <button style={{ width: 48, borderRadius: 8, border: "1px solid #e5e7eb", background: "white", cursor: "pointer" }} onClick={()=>alert('Đã thêm yêu thích') }>
                        <FiHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div style={{ marginTop: 36 }}>
          <h3>🤖 AI Gợi Ý</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {saleProducts.slice(0,4).map((p) => (
              <div key={p.id} style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Gợi ý theo lịch sử mua hàng / mục tiêu sức khỏe</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashSalePage;
