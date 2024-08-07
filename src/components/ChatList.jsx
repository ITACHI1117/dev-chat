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
  // UsersList.map((item) =>{
  //   console.log(item.chats);
  //   const chats = item.chats

  // })
  console.log(UsersList);
  
  // console.log(userIdentify);
  
  return (
    <div className="chatList">
      {UsersList === undefined ? (
        <div>
          <div>
            {LoadError ? (
              console.log(LoadError)
            ) : (
              <div className="ChatListLoader">
                <div className="loading-chat-list">
                  <div className="lds-ring-chat-list">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        UsersList.map(({ connections, chats, id, username, profile_picture }) => {
          // removing the logged in user info from the chat list
          if (userIdentify === id) {
            return null;
          } else {
            // rendering the other users
            return (
              <div onClick={() => redirect(id)} className="oneChat" key={id}>
                <div className="ImageText">
                  <img className="chatImage" src={profile_picture} alt="" />
                  <div className="nameText">
                    <h3>{username}</h3>
                   
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
