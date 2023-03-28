import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function NavChatScreen({ chatUserData, currentUserID }) {
  if (chatUserData === undefined) {
    return console.log("loading");
  }
  return (
    <nav className="nav2">
      <div className="nav2Icons">
        <Link to={`/chats/${currentUserID}`}>
          <svg
            width="10"
            height="14"
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
        <h3>{chatUserData.username}</h3>
      </div>
      <div className="NavImage">
        <img src={chatUserData.profile_picture} alt="" />
      </div>
      <div className="nav2Icons"></div>
    </nav>
  );
}

export default NavChatScreen;
