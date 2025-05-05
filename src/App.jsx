import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./AppRoutes";
import { useState } from "react";

function App() {
  const token = localStorage.getItem("token_123");

  return (
    <>
      {token && <Header />}
      <AppRoutes />
      {token && <Footer />}
    </>
  );
}

export default App;
