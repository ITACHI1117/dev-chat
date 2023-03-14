import React from "react";
import { Link } from "react-router-dom";
import images from "../assets/images/Illustration.png";

function Welcome() {
  return (
    <div className="contain">
      <img src={images} alt="not found" />
      <h2>
        Connect easily with <br />
        your family and friends <br /> over countries
      </h2>
      <div className="buttons">
        <button className="btn1">Terms & Privacy Policy</button>
        <Link className="link" to="/profile">
          <button className="btn2" onClick={() => next()}>
            Start
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
