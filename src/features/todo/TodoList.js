import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoHeader from './TodoHeader'
import Todo from './Todo';

function TodoList() {

    const { todos } = useContext(TodoContext);

    return (
        <div>
            <TodoHeader/>
            {todos.map(todo => 
            <Todo
              key={todo.id}
              todo={todo}
            />)}
        </div>
    )
}

export default TodoList
