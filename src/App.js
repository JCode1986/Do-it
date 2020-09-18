import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './features/todo/Todo';
import db from './firebase';
import Form from './features/form/Form'
import Home from './features/home/Home'
import NavBar from './features/navbar/NavBar'

function App() {
  //todos start off with empty array in use state
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState(['']);
  const [title, setTitle] = useState(['']);
  const [date, setDate] = useState(['']);
  const [dateDeadline, setDateDeadline] = useState(['']);
  const [timeDeadline, setTimeDeadline] = useState(['']);
  const [priorityLevel, setPriorityLevel] = useState(1);

  //when app loads, listen to database and fetch new todos as they get added/removed
  useEffect(() => {
    //fires when app loads; take snapshot of database if something changes in 'todos' collection
    //can create collection if it does not exist in snapshot
    db.collection('todos').orderBy('timestamp', 'desc') .onSnapshot(snapshot => {
      //returns object with id, and todo
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
    //dependencies
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Home todos={todos}/>
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
          <Todo todo={todo}/>
          ))}
    </div>
  );
}

export default App;
