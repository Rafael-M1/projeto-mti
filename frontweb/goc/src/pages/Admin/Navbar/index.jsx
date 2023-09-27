import { NavLink, useNavigate } from "react-router-dom";
import { hasAnyRoles } from "./../../../util/auth";
import { removeAuthData } from "../../../util/storage";
import "./styles.css";
import { PersonIcon } from "../../../assets/images/icon-person";
import { requestBackend } from "../../../util/requests";
import { useEffect } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Navbar = ({ toggleAuth }) => {
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);
  const is1200pxOrLesser = useMediaQuery({ maxWidth: 1199 });
  const navigate = useNavigate();
  const onClickSairSistema = () => {
    toggleAuth();
    navigate("/goc/admin/auth");
    removeAuthData();
  };
  const serviceUserLoggedInInfoPromise = ({
    pageNumberParam,
    methodParam = "GET",
    urlParam = "/me",
    dataParam,
  }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let params = {
          url: urlParam,
          method: methodParam,
          withCredentials: true,
        };
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });

  useEffect(() => {
    serviceUserLoggedInInfoPromise({})
      .then((response) => setLoggedUserInfo(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <nav className="admin-nav-container">
      {is1200pxOrLesser ? (
        <div style={{ display: "flex" }}>
          <div
            style={{
              minWidth: "170px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingRight: "10px",
            }}
          >
            <PersonIcon size={70} />
            {loggedUserInfo && loggedUserInfo.pessoa && (
              <h5 style={{ textAlign: "center" }}>
                {loggedUserInfo.pessoa.nome}
              </h5>
            )}
          </div>
          <div
            style={{
              paddingLeft: "10px",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "space-around",
              justifyContent: "flex-start",
            }}
          >
            <NavLink to="/goc/admin/" className="admin-nav-item my-1">
              <p>Página Inicial</p>
            </NavLink>
            <NavLink to="/goc/admin/dashboard" className="admin-nav-item my-1">
              <p>Dashboard</p>
            </NavLink>
            {hasAnyRoles(["ROLE_ADMIN"]) && (
              <NavLink
                to="/goc/admin/administracao"
                className="admin-nav-item my-1"
              >
                <p>Administração</p>
              </NavLink>
            )}
            <NavLink to="/goc/admin/sobre" className="admin-nav-item my-1">
              <p>Sobre</p>
            </NavLink>
            <a
              className="admin-nav-item my-1"
              onClick={onClickSairSistema}
              style={{ cursor: "pointer" }}
            >
              <p>Sair do Sistema</p>
            </a>
          </div>
        </div>
      ) : (
        //</>

        <>
          <ul>
            <li>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <PersonIcon size={100} />
                {loggedUserInfo && loggedUserInfo.pessoa && (
                  <h5>{loggedUserInfo.pessoa.nome}</h5>
                )}
              </div>
            </li>
            <li>
              <NavLink to="/goc/admin/" className="admin-nav-item">
                <p>Página Inicial</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/goc/admin/dashboard" className="admin-nav-item">
                <p>Dashboard</p>
              </NavLink>
            </li>
            {hasAnyRoles(["ROLE_ADMIN"]) && (
              <li>
                <NavLink
                  to="/goc/admin/administracao"
                  className="admin-nav-item"
                >
                  <p>Administração</p>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/goc/admin/sobre" className="admin-nav-item">
                <p>Sobre</p>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <a
                className="admin-nav-item-bottom"
                onClick={onClickSairSistema}
                style={{ cursor: "pointer" }}
              >
                <p>Sair do Sistema</p>
              </a>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
