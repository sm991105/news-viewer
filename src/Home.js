import React, { Component } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

class Home extends Component {
  state = { loggedin: false };
  render() {
    return <LoginForm />;
  }
}

export default Home;
