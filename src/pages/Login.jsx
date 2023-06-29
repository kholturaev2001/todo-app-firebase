import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const navs = [
  {
    id: "sign_in",
    name: "SIGN IN",
  },
  {
    id: "sign_up",
    name: "SIGN UP",
  },
];

const Login = () => {
  const [curContent, setCurContent] = useState("sign_in");

  return (
    <div className="h-screen flex align-center">
      <div className="w-[400px] bg-[#33224f] rounded-sm m-auto px-10 py-5 h-[450px]">
        <div className="flex gap-4 pb-6">
          {navs.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => setCurContent(id)}
              className={`text-bold text-sm p-2 ${
                curContent === id
                  ? "text-white   border-b-2 border-b-yellow-500"
                  : " text-[#85789A]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        {curContent === "sign_in" ? <SignIn /> : <SignUp />}
        <hr className="my-4" />
        <div className="flex justify-center">
          <button className="text-[#85789A] text-[11px] font-bold p-1">
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
