import { createContext, useCallback, useState } from "react";
import { auth } from "../firebaeConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // User State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  // Login error
  const [error, setError] = useState("");

  // submit function
  const submit = useCallback(() => {
    // creating user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // ...
      })
      .catch((error) => {
        setError(error.code);
      });
  }, [email, password]);

  return (
    <DataContext.Provider
      value={{ email, password, user, error, setEmail, setPassword, submit }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
