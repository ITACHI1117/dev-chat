import React, { useEffect, useState } from "react";
import { database,reference } from "../firebaeConfig";
import {
  ref,
  child,
  get,
  set,
  serverTimestamp,
  update,
  onValue
} from "firebase/database";
import { useLoaderData } from "react-router-dom";
import NavChatScreen from "../components/NavChatScreen";
import TextArea from "../components/TextArea";
import { v4 as uuidv4 } from "uuid";

function ChatScreen() {
  const { id, id2 } = useLoaderData();
  const [chatUserData, setChatUserData] = useState();
  const [senderMessage, setSenderMessage] = useState([]);
  const [allMessages, setAllMessages] = useState([])
  const [senderText, setSenderText] = useState("");
  const [ChatID, setChatID] = useState()

  const messageID = uuidv4();

  // disabling zoom
  useEffect(() =>{
    const metaTag = document.querySelector('meta[name="viewport"]');
    if (metaTag) {
        metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = "viewport";
        newMetaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(newMetaTag);
    }
  })

  

  // Getting user data from DB
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${id2}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setChatUserData(snapshot.val());
        } else {
          // console.log("No data available");
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [id2]);

  // const chatID = 112233

  // getting Chat ID
  useEffect(() =>{
    const fetchChatID = async () => {
      const dbRef = ref(database);
      const chatIDRef1 = child(dbRef, `users/${id}/chats/${id2}`);
      const chatIDRef2 = child(dbRef, `users/${id2}/chats/${id}`);
      
      const chatIDSnapshot1 = await get(chatIDRef1);
      const chatIDSnapshot2 = await get(chatIDRef2);

      if (chatIDSnapshot1.exists()) {
        setChatID(chatIDSnapshot1.val());
      } else if (chatIDSnapshot2.exists()) {
        setChatID(chatIDSnapshot2.val());
      } else {
        const newChatID = uuidv4();
        await set(chatIDRef1, newChatID);
        await set(chatIDRef2, newChatID);
        setChatID(newChatID);
      }
    };

    fetchChatID().catch(console.error);
  },[id, id2])

  
  
  // useEffect(() =>{
  //   console.log(chatUserData);
  //   console.log(id,id2);
    
  // })

  function generateMessagesID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

const findLatestMessage = (allMessages) => {
  if (allMessages.length === 0) return null; // Handle empty array

  let latestMessage = allMessages[0];

  allMessages.forEach((item) => {
      if (item.time > latestMessage.time) {
          latestMessage = item;
      }
  });
  // console.log(new Date(latestMessage.time).toLocaleString());
  // console.log(latestMessage);
  
  return latestMessage  // Convert to readable format
};

const lattestMessage = findLatestMessage(allMessages);

  // Function to send a message
  function sendMessage() {
    // const messagesID = generateMessagesID(10)

    const newMessage = {
      senderID: id,
      receiver: id2,
      messages: senderText,
      messageID: messageID,
      time: serverTimestamp(),
    };

    const members = {
      User1: id,
      User2: id2
    }
    set(reference(database, `chats/${ChatID}/members/`), members)
      .then(() => {
        setSenderText("");
        update(reference(database, `chats/${ChatID}/messages/${messageID}`), {
          ...newMessage,
        }).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      }).then(() =>{
        const dbRef = ref(database);


        const chatIDRef1 = child(dbRef, `users/${id}/chats/lastmessage/${id}`);
        const chatIDRef2 = child(dbRef, `users/${id2}/chats/lastmessage/${id2}`);
        set(chatIDRef1, newMessage);
        set(chatIDRef2, newMessage);
      })
  }

  console.log(ChatID);
  

  // Getting messages from the DB
  useEffect(() => {

    // get ChatID from user database
    const dbRef = ref(database);
    get(child(dbRef, `users/${id}/chats/${id2}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setChatID(snapshot.val())
          
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      })
  
    // const dbRef = ref(database);
    // const dbRef = ref(database, `chats/${ChatID}/messages`);
    // console.log(ChatID);
    
    const DBRef = ref(database, `chats/${ChatID}/messages`);
  onValue(DBRef, (snapshot) => {
    if (snapshot.exists()) {
      const allMessages = Object.values(snapshot.val());
      const relevantMessages = allMessages.filter(
        (msg) =>
          (msg.senderID === id && msg.receiver === id2) ||
          (msg.senderID === id2 && msg.receiver === id)
      );
      setSenderMessage(relevantMessages);
      setAllMessages(allMessages)
    } else {
      // console.log("No messages");
    }
  });
  }, [id, id2,ChatID]);

  // Sorting the messages by time sent
  senderMessage.sort((m1, m2) => (m1.time < m2.time ? -1 : 1));
  allMessages.sort((m1, m2) => (m1.time < m2.time ? -1 : 1));
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // This will give you a readable date string
};
const blockScrolling = () => {
  document.body.classList.add('no-scroll');
};

 
// blockScrolling()
  return (
    <div className="chatArea">
      <NavChatScreen chatUserData={chatUserData} currentUserID={id} />
      <div className="messagesContainer">
      {allMessages.map((item) => (
        <div className="columnNormal" key={item.messageID}>
          <div className={item.senderID === id ? "p2" : "p1"}>
            <div className={item.senderID === id ? "chatBoxReceiver" : "chatBoxSender"}>
              <p>{item.messages}</p>
              {/* <span className="chatTime">{formatTimestamp(item.time)}</span>
              <span className="chatTime">{lattestMessage.messages}</span> */}
            </div>
            <span></span>
          </div>
        </div>
      ))}
      </div>
      
      <TextArea
        sendMessage={sendMessage}
        setSenderText={setSenderText}
        senderText={senderText}
      />
    </div>
  );
}

export default ChatScreen;
