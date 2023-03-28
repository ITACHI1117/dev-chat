import React from "react";
import { Link } from "react-router-dom";
import images from "../assets/images/avatar.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    email,
    password,
    user,
    username,
    phone,
    signUpError,
    setEmail,
    setPassword,
    submit,
    setPhone,
    setUsername,
    SignUpLoading,
  } = useContext(DataContext);

  const navigate = useNavigate();

  async function redirect() {
    await user;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate(`/profile`, { replace: false });
    });
  }

  if (user) {
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
        <img src={images} alt="" />
        <form>
          <input
            type={"text"}
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type={"text"}
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={"tel"}
            placeholder="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
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
          <button onClick={() => submit()}>
            {!SignUpLoading ? (
              "Sign Up"
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

          <p>OR</p>
          <Link className="link" to="/login">
            <p>Login</p>
          </Link>
        </div>
        <p id="message">{signUpError}</p>
      </div>
    </div>
  );
}

export default SignUp;
