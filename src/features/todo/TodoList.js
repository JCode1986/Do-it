import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../authentication/Auth';
import firebase from 'firebase';
import TodoHeader from './TodoHeader'
import Todo from './Todo';

function TodoList() {
    const db = firebase.firestore();
    const { todos, setTodos } = useContext(TodoContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {  
        db.collection('users').doc(currentUser.uid).collection('todos').orderBy('priorityLevel', 'desc').onSnapshot(snapshot => {
          setTodos(snapshot.docs.map(doc => ({
            id: doc.id, 
            title: doc.data().title,
            description: doc.data().description,
            dateCreated: doc.data().dateCreated,
            dateDeadline: doc.data().dateDeadline,
            modifiedDate: doc.data().modifiedDate,
            priorityLevel: doc.data().priorityLevel
          })))
        })
    //dependencies
    }, [db, currentUser, setTodos]);

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
