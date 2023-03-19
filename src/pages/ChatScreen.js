import React from "react";
import { Link } from "react-router-dom";

function ChatScreen() {
  return (
    <>
      <div className="chatNoScroll">
        <nav className="nav2">
          <div className="nav2Icons">
            <Link to="/chats">
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
            <h3>Anime Guru</h3>
          </div>
          <div className="nav2Icons"></div>
        </nav>

        <div className="story1">
          <div className="chatArea">
            <div className="chatBoxSender">
              <p>Naruto will Clap Saitama😅</p>
            </div>
            <div className="chatBoxReciver">
              <p>Who will win i a battle Naruto vs satima</p>
            </div>
          </div>
        </div>

        <div className="textArea">
          <div className="inputsIcons">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM13 17H11V13H7V11H11V7H13V11H17V13H13V17Z"
                fill="#0F1828"
              />
            </svg>

            <form>
              <input type="text" placeholder="Type here..." />
            </form>
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7825 3.21751C20.6813 3.11677 20.5534 3.04701 20.4139 3.01646C20.2744 2.9859 20.1291 2.9958 19.995 3.04501L3.495 9.04501C3.3527 9.09898 3.23019 9.19497 3.14374 9.32023C3.05729 9.44548 3.01099 9.59407 3.01099 9.74626C3.01099 9.89845 3.05729 10.047 3.14374 10.1723C3.23019 10.2975 3.3527 10.3935 3.495 10.4475L9.9375 13.02L14.6925 8.25001L15.75 9.30751L10.9725 14.085L13.5525 20.5275C13.6081 20.6671 13.7043 20.7867 13.8286 20.8709C13.953 20.9552 14.0998 21.0002 14.25 21C14.4016 20.9969 14.5486 20.9479 14.6718 20.8596C14.795 20.7712 14.8885 20.6476 14.94 20.505L20.94 4.00501C20.9911 3.87232 21.0034 3.72783 20.9755 3.5884C20.9477 3.44897 20.8807 3.32034 20.7825 3.21751Z"
                fill="#002DE3"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatScreen;
