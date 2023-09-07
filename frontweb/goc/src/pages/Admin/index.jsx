import Navbar from "./Navbar";
import Users from "./User";
import PrivateRoute from "./../../components/PrivateRoute";

import "./styles.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
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
      </div>
    </div>
  );
};

export default Admin;