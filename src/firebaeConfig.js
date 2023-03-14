// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV_m2KDtc0RM7ZuFdNTy0gdduFIUKHRLs",
  authDomain: "dev-chat-9a64c.firebaseapp.com",
  projectId: "dev-chat-9a64c",
  storageBucket: "dev-chat-9a64c.appspot.com",
  messagingSenderId: "419804745609",
  appId: "1:419804745609:web:5455b8f5e9c63710735b58",
  databaseURL: "https://dev-chat-9a64c-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
export { auth, app, database, storage };
