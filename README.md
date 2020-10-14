# ReacToDo

## Web Application
- Application which a user can login, and create a task, activity. User can also enter a deadline with optional details.
- User will have the ability to update or delete specific tasks.
- Once task is completed, this will be saved in an archived section which the user will have access to.

* [Deployed Site](https://react-todo-eb067.web.app)

## Tools
* [Visual Studio Code](https://code.visualstudio.com/) - IDE
* [React.js](https://reactjs.org/docs/hello-world.html) - Front end
    * [Material-UI](https://material-ui.com/)
    * [React-Toastify](https://www.npmjs.com/package/react-toastify)
    * [React-Tippy](https://github.com/tvkhoa/react-tippy)
* [Firebase](https://firebase.google.com/) - Back end & Host

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
    * To find config in google firebase go to your project -> settings icon -> project settings -> scroll down to `firebase sdk snippet` -> click config
```
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    //paste config (key for firebase/backend) here
});

//connecting to firestore; store in variable name db
const db = firebaseApp.firestore();

//can be accessed through any file in project by importing
export default db;
```
* `npm i firebase` - add all firebase dependencies to project

* Create database in google firebase; develop -> cloud firestore -> create database

### Firebase deployment
* `firebase init` in terminal - initialize firebase project
* Select Hosting by pressing space bar
* Select existing project then press enter
* Type `build` when prompted `What do you want to use as your public directory?`
* Pick yes
* `yarn build` or `npm run build` - should create a build folder
* `firebase deploy`
* To update deployed website simply re-run `yarn build` or `npm run build` and re-deploy with `firebase deploy`

## Firebase authentication setup
* [Youtube - Maksim Ivanov](https://www.youtube.com/watch?v=unr4s3jd9qA)
* [Handling User Authentication](https://blog.logrocket.com/user-authentication-firebase-react-apps/)

## Firebase OAuth setup
* [Youtube - lingonsaft](https://www.youtube.com/watch?v=zq0TuNqV0Ew)
* [Github docs](https://github.com/firebase/firebaseui-web-react)
---

## Pages
* Home - `/home`
* Login - `/login`
* Signup - `/signup`
* Create - `/form`
* Tasks - `/tasks`
* Archive - `/completed-tasks`
---
### Resources
* [Youtube - Clever Programmer](https://www.youtube.com/watch?v=VqgTr-nd7Cg&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=2&t=9057s)
* [Login Template](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js)
* [Do it Video](https://www.youtube.com/watch?v=ZXsQAXx_ao0)
