import { Boxes, User, LogIn } from "lucide-react";
import { googleSignUp } from "../function/googleSignUp";
export default function NavBar() {
  return (
    <div className="w-full h-18 bg-[#262626] text-white center-between sticky top-0 px-3 md:px-12 z-100">
      <div className="p-2 rounded-full bg-white text-black">
        <Boxes />
      </div>
      <div className="">
        <button
          onClick={googleSignUp}
          className="w-8 h-8 center-center rounded-full bg-white text-black"
        >
          <LogIn size={14} />
        </button>
      </div>
    </div>
  );
}
