import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import images from "../assets/images/avatar.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";

function SignUp() {
  const { email, password, user, error, setEmail, setPassword, submit } =
    useContext(DataContext);

  return (
    <div>
      <nav className="nav1">
        <Link to="/">
          <svg
            width="10"
            height="19"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.288002 7.00001L6.298 13.01L7.712 11.596L3.112 6.99601L7.712 2.39601L6.298 0.990005L0.288002 7.00001Z"
              fill="#0F1828"
            />
          </svg>
        </Link>
        <h3>Your Profile</h3>
      </nav>
      <div className="profile">
        <img src={images} alt="" />
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="save">
          {!user ? (
            <button onClick={() => submit()}>Sign Up</button>
          ) : (
            <Link className="link" to="/userInfo">
              <button className="button2">LogIn</button>
            </Link>
          )}
        </div>
        <p>{error ? error : ""}</p>
      </div>
    </div>
  );
}

export default SignUp;
