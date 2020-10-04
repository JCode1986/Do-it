import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import firebase from 'firebase'
import Todo from './features/todo/Todo';
import { TodoProvider } from './features/context/TodoContext';
import { AuthContext } from './features/authentication/Auth';
import firebaseApp from './firebase';
import Form from './features/form/Form'
import Home from './features/home/Home'
import NavBar from './features/navbar/NavBar'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import TodoHeader from './features/todo/TodoHeader'
import Login from './features/authentication/Login'
import { AuthProvider } from './features/authentication/Auth';
import PrivateRoute from './features/authentication/PrivateRoute';
import SignUp from './features/authentication/SignUp'
import Footer from './features/footer/Footer'
import CompletedTasks from './features/archives/CompletedTasks'
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const db = firebaseApp.firestore();

function App() {
  //todos start off with empty array in use state
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState(['']);
  const [title, setTitle] = useState(['']);
  const [dateCreated, setDateCreated] = useState([new Date(Date.now())]);
  const [modifiedDate, setModifiedDate] = useState([new Date(Date.now())]);
  const [dateDeadline, setDateDeadline] = useState([new Date(Date.now())]);
  const [priorityLevel, setPriorityLevel] = useState([1]);
  const [archive, setArchive] = useState([]);

  //when app loads, listen to database and fetch new todos as they get added/removed
  useEffect(() => {
    setTitle('');
    setDateDeadline(new Date(Date.now()));
    setDateCreated(new Date(Date.now()));
    setPriorityLevel(1);

    //fires when app loads; take snapshot of database if something changes in 'todos' collection
    //can create collection if it does not exist in snapshot
    //sort by priority level
    //console.log(db.collection('users').doc(app.auth().currentUser.uid), "what is this?")
    db.collection('todos').orderBy('priorityLevel', 'desc').onSnapshot(snapshot => {
    //db.collection('todos').orderBy('priorityLevel', 'desc').onSnapshot(snapshot => {
      //returns object with id, and todo
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, 
        todo: doc.data().todo,
        description: doc.data().description,
        dateCreated: doc.data().dateCreated,
        dateDeadline: doc.data().dateDeadline,
        modifiedDate: doc.data().modifiedDate,
        priorityLevel: doc.data().priorityLevel
      })))
    })
    //dependencies
  }, []);
  
  return (
    <>
    <AuthProvider>
      <TodoProvider>
        <Router>
            <div className="App">
            <NavBar/>
              <PrivateRoute exact path="/" component={Home}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route 
                exact path="/login" component={Login} />
              <Route
                exact path="/form"
                render={(props) => 
                  <Form {...props}
                  setTodos={setTodos}
                  title={title} 
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  dateCreated={dateCreated}
                  setDateCreated={setDateCreated}
                  dateDeadline={dateDeadline}
                  setDateDeadline={setDateDeadline}
                  priorityLevel={priorityLevel}
                  setPriorityLevel={setPriorityLevel}
                  />           
                }
              />
              <Route 
                exact path="/completed-tasks"
                render={(props) =>
                <CompletedTasks {...props}
                  archive={archive}
                  setArchive={setArchive}
                />
                }
              />
              <ToastContainer/>
              <Route 
                exact path="/tasks"
                render={(props) =>
                <TodoHeader {...props}
                  todos={todos}
                />
                }
              />
              {todos.map(todo => (
                <Route
                  key={todo.id}
                  exact path="/tasks"
                  render={(props) =>
                  <Todo {...props}
                    todo={todo}
                    title={title} 
                    description={description}
                    dateCreated={dateCreated}
                    dateDeadline={dateDeadline}
                    setDateDeadline={setDateDeadline}
                    priorityLevel={priorityLevel}
                    setTitle={setTitle}
                    modifiedDate={modifiedDate}
                    setModifiedDate={setModifiedDate}
                    />             
                  }
                />
              ))}
            </div>
          </Router>
          <Footer/>
        </TodoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
