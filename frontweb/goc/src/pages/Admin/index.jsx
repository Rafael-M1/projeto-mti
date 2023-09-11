import Navbar from "./Navbar";
import Users from "./User";
import PrivateRoute from "./../../components/PrivateRoute";
import { Outlet } from "react-router-dom";

import "./styles.css";

const Admin = ({ toggleAuth }) => {
  return (
    <div className="admin-container">
      <Navbar toggleAuth={toggleAuth} />
      <div className="admin-content">
        {/* <PrivateRoute path="/admin/products">
          <h1>Product CRUD</h1>
        </PrivateRoute>
        <PrivateRoute path="/admin/categories">
          <h1>Category CRUD</h1>
        </PrivateRoute>
        <PrivateRoute path="/admin/users" roles={['ROLE_ADMIN']}>
          <Users />
        </PrivateRoute> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
