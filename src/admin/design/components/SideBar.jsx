import { Sidebar, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { sideBarLinks } from "../..";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { googleSignOut } from "../../../function/googleSignOut";

export default function SideBar() {
  const [activeBar, setActiveBar] = useState(false);
  const { user } = useContext(AuthContext);

  const handleBar = () => {
    setActiveBar(!activeBar);
  };
  console.log(window.location.href);

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r-1 border-r-[rgba(0,0,0,.15)] transition-all duration-300 ${
        activeBar ? "w-auto" : "w-16"
      } px-3 py-2`}
    >
      {/* logo */}
      <div className="flex items-center gap-2 border-b border-gray-300 pb-3 whitespace-nowrap mt-4">
        <Sidebar size={20} onClick={handleBar} className="cursor-pointer" />
        <h1
          className={`text-md font-medium capitalize transition-all duration-300 ${
            activeBar ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          admin dashboard
        </h1>
      </div>

      {/* links */}
      <ul className="mt-4 flex flex-col gap-2">
        {sideBarLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 whitespace-nowrap
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
                }`
              }
            >
              <link.icon size={18} />

              <span
                className={`capitalize transition-all duration-300 ${
                  activeBar ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {link.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-start items-center mt-auto flex gap-4 pb-4">
        <div
          className={`w-9 h-9 rounded-full overflow-hidden ${activeBar ? "block" : "hidden"}`}
        >
          <img
            src={user?.photoURL}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div
          className={`w-full h-full flex items-center ${activeBar ? "justify-start" : "justify-center"}`}
        >
          <button onClick={googleSignOut} className="bg-white text-black">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
