import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { database } from "../firebaeConfig";
import { ref, child, get } from "firebase/database";

function Login() {
  const {
    email,
    password,
    loginError,
    LoginLoading,
    userIdentify,
    signIn,
    profileImg,
    signed,
    setEmail,
    setPassword,
  } = useContext(DataContext);

  // Line 20-72  trying to get user Id and pass it to the chats
  // page when user logs in

  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();
  const [logInMail, setLoginMail] = useState("");
  const [loginUserId, setLoginInUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [profilePic, setProfilePic] = useState();

  function logMail() {
    console.log(logInMail);
    console.log(email);
  }

  useEffect(() => {
    if (signed === false) {
      return;
    } else if (signed === true) {
      // getting all users
      const dbRef = ref(database);
      get(child(dbRef, `users/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setAllUsers(Object.values(snapshot.val()));
            console.log(Object.values(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })

        .catch((error) => {
          console.log(error);
          setLoadError(error);
        });
    }
  }, [signed]);
  // console.log(signed);

  // console.log(email);

  useEffect(() => {
    let userEmail = email;
    if (allUsers === undefined) {
      return;
    } else {
      console.log("done");
      allUsers.map(({ email, id, profile_picture }) => {
        if (userEmail === email) {
          setProfilePic(profile_picture);
          console.log(id);
        }
      });
    }
  }, [allUsers, signIn]);

  // useEffect(() => {
  //   if (logInMail == email) {
  //     console.log(logInMail);
  //     console.log(email);
  //     console.log(userId);
  //   } else {
  //     logMail();
  //     console.log("nope");
  //   }
  // }, [logInMail]);
  // console.log(userIdentify);
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
            <Link className="link" to="/chats">
              <button className="button2">Chats</button>
            </Link>
          ) : (
            " "
          )}
        </div>
        <p id="message">{loginError}</p>
        <p>{loginUserId}</p>
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
