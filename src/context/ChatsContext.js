import { createContext, useCallback, useState, useEffect } from "react";

import { database } from "../firebaeConfig";
import { ref, child, get } from "firebase/database";
import { useLoaderData } from "react-router-dom";

const ChatContext = createContext({});

export const DataProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();
  const game = "gameds";

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
  }, [allUsers]);

  return (
    <ChatContext.Provider
      value={{
        LoadError,
        allUsers,
        game,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
