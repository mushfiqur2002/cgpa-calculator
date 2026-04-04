import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

export default function AdminLayout() {
  return (
    <div className="w-full h-screen flex justify-start items-start">
      <SideBar />
      <div className="w-full h-full bg-red-500">
        <Outlet />
      </div>
    </div>
  );
}
