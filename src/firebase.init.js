// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPr3Qpit3E88rqgYXoLjr6W4jOyB0KNBo",
  authDomain: "doctors-portal-80dc5.firebaseapp.com",
  projectId: "doctors-portal-80dc5",
  storageBucket: "doctors-portal-80dc5.appspot.com",
  messagingSenderId: "1009018594181",
  appId: "1:1009018594181:web:3661c9f636e55e2c1e1aec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;

