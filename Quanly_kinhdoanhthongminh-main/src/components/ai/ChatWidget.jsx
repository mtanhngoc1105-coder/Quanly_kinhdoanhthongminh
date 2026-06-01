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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed right-6 bottom-6 z-50 w-80 sm:w-96 bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#33994a] text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src="/logo192.png" alt="AI" className="w-full h-full object-cover p-1" />
          </div>
          <div className="font-semibold text-[15px]">AI Assistant</div>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/20 transition-colors">
          <FaTimes />
        </button>
      </div>

      <div ref={ref} className="p-4 h-[350px] overflow-auto space-y-4 bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"} items-start gap-2`}>
            {m.from === "bot" && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                <img src="/logo192.png" alt="bot" className="w-full h-full p-1" />
              </div>
            )}
            <div
              className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-[14px] shadow-sm whitespace-pre-wrap ${
                m.from === "bot" 
                  ? "bg-white border border-gray-100 text-slate-800 rounded-tl-sm" 
                  : "bg-[#e1f3d8] text-slate-800 rounded-tr-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:border-[#33994a] focus:ring-1 focus:ring-[#33994a] text-sm"
        />
        <button 
          onClick={() => send(input)} 
          className="bg-[#33994a] hover:bg-[#2b833f] text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <FaPaperPlane className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
