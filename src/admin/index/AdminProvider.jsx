import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "./AdminContext";

export const AdminProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div> loading....</div>;
  }
  // const isAdmin = user?.email === "mushfiqurnasim@gmail.com";
  const isAdmin = true;

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
