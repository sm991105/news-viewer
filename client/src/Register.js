import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

function Register() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Error, setError] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: Email,
      password: Password,
      name: Name,
    };
    axios
      .post("/api/users/register", body)
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          console.log("Welcome, new face!");
          window.location.replace("/");
        } else if (response.data.code === 11000) {
          setError("Email already in use.");
        } else if (response.data.message.includes("email")) {
          setError("Invalid email address.");
        } else if (response.data.message.includes("password")) {
          setError("Password must have at least 8 characters.");
        } else {
          console.log("Failed to register.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="register_form">
        <h2 className="signup_text">Sign up</h2>

        <form>
          <input
            type="email"
            placeholder="Enter email"
            onChange={onEmailHandler}
            value={Email}
          />
          <br />
          <input
            type="password"
            placeholder="Enter password"
            onChange={onPasswordHandler}
            value={Password}
          />
          <br />
          <input
            type="text"
            placeholder="Enter nickname"
            onChange={onNameHandler}
            value={Name}
          />
          <br />
          <button
            style={{ marginTop: 20 }}
            className="signup_btn"
            onClick={onSubmitHandler}
          >
            submit
          </button>
        </form>
        <div
          style={{
            textAlign: "center",
            marginTop: 14,
            fontSize: 15,
            color: "yellow",
            fontFamily: "Arial",
            fontWeight: "lighter",
          }}
        >
          {Error}
        </div>
      </div>
    </div>
  );
}

export default Register;
