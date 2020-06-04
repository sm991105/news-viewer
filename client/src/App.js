import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import axios from "axios";
import "./News.css";
import About from "./About.js";
import Scrapped from "./Scrapped";
import News_usa from "./News_countries/News_usa.js";
import News_sports from "./News_countries/News_sports.js";
import News_business from "./News_countries/News_business.js";
import News_health from "./News_countries/News_health";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const loginCheck = async () => {
    axios.get("/api/users/authenticate").then((response) => {
      if (response.data.email) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      console.log(IsLoggedIn);
    });
  };
  useEffect(() => {
    loginCheck();
  });

  return IsLoggedIn ? (
    <BrowserRouter>
      <div>
        <nav>
          <div className="mypage">
            <Link to="/scrapped">Favorites</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="News__countries">
            <Link id="usa" to="/">
              USA
            </Link>
            <Link id="business" to="/business">
              Business
            </Link>
            <Link id="health" to="/health">
              Health
            </Link>
            <Link id="sports" to="/sports">
              Sports
            </Link>
          </div>
        </nav>
        <hr />
        <Route exact path="/" component={News_usa} />
        <Route path="/business" component={News_business} />
        <Route path="/health" component={News_health} />
        <Route path="/sports" component={News_sports} />
        <Route path="/scrapped" component={Scrapped} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <div>
        <nav>
          <div className="mypage">
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="News__countries">
            <Link id="usa" to="/">
              USA
            </Link>
            <Link id="business" to="/business">
              Business
            </Link>
            <Link id="health" to="/health">
              Health
            </Link>
            <Link id="sports" to="/sports">
              Sports
            </Link>
          </div>
        </nav>
        <hr />
        <Route exact path="/" component={News_usa} />
        <Route path="/business" component={News_business} />
        <Route path="/health" component={News_health} />
        <Route path="/sports" component={News_sports} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  );
};

export default App;
