import { createContext, useCallback, useState, useEffect } from "react";
import { auth, database } from "../firebaeConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const userId = uuidv4();

  // User State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [phone, setPhone] = useState("");
  // Login error
  const [error, setError] = useState("");

  // submit function
  const submit = useCallback(() => {
    // creating user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        set(ref(database, "users/" + userId), {
          username: username,
          email: email,
          profile_picture: imageUrl,
          phone: phone,
        });
      })
      .catch((error) => {
        setError(error.code);
      });
  }, [email, password]);

  return (
    <DataContext.Provider
      value={{
        email,
        password,
        user,
        username,
        phone,
        imageUrl,
        error,
        setEmail,
        setPhone,
        setImgUrl,
        setUsername,
        setPassword,
        submit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
