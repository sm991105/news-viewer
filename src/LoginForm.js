import React, { useState } from "react";
import "./Home.css";

function LoginForm(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
  };
  const handleSignup = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
      <h2>Login</h2>

      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          value={Email}
          placeholder="Email"
          onChange={onEmailHandler}
        />
        <br />
        <input
          type="password"
          value={Password}
          placeholder="Password"
          onChange={onPasswordHandler}
        />
        <br />
        <button>Login</button>
      </form>
      <h4 style={{ marginBottom: -10 }}>Don't have an account?</h4>
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}

export default LoginForm;
