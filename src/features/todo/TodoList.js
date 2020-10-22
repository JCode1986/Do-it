import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../authentication/Auth';
import { Grid } from '@material-ui/core';
import './TodoList.css'
import firebase from 'firebase';
import TodoHeader from './TodoHeader'
import Todo from './Todo';
import LoadFunction from '../loading/loadFunction';

function TodoList() {
    const db = firebase.firestore();
    const { todos, setTodos, setIsList, isList } = useContext(TodoContext);
    const { currentUser } = useContext(AuthContext);
    const [loader, showLoader, hideLoader] = LoadFunction();

    useEffect(() => {         
      const getTasks = async() => {
        showLoader();
        try {
          await db.collection('users').doc(currentUser.uid).collection('todos').orderBy('priorityLevel', 'desc')
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
            hideLoader();      
          })     
        } catch (error) {
          console.log(error)
        }
      }
        getTasks();
    //dependencies
    }, [db, currentUser]);

    useEffect(() => {
      setIsList(true);
    }, [])

    return (
      <div>
        <TodoHeader/>
          {
            loader ||
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
          }
      </div>
    )
}

export default TodoList
