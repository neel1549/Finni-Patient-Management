import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  return currentUser != null ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
