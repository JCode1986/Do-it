import React, { useState } from 'react';
import './App.css';
import { Button } from '@material-ui/core';

function App() {
  //todos start off with empty array in use state
  const [todos, setTodos] = useState(["what di do", "booooy", "chocolate!!!"]);
  //memory for text input
  const [input, setInput] = useState(['']);

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
      <input value={input} onChange={event => setInput(event.target.value)}/>
      <Button type="submit" onClick={addTodo} variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
    <ul>
      {todos.map(todo => (
        <li>{todo}</li>
        ))}
    </ul>
    </div>
  );
}

export default App;
