import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

export default function AdminLayout() {
  return (
    <div className="w-full h-screen flex justify-start items-start">
      <SideBar />
      <div className="w-full h-full px-3 md:px-4 py-4">
        <Outlet />
      </div>
    </div>
  );
}
