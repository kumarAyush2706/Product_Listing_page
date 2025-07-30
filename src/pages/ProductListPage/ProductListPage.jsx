import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import { fetchProducts } from "../../services/productServices.js";
import "./ProductListPage.css";
import Filter from "../../components/Filter/FIlter.jsx";
import { Menu, MenuItem } from "@mui/material";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentSort, setCurrentSort] = useState("recommended");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filterProducts = (products, selectedFilters) => {
    const filteredProducts = products.filter((product) => {
      let tags = Object.values(selectedFilters).flat();
      if (tags.length === 0) return true;
      return tags.some((tag) => product.category.includes(tag.toLowerCase()));
    });
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    filterProducts(products, selectedFilters);
  }, [selectedFilters, products]);

  const sortProducts = (products, sortType) => {
    const sortedProducts = [...products];

    switch (sortType) {
      case "new":
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case "price_high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "price_low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Recommended - keep original order
        break;
    }

    return sortedProducts;
  };

  const handleSort = (sortType) => {
    setCurrentSort(sortType);
    const sortedProducts = sortProducts(filteredProducts, sortType);
    setFilteredProducts(sortedProducts);
    setAnchorEl(null);
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const getSortLabel = (sortType) => {
    switch (sortType) {
      case "new": return "Newest First";
      case "popular": return "Most Popular";
      case "price_high": return "Price: High to Low";
      case "price_low": return "Price: Low to High";
      case "rating": return "Highest Rated";
      default: return "Recommended";
    }
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setCurrentSort("recommended");
    setFilteredProducts(products);
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0 || currentSort !== "recommended";

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="page-header">
        <div className="page-heading">
          <h1>Discover Our Products</h1>
          <p>
            Explore our curated collection of high-quality products. 
            Find exactly what you're looking for with our advanced filtering and sorting options.
          </p>
        </div>
      </div>

      {/* Featured Image Card */}
      <div className="featured-card-section">
        <div className="featured-card">
          <div className="featured-card-content">
            <div className="featured-text">
              <h2>Summer Collection 2024</h2>
              <p>Discover the latest trends in fashion and lifestyle. Up to 50% off on selected items.</p>
              <button className="featured-btn">Shop Now</button>
            </div>
            <div className="featured-image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Summer Collection"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="product-list-content">
        <div className="product-controls">
          <div className="product-stats">
            <span className="product-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </span>
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            )}
          </div>

          <div className="control-buttons">
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilter(!showFilter)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 4h18M6 12h12M9 20h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Filters
            </button>

            <div className="sort-container">
              <button
                className="sort-btn"
                onClick={handleClick}
                aria-controls={open ? 'sort-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <span>{getSortLabel(currentSort)}</span>
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  className={open ? 'rotate' : ''}
                >
                  <path
                    d="M0.721251 1.00017L5.06792 5.34684C5.58125 5.86018 6.42125 5.86018 6.93458 5.34684L11.2813 1.00018"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                  style: {
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    border: '1px solid #eee'
                  }
                }}
              >
                <MenuItem 
                  onClick={() => handleSort("recommended")}
                  className={currentSort === "recommended" ? "selected" : ""}
                >
                  Recommended
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSort("new")}
                  className={currentSort === "new" ? "selected" : ""}
                >
                  Newest First
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSort("popular")}
                  className={currentSort === "popular" ? "selected" : ""}
                >
                  Most Popular
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSort("rating")}
                  className={currentSort === "rating" ? "selected" : ""}
                >
                  Highest Rated
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSort("price_low")}
                  className={currentSort === "price_low" ? "selected" : ""}
                >
                  Price: Low to High
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSort("price_high")}
                  className={currentSort === "price_high" ? "selected" : ""}
                >
                  Price: High to Low
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <Loader />
          </div>
        ) : (
          <div className="product-layout">
            <Filter
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              isLoading={loading}
            />
            
            <div className="product-section">
              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <div className="no-products-icon">🔍</div>
                  <h3>No products found</h3>
                  <p>
                    {hasActiveFilters 
                      ? "Try adjusting your filters or search criteria."
                      : "We couldn't find any products matching your criteria."
                    }
                  </p>
                  {hasActiveFilters && (
                    <button className="clear-filters-btn" onClick={clearFilters}>
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListPage;
