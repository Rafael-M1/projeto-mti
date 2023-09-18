import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Auth from "./pages/Admin/Auth";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PainelServicos from "./pages/Admin/PainelServicos";
import AdministracaoPage from "./pages/Admin/Administracao";
import TipoCrime from "./pages/Admin/Administracao/TipoCrime";
import TipoCrimeForm from "./pages/Admin/Administracao/TipoCrime/Form";
import OcorrenciaCriminalForm from "./pages/Admin/PainelServicos/OcorrenciaCriminal";
import { isUserAuthenticated } from "./util/auth";
import OcorrenciaAdministracao from "./pages/Admin/Administracao/Ocorrencia";
import SobrePage from "./pages/Admin/Sobre";
import PessoaAdministracao from "./pages/Admin/Administracao/Pessoa";
import PessoaForm from "./pages/Admin/Administracao/Pessoa/Form";
import DashboardPage from "./pages/Admin/Dashboard";

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
            <Route path="dashboard" element={<DashboardPage />}>
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
            <Route
              path="administracao/ocorrencia"
              element={<OcorrenciaAdministracao />}
            ></Route>
            <Route
              path="administracao/pessoa"
              element={<PessoaAdministracao />}
            ></Route>
            <Route
              path="administracao/pessoa/form"
              element={<PessoaForm />}
            ></Route>
            <Route path="sobre" element={<SobrePage />} />
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
