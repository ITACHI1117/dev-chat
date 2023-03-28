import ChatList from "../components/ChatList";
// import Search from "../components/Search";
import TopNav from "../components/TopNav";
import React, { useEffect, useState } from "react";
import { database } from "../firebaeConfig";
import {
  ref,
  child,
  get,
  serverTimestamp,
  set,
  push,
  onDisconnect,
  onValue,
} from "firebase/database";
import { useLoaderData } from "react-router-dom";
// import BottomNav from "../components/BottomNav";

function ChatHome() {
  const userIdentify = useLoaderData();

  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllUsers(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadError(error);
      });
  }, [allUsers]);

  useEffect(() => {
    const myConnectionsRef = ref(database, `users/${userIdentify}/connections`);

    // stores the timestamp of my last disconnect (the last time I was seen online)
    const lastOnlineRef = ref(database, `users/${userIdentify}/lastOnline`);

    const connectedRef = ref(database, ".info/connected");
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        const con = push(myConnectionsRef);

        // When I disconnect, remove this device
        onDisconnect(con).remove();

        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        set(con, true);

        // When I disconnect, update the last time I was seen online
        onDisconnect(lastOnlineRef).set(serverTimestamp());
      }
    });
  }, [userIdentify]);

  return (
    <div className="noScroll">
      <div className="chatContainer">
        <TopNav userIdentify={userIdentify} />
        {/* <Status /> */}
        {/* <Search /> */}
        <ChatList
          UsersList={allUsers}
          LoadError={LoadError}
          userIdentify={userIdentify}
        />
        {/* <BottomNav /> */}
      </div>
    </div>
  );
}

export default ChatHome;
