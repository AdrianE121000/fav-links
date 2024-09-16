import { useContext } from "react";
import AppContext from "../context/Context";
import { Navigate } from "react-router-dom";

export function PublicRoutes({ children }) {
  const { logged } = useContext(AppContext);

  return !logged ? children : <Navigate to="/home" />;
}
