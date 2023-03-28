import React from "react";
import { Link } from "react-router-dom";
import images from "../assets/images/avatar.png";
import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    email,
    password,
    loginError,
    LoginLoading,
    allUsers,
    signIn,
    signed,
    setEmail,
    setPassword,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const [loginUserId, setLoginInUserId] = useState();
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    let userEmail = email;
    if (allUsers === undefined) {
      return;
    } else {
      allUsers.map(({ email, id, profile_picture }) => {
        if (userEmail === email) {
          setProfilePic(profile_picture);
          setLoginInUserId(id);
        }
        return null;
      });
    }
  }, [allUsers, signIn, email]);

  async function redirect() {
    await signed;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate(`/chats/${loginUserId}`, { replace: false });
    });
  }

  if (loginUserId !== undefined) {
    redirect();
  }

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
          <img src={profilePic ? profilePic : images} alt="" />
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
            {!LoginLoading ? (
              "Login"
            ) : (
              // load animation
              <div className="loading">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </button>
        </div>
        <p id="message">{loginError}</p>
      </div>
    </div>
  );
}

export default Login;
