import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/feed" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
