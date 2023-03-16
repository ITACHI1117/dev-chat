import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

function Login() {
  const {
    email,
    password,
    loginError,
    LoginLoading,
    allUsers,
    signIn,
    profileImg,
    signed,
    setEmail,
    setPassword,
  } = useContext(DataContext);

  // Line 20-72  trying to get user Id and pass it to the chats
  // page when user logs in

  const [loginUserId, setLoginInUserId] = useState("");
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    let userEmail = email;
    if (allUsers === undefined) {
      return;
    } else {
      console.log("done");
      allUsers.map(({ email, id, profile_picture }) => {
        if (userEmail === email) {
          setProfilePic(profile_picture);
          setLoginInUserId(id);
          console.log(id);
        }
      });
    }
  }, [allUsers, signIn]);

  // console.log(loginUserId);

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
        <div className="profileImgContain1">
          <img src={profileImg || profilePic} alt="" />
        </div>
        <form>
          <input
            type={"text"}
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={"password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="save">
          <button id="loginBtn" onClick={() => signIn()}>
            Login
          </button>
          {signed ? (
            <Link className="link" to={`/chats/${loginUserId}`}>
              <button className="button2">Chats</button>
            </Link>
          ) : (
            " "
          )}
        </div>
        <p id="message">{loginError}</p>

        {LoginLoading ? <p>Loading</p> : " "}
      </div>
    </div>
  );
}

// {signed
//   ? (window.location.href = "/chats")
//   : // <Link className="link" to="/chats">
//     //   <button className="button2">Chats</button>
//     // </Link>
//     ""}

export default Login;
