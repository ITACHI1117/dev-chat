import ChatList from "../components/ChatList";
import Search from "../components/Search";
import TopNav from "../components/TopNav";
import React, { useEffect, useState } from "react";
import { database } from "../firebaeConfig";
import {
  ref,
  child,
  get,
  serverTimestamp,
  set,
  update,
  push,
  onDisconnect,
  onValue,
} from "firebase/database";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useLoaderData } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function ChatHome() {
  const { email } = useContext(DataContext);

  const userIdentify = useLoaderData();

  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();
  const [online, setOnline] = useState();
  const [offline, setOffline] = useState();
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
        console.log(error);
        setLoadError(error);
      });
  }, []);

  // useEffect(() => {
  //   allUsers
  //     ? allUsers.map(({ email, connections }) => {
  //         connections
  //           ? console.log(email + " online")
  //           : console.log(email + "offline");
  //       })
  //     : console.log(undefined);
  // }, [allUsers]);
  // console.log(online);
  // console.log(offline);
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
  });

  return (
    <div className="noScroll">
      <div className="chatContainer">
        <TopNav userIdentify={userIdentify} />
        {/* <Status /> */}
        <Search />
        <ChatList
          UsersList={allUsers}
          LoadError={LoadError}
          userIdentify={userIdentify}
          ActiveStatus={online}
        />
        <BottomNav />
      </div>
    </div>
  );
}

export default ChatHome;
