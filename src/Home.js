import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  state = {
    id: "",
    password: "",
  };
  render() {
    return (
      <div>
        <div className="Login">
          <h2>Login</h2>
          <form action="" method="post">
            <input type="text" name="id" placeholder="ID" />
            <br />
            <input type="password" name="password" placeholder="Password" />
            <br />
            <input type="submit" value="submit" />
          </form>
          <h4>Don't have an account?</h4>
          <a href="">Sign up</a>
        </div>
      </div>
    );
  }
}
export default Home;
