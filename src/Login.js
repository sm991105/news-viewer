import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./Home.css";

function LoginForm(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

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

    axios
      .post("/api/users/login", body)
      .then((response) => {
        if (!response.data.token) {
          setError(response.data.error);
        } else {
          window.location.replace("/");
          //props.history.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="Login">
      <h2>Login</h2>

      <form>
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
        <div className="login_err">{Error}</div>
        <button className="login_btn" onClick={onSubmitHandler}>
          Login
        </button>
      </form>
      <h4>Don't have an account?</h4>
      <Link className="signup_btn" to="/register">
        Sign up
      </Link>
    </div>
  );
}

export default LoginForm;
