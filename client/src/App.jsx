import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Order from "./pages/Order";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import "./index.css";
import { CartState } from "./context/Context";

const App = () => {
  const { user } = CartState();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route
        path="/order/:id"
        element={user !== null ? <Order /> : <Navigate to="/" />}
      />
      <Route
        path="/cart"
        element={user !== null ? <Cart /> : <Navigate to="/" />}
      />
      <Route
        path="/orders"
        element={user !== null ? <Orders /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={user !== null ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/wishlist"
        element={user !== null ? <Wishlist /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={user !== null ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
};

export default App;
