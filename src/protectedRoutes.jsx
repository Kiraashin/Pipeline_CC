import { Navigate, Outlet } from "react-router-dom";

const roleHome = {
  admin: "/admin",
  creator: "/dashboard",
  editor: "/editor",
};

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role?.trim().toLowerCase();

  if (!roleHome[role]) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={roleHome[role]} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;