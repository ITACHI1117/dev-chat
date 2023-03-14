import React, { useEffect, useState } from "react";

function ChatList({ UsersList, LoadError }) {
  return (
    <div className="chatList">
      {UsersList === undefined ? (
        <p>{LoadError ? LoadError : "Connecting..."}</p>
      ) : (
        UsersList.map(({ id, username, profile_picture }) => {
          return (
            <div className="oneChat" key={id}>
              <div className="ImageText">
                <img className="chatImage" src={profile_picture} />
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
        })
      )}
    </div>
  );
}

export default ChatList;
