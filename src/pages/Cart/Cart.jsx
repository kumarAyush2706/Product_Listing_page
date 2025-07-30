import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearCart,
  DecQuantity,
  IncQuantity,
  removeFromCart,
} from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart.items);
  const [total, setTotal] = useState(0);
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const totalAmount = cartDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartDetails]);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setIsClearing(true);
      dispatch(clearCart());
      setTimeout(() => setIsClearing(false), 1000);
    }
  };

  const handleQuantityChange = (id, action) => {
    if (action === 'decrease') {
      dispatch(DecQuantity({ id }));
    } else {
      dispatch(IncQuantity({ id }));
    }
  };

  const handleRemoveItem = (id, title) => {
    if (window.confirm(`Remove "${title}" from cart?`)) {
      dispatch(removeFromCart({ id }));
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Shopping
        </button>
        {user && token && cartDetails.length > 0 && (
          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "Clear Cart"}
          </button>
        )}
      </div>

      <div className="cart-content">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        {!user || !token ? (
          <div className="login-prompt-container">
            <div className="login-prompt">
              <h3>Please log in to view your cart</h3>
              <p>Sign in to access your saved items and complete your purchase.</p>
              <Link to="/login" className="login-btn">
                Login to Continue
              </Link>
            </div>
          </div>
        ) : cartDetails.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartDetails.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.title} />
                    </Link>
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <h3 className="cart-item-title">
                        <Link to={`/product/${item.id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      {item.category && (
                        <span className="cart-item-category">
                          {item.category}
                        </span>
                      )}
                      <div className="cart-item-price">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, 'decrease')}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, 'increase')}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="cart-item-subtotal">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </div>
                      
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemoveItem(item.id, item.title)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total-section">
                <div className="cart-total-row">
                  <span>Items ({cartDetails.length}):</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="cart-total-row total">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <Link to="/" className="continue-shopping-btn secondary">
                  Continue Shopping
                </Link>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
