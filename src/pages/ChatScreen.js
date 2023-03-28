import React, { useEffect, useState } from "react";
import { auth, storage, database, db, reference } from "../firebaeConfig";
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
  const [senderText, setSenderText] = useState();
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

  useEffect(() => {
    if (senderMessage === undefined) {
      return;
    }

    senderMessage.map((item) => {
      if (item.receiver) {
        console.log(item.messages);
      } else {
        console.log(item.messages);
      }
    });
  }, []);

  if (senderMessage === undefined) {
    return (
      <>
        <div className="chatNoScroll">
          <NavChatScreen chatUserData={chatUserData} />
          <div className="story1">
            <div className="chatArea">
              {/* <div className="chatBoxSender">
                <p>Naruto will Clap Saitama😅</p>
              </div> */}

              {/* <div className="chatBoxReciver" key={messageID}>
                <p></p>
              </div> */}
            </div>
          </div>
          <TextArea sendMessage={sendMessage} setSenderText={setSenderText} />
        </div>
      </>
    );
  }
  senderMessage.sort((m1, m2) =>
    m1.time < m2.time ? 1 : m1.time > m2.time ? -1 : 0
  );

  return (
    <>
      <div className="chatNoScroll">
        <NavChatScreen chatUserData={chatUserData} />
        <div className="story1">
          <div className="chatArea">
            {senderMessage.map((item) => {
              if (item.receiver === id && item.senderID === id2) {
                return (
                  <>
                    <div className="columnNormal">
                      <div className="p1">
                        <p className="p1" key={item.messageID}>
                          {item.messages}
                        </p>
                      </div>
                    </div>
                  </>
                );
              }
              if (item.receiver === id2 && item.senderID === id) {
                return (
                  <>
                    <div className="columnNormal">
                      <div className="p2">
                        <p className="p1" key={item.messageID}>
                          {item.messages}
                        </p>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
        <TextArea sendMessage={sendMessage} setSenderText={setSenderText} />
      </div>
    </>
  );
}

export default ChatScreen;
