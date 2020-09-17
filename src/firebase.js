import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_7AkR38LdpqZ2PBfIv28mmqPBEjp0M8E",
    authDomain: "react-todo-eb067.firebaseapp.com",
    databaseURL: "https://react-todo-eb067.firebaseio.com",
    projectId: "react-todo-eb067",
    storageBucket: "react-todo-eb067.appspot.com",
    messagingSenderId: "257611689357",
    appId: "1:257611689357:web:d285278a25a6a36c4fe1c4",
    measurementId: "G-29NN95YC7V"
});

const db = firebaseApp.firestore();

export default db;
