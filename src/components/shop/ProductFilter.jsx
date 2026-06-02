import React from 'react';
import { FiFilter, FiTrash2 } from 'react-icons/fi';

const ratingOptions = [
  { value: 0, label: 'Tất cả' },
  { value: 4, label: '4 sao trở lên' },
  { value: 4.5, label: '4.5 sao trở lên' },
  { value: 5, label: '5 sao' },
];

const ProductFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  ratingFilter,
  setRatingFilter,
  showOnSale,
  setShowOnSale,
  onClearFilters,
}) => {
  return (
    <div className="product-filter">
      <div className="filter-header">
        <div className="filter-title">
          <FiFilter style={{ fontSize: '20px', color: '#10b981' }} />
          Bộ lọc sản phẩm
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="filter-clear-btn"
        >
          <FiTrash2 /> Xóa
        </button>
      </div>

      <div className="filter-section">
        <p className="filter-section-label">Danh mục</p>
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`filter-button ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <p className="filter-section-label">Khoảng giá</p>
        <div className="filter-price-inputs">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Từ"
            className="filter-price-input"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Đến"
            className="filter-price-input"
          />
        </div>
      </div>

      <div className="filter-section">
        <p className="filter-section-label">Đánh giá</p>
        <div className="filter-options">
          {ratingOptions.map((rating) => (
            <button
              key={rating.value}
              type="button"
              onClick={() => setRatingFilter(rating.value)}
              className={`filter-option ${ratingFilter === rating.value ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{rating.label}</span>
                <span style={{ color: '#fbbf24' }}>
                  {rating.value ? '★'.repeat(Math.round(rating.value)) : '★★★★★'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <p className="filter-section-label">Ưu đãi</p>
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={showOnSale}
            onChange={(e) => setShowOnSale(e.target.checked)}
            className="filter-checkbox"
          />
          Chỉ hiển thị sản phẩm đang giảm giá
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
