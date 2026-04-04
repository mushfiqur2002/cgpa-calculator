import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

export default function AdminRoute({ children }) {
  const { isAdmin } = useContext(AdminContext);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
