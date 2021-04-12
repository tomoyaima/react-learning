import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDZrXNzHoWnL6G_TuKmbNTxq5y4iyoHzQs",
    authDomain: "react-learning-e38ca.firebaseapp.com",
    projectId: "react-learning-e38ca",
    storageBucket: "react-learning-e38ca.appspot.com",
    messagingSenderId: "677583241587",
    appId: "1:677583241587:web:0126bd2a783e2b9216c506",
    measurementId: "G-K0QEN7SM9Y"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const db = firebase.firestore();
export default firebase;