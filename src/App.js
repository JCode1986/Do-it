import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './features/todo/Todo';
import db from './firebase';
import Form from './features/form/Form'
import Home from './features/home/Home'
import NavBar from './features/navbar/NavBar'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import timeConverter from './features/date/TimeConverter'

function App() {
  //todos start off with empty array in use state
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState(['']);
  const [title, setTitle] = useState(['']);
  const [date, setDate] = useState([timeConverter(new Date(Date.now()))]);
  const [dateDeadline, setDateDeadline] = useState([new Date(Date.now())]);
  const [priorityLevel, setPriorityLevel] = useState(1);

  //when app loads, listen to database and fetch new todos as they get added/removed
  useEffect(() => {
    setTitle(['']);
    setDateDeadline(new Date(Date.now()));
    //fires when app loads; take snapshot of database if something changes in 'todos' collection
    //can create collection if it does not exist in snapshot
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //returns object with id, and todo
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, 
        todo: doc.data().todo,
        description: doc.data().description,
        date: doc.data().date,
        dateDeadline: doc.data().dateDeadline,
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
          <Route exact path="/" component={Home}/>
          <Route
            exact path="/form"
            render={(props) => 
              <Form {...props}
                setTodos={setTodos}
                title={title} 
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                date={date}
                setDate={setDate}
                dateDeadline={dateDeadline}
                setDateDeadline={setDateDeadline}
                priorityLevel={priorityLevel}
                setPriorityLevel={setPriorityLevel}
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
                  description={description}
                  date={date}
                  dateDeadline={dateDeadline}
                  />             
              }
            />
          ))}
        </div>
      </Router>
    </>
  );
}

export default App;
