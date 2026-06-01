// src/pages/admin/ReviewsPage.jsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";

function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "Nguyễn Văn A",
      product: "Gạo ST25",
      rating: 5,
      comment: "Gạo rất thơm và ngon!",
      date: "28/05/2026",
      reply: "Cảm ơn anh A đã tin tưởng và ủng hộ SmartFood ạ!",
    },
    {
      id: 2,
      customer: "Trần Thị Bình",
      product: "Bánh mì",
      rating: 4,
      comment: "Bánh mì mềm, ăn ổn.",
      date: "27/05/2026",
      reply: "",
    },
    {
      id: 3,
      customer: "Lê Văn Công",
      product: "Sữa tươi",
      rating: 5,
      comment: "Sữa ngon, béo vừa phải.",
      date: "26/05/2026",
      reply: "",
    },
    {
      id: 4,
      customer: "Phạm Thị Dung",
      product: "Thịt bò",
      rating: 3,
      comment: "Thịt bò ăn tạm được, giao hàng hơi lâu xíu.",
      date: "25/05/2026",
      reply: "",
    }
  ]);

  // --- QUẢN LÝ CÁC STATE MỚI ---
  const [filterRating, setFilterRating] = useState("all"); // 'all', 5, 4, 'low'
  const [replyInputs, setReplyInputs] = useState({}); // Lưu text nhập phản hồi theo id

  const deleteReview = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  // Hàm xử lý gửi phản hồi
  const submitReply = (id) => {
    const text = replyInputs[id];
    if (!text || !text.trim()) return;

    setReviews(reviews.map(rev => rev.id === id ? { ...rev, reply: text } : rev));
    setReplyInputs({ ...replyInputs, [id]: "" }); // Xóa trắng ô nhập sau khi gửi
  };

  // Logic lọc dữ liệu theo tab được chọn
  const filteredReviews = reviews.filter(rev => {
    if (filterRating === "all") return true;
    if (filterRating === "low") return rev.rating <= 3; // Lọc các đánh giá từ 3 sao trở xuống
    return rev.rating === filterRating;
  });

  return (
    <div style={{ background: "#f8f9fa", padding: "24px", borderRadius: "12px", fontFamily: "sans-serif", minHeight: "100vh" }}>
      
      {/* 1. Cụm Tiêu Đề Trang */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ color: "#1b5e20", margin: 0, fontWeight: "700", fontSize: "24px" }}>
            Quản lý đánh giá sản phẩm
          </h2>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
            Xem phản hồi của khách hàng và tương tác phản hồi chăm sóc khách hàng.
          </p>
        </div>
      </div>

      {/* 2. Bộ Lọc Nhanh Theo Số Sao (Chức năng mới) */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { label: "Tất cả", value: "all" },
          { label: "5 Sao ⭐", value: 5 },
          { label: "4 Sao ⭐", value: 4 },
          { label: "Cần xử lý (≤ 3⭐) ", value: "low" }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterRating(tab.value)}
            style={{
              border: "1px solid #e2e8f0",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              backgroundColor: filterRating === tab.value ? "#1b5e20" : "white",
              color: filterRating === tab.value ? "white" : "#475569",
              boxShadow: filterRating === tab.value ? "0 2px 4px rgba(27,94,32,0.2)" : "none",
              transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Khung Bảng Dữ Liệu Nâng Cấp */}
      <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #c1e0c2", height: "52px" }}>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "140px", textAlign: "center"}}>Khách hàng</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "140px", textAlign: "center"}}>Sản phẩm</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "140px", textAlign: "center" }}>Đánh giá</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "400px", textAlign: "center"}}>Nội dung bình luận & Phản hồi</th>
              <th style={{ background: "#e8f5e9", color: "#2e7d32", padding: "16px", fontWeight: "600", width: "100px", textAlign: "center" }}>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.map((review) => (
              <tr 
                key={review.id} 
                style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fbf9"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                {/* Khách hàng kết hợp Avatar mờ tên đầu */}
                
                    <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "13px" }}>
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#1e293b", textAlign: "center", fontSize: "14px"}}>{review.customer}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px",textAlign: "center", }}>{review.date || "Hôm nay"}</div>
                    </div>

                <td style={{ padding: "16px", color: "#475569", fontWeight: "500", verticalAlign: "top", textAlign: "center"}}>
                  {review.product}
                </td>

                <td style={{ padding: "16px", verticalAlign: "top", textAlign: "center", fontSize: "14px" }}>
                  <span style={{ letterSpacing: "1px" }}>
                    {"⭐".repeat(review.rating)}
                  </span>
                </td>

                {/* Cột bình luận tích hợp khung phản hồi động */}
                <td style={{ padding: "16px", color: "#334155", verticalAlign: "top" }}>
                  <div style={{ lineHeight: "1.5", fontSize: "14px" }}>{review.comment}</div>
                  
                  {/* Nếu đã có phản hồi từ Admin */}
                  {review.reply && (
                    <div style={{ marginTop: "10px", background: "#f1f5f9", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", borderLeft: "3px solid #1b5e20", display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontWeight: "700", color: "#1b5e20" }}>Admin SmartFood</span>
                      <span style={{ color: "#475569" }}>{review.reply}</span>
                    </div>
                  )}

                  {/* Nếu chưa phản hồi -> Hiện ô nhập trả lời nhanh */}
                  {!review.reply && (
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <input
                        type="text"
                        placeholder="Nhập phản hồi chăm sóc khách hàng..."
                        value={replyInputs[review.id] || ""}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [review.id]: e.target.value })}
                        style={{ flex: 1, padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", transition: "border 0.2s" }}
                        onFocus={(e) => e.target.style.borderColor = "#1b5e20"}
                        onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
                      />
                      <button
                        onClick={() => submitReply(review.id)}
                        style={{ background: "#1b5e20", color: "white", border: "none", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                      >
                        Trả lời
                      </button>
                    </div>
                  )}
                </td>

                {/* Cột hành động chứa nút xóa dạng Icon mờ */}
                <td style={{ padding: "16px", verticalAlign: "top", textAlign: "center" }}>
                  <button
                    onClick={() => deleteReview(review.id)}
                    style={{
                      border: "none",
                      background: "#fef2f2",
                      color: "#dc2626",
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#dc2626";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fef2f2";
                      e.currentTarget.style.color = "#dc2626";
                    }}
                    title="Xóa đánh giá"
                  >
                    <Icon icon="lucide:trash-2" width="18" />
                  </button>
                </td>
              </tr>
            ))}
            
            {/* Trường hợp bộ lọc không có dữ liệu */}
            {filteredReviews.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                  Không tìm thấy đánh giá nào phù hợp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewsPage;