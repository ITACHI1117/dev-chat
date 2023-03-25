import React, { useEffect, useState } from "react";
import { database } from "../firebaeConfig";
import { ref, child, get } from "firebase/database";
import { useLoaderData } from "react-router-dom";
import NavChatScreen from "../components/NavChatScreen";
import TextArea from "../components/TextArea";

function ChatScreen() {
  // Getinng user id from ChatHome component
  const id = useLoaderData();
  const [chatUserData, setChatUserData] = useState();

  // Gettinng user data from Db
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setChatUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        // setLoadError(error);
      });
  }, [chatUserData]);

  return (
    <>
      <div className="chatNoScroll">
        <NavChatScreen chatUserData={chatUserData} />
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
        <TextArea chatUserData={chatUserData} />
      </div>
    </>
  );
}

export default ChatScreen;
