// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of selected product
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        state.items.find((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
          }
        });
      } else {
        state.items.push(action.payload);
        state.items[state.items.length - 1]["quantity"] = 1;
      }
    },
    IncQuantity: (state, action) => {
      state.items.find((item) => item.id == action.payload.id).quantity += 1;
    },
    DecQuantity: (state, action) => {
      if (state.items.find((item) => item.id == action.payload.id).quantity > 0)
        state.items.find((item) => item.id == action.payload.id).quantity -= 1;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  IncQuantity,
  DecQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
