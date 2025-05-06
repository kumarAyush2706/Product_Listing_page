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
  const navigate = useNavigate();

  useEffect(() => {
    const totalAmount = cartDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, cartDetails);

  console.log(cartDetails);

  return (
    <div className="cart-container">
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}>
        <p
          onClick={() => navigate(-1)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          ← Go back
        </p>
        <button className="checkout-btn" onClick={()=> dispatch(clearCart())}>Clear Cart</button>
      </div>
      <h1>Your Cart</h1>
      {cartDetails.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cartDetails.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} className="cart-img" />
              </Link>
              <div className="cart-details">
                <h2>{item.brand}</h2>
                <p>{item.title}</p>
                <div className="cart-price">₹{item.price}</div>
                <div className="cart-qty">
                  <button
                    onClick={() => dispatch(DecQuantity({ id: item.id }))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(IncQuantity({ id: item.id }))}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
