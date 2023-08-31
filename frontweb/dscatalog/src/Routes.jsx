import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Admin/Auth";
import React from "react";
import Navbar from "./components/Navbar";

const RoutesConfig = () => (
  <>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/produtos" element={<Catalog />} />
        <Route path="/produtos/:productId" element={<ProductDetails />} />
        <Route path="/admin/auth" element={<Auth />} />
      </Route>
    </Routes>
  </>
);

export default RoutesConfig;
