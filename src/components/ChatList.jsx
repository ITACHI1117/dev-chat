import React, { useEffect, useState } from "react";
import { chats } from "../data";
// import { getDatabase, ref, child, get } from "firebase/database";
import { storage } from "../firebaeConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import avatar from "../assets/images/avatar.png";

function ChatList() {
  const [imageUpload, setImageUpload] = useState(null);

  // Create a storage reference from our storage service
  const imageListRef = ref(storage, "images/");
  function upload() {
    if (imageUpload === null) return;
    const imgRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imgRef, imageUpload).then(() => {
      console.log("uploaded");
    });
    console.log(imageUpload.name);
  }

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.map((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url);
        });
      });
    });
  });

  //   useEffect(() => {
  //     const dbRef = ref(getDatabase());
  //     get(child(dbRef, `users/`))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           setUsers(snapshot.val());
  //           console.log(snapshot.val());
  //         } else {
  //           console.log("No data available");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  return (
    <div className="chatList">
      {chats.map(({ id, name, img, lastMsg, lastSeen, unread }) => {
        return (
          <div className="oneChat" key={id} onClick={() => (unread += 1)}>
            <div className="ImageText">
              <img className="chatImage" src={img} />
              <div className="nameText">
                <h3>{name}</h3>
                <p>{lastMsg}</p>
              </div>
            </div>
            <div className="dateText">
              <small>{lastSeen}</small>
              <div className="smallBox">
                <p>{unread}</p>
              </div>
            </div>
          </div>
        );
      })}
      <form></form>
      <button onClick={() => upload()}>sumbit</button>
    </div>
  );
}

export default ChatList;
