import React, { useState, useEffect, useMemo } from "react";
import useCartStore from "../../stores/cartStore";
import { allProducts as productCatalog } from "../../constants/productsData";

// Import new modern components
import HeroBanner from "../../components/shop/HeroBanner";
import ProductFilter from "../../components/shop/ProductFilter";
import ShopTopbar from "../../components/shop/ShopTopbar";
import ProductGrid from "../../components/shop/ProductGrid";
import Pagination from "../../components/common/Pagination";
import "./ShopPage.css";
import "../../components/shop/Filter-Topbar.css";
import "../../components/shop/Grid-Pagination.css";
import "../../components/shop/ProductCard.css";
import "../../components/shop/HeroBanner.css";

const CATEGORY_LABELS = {
  all: "Tất cả sản phẩm",
  "rau-cu": "Rau củ quả",
  "thit-ca": "Thịt cá, hải sản",
  "trai-cay": "Trái cây",
  "do-kho": "Đồ khô & gia vị",
  "sua-trung": "Sữa & Trứng",
  "do-uong": "Đồ uống",
  "banh-keo": "Bánh & Kẹo",
  "an-nhanh": "Đồ ăn nhanh",
  "ngu-coc": "Ngũ cốc dinh dưỡng",
  "banh-mi": "Bánh mì",
  thit: "Thịt",
  "hai-san": "Hải sản",
};

function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showOnSale, setShowOnSale] = useState(false);
  const [page, setPage] = useState(1);
  const [allProducts] = useState(productCatalog);
  
  const wishlistItems = useCartStore((state) => state.wishlistItems);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(allProducts.map((product) => product.category).filter(Boolean))
    );

    return [
      { id: 'all', title: CATEGORY_LABELS.all },
      ...categories.map((category) => ({
        id: category,
        title: CATEGORY_LABELS[category] || category.replace(/-/g, ' '),
      })),
    ];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allProducts
      .filter((product) => {
        const matchesSearch =
          !query ||
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;

        const matchesPrice =
          (!minPrice || product.price >= Number(minPrice)) &&
          (!maxPrice || product.price <= Number(maxPrice));

        const matchesRating = !ratingFilter || product.rating >= ratingFilter;

        const matchesSale =
          !showOnSale ||
          Boolean(product.oldPrice) ||
          product.badgeClass === 'sale' ||
          product.badge === 'HOT';

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesRating &&
          matchesSale
        );
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        return b.id - a.id;
      });
  }, [allProducts, searchQuery, selectedCategory, minPrice, maxPrice, ratingFilter, showOnSale, sortOption]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, ratingFilter, showOnSale, sortOption]);

  const perPage = 16;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const displayedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="shop-page">
      <div className="shop-container">
        
        {/* Hero Banner section */}
        <HeroBanner />

        <div className="shop-grid">
          <aside className="shop-grid-aside">
            <ProductFilter
              categories={categoryOptions}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              showOnSale={showOnSale}
              setShowOnSale={setShowOnSale}
              onClearFilters={() => {
                setSearchQuery("");
                setSelectedCategory('all');
                setMinPrice("");
                setMaxPrice("");
                setRatingFilter(0);
                setShowOnSale(false);
                setSortOption('newest');
              }}
            />
          </aside>

          <main className="shop-grid-main">
            <ShopTopbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredProducts.length}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />

            <div className="shop-content-wrapper">
              <ProductGrid
                products={displayedProducts}
                wishlistItems={wishlistItems}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </main>
        </div>

      </div>
    </div>
  );
}

export default ShopPage;