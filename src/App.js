import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';

function App() {
  //todos start off with empty array in use state
  const [todos, setTodos] = useState([]);
  //memory for text input
  const [input, setInput] = useState(['']);

  //when app loads, listen to database and fetch new todos as they get added/removed
  useEffect(() => {
    //fires when app loads
    db.collection('todos').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
    //dependencies
  }, []);

  //add to do
  const addTodo = (event) => {
    //stop refresh
    event.preventDefault();
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
