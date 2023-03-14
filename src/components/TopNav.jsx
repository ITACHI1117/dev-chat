import React from "react";

function TopNav() {
  return (
    <nav>
      <h3>Chats</h3>
      <div className="nav2Icons">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#0F1828" />
          <path
            d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z"
            fill="#0F1828"
          />
        </svg>
        <svg
          width="20"
          height="13"
          viewBox="0 0 20 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 12.411L10.3 9.711L11.714 8.295L13 9.583L18.008 4.583L19.419 6L13 12.41V12.411ZM9 10H0V8H9V10ZM13 6H0V4H13V6ZM13 2H0V0H13V2Z"
            fill="#0F1828"
          />
        </svg>
      </div>
    </nav>
  );
}

export default TopNav;
