import { createContext, useCallback, useState, useEffect } from "react";
import { auth, database } from "../firebaeConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  const [loginError, setLoginError] = useState("");
  const [signed, setSigned] = useState(false);

  // submit function
  const submit = useCallback(() => {
    // creating user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // saving user info to the real time database
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

  //   login Function
  const signIn = useCallback(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setSigned(true);

        // ...
      })
      .catch((error) => {
        setLoginError(error.code);
        console.log(loginError);
      });
  }, [email, password]);

  return (
    <DataContext.Provider
      value={{
        // state
        email,
        password,
        user,
        username,
        phone,
        imageUrl,
        error,
        loginError,
        signed,
        setEmail,
        setPhone,
        setImgUrl,
        setUsername,
        setPassword,
        // functions
        submit,
        signIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
