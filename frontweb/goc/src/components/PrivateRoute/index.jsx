import { Route, Navigate } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated } from './../../util/auth';

const PrivateRoute = ({ children, path, roles = [] }) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Navigate to={{ pathname: '/admin/auth/login' }} />
        ) : !hasAnyRoles(roles) ? (
          <Navigate to={{ pathname: '/admin/products' }} />
        ) : (
          children
        )
      }
    />
  );
};

const ProtectedRoute = ({ component, requiredRoles }) => {
  if (isAuthenticatedV2() && isAuthorizedV2(requiredRoles)) {
    return component;
  } else {
    return <Navigate to="/" />;
  }
};

const isAuthenticatedV2 = () => {
  return true;
};

const isAuthorizedV2 = (requiredRoles) => {
  return true;
};

export default PrivateRoute;
