import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Admin/Auth";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PainelServicos from "./pages/Admin/PainelServicos";
import AdministracaoPage from "./pages/Admin/Administracao";
import TipoCrime from "./pages/Admin/Administracao/TipoCrime";
import TipoCrimeForm from "./pages/Admin/Administracao/TipoCrime/Form";
import OcorrenciaCriminalForm from "./pages/Admin/PainelServicos/OcorrenciaCriminal";
import { isUserAuthenticated } from "./util/auth";

const RoutesConfig = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleAuth = () => {
    setIsAuthenticated((current) => {
      let currentStatus = !current;
      return currentStatus;
    });
  };
  useEffect(() => {
    isUserAuthenticated()
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={<Admin toggleAuth={() => toggleAuth()} />}
          >
            <Route path="" element={<PainelServicos />} />
            <Route path="dashboard" element={<h2>Dashboard</h2>}>
              {/* a */}
            </Route>
            <Route
              path="ocorrencia"
              element={<OcorrenciaCriminalForm />}
            ></Route>
            <Route path="administracao" element={<AdministracaoPage />}></Route>
            <Route
              path="administracao/tipocrime"
              element={<TipoCrime />}
            ></Route>
            <Route
              path="administracao/tipocrime/form"
              element={<TipoCrimeForm />}
            ></Route>
            <Route path="configuracoes" element={<h2>Configurações</h2>} />
          </Route>
          <Route
            path="/admin/auth"
            element={<Auth toggleAuth={() => toggleAuth()} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesConfig;
