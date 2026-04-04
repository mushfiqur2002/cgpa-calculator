import { useContext } from "react";
import Calculator from "../components/Calculator";
import { AuthContext } from "../context/AuthContext";
import { googleSignUp } from "../function/googleSignUp";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full center-center">
        <Calculator />
      </div>
      <div className="mt-3 md:mt-4 mx-0 md:mx-12 center-center">
        {user ? (
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-md md:text-3xl font-thin">
              Hi✋{" "}
              <span className="text-2xl md:text-4xl text-blue-500">
                {user.displayName}
              </span>
            </h1>

            <h2 className="text-md md:text-xl font-thin">
              Easily store your{" "}
              <span className="text-2xl md:text-4xl uppercase text-blue-500">
                results
              </span>
              , calculate your{" "}
              <span className="text-2xl md:text-4xl uppercase text-blue-500">
                GPA
              </span>
              , and identify areas for future{" "}
              <span className="text-2xl md:text-4xl uppercase text-blue-500">
                improvement
              </span>
            </h2>
            <p className="text-sm md:text-lg capitalize font-thin">
              for future update attached with us
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-lg md:text-3xl font-thin">
              Hello 👋 Welcome! Easily calculate your{" "}
              <span className="text-2xl md:text-4xl uppercase text-blue-500">
                GPA
              </span>
              , store your{" "}
              <span className="text-2xl md:text-4xl uppercase text-blue-500">
                results
              </span>
              , and see your results in{" "}
              <span className="text-2xl md:text-4xl uppercase text-blue-500">
                graphs
              </span>
              .
            </h1>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col gap-2">
              <p className="text-xs md:text-lg capitalize font-thin text-center md:text-left">
                Sign up now and unlock powerful tools to manage your GPA and
                results 📈
              </p>
              <div className="w-full md:w-1/2 lg:w-1/3">
                <button
                  onClick={googleSignUp}
                  className="w-fit flex items-center justify-center gap-2 w-full px-6 py-3 bg-white rounded-lg border border-gray-200"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />

                  <span className="text-sm font-semibold text-gray-800">
                    Continue with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
}
