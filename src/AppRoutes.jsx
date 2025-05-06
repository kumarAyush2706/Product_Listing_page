import ProductListPage from "./pages/ProductListPage/ProductListPage";
import Login from "./pages/LoginSignUP/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const AppRoutes = () => {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header user={user} />
            <ProductListPage />
            <Footer />
          </>
        }
      />
      <Route
        path="/product/:id"
        element={
          <>
            <Header user={user} />
            <ProductDetails />
            <Footer />
          </>
        }
      />
      <Route
        path="/cart"
        element={
          <>
            <Header user={user} />
            <Cart />
            <Footer />
          </>
        }
      />
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
