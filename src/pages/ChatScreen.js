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
  const messageID = uuidv4();
  const RandomTextID = uuidv4();

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

  function sendMessage() {
    set(reference(database, `messages/${id}-to-${id2}/${messageID}`), {
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
        console.log(error.code);
      });
  }

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `messages/${id}-to-${id2}/`))
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
  }, [senderMessage]);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `messages/${id2}-to-${id}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setReciverMessage(Object.values(snapshot.val()));
        } else {
          console.log(" Reciever No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        // setLoadError(error);
      });
  }, [reciverMessage]);

  const text = [{ m: 1 }, { m: 2 }, { m: 4 }, { m: 3 }];

  // useEffect(() => {
  //   // update user Profile image in firebase realtime database
  //   update(reference(database, `messages/${id}-to-${id2}`), {
  //     senderID: id,
  //     receiverID: id2,
  //     messages: texArray,
  //   })
  //     .then(console.log("saved"))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const dbRef = ref(database);
  //   get(child(dbRef, `messages/${id}-to-${id2}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(Object.values(snapshot.val()));
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // setLoadError(error);
  //     });
  // }, []);
  if (senderMessage === undefined || reciverMessage === undefined) {
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
  reciverMessage.sort((m1, m2) =>
    m1.time < m2.time ? 1 : m1.time > m2.time ? -1 : 0
  );

  return (
    <>
      <div className="chatNoScroll">
        <NavChatScreen chatUserData={chatUserData} />
        <div className="story1">
          <div className="chatArea">
            <div className="columnNormal">
              <p className="p1">game</p>
              <p className="p2">game2</p>
              <p className="p1">game3</p>
              <p className="p2">game4</p>
              <p className="p1">game5</p>
            </div>

            {/* {reciverMessage.map(({ messages, messageID }) => {
              return (
                <div className="reverseBack" key={messageID}>
                  <div className="chatBoxSender">
                    <p>{messages}</p>
                  </div>
                </div>
              );
            })}

            {senderMessage.map(({ messages, messageID }) => {
              return (
                <div className="reverseBack" key={messageID}>
                  <div className="chatBoxReciver">
                    <p>{messages}</p>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
        <TextArea sendMessage={sendMessage} setSenderText={setSenderText} />
      </div>
    </>
  );
}

export default ChatScreen;
