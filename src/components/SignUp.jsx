import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router";

import { auth } from "../firebase";

const inpClass = "bg-[#85789A] rounded-[20px] w-full px-3 py-1";
const labelClass = "text-[#85789A] text-[13px] font-bold p-2";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = await userCredential.user;
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/");
        notification["success"]({
          message: "Signed Up!",
          description: "You have successfully signed up!",
        });
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        notification["error"]({
          message: "Error!",
          description: error.toString(),
        });
      }
    } else {
      alert("Password confirmation does not match! Please, try again!");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
      <section>
        <p className={labelClass}>Confirm Password</p>
        <input
          className={inpClass}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          minLength={6}
          maxLength={50}
          required
          onChange={handleChange}
          value={formData.confirmPassword}
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
        SIGN UP
      </button>
    </form>
  );
};

export default SignUp;
