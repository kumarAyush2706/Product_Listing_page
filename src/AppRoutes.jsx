import ProductListPage from "./pages/ProductListPage/ProductListPage";
import Login from "./pages/LoginSignUP/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  const token = localStorage.getItem("token_123");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <ProductListPage /> : <Navigate to="/login"  />}
      />
      <Route
        path="/login"
        element={token? <Navigate to="/"  /> : <Login />}
      />
      <Route
        path="/logout"
        element={ <Login />}
      />
      <Route
        path="*"
        element={<div>Page does not exist!</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
