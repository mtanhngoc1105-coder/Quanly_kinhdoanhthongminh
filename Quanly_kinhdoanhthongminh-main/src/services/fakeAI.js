const replies = [
  "Xin chào 👋 Tôi có thể giúp gì cho bạn?",
  "Sản phẩm này đang giảm giá 🔥",
  "Bạn nên mua combo tiết kiệm hơn.",
  "Hôm nay có flash sale nha 😍",
  "Táo nhập khẩu đang bán chạy nhất.",
];

export const getFakeReply = () => {
  return replies[Math.floor(Math.random() * replies.length)];
};