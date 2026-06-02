import React from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const ShopTopbar = ({ searchQuery, setSearchQuery, totalResults, sortOption, setSortOption }) => {
  return (
    <div className="shop-topbar">
      <div className="shop-topbar-search">
        <div className="search-input-wrapper">
          <FiSearch className="search-input-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, thực phẩm..."
            className="shop-search-input"
          />
        </div>
        <div className="results-count">
          Hiển thị <strong>{totalResults}</strong> kết quả
        </div>
      </div>

      <div className="shop-topbar-sort">
        <span className="sort-label">Sắp xếp</span>
        <div className="sort-select-wrapper">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="rating">Đánh giá cao</option>
          </select>
          <FiChevronDown className="sort-select-icon" />
        </div>
      </div>
    </div>
  );
};

export default ShopTopbar;
