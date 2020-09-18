import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './features/todo/Todo';
import db from './firebase';
import Form from './features/form/Form'
import Home from './features/home/Home'
import NavBar from './features/navbar/NavBar'
import {Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  
  //date conversion from https://stackoverflow.com/questions/14638018/current-time-formatting-with-javascript
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let d = new Date(); 
  let day = days[d.getDay()];
  let hr = d.getHours();
  let min = d.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  let ampm = "am";
  
  if( hr > 12 ) {
    hr -= 12;
  }
  
  ampm = "pm";

  let getDate = d.getDate();
  let getMonth = months[d.getMonth()];
  let getYear = d.getFullYear();

  let dateAndTimeNow = day + " " + hr + ":" + min + ampm + " " + getDate + " " + getMonth + " " + getYear;

  //todos start off with empty array in use state
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState(['']);
  const [title, setTitle] = useState(['']);
  const [date, setDate] = useState([dateAndTimeNow]);
  const [dateDeadline, setDateDeadline] = useState(Date.now());
  const [timeDeadline, setTimeDeadline] = useState(Date.now());
  const [priorityLevel, setPriorityLevel] = useState(1);

  //when app loads, listen to database and fetch new todos as they get added/removed
  useEffect(() => {
    setTitle('');
    //fires when app loads; take snapshot of database if something changes in 'todos' collection
    //can create collection if it does not exist in snapshot
    db.collection('todos').orderBy('timestamp', 'desc') .onSnapshot(snapshot => {
      //returns object with id, and todo
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, 
        todo: doc.data().todo,
        description: doc.data().description,
        date: doc.data().date,
        dateDeadline: doc.data().dateDeadline,
        timeDeadline: doc.data().timeDeadline,
        priorityLevel: doc.data().priorityLevel
      })))
    })
    //dependencies
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={Home}/>
          <Form 
            title={title} 
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            dateDeadline={dateDeadline}
            setDateDeadline={setDateDeadline}
            timeDeadline={timeDeadline}
            setTimeDeadline={setTimeDeadline}
            priorityLevel={priorityLevel}
            setPriorityLevel={setPriorityLevel}
          />
          {todos.map(todo => (
              <Todo 
                todo={todo}
                description={description}
                date={date}
                />
              ))}
        </div>
      </Router>
    </>
  );
}

export default App;
