import React, { useEffect, useState } from "react";
import { database, reference } from "../firebaeConfig";
import { ref, child, get, set, serverTimestamp } from "firebase/database";
import { useLoaderData } from "react-router-dom";
import NavChatScreen from "../components/NavChatScreen";
import TextArea from "../components/TextArea";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function ChatScreen() {
  // Getinng user id from ChatHome component
  const { id, id2 } = useLoaderData();

  const [chatUserData, setChatUserData] = useState();
  const [messages, setMessages] = useState();
  const [senderMessage, setSenderMessage] = useState();
  const [reciverMessage, setReciverMessage] = useState();
  const [senderText, setSenderText] = useState(" ");
  const [getmessageID, setGetMessageID] = useState();

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
  }, [chatUserData]);

  useEffect(() => {
    // getmessageID.map(({ messageID }) => {
    //   setMessages(messageID);
    // });
  }, []);

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
        console.log("sent");
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
