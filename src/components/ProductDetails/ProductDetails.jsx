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
  const [ProductDetails, setProductDetails] = useState(null);
  const cartDetails = useSelector((state) => state.cart.items);

  const currItem =
    cartDetails && cartDetails.length > 0
      ? cartDetails.find((item) => item.id === Number(productId))
      : null;

  console.log("Cart", cartDetails, currItem);
  const fetchProducts = async () => {
    try {
      const productDetail = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProductDetails(productDetail.data);
    } catch (error) {
      console.log("Error while loading product details", error);
      setProductDetails(null);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(ProductDetails));
    console.log("Product added to cart successfully!", cartDetails);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        ← Back to Products
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        <img
          src={ProductDetails?.image}
          alt={ProductDetails?.title}
          style={{ width: "300px", objectFit: "contain", marginRight: "20px" }}
        />
        <div>
          <h2>{ProductDetails?.title}</h2>
          <p>
            <strong>Price:</strong> ${ProductDetails?.price}
          </p>
          <p>
            <strong>Category:</strong> {ProductDetails?.category}
          </p>
          <p>
            <strong>Rating:</strong> {ProductDetails?.rating.rate} ★ (
            {ProductDetails?.rating.count} reviews)
          </p>
          <p style={{ marginTop: "10px" }}>{ProductDetails?.description}</p>

          {currItem && (
            <div className="cart-qty">
              <button onClick={() => dispatch(DecQuantity({ id: productId }))}>
                -
              </button>
              <span>{Number(currItem.quantity)}</span>
              <button onClick={() => dispatch(removeFromCart({ id: productId }))}>
                +
              </button>
              <Link
                to={"/cart"}
                style={{ marginTop: "20px", padding: "10px 20px" }}
              >
                Go to Cart
              </Link>
            </div>
          )}

          <button
            style={{ marginTop: "20px", padding: "10px 20px" }}
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
