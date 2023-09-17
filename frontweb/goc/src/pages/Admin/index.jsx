import Navbar from "./Navbar";
//import PrivateRoute from "./../../components/PrivateRoute";
import { Outlet } from "react-router-dom";

import "./styles.css";

const Admin = ({ toggleAuth }) => {
  return (
    <div className="admin-container">
      <Navbar toggleAuth={toggleAuth} />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
