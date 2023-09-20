import "./styles.css";
import "bootstrap/js/src/collapse.js";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import { AuthContext } from 'AuthContext';
import { getTokenData } from "./../../util/auth";
import { removeAuthData } from "./../../util/storage";
import pjcBrasao from "./../../assets/images/brasao-pjc-mt.png";

const Navbar = ({ isAuthenticated }) => {
  // const { isAuthenticated, setIsAuthenticated } = useState(true);
  let username = "Username";
  // const { authContextData, setAuthContextData } = useContext(AuthContext);
  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     setAuthContextData({
  //       authenticated: true,
  //       tokenData: getTokenData(),
  //     });
  //   } else {
  //     setAuthContextData({
  //       authenticated: false,
  //     });
  //   }
  // }, [setAuthContextData]);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    // removeAuthData();
    // setAuthContextData({
    //   authenticated: false,
    // });
  };
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/goc"} className="nav-logo-text">
            <div style={{ display: "flex" }}>
              <img src={pjcBrasao} style={{ height: "50px" }}></img>
              <h5
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                Título Projeto
                {/* Polícia Judiciária Civil do Estado de Mato Grosso */}
              </h5>
            </div>
          </Link>
          {is768pxOrLesser && isAuthenticated == false && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#goc-navbar"
                aria-controls="goc-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="goc-navbar">
                <ul className="navbar-nav offset-md-2 main-menu">
                  <li>
                    <Link to={"/goc"} activeClassName="active">
                      Página Inicial
                    </Link>
                  </li>
                  <li>
                    <Link to={"/goc/admin/auth"} activeClassName="active">
                      Administração
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!is768pxOrLesser && isAuthenticated == false && (
            <>
              <div style={{ display: "flex" }}>
                <Link to={"/goc"} className="nav-logo-text">
                  <h5>Página Inicial</h5>
                </Link>
                <Link to={"/goc/admin/auth"} className="nav-logo-text mx-4">
                  <h5>Administração</h5>
                </Link>
              </div>
            </>
          )}
          {/* <div className="nav-login-logout">
            {isAuthenticated ? (
              <>
                <span className="nav-username">{username}</span>
                <a href="#logout" onClick={handleLogoutClick}>
                  LOGOUT
                </a>
              </>
            ) : (
              <Link to={"/admin/auth"} activeClassName="active">
                Administração
              </Link>
            )}
          </div> */}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
