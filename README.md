# ReacToDo

## Web Application

## Tools
* [Visual Studio Code](https://code.visualstudio.com/)
* [React.js](https://reactjs.org/docs/hello-world.html)
    * [Material-UI](npm install @material-ui/core)
* [Firebase](https://firebase.google.com/)

---

## Versions
* Node - v12.18.3
---

## Useful react commands
* `npm start` - starts react app

## Useful firebase commands / setting up
* `firebase login` - login to firebase
* Create a `firebase.js` file
* Copy config in project on firebase, and paste in `firebase.js`
```
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    //paste config (key for firebase/backend) here
});

//connecting to firestore; store in variable name db
const db = firebaseApp.firestore();

//can be accessed through any file in project by importing
export { db };
```
* `npm i firebase` - add all firebase dependencies to project

* Create database in google firebase; develop -> cloud firestore -> create database
 
---

## Pages

---
### Resources
* [Youtube - Clever Programmer](https://www.youtube.com/watch?v=VqgTr-nd7Cg&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=2&t=9057s)
