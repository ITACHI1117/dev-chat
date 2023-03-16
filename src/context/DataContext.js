import { createContext, useCallback, useState } from "react";
import { auth, storage, database, reference } from "../firebaeConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { set, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const userId = uuidv4();

  // User State (Would use UseReducer to refactor this code)
  const [userIdentify, setUserIdentify] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  // Login error
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [LoginLoading, setLoginLoading] = useState(false);
  const [signed, setSigned] = useState(false);

  // Upload
  const [uploaded, setUploaded] = useState(false);

  // submit function
  const submit = useCallback(() => {
    setUserIdentify(userId);
    // creating user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // saving user info to the real time database
        set(reference(database, "users/" + userId), {
          id: userId,
          username: username,
          email: email,
          profile_picture: " ",
          phone: phone,
        }).then(() => {
          // setting userIdentify to userId so i can pass the same user id
          // to other functions that may need it
          setUserIdentify(userId);
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
        setLoginLoading(true);

        // ...
      })
      .then(() => {
        setLoginLoading(false);
      })
      .catch((error) => {
        setLoginError(error.code);
        console.log(loginError);
      });
    console.log("login loadinng " + LoginLoading);
  }, [email, password]);

  //   Upload Image function
  function upload() {
    if (imageUpload === null) return;
    // Upload images to firebase Storage
    const imgRef = ref(
      storage,
      `images/usersProfileImg/${userIdentify}/${imageUpload.name + userId}`
    );
    uploadBytes(imgRef, imageUpload)
      .then((snaphost) => {
        // getting the download url for the uploaded image
        getDownloadURL(snaphost.ref).then((url) => {
          setProfileImg(url);
        });
      })
      .then(() => {
        setUploaded(true);
      });
  }

  if (uploaded === true) {
    console.log(userIdentify);
    // update user Profile image in firebase realtime database
    update(reference(database, "users/" + userIdentify), {
      profile_picture: profileImg,
    })
      .then(console.log("saved"))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <DataContext.Provider
      value={{
        // states
        email,
        password,
        user,
        username,
        phone,
        error,
        loginError,
        signed,
        userIdentify,
        imageUpload,
        profileImg,
        LoginLoading,
        setEmail,
        setPhone,
        setUsername,
        setPassword,
        setImageUpload,
        setProfileImg,
        // functions
        submit,
        signIn,
        upload,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
