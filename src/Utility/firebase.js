// import { initializeApp } from "firebase/app";
import firebase  from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcnvSds0eWq9CCv6O-qA_VTKAQEwJUa64",
  authDomain: "ae-clone-6be8c.firebaseapp.com",
  projectId: "ae-clone-6be8c",
  storageBucket: "ae-clone-6be8c.firebasestorage.app",
  messagingSenderId: "102375172570",
  appId: "1:102375172570:web:cb1d3d4690adfd183ff8e3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()