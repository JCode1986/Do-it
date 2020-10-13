import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer } from "react-toastify";
import './App.css';
import Form from './features/form/Form'
import Home from './features/home/Home'
import NavBar from './features/navbar/NavBar'
import Login from './features/authentication/Login'
import CompletedTasks from './features/archives/CompletedTasks';
import PrivateRoute from './features/authentication/PrivateRoute';
import SignUp from './features/authentication/SignUp'
import Footer from './features/footer/Footer'
import "react-toastify/dist/ReactToastify.css"
import TodoList from './features/todo/TodoList';

function App() {
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
            <Route exact path="/completed-tasks" component={CompletedTasks} /> 
          </div>
        </Router>
        <Footer/>
    </>
  );
}

export default App;
