import { Boxes, User, LogIn, LogOut } from "lucide-react";
import { googleSignUp } from "../function/googleSignUp";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { googleSignOut } from "../function/googleSignOut";
export default function NavBar() {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="w-full h-full sticky top-0 z-100 flex flex-col">
      <div className="w-full h-18 bg-[#262626] text-white center-between px-3 md:px-12">
        <div className="p-2 rounded-full bg-white text-black">
          <Boxes />
        </div>

        <div className="center-center gap-2">
          {/* user info part */}
          <div>
            {user ? (
              <div className="flex justify-center items-end flex-col">
                <p className="text-sm">{user.displayName}</p>
                <p className="text-xs font-thin text-blue-200">{user.email}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {loading ? (
              <p className="">loading...</p>
            ) : user ? (
              <div className="w-9 h-9 rounded-full overflow-hidden center-center">
                <img
                  className="w-full h-full object-cover"
                  src={`${user.photoURL}`}
                  alt="user photo"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full overflow-hidden bg-white text-black center-center">
                <User size={18} />
              </div>
            )}
          </div>

          {/* button part */}
          <div>
            {user ? (
              <button
                onClick={googleSignOut}
                className="w-9 h-9 center-center rounded-full bg-white text-black"
              >
                <LogOut size={16} />
              </button>
            ) : (
              <button
                onClick={googleSignUp}
                className="w-9 h-9 center-center rounded-full bg-blue-200 text-black"
              >
                <LogIn size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
