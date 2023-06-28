import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { notification } from "antd";

const inpClass = "bg-[#85789A] rounded-[20px] w-full px-3 py-1";
const labelClass = "text-[#85789A] text-[13px] font-bold p-2";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
        console.log("🚀 ~ file: SignUp.jsx:31 ~ .then ~ user:", user);
        notification["success"]({
          message: "Added!",
          description: "A new user is successfully added!",
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
      <button className="bg-[#EEC110] m-2 rounded-2xl text-white font-bold text-[11px] p-[6px] ">
        SIGN UP
      </button>
    </form>
  );
};

export default SignUp;
