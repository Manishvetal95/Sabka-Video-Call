import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Landing() {
  return (
    <div className="landingPageContainer">

      <nav>
        <div className="navHeader">
          <h2>Apan Video Call</h2>
        </div>

        <div className="navList">
          <p>Join As Guest</p>
          <p>Register</p>

          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">

        {/* LEFT SIDE */}
        <div className="landingText">
          <h1>
            <span style={{ color: "#FF9831" }}>Connect</span>{" "}
            with your Loved Ones
          </h1>

          <p>Cover a distance by Apna Video Call</p>

          <div role="button" className="getStarted">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="landingImage">
          <img src="/mobile.png" alt="Video Call" />
        </div>

      </div>

    </div>
  );
}