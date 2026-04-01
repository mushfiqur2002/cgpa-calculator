import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function App() {
  return (
    <div className="w-full flex-col center-center">
      <NavBar />
      <main className="center-center flex-col">
        <Outlet />
      </main>
    </div>
  );
}
