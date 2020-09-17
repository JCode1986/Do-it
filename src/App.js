import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

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
      //returns array of strings from database
      setTodos(snapshot.docs.map(doc => doc.data().todo))
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

    setTodos([...todos, input]);
    setInput(''); //clear input
  }

  return (
    <div className="App">
    <h1>hello world!</h1>
    <form>
      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>

      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
            Add Todo
      </Button>
    </form>
    <ul>
      {todos.map(todo => (
        <Todo text={todo}/>
        ))}
    </ul>
    </div>
  );
}

export default App;
