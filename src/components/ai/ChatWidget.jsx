import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

// Mock data based on database.json
const products = [
  { title: "Gạo Lứt Hữu Cơ", price: 45000, stock: 150 },
  { title: "Bánh mì nguyên cám", price: 25000, stock: 80 },
  { title: "Sữa tươi không đường", price: 32000, stock: 120 },
  { title: "Trứng gà ta", price: 38000, stock: 200 },
  { title: "Thịt bò Úc", price: 180000, stock: 60 },
  { title: "Cá hồi Na Uy", price: 220000, stock: 40 },
  { title: "Cải bó xôi", price: 18000, stock: 150 },
  { title: "Táo Mỹ", price: 55000, stock: 130 }
];

const coupons = [
  { code: "SALE10", desc: "Giảm 10%" },
  { code: "FREESHIP", desc: "Miễn phí vận chuyển (đơn từ 150k)" }
];

function getSmartResponse(text) {
  const lowerText = text.toLowerCase();
  
  // 1. Greetings
  if (lowerText.match(/^(chào|hi|hello|xin chào)/)) {
    return "Chào bạn! Mình là AI Assistant của Smart Food. Mình có thể giúp gì cho bạn hôm nay?";
  }

  // 2. Promotions / Coupons
  if (lowerText.includes("khuyến mãi") || lowerText.includes("giảm giá") || lowerText.includes("coupon") || lowerText.includes("mã")) {
    let msg = "Hiện tại cửa hàng đang có các mã giảm giá sau:\n";
    coupons.forEach(c => {
      msg += `- Mã ${c.code}: ${c.desc}\n`;
    });
    return msg;
  }

  // 3. Healthy / Diet recommendations
  if (lowerText.includes("healthy") || lowerText.includes("giảm cân") || lowerText.includes("sức khỏe") || lowerText.includes("ăn kiêng") || lowerText.includes("gợi ý")) {
    return "Dưới đây là một số gợi ý món ăn healthy cho bạn:\n- Salad ức gà rau củ (gồm Cải bó xôi)\n- Cá hồi nướng sốt chanh\n- Bánh mì nguyên cám kẹp trứng\n- Yến mạch trái cây (Táo Mỹ)\n\nBạn có muốn tìm hiểu giá của nguyên liệu nào không?";
  }

  // 4. Product Search (Price & Availability)
  let foundProducts = [];
  const searchKeywords = ["gạo", "bánh mì", "sữa", "trứng", "bò", "cá hồi", "cải", "táo"];
  
  for (let p of products) {
    if (lowerText.includes(p.title.toLowerCase()) || searchKeywords.some(k => lowerText.includes(k) && p.title.toLowerCase().includes(k))) {
      foundProducts.push(p);
    }
  }

  if (foundProducts.length > 0) {
    let msg = "Mình tìm thấy thông tin sản phẩm bạn cần:\n";
    foundProducts.forEach(p => {
      // simulate a 10% discount for demonstration if asked about price specifically, or just return real price
      msg += `- ${p.title}: ${p.price.toLocaleString('vi-VN')}đ (Còn ${p.stock} sản phẩm)\n`;
    });
    return msg;
  }

  // 5. Order/Shipping
  if (lowerText.includes("ship") || lowerText.includes("giao hàng") || lowerText.includes("phí")) {
    return "Phí giao hàng đồng giá 30.000đ. Đơn hàng từ 200.000đ trở lên sẽ được miễn phí vận chuyển bạn nhé!";
  }

  // 6. Catch all
  return "Xin lỗi, mình chưa hiểu ý bạn lắm. Bạn có thể hỏi mình về:\n- Giá sản phẩm (Cá hồi, thịt bò, táo...)\n- Mã khuyến mãi\n- Gợi ý món ăn healthy\n- Phí giao hàng";
}

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! 👋\nTôi là AI Assistant của Smart Food.\nBạn cần hỗ trợ gì ạ?" },
  ]);
  const [input, setInput] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    if (!text || !text.trim()) return;
    const user = { from: "user", text };
    setMessages((m) => [...m, user]);
    setInput("");

    // AI reply based on smart logic
    setTimeout(() => {
      const reply = getSmartResponse(text);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 600 + Math.random() * 400);
  };

  const widgetStyle = {
    position: "fixed",
    right: "32px",
    bottom: "32px",
    zIndex: 100000,
    width: "340px",
    maxWidth: "calc(100vw - 64px)",
    background: "#f8fafc",
    borderRadius: "28px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.16), 0 0 1px rgba(15, 23, 42, 0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(148, 163, 184, 0.12)",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          background: "transparent",
        }}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        style={widgetStyle}
      >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#33994a', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '999px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/logo192.png" alt="AI" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '4px' }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>AI Assistant</div>
        </div>
        <button onClick={onClose} style={{ padding: '8px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer' }}>
          <FaTimes />
        </button>
      </div>

      <div ref={ref} style={{ padding: '16px', height: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'white' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'bot' ? 'flex-start' : 'flex-end', alignItems: 'flex-start', gap: '12px' }}>
            {m.from === 'bot' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '999px', background: '#f3f4f6', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <img src="/logo192.png" alt="bot" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '4px' }} />
              </div>
            )}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '24px',
                maxWidth: '80%',
                fontSize: '14px',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                background: m.from === 'bot' ? 'white' : '#e1f3d8',
                color: '#111827',
                border: m.from === 'bot' ? '1px solid #e5e7eb' : '1px solid rgba(16, 185, 129, 0.16)',
                borderTopLeftRadius: m.from === 'bot' ? '8px' : '24px',
                borderTopRightRadius: m.from === 'bot' ? '24px' : '8px',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Nhập tin nhắn..."
          style={{
            flex: 1,
            padding: '12px 16px',
            background: '#f3f4f6',
            borderRadius: '999px',
            border: '1px solid #e5e7eb',
            outline: 'none',
            fontSize: '0.95rem',
            color: '#111827',
          }}
        />
        <button
          onClick={() => send(input)}
          style={{
            background: '#33994a',
            border: 'none',
            color: 'white',
            width: '42px',
            height: '42px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <FaPaperPlane style={{ width: '16px', height: '16px' }} />
        </button>
      </div>
    </motion.div>
    </>
  );
}
