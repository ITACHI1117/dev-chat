import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

function ProfilePic() {
  const { profileImg, setImageUpload, upload } = useContext(DataContext);
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
        <div className="profileImgContain1">
          <img src={profileImg} alt="" />
        </div>
        <form>
          <input
            type={"file"}
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
        </form>
        <div className="save">
          <button id="loginBtn" onClick={() => upload()}>
            New Pic
          </button>
          {upload ? (
            <Link className="link" to="/login">
              <button className="button2">Login</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;
