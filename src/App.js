import React, { useContext, useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { TodoContext } from './features/context/TodoContext';
import { AuthContext } from './features/authentication/Auth';
import {ToastContainer } from "react-toastify";
import NavBar from './features/navbar/NavBar';
import Form from './features/form/Form';
import Home from './features/home/Home';
import Login from './features/authentication/Login';
import PrivateRoute from './features/authentication/PrivateRoute';
import SignUp from './features/authentication/SignUp';
import Footer from './features/footer/Footer';
import Video from './features/video/Video';

function App() {
  const { isVideoPlaying, setIsVideoPlaying } = useContext(TodoContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if(document.location.pathname === '/do-it') setIsVideoPlaying(true);
  })

  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <ToastContainer />
          <PrivateRoute exact path="/" component={Home} />
          { !currentUser ? <Login/> :  
            <>
              { isVideoPlaying ? <Video /> : null }
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/form" component={Form}/>
            </>
          }
          <Footer/>
        </div>
      </Router>
    </>
  );
}

export default App;
