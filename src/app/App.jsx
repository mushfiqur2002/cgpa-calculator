import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function App() {
  return (
    <div className="w-full flex-col center-center">
      <NavBar />
      <main className="w-full center-center flex-col px-4 md:px-6 ">
        <Outlet />
      </main>
    </div>
  );
}
