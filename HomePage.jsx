import { useState } from "react";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const database = {
  categories: [
    { id: "ngu-coc", name: "Ngũ cốc", icon: "🌾", description: "Gạo, hạt dinh dưỡng" },
    { id: "banh-mi", name: "Bánh mì", icon: "🥖", description: "Bánh mì tươi, bánh ngọt" },
    { id: "sua-trung", name: "Sữa & Trứng", icon: "🥛", description: "Sữa, trứng, phô mai" },
    { id: "thit", name: "Thịt", icon: "🥩", description: "Thịt bò, gà, heo" },
    { id: "hai-san", name: "Hải sản", icon: "🐟", description: "Cá, tôm tươi" },
    { id: "rau-cu", name: "Rau củ", icon: "🥬", description: "Rau sạch mỗi ngày" },
    { id: "trai-cay", name: "Trái cây", icon: "🍎", description: "Trái cây tươi" },
  ],
  products: [
    { id: "1", title: "Gạo Lứt Hữu Cơ", category: "ngu-coc", price: 45000, stock: 150, isFeatured: true, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
    { id: "2", title: "Bánh mì nguyên cám", category: "banh-mi", price: 25000, stock: 80, isFeatured: true, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
    { id: "3", title: "Sữa tươi không đường", category: "sua-trung", price: 32000, stock: 120, isFeatured: false, img: null },
    { id: "4", title: "Trứng gà ta", category: "sua-trung", price: 38000, stock: 200, isFeatured: true, img: null },
    { id: "5", title: "Thịt bò Úc", category: "thit", price: 180000, stock: 60, isFeatured: true, img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400" },
    { id: "6", title: "Cá hồi Na Uy", category: "hai-san", price: 220000, stock: 40, isFeatured: true, img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400" },
    { id: "7", title: "Cải bó xôi", category: "rau-cu", price: 18000, stock: 150, isFeatured: false, img: null },
    { id: "8", title: "Táo Mỹ", category: "trai-cay", price: 55000, stock: 130, isFeatured: true, img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400" },
  ],
  banners: [
    { id: 1, title: "Ăn sạch – Sống khỏe\nCùng Smart Food", sub: "Thực phẩm tươi ngon, chất lượng\ngiao tận nơi nhanh chóng", bg: "#E8F5E9", accent: "#2E7D32", emoji: "🧺" },
    { id: 2, title: "Hải sản tươi sống\nmỗi ngày", sub: "Cá, tôm nhập về mỗi sáng\nđảm bảo chất lượng", bg: "#E3F2FD", accent: "#1565C0", emoji: "🐟" },
    { id: 3, title: "Rau củ sạch\ntừ Đà Lạt", sub: "Rau hữu cơ không thuốc trừ sâu\ngiao trong ngày", bg: "#F3E5F5", accent: "#6A1B9A", emoji: "🥬" },
  ],
  features: [
    { icon: "🚚", title: "Giao hàng nhanh", sub: "Trong 2h" },
    { icon: "↩️", title: "Đổi trả dễ dàng", sub: "Trong 7 ngày" },
    { icon: "✅", title: "Chất lượng đảm bảo", sub: "Cam kết chính hãng" },
    { icon: "🔒", title: "Thanh toán an toàn", sub: "Bảo mật 100%" },
  ],
};

const emojiMap = { "ngu-coc": "🌾", "banh-mi": "🥖", "sua-trung": "🥛", thit: "🥩", "hai-san": "🐟", "rau-cu": "🥬", "trai-cay": "🍎" };
const fmt = (n) => n.toLocaleString("vi-VN") + "đ";

const aiReplies = {
  "cá hồi": "Cá hồi Na Uy hiện có giá 220.000đ, còn 40 sản phẩm. Bạn muốn thêm vào giỏ hàng không? 🐟",
  gạo: "Gạo Lứt Hữu Cơ giá 45.000đ/kg, đang hot nhất tuần! 🌾",
  "khuyến mãi": "Có mã SALE10 giảm 10% đơn từ 100k, và FREESHIP miễn phí vận chuyển đơn từ 150k! 🎁",
  thịt: "Thịt bò Úc nhập khẩu giá 180.000đ, còn 60 sản phẩm. 🥩",
  healthy: "Gợi ý món healthy: ✅ Salad gà rau củ  ✅ Cá hồi nướng sốt chanh  ✅ Sữa bí đỏ giảm cân  ✅ Yến mạch trái cây",
  default: "Mình có thể giúp bạn tìm sản phẩm, xem giá, hoặc tư vấn món ăn healthy! Bạn cần gì? 😊",
};

/* ═══════════════════════════════════════════════
   CSS (inline via <style> tag injected once)
═══════════════════════════════════════════════ */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', sans-serif; background: #f5f7f5; }

  /* NAV */
  .sf-nav { position: sticky; top: 0; z-index: 100; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
  .sf-nav-inner { max-width: 1400px; margin: auto; display: flex; align-items: center; gap: 16px; padding: 10px 20px; }
  .sf-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #1b5e20; font-weight: 700; font-size: 18px; flex-shrink: 0; }
  .sf-logo-icon { font-size: 28px; }
  .sf-logo small { font-size: 10px; color: #888; display: block; font-weight: 400; }
  .sf-search { flex: 1; display: flex; max-width: 480px; border: 1.5px solid #ddd; border-radius: 24px; overflow: hidden; background: #f9f9f9; }
  .sf-search input { flex: 1; border: none; background: transparent; padding: 8px 16px; font-size: 14px; outline: none; }
  .sf-search button { border: none; background: #2e7d32; color: #fff; padding: 8px 16px; cursor: pointer; font-size: 14px; }
  .sf-nav-icons { display: flex; align-items: center; gap: 8px; margin-left: auto; }
  .sf-icon-btn { position: relative; border: none; background: #f1f8e9; border-radius: 50%; width: 38px; height: 38px; cursor: pointer; font-size: 16px; }
  .sf-badge { position: absolute; top: -4px; right: -4px; background: #e53935; color: #fff; font-size: 10px; border-radius: 10px; padding: 1px 5px; font-weight: 700; }
  .sf-user-btn { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .sf-avatar { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #2e7d32; object-fit: cover; }
  .sf-user-btn span { font-size: 13px; color: #555; }

  /* LAYOUT */
  .sf-root { min-height: 100vh; background: #f5f7f5; }
  .sf-body { max-width: 1400px; margin: auto; display: flex; gap: 0; padding: 20px 16px; }
  .sf-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 28px; }

  /* SIDEBAR */
  .sf-sidebar { width: 190px; flex-shrink: 0; display: flex; flex-direction: column; gap: 4px; padding-right: 16px; }
  .sf-sidebar-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none; background: transparent; border-radius: 12px; cursor: pointer; text-align: left; width: 100%; transition: background .15s; position: relative; }
  .sf-sidebar-link:hover { background: #f1f8e9; }
  .sf-sidebar-link.active { background: #e8f5e9; color: #2e7d32; font-weight: 600; }
  .sf-sl-icon { font-size: 18px; }
  .sf-sl-label { font-size: 13px; flex: 1; color: #333; }
  .sf-sidebar-link.active .sf-sl-label { color: #2e7d32; }
  .sf-sl-badge { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 8px; }
  .sf-sl-badge.hot { background: #ffebee; color: #c62828; }
  .sf-sl-badge.new { background: #e3f2fd; color: #1565c0; }

  /* HERO */
  .sf-hero { border-radius: 20px; padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; min-height: 200px; position: relative; overflow: hidden; transition: background .6s; }
  .sf-hero-text h1 { font-size: 28px; font-weight: 800; color: #1b5e20; line-height: 1.3; margin-bottom: 10px; }
  .sf-hero-text p { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 20px; }
  .sf-hero-btn { background: #2e7d32; color: #fff; border: none; border-radius: 24px; padding: 10px 28px; font-size: 14px; font-weight: 600; cursor: pointer; transition: transform .15s, box-shadow .15s; }
  .sf-hero-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(46,125,50,.3); }
  .sf-hero-emoji { font-size: 80px; opacity: .9; }
  .sf-dots { display: flex; gap: 6px; margin-top: 16px; }
  .sf-dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: #ccc; cursor: pointer; padding: 0; transition: background .2s, width .2s; }
  .sf-dot.active { background: #2e7d32; width: 20px; border-radius: 4px; }

  /* CATEGORIES */
  .sf-section-title { font-size: 18px; font-weight: 700; color: #1b5e20; margin-bottom: 14px; }
  .sf-cats { display: flex; gap: 10px; flex-wrap: wrap; }
  .sf-cat-card { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 18px; border: 1.5px solid #e0e0e0; border-radius: 14px; background: #fff; cursor: pointer; transition: all .2s; min-width: 80px; }
  .sf-cat-card:hover { border-color: #2e7d32; background: #f1f8e9; }
  .sf-cat-card.active { border-color: #2e7d32; background: #e8f5e9; }
  .sf-cat-icon { font-size: 26px; }
  .sf-cat-name { font-size: 12px; font-weight: 600; color: #333; white-space: nowrap; }

  /* PRODUCTS */
  .sf-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
  .sf-prod-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.06); position: relative; transition: transform .2s, box-shadow .2s; }
  .sf-prod-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
  .sf-prod-badge { position: absolute; top: 10px; left: 10px; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 8px; z-index: 1; }
  .sf-prod-badge.hot { background: #ff6f00; color: #fff; }
  .sf-wish-btn { position: absolute; top: 8px; right: 8px; border: none; background: rgba(255,255,255,.85); border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 14px; z-index: 1; backdrop-filter: blur(4px); }
  .sf-prod-img { width: 100%; height: 140px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; overflow: hidden; }
  .sf-prod-img img { width: 100%; height: 100%; object-fit: cover; }
  .sf-prod-emoji { font-size: 52px; }
  .sf-prod-info { padding: 12px; }
  .sf-prod-name { font-size: 13px; font-weight: 600; color: #222; margin-bottom: 2px; line-height: 1.3; }
  .sf-prod-cat { font-size: 11px; color: #888; margin-bottom: 8px; }
  .sf-prod-row { display: flex; justify-content: space-between; align-items: flex-end; }
  .sf-prod-price { font-size: 15px; font-weight: 700; color: #2e7d32; }
  .sf-prod-rating { font-size: 11px; color: #f9a825; margin-top: 2px; }
  .sf-add-btn { width: 32px; height: 32px; border-radius: 50%; border: none; background: #2e7d32; color: #fff; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform .15s; }
  .sf-add-btn:hover { transform: scale(1.1); }

  /* FEATURES */
  .sf-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .sf-feat { background: #fff; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
  .sf-feat-icon { font-size: 28px; }
  .sf-feat-title { font-size: 13px; font-weight: 700; color: #222; }
  .sf-feat-sub { font-size: 11px; color: #888; margin-top: 2px; }

  /* CHATBOT */
  .sf-chat-bubble { position: fixed; bottom: 24px; right: 24px; width: 52px; height: 52px; border-radius: 50%; border: none; background: linear-gradient(135deg, #2e7d32, #66bb6a); color: #fff; font-size: 22px; cursor: pointer; box-shadow: 0 4px 20px rgba(46,125,50,.4); z-index: 200; transition: transform .2s; }
  .sf-chat-bubble:hover { transform: scale(1.08); }
  .sf-chat-panel { position: fixed; bottom: 88px; right: 24px; width: 320px; background: #fff; border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,.15); z-index: 200; display: flex; flex-direction: column; overflow: hidden; }
  .sf-chat-header { background: linear-gradient(135deg, #2e7d32, #43a047); color: #fff; padding: 14px 16px; display: flex; align-items: center; gap: 10px; font-weight: 600; }
  .sf-chat-close { margin-left: auto; background: transparent; border: none; color: #fff; font-size: 18px; cursor: pointer; opacity: .8; }
  .sf-chat-msgs { flex: 1; max-height: 280px; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
  .sf-msg { max-width: 80%; padding: 10px 13px; border-radius: 16px; font-size: 13px; line-height: 1.5; }
  .sf-msg.bot { background: #f1f8e9; color: #1b5e20; align-self: flex-start; border-bottom-left-radius: 4px; }
  .sf-msg.user { background: #2e7d32; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .sf-chat-input-row { display: flex; border-top: 1px solid #eee; }
  .sf-chat-input-row input { flex: 1; border: none; padding: 12px 14px; font-size: 13px; outline: none; }
  .sf-chat-send { border: none; background: #2e7d32; color: #fff; padding: 12px 16px; cursor: pointer; font-size: 16px; }

  /* ROBOT */
  .sf-robot { position: fixed; bottom: 24px; left: 24px; display: flex; align-items: flex-end; gap: 10px; z-index: 200; }
  .sf-robot-bubble { background: #fff; border-radius: 14px; padding: 12px 14px; box-shadow: 0 4px 16px rgba(0,0,0,.12); font-size: 12px; color: #333; line-height: 1.6; max-width: 180px; }
  .sf-robot-icon { font-size: 36px; }
  .sf-robot-close { position: absolute; top: -6px; right: -6px; background: #eee; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 10px; cursor: pointer; }

  /* TOAST */
  .sf-toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: #323232; color: #fff; padding: 10px 22px; border-radius: 24px; font-size: 13px; z-index: 300; animation: fadeUp .3s ease; box-shadow: 0 4px 16px rgba(0,0,0,.2); }
  @keyframes fadeUp { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  @media (max-width: 900px) {
    .sf-sidebar { display: none; }
    .sf-features { grid-template-columns: repeat(2,1fr); }
    .sf-hero { padding: 28px 24px; }
    .sf-hero-emoji { font-size: 52px; }
  }
  @media (max-width: 600px) {
    .sf-body { padding: 12px 8px; }
    .sf-features { grid-template-columns: 1fr 1fr; }
    .sf-products { grid-template-columns: repeat(2,1fr); }
    .sf-hero-text h1 { font-size: 20px; }
    .sf-user-btn span { display: none; }
  }
`;

/* ═══════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════ */
function Navbar({ cartCount, wishCount, notifCount }) {
  return (
    <nav className="sf-nav">
      <div className="sf-nav-inner">
        <a className="sf-logo" href="/">
          <div className="sf-logo-icon">🥦</div>
          <span>SmartFood<small>Fresh &amp; Healthy</small></span>
        </a>
        <div className="sf-search">
          <input type="text" placeholder="Tìm kiếm sản phẩm..." />
          <button>🔍</button>
        </div>
        <div className="sf-nav-icons">
          <button className="sf-icon-btn">
            🔔{notifCount > 0 && <span className="sf-badge">{notifCount}</span>}
          </button>
          <button className="sf-icon-btn">
            🤍{wishCount > 0 && <span className="sf-badge">{wishCount}</span>}
          </button>
          <button className="sf-icon-btn">
            🛒{cartCount > 0 && <span className="sf-badge">{cartCount}</span>}
          </button>
          <div className="sf-user-btn">
            <img src="https://i.pravatar.cc/150?img=1" alt="avatar" className="sf-avatar" />
            <span>Xin chào, A</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Sidebar({ active, setActive }) {
  const links = [
    { key: "home", icon: "🏠", label: "Trang chủ" },
    { key: "store", icon: "🏪", label: "Cửa hàng" },
    { key: "category", icon: "📦", label: "Danh mục" },
    { key: "flash", icon: "⚡", label: "Flash Sale", badge: "HOT" },
    { key: "wishlist", icon: "🤍", label: "Yêu thích" },
    { key: "orders", icon: "📋", label: "Đơn hàng" },
    { key: "ai", icon: "🤖", label: "AI Assistant", badge: "New" },
  ];
  return (
    <aside className="sf-sidebar">
      {links.map((l) => (
        <button
          key={l.key}
          className={`sf-sidebar-link${active === l.key ? " active" : ""}`}
          onClick={() => setActive(l.key)}
        >
          <span className="sf-sl-icon">{l.icon}</span>
          <span className="sf-sl-label">{l.label}</span>
          {l.badge && <span className={`sf-sl-badge ${l.badge === "HOT" ? "hot" : "new"}`}>{l.badge}</span>}
        </button>
      ))}
    </aside>
  );
}

function HeroBanner() {
  const [idx, setIdx] = useState(0);
  const banner = database.banners[idx];
  return (
    <div className="sf-hero" style={{ background: `linear-gradient(135deg, ${banner.bg} 0%, #fff 100%)` }}>
      <div className="sf-hero-text">
        <h1>{banner.title.split("\n").map((t, i) => <span key={i}>{t}<br /></span>)}</h1>
        <p>{banner.sub.split("\n").map((t, i) => <span key={i}>{t}<br /></span>)}</p>
        <button className="sf-hero-btn">Mua ngay</button>
        <div className="sf-dots">
          {database.banners.map((_, i) => (
            <button key={i} className={`sf-dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
      <div className="sf-hero-emoji">{banner.emoji}</div>
    </div>
  );
}

function Categories({ activeCat, setActiveCat }) {
  return (
    <section>
      <h2 className="sf-section-title">Danh mục nổi bật</h2>
      <div className="sf-cats">
        {database.categories.map((c) => (
          <button
            key={c.id}
            className={`sf-cat-card${activeCat === c.id ? " active" : ""}`}
            onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
          >
            <span className="sf-cat-icon">{c.icon}</span>
            <span className="sf-cat-name">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onAddCart, onToggleWish, wished }) {
  const cat = database.categories.find((c) => c.id === product.category);
  return (
    <div className="sf-prod-card">
      {product.isFeatured && <span className="sf-prod-badge hot">HOT</span>}
      <button className="sf-wish-btn" onClick={() => onToggleWish(product.id)}>
        {wished ? "❤️" : "🤍"}
      </button>
      <div className="sf-prod-img">
        {product.img
          ? <img src={product.img} alt={product.title} loading="lazy" />
          : <span className="sf-prod-emoji">{emojiMap[product.category]}</span>}
      </div>
      <div className="sf-prod-info">
        <p className="sf-prod-name">{product.title}</p>
        <p className="sf-prod-cat">{cat?.name}</p>
        <div className="sf-prod-row">
          <div>
            <p className="sf-prod-price">{fmt(product.price)}</p>
            <p className="sf-prod-rating">★ 4.9</p>
          </div>
          <button className="sf-add-btn" onClick={() => onAddCart(product)}>+</button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ activeCat, onAddCart, wishlist, onToggleWish }) {
  const list = activeCat
    ? database.products.filter((p) => p.category === activeCat)
    : database.products;
  return (
    <section>
      <h2 className="sf-section-title">Sản phẩm gợi ý cho bạn</h2>
      <div className="sf-products">
        {list.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddCart={onAddCart}
            onToggleWish={onToggleWish}
            wished={wishlist.includes(p.id)}
          />
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <div className="sf-features">
      {database.features.map((f, i) => (
        <div key={i} className="sf-feat">
          <span className="sf-feat-icon">{f.icon}</span>
          <div>
            <p className="sf-feat-title">{f.title}</p>
            <p className="sf-feat-sub">{f.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Xin chào! 👋\nTôi là AI Assistant của Smart Food.\nBạn cần hỗ trợ gì ạ?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMsgs((prev) => [...prev, { from: "user", text: txt }]);
    setInput("");
    setTimeout(() => {
      const low = txt.toLowerCase();
      let reply = aiReplies.default;
      for (const k in aiReplies) {
        if (k !== "default" && low.includes(k)) { reply = aiReplies[k]; break; }
      }
      setMsgs((prev) => [...prev, { from: "bot", text: reply }]);
    }, 600);
  };

  return (
    <>
      <button className="sf-chat-bubble" onClick={() => setOpen(!open)} title="AI Assistant">🤖</button>
      {open && (
        <div className="sf-chat-panel">
          <div className="sf-chat-header">
            <span>🤖</span><span>AI Assistant</span>
            <button className="sf-chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="sf-chat-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`sf-msg ${m.from}`}>
                {m.text.split("\n").map((t, j) => <span key={j}>{t}<br /></span>)}
              </div>
            ))}
          </div>
          <div className="sf-chat-input-row">
            <input
              type="text"
              value={input}
              placeholder="Nhập tin nhắn..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="sf-chat-send" onClick={send}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

function RobotAssistant() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="sf-robot">
      <div className="sf-robot-bubble">
        <p>Xin chào! 👋</p>
        <p>Mình có thể giúp gì cho bạn hôm nay?</p>
      </div>
      <div className="sf-robot-icon">🤖</div>
      <button className="sf-robot-close" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE (default export)
═══════════════════════════════════════════════ */
export default function HomePage() {
  const [activeSidebar, setActiveSidebar] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const addCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`✅ Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  const toggleWish = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Inject CSS once — avoids external .css file entirely */}
      <style>{CSS}</style>

      <div className="sf-root">
        <Navbar cartCount={cart.length} wishCount={wishlist.length} notifCount={1} />
        <div className="sf-body">
          <Sidebar active={activeSidebar} setActive={setActiveSidebar} />
          <main className="sf-main">
            <HeroBanner />
            <Categories activeCat={activeCat} setActiveCat={setActiveCat} />
            <ProductGrid
              activeCat={activeCat}
              onAddCart={addCart}
              wishlist={wishlist}
              onToggleWish={toggleWish}
            />
            <Features />
          </main>
        </div>
        <ChatBot />
        <RobotAssistant />
        {toast && <div className="sf-toast">{toast}</div>}
      </div>
    </>
  );
}