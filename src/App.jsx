import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const { user, token } = useSelector((state) => state.auth);

  // console.log(user, token)

  return (
    <>
      
      <AppRoutes />
    </>
  );
}

export default App;
