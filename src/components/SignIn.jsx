import { notification } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

import { auth } from "../firebase";

const inpClass = "bg-[#85789A] rounded-[20px] w-full px-3 py-1";
const labelClass = "text-[#85789A] text-[13px] font-bold p-2";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    signedIn: false,
  });
  const navigate = useNavigate()

  function handleChange(e) {
    const { value, name, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function loginFn(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = await userCredential.user;
      sessionStorage.setItem('userInfo', JSON.stringify(user))
      navigate('/')
      notification["success"]({
        message: "Logged In!",
        description: "You have successfully logged in!",
      });

      setFormData({
        email: "",
        password: "",
        signedIn: false,
      });
    } catch (error) {
      notification["error"]({
        message: "Error!",
        description: error.toString(),
      });
    }
  }
  return (
    <form onSubmit={loginFn} className="flex flex-col gap-3">
      <section>
        <p className={labelClass}>User Email</p>
        <input
          className={inpClass}
          type="text"
          name="email"
          id="email"
          minLength={6}
          maxLength={50}
          required
          onChange={handleChange}
          value={formData.email}
        />
      </section>
      <section>
        <p className={labelClass}>Password</p>
        <input
          className={inpClass}
          type="password"
          name="password"
          id="password"
          minLength={6}
          maxLength={50}
          required
          onChange={handleChange}
          value={formData.password}
        />
      </section>
      <section className="flex items-center gap-1 ml-3">
        <input
          type="checkbox"
          className="cursor-pointer"
          name="signedIn"
          id="signedIn"
          onChange={handleChange}
          checked={formData.signedIn}
        />
        <label htmlFor="signedIn" className="text-white font-bold text-[11px]">
          Keep Me Signed In
        </label>
      </section>
      <button className="bg-[#EEC110] m-2 rounded-2xl text-white font-bold text-[11px] p-[6px] ">
        SIGN IN
      </button>
    </form>
  );
};

export default SignIn;
