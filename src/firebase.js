//import firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_7AkR38LdpqZ2PBfIv28mmqPBEjp0M8E",
    authDomain: "react-todo-eb067.firebaseapp.com",
    databaseURL: "https://react-todo-eb067.firebaseio.com",
    projectId: "react-todo-eb067",
    storageBucket: "react-todo-eb067.appspot.com",//
    messagingSenderId: "257611689357",
    appId: "1:257611689357:web:d285278a25a6a36c4fe1c4",
    measurementId: "G-29NN95YC7V"
});

// export const firebaseApp = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// });

export default firebaseApp;

//export const db = firebaseApp.firestore();

//export default db;
