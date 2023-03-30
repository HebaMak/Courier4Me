import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./hooks/AuthContext";

const PrivateRoutes = () => {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
