import { NavLink, useNavigate } from "react-router-dom";
import { hasAnyRoles } from "./../../../util/auth";
import { removeAuthData } from "../../../util/storage";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  const onClickSairSistema = () => {
    navigate("/admin/auth");
    removeAuthData();
  };

  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <NavLink to="/admin/" className="admin-nav-item">
            <p>Página Inicial</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/dashboard" className="admin-nav-item">
            <p>Dashboard</p>
          </NavLink>
        </li>
        {hasAnyRoles(["ROLE_ADMIN"]) && (
          <li>
            <NavLink to="/admin/administracao" className="admin-nav-item">
              <p>Administração</p>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/admin/configuracoes" className="admin-nav-item">
            <p>Configurações</p>
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
    </nav>
  );
};

export default Navbar;
