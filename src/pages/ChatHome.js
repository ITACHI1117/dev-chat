import ChatList from "../components/ChatList";
import Search from "../components/Search";
import TopNav from "../components/TopNav";
import React, { useEffect, useState } from "react";
import { database } from "../firebaeConfig";
import { ref, child, get } from "firebase/database";

function ChatHome() {
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
        console.log(error);
        setLoadError(error);
      });
  }, []);

  return (
    <div className="noScroll">
      <div className="chatContainer">
        <TopNav />
        {/* <Status /> */}
        <Search />
        <ChatList UsersList={allUsers} LoadError={LoadError} />
      </div>
    </div>
  );
}

export default ChatHome;
