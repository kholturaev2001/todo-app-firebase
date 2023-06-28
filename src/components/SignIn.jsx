const inpClass = "bg-[#85789A] rounded-[20px] w-full px-3 py-1";
const labelClass = "text-[#85789A] text-[13px] font-bold p-2";

const SignIn = () => {
  return (
    <form className="flex flex-col gap-3">
      <section>
        <p className={labelClass}>Username</p>
        <input 
            className={inpClass} 
            type="text" 
            name="username" 
            id="username" 
            minLength={6}
            maxLength={50}
            required
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
        />
      </section>
      <section>
        <input type="checkbox" />
        <p>Keep me signed in</p>
      </section>
      <button>SIGN IN</button>
    </form>
  );
};

export default SignIn;
