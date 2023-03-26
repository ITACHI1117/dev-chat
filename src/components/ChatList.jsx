import React from "react";
import { useNavigate } from "react-router-dom";

function ChatList({ UsersList, LoadError, userIdentify }) {
  const navigate = useNavigate();

  async function redirect(id) {
    await id;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate(`/chatScreen/${userIdentify}/${id}`, { replace: false });
    });
  }

  return (
    <div className="chatList">
      {UsersList === undefined ? (
        <p>{LoadError ? LoadError : "Connecting..."}</p>
      ) : (
        UsersList.map(({ connections, id, username, profile_picture }) => {
          // removing the logged in user info from the chat list
          if (userIdentify === id) {
            return;
          } else {
            // rendering the other users
            return (
              <div onClick={() => redirect(id)} className="oneChat" key={id}>
                <div className="ImageText">
                  <img className="chatImage" src={profile_picture} alt="" />
                  <div className="nameText">
                    <h3>{username}</h3>
                    <p></p>
                  </div>
                </div>
                <div className="dateText">
                  {/* <small>Unread 1</small> */}
                  {connections ? (
                    <div className="smallBox"></div>
                  ) : (
                    <div className="smallBox2"></div>
                  )}
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
