import "./styles.css";
import "bootstrap/js/src/collapse.js";
import { useMediaQuery } from "react-responsive";
import { Link, Outlet } from "react-router-dom";
import pjcBrasao from "./../../assets/images/brasao-pjc-mt.png";

const Navbar = ({ isAuthenticated }) => {
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const is1000pxOrLesser = useMediaQuery({ maxWidth: 1000 });
  const is1100pxOrLesser = useMediaQuery({ maxWidth: 1100 });
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/goc"} className="nav-logo-text">
            <div style={{ display: "flex" }}>
              <img src={pjcBrasao} style={{ height: "50px" }}></img>
              {is1000pxOrLesser ? (
                <h6
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  Polícia Judiciária Civil do Estado de Mato Grosso
                </h6>
              ) : (
                <h5
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  Polícia Judiciária Civil do Estado de Mato Grosso
                </h5>
              )}
            </div>
          </Link>
          {isAuthenticated ? (
            is1100pxOrLesser ? (
              <>
                <div style={{ display: "flex", color: "#fff" }}>
                  <h5>Sistema GOC</h5>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", color: "#fff" }}>
                  <h5>Sistema de Gestão de Ocorrências Criminais</h5>
                </div>
              </>
            )
          ) : // Nao esta autenticado
          is768pxOrLesser ? (
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
          ) : (
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
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
