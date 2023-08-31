/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";

export const AdminRoutes = ({ children, rol }) => {
  const navigate = useNavigate();
  if (rol !== "ADMIN") {
    navigate("/");
  }

  return children ? children : <Outlet />;
};
