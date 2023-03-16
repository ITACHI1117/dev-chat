import React from "react";

function ChatList({ UsersList, LoadError, userIdentify }) {
  return (
    <div className="chatList">
      {UsersList === undefined ? (
        <p>{LoadError ? LoadError : "Connecting..."}</p>
      ) : (
        UsersList.map(({ id, username, profile_picture }) => {
          if (userIdentify === id) {
            return;
          } else {
            return (
              <div className="oneChat" key={id}>
                <div className="ImageText">
                  <img className="chatImage" src={profile_picture} alt="" />
                  <div className="nameText">
                    <h3>{username}</h3>
                    <p>lastMsg</p>
                  </div>
                </div>
                <div className="dateText">
                  <small>lastSeen</small>
                  <div className="smallBox">
                    <p>unread</p>
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
}

export default ChatList;
