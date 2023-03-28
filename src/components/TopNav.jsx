import React, { useState, useEffect } from "react";
import { database } from "../firebaeConfig";
import { ref, child, get } from "firebase/database";
import navProfileImg from "../assets/images/avatar.png";

function TopNav({ userIdentify }) {
  const [NavProfilePic, setNavProfilePic] = useState("");

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userIdentify}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNavProfilePic(snapshot.val().profile_picture);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userIdentify]);
  return (
    <nav className="chatHomeNav">
      <h3> Chats</h3>
      <div className="NavImage">
        <img src={NavProfilePic ? NavProfilePic : navProfileImg} alt="" />
      </div>
      <div className="nav2Icons">
        {/*  will add the function later on */}
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          cursor={"pointer"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#0F1828" />
          <path
            d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z"
            fill="#0F1828"
          />
        </svg> */}
      </div>
    </nav>
  );
}

export default TopNav;
