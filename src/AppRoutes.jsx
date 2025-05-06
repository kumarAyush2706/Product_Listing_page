import ProductListPage from "./pages/ProductListPage/ProductListPage";
import Login from "./pages/LoginSignUP/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const {token} = useSelector(state => state.auth)

  return (
    <Routes>
      <Route path="/" element={token?<ProductListPage />:  <Navigate to="/login" />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="/logout" element={<Login />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default AppRoutes;
