import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const SkipRoute = ({ children, redirectPath }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default SkipRoute;
