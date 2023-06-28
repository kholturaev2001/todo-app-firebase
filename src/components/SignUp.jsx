const SignUp = () => {
  return (
    <div>
      <section>
        <p>Username</p>
        <input type="text" name="username" id="username" />
      </section>
      <section>
        <p>Password</p>
        <input type="password" name="password" id="password" />
      </section>
      <section>
        <p>Confirm Password</p>
        <input type="password" name="confirm_password" id="confirm_password" />
      </section>
      <section>
        <input type="checkbox" />
        <p>Keep me signed up</p>
      </section>
      <button>SIGN UP</button>
    </div>
  );
};

export default SignUp;
