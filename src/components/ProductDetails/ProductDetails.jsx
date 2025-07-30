import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  IncQuantity,
  DecQuantity,
  removeFromCart,
} from "../../redux/features/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productId = useParams().id;
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartDetails = useSelector((state) => state.cart.items);
  const { user, token } = useSelector((state) => state.auth);

  const currItem =
    cartDetails && cartDetails.length > 0
      ? cartDetails.find((item) => item.id === Number(productId))
      : null;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productDetail = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProductDetails(productDetail.data);
    } catch (error) {
      console.log("Error while loading product details", error);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(productDetails));
    console.log("Product added to cart successfully!", cartDetails);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("☆");
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push("☆");
    }
    return stars.join("");
  };

  useEffect(() => {
    fetchProducts();
  }, [productId]);

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="product-details-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-container">
        <div className="product-details-content">
          <div className="error-container">
            <div className="error-message">{error}</div>
            <button className="retry-btn" onClick={fetchProducts}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="product-details-container">
        <div className="product-details-content">
          <div className="error-container">
            <div className="error-message">Product not found</div>
            <Link to="/" className="retry-btn">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <Link to="/" className="back-button">
          ← Back to Products
        </Link>
        
        <div className="product-details-grid">
          <div className="product-image-container">
            <img
              src={productDetails.image}
              alt={productDetails.title}
              className="product-image"
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{productDetails.title}</h1>
            
            <h2 className="product-price">${productDetails.price}</h2>
            
            <span className="product-category">{productDetails.category}</span>
            
            <div className="product-rating">
              <span className="rating-stars">
                {renderStars(productDetails.rating.rate)}
              </span>
              <span className="rating-text">
                {productDetails.rating.rate} ({productDetails.rating.count} reviews)
              </span>
            </div>
            
            <p className="product-description">{productDetails.description}</p>
            
            <div className="cart-controls">
              {currItem ? (
                <>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => dispatch(DecQuantity({ id: productId }))}
                    >
                      -
                    </button>
                    <span className="quantity-display">{Number(currItem.quantity)}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => dispatch(IncQuantity({ id: productId }))}
                    >
                      +
                    </button>
                  </div>
                  <Link to="/cart" className="go-to-cart-btn">
                    Go to Cart
                  </Link>
                </>
              ) : user && token ? (
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              ) : (
                <Link to="/login" className="login-prompt">
                  Please login to shop!
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
