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
        <Route path="/admin" element={<Admin />} >
          <Route path="" element={<h2>Página Inicial</h2>} />
          <Route path="dashboard" element={<h2>Dashboard</h2>} />
          <Route path="administracao" element={<h2>Administração</h2>} />
          <Route path="configuracoes" element={<h2>Configurações</h2>} />
        </Route>
        <Route path="/admin/auth" element={<Auth />} />
      </Route>
    </Routes>
  </>
);

export default RoutesConfig;
