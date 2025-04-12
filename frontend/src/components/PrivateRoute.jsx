// src/components/PrivateRoute.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useUser();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to feed if user doesn't have the required role
    return <Navigate to="/feed" />;
  }

  return children;
}

export default PrivateRoute;
