// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import{getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY4LBTV1k4khWpMuCqKkofAWAWc_SJ9xk",
  authDomain: "foodie-3f869.firebaseapp.com",
  projectId: "foodie-3f869",
  storageBucket: "foodie-3f869.appspot.com",
  messagingSenderId: "896345702731",
  appId: "1:896345702731:web:e9c3dc5722f39d035968ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
export {db,storage};