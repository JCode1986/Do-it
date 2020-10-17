import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../authentication/Auth';
import { Grid } from '@material-ui/core';
import './TodoList.css'
import firebase from 'firebase';
import TodoHeader from './TodoHeader'
import Todo from './Todo';
import Loading from '../loading/Loading'

function TodoList() {
    const db = firebase.firestore();
    const { todos, setTodos, isPending, setIsPending } = useContext(TodoContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsPending(true);  
        db.collection('users').doc(currentUser.uid).collection('todos').orderBy('priorityLevel', 'desc')
        .onSnapshot(snapshot => {
          setTodos(snapshot.docs.map(doc => ({
            id: doc.id, 
            title: doc.data().title,
            description: doc.data().description,
            dateCreated: doc.data().dateCreated,
            dateDeadline: doc.data().dateDeadline,
            modifiedDate: doc.data().modifiedDate,
            priorityLevel: doc.data().priorityLevel
          })))
          setIsPending(false);
        })
    //dependencies
    }, [db, currentUser, setTodos, setIsPending]);

    if(isPending) return <Loading/>

    return (
        <div>
            <TodoHeader/>
            {
              todos.length ? 
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="TodoListGrid"
              >
                  {todos.map(todo => 
                  <Todo
                    key={todo.id}
                    todo={todo}
                />)}
              </Grid>
              :
              null
            }
        </div>
    )
}

export default TodoList
