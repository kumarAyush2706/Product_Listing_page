import ProductListPage from "./pages/ProductListPage/ProductListPage";
import Login from "./pages/LoginSignUP/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = ({ user, setUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={user && user.username ? <ProductListPage /> : <Navigate to="/login"  />}
      />
      <Route
        path="/login"
        element={user && user.username ? <Navigate to="/"  /> : <Login user={user} setUser={setUser} />}
      />
      <Route
        path="*"
        element={<div>Page does not exist!</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
