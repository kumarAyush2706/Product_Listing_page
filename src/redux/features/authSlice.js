// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { decodeAndValidateJWT, decodeJWT } from "../../services/decodebase64";

// Decode JWT and extract payload

// Initialize token from localStorage
const tokenFromStorage = localStorage.getItem("token_123");
const decoded = tokenFromStorage
  ? decodeAndValidateJWT(tokenFromStorage)
  : null;


const initialState = {
  token: decoded.valid ? tokenFromStorage: null,
  user:  decoded.valid && decoded.payload ? decoded.payload.user: null ,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const token = action.payload.token;
      const decoded = decodeAndValidateJWT(token);

      console.log(token, decoded);

      //   {
      //     "valid": true,
      //     "payload": {
      //         "sub": 1,
      //         "user": "johnd",
      //         "iat": 1746509429
      //     }
      // }

      if (decoded.valid) {
        localStorage.setItem("token_123", token);
        state.token = token;
        state.user = decoded.payload.user;
      } else {
        localStorage.removeItem("token_123");
        state.token = null;
        state.user = null;

        // Redirect to login page
        // window.location.href = '/login';
      }
    },
    logout: (state) => {
      localStorage.removeItem("token_123");
      state.token = null;
      state.user = null;
      //   window.location.href = '/login'; // Force redirect to login
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
