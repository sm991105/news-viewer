import React from "react";
import axios from "axios";

function Scrapped() {
  const logoutHandler = () => {
    axios.get("/api/users/logout").then(() => {
      console.log("Logged out");
      window.location.replace("/");
    });
  };

  return (
    <div>
      <div>Scrapped news</div>
      <div className="signout_button">
        <button onClick={logoutHandler}>Sign out</button>
      </div>
    </div>
  );
}

export default Scrapped;
