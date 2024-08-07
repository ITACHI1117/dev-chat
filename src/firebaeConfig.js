// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV_m2KDtc0RM7ZuFdNTy0gdduFIUKHRLs",
  authDomain: "dev-chat-9a64c.firebaseapp.com",
  databaseURL: "https://dev-chat-9a64c-default-rtdb.firebaseio.com",
  projectId: "dev-chat-9a64c",
  storageBucket: "dev-chat-9a64c.appspot.com",
  messagingSenderId: "419804745609",
  appId: "1:419804745609:web:5455b8f5e9c63710735b58"
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);
const reference = ref;
export { auth, app, database, storage, db, reference };
