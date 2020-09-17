import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, TextField } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import Form from './features/form/Form'
import Home from './features/home/Home'
import Date from './features/date/Date'
import PriorityLevel from './features/priority/PriorityLevel'

function App() {
  //todos start off with empty array in use state
  const [todos, setTodos] = useState([]);
  //memory for text input
  const [input, setInput] = useState(['']);

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

  //add to do
  const addTodo = (event) => {
    //stop refresh
    event.preventDefault();

    //add to db; no need for spread since a new snapshot will trigger the map in use effect
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(''); //clear input
  }

  return (
    <div className="App">
      <Home />
      <form>
        <FormControl>
            <TextField 
              id="outlined-basic" 
              label="Title" 
              variant="outlined" 
              value={input}
              onChange={event => setInput(event.target.value)}
            />
            <TextField 
              id="outlined-basic" 
              label="Description" 
              variant="outlined" 
              value={input}
              onChange={event => setInput(event.target.value)}
            />    
          <Date />
          <PriorityLevel />
          <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
                Submit
          </Button>
        </FormControl>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          ))}
      </ul>
    </div>
  );
}

export default App;
