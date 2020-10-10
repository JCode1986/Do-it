import React, { useState, useEffect, useContext } from 'react';
import { TodoContext } from './features/context/TodoContext';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import { AuthContext } from './features/authentication/Auth';
import {ToastContainer } from "react-toastify";
import './App.css';
import Todo from './features/todo/Todo';
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
import TodoList from './features/todo/TodoList';

function App() {

  const { todos } = useContext(TodoContext);
    
  return (
    <>
      <Router>
          <div className="App">
          <NavBar />
          <ToastContainer/>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/tasks" component={TodoList} />
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/form" component={Form}/>

          {/* <Route 
            exact path="/completed-tasks"
            render={(props) =>
            <CompletedTasks {...props}
              archive={archive}
              setArchive={setArchive}
            />
            }
          />  */}
          </div>
        </Router>
        <Footer/>
    </>
  );
}

export default App;
