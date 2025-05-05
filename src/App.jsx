import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./AppRoutes";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      {user && <Header />}
      <AppRoutes user={user} setUser={setUser} />
      {user && <Footer />}
    </>
  );
}

export default App;
