import React, { useState, useEffect, useContext } from 'react';
import { TodoProvider } from './features/context/TodoContext';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import { AuthContext } from './features/authentication/Auth';
import {ToastContainer } from "react-toastify";
import './App.css';
import TodoList from './features/todo/TodoList';
import firebaseApp from './firebase';
import Form from './features/form/Form'
import Home from './features/home/Home'
import NavBar from './features/navbar/NavBar'
import TodoHeader from './features/todo/TodoHeader'
import Login from './features/authentication/Login'
import PrivateRoute from './features/authentication/PrivateRoute';
import SignUp from './features/authentication/SignUp'
import Footer from './features/footer/Footer'
import CompletedTasks from './features/archives/CompletedTasks'
import "react-toastify/dist/ReactToastify.css"

const db = firebaseApp.firestore();

function App() {

  const { currentUser } = useContext(AuthContext)

  const [todos, setTodos] = useState([]);
  const [archive, setArchive] = useState([]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [dateCreated, setDateCreated] = useState(new Date(Date.now()));
  const [dateDeadline, setDateDeadline] = useState(new Date(Date.now()));
  const [priorityLevel, setPriorityLevel] = useState(1);

  useEffect(() => {
    
  }, [currentUser])
    //when app loads, listen to database and fetch new todos as they get added/removed
  useEffect(() => {  
    //fires when app loads; take snapshot of database if something changes in 'todos' collection
    //can create collection if it does not exist in snapshot
    //sort by priority level
    db.collection('todos').orderBy('priorityLevel', 'desc').onSnapshot(snapshot => {
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
      <TodoProvider>
        <Router>
            <div className="App">
            <NavBar />
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
                  <TodoList {...props}
                    todo={todo}
                    />             
                  }
                />
              ))}
            </div>
          </Router>
          <Footer/>
        </TodoProvider>
    </>
  );
}

export default App;
