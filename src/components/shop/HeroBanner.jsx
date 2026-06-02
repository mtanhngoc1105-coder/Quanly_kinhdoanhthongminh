import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-banner-content">
        <div className="hero-banner-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hero-badge"
          >
            Siêu thị thực phẩm
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="hero-title"
          >
            Thực phẩm sạch,
            <span className="hero-title-accent"> cuộc sống khoẻ mạnh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hero-description"
          >
            Khám phá bộ sưu tập nông sản tươi ngon, an toàn và các mặt hàng thiết yếu được chọn lọc kỹ càng từng ngày.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="hero-buttons"
          >
            <button className="btn-primary">
              Mua ngay
              <FiArrowRight />
            </button>
            <button className="btn-secondary">
              Khám phá
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="hero-benefits"
          >
            <div className="benefit-card">
              <span className="benefit-label">Giao nhanh</span>
              <div className="benefit-value">Trong 2h</div>
            </div>
            <div className="benefit-card">
              <span className="benefit-label">Sản phẩm sạch</span>
              <div className="benefit-value">Chứng nhận organic</div>
            </div>
            <div className="benefit-card">
              <span className="benefit-label">Hoàn tiền</span>
              <div className="benefit-value">Nếu không hài lòng</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="hero-banner-right"
        >
          <div className="hero-info-box">
            <div className="hero-info-header">
              ⭐ Ưu đãi đặc biệt
              <span style={{ marginLeft: '8px', background: 'white', color: '#059669', padding: '4px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>HOT</span>
            </div>
            <div className="hero-info-main">
              <span className="hero-info-label">Giảm giá</span>
              <h3 className="hero-info-title">20% đơn hàng đầu</h3>
              <p className="hero-info-description">
                Thêm sản phẩm vào giỏ và thanh toán nhanh chóng để nhận ngay ưu đãi.
              </p>
            </div>
            <div className="hero-info-badges">
              <span className="hero-info-badge">✓ Giao tận nơi</span>
              <span className="hero-info-badge">✓ Đổi trả dễ dàng</span>
              <span className="hero-info-badge">✓ Thanh toán linh hoạt</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
