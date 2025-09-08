import "./App.css";
import Fixed from "./components/Fixed";
import UserSignup from "./pages/UserSingnup";
import UserLogin from "./pages/UserLogin";
import LandingPage from "./pages/LandingPage";
import AddProductForm from "./components/AddProductForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />}></Route>
          <Route path="/signup" element={<UserSignup />}></Route>
          <Route path="/home" element={<LandingPage />}></Route>
          <Route path="/addProduct" element={<AddProductForm />}></Route>
          <Route path="/product/:id" element={<ProductDetailPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route />
        </Routes>
      </BrowserRouter>
      {/* <LandingPage /> */}
    </>
  );
}

export default App;
