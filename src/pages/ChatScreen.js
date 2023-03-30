import React, { useEffect, useState } from "react";
import { database, reference } from "../firebaeConfig";
import {
  ref,
  child,
  get,
  set,
  serverTimestamp,
  update,
} from "firebase/database";
import { useLoaderData } from "react-router-dom";
import NavChatScreen from "../components/NavChatScreen";
import TextArea from "../components/TextArea";
import { v4 as uuidv4 } from "uuid";

function ChatScreen() {
  // Getinng user id from ChatHome component
  const { id, id2 } = useLoaderData();

  const [chatUserData, setChatUserData] = useState();

  const [senderMessage, setSenderMessage] = useState();
  const [senderText, setSenderText] = useState(" ");
  const [lastmessage, setLastMessage] = useState("");

  const messageID = uuidv4();

  // Gettinng user data from Db
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${id2}`))
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
  }, [chatUserData, id2]);

  function sendMessage() {
    setSenderText(" ");
    set(reference(database, `messages/${messageID}`), {
      senderID: id,
      receiver: id2,
      messages: senderText,
      messageID: messageID,
      time: serverTimestamp(),
    })
      .then(() => {
        setLastMessage(senderText);
        console.log("sent");
        update(reference(database, "messages/lastmessage/"), {
          senderID: id,
          receiver: id2,
          messageID: messageID,
          lastMessage: senderText,
          time: serverTimestamp(),
        })
          .then(console.log("saved"))
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Getting messages from the db
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `messages`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSenderMessage(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        // setLoadError(error);
      });
  }, [chatUserData]);

  //  returing a blank chat arear if there is no messages between the tow users
  if (senderMessage === undefined) {
    return (
      <>
        <div className="chatArea">
          <NavChatScreen chatUserData={chatUserData} />

          <TextArea
            sendMessage={sendMessage}
            setSenderText={setSenderText}
            senderText={senderText}
          />
        </div>
      </>
    );
  }
  //  sorting the messages by the time sent
  senderMessage.sort((m1, m2) =>
    m1.time < m2.time ? 1 : m1.time > m2.time ? -1 : 0
  );

  return (
    <>
      <div className="chatArea">
        <NavChatScreen chatUserData={chatUserData} currentUserID={id} />

        {senderMessage.map((item) => {
          if (item.receiver === id && item.senderID === id2) {
            return (
              <div className="columnNormal" key={item.messageID}>
                <div className="p1">
                  <p className="chatBoxSender">{item.messages}</p>
                </div>
              </div>
            );
          }
          if (item.receiver === id2 && item.senderID === id) {
            return (
              <div className="columnNormal" key={item.messageID}>
                <div className="p2">
                  <p className="chatBoxReciver">{item.messages}</p>
                </div>
              </div>
            );
          }
          return null;
        })}

        <TextArea
          sendMessage={sendMessage}
          setSenderText={setSenderText}
          senderText={senderText}
        />
      </div>
    </>
  );
}

export default ChatScreen;
