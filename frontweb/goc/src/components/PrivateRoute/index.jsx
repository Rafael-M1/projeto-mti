import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  isAllowed,
  redirectPath = "/apigoc/admin/auth",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
