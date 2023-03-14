import images from "../assets/images/avatar.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaeConfig";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

function ProfilePic() {
  const { userId } = useContext(DataContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  function upload() {
    if (imageUpload === null) return;
    const imgRef = ref(
      storage,
      `images/usersProfileImg/${userId}/${imageUpload.name}`
    );
    uploadBytes(imgRef, imageUpload).then((snaphost) => {
      getDownloadURL(snaphost.ref).then((url) => {
        setProfileImg(url);
      });
    });
    console.log(imageUpload.name);
  }
  console.log(userId);

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
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;
