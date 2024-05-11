// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";  // Corrected import statement
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClpUQY4SFU3Rt8RZ9pzZ66zZNpRSH97E0",
  authDomain: "bookbank-2k24.firebaseapp.com",
  projectId: "bookbank-2k24",
  storageBucket: "bookbank-2k24.appspot.com",
  messagingSenderId: "234453823963",
  appId: "1:234453823963:web:3d829a3facc6af439c37fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };