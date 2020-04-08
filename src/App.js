import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import "./News.css";
import About from "./About.js";
import Home from "./Home.js";
import News_usa from "./News_countries/News_usa.js";
import News_uk from "./News_countries/News_uk.js";
import News_france from "./News_countries/News_france.js";
import News_southKorea from "./News_countries/News_southKorea";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <div className="mypage">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="News__countries">
            <Link id="usa" to="/usa">
              USA
            </Link>
            <Link id="uk" to="/uk">
              UK
            </Link>
            <Link id="france" to="/france">
              France
            </Link>
            <Link id="southKorea" to="/southKorea">
              South Korea
            </Link>
          </div>
        </nav>
        <hr />
        <Route path="/" component={Home} exact={true} />
        <Route path="/about" component={About} />
        <Route path="/usa" component={News_usa} />
        <Route path="/uk" component={News_uk} />
        <Route path="/france" component={News_france} />
        <Route path="/southKorea" component={News_southKorea} />
      </div>
    </BrowserRouter>
  );
};

export default App;
