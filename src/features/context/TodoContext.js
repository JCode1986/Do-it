import React, { useState, createContext, useEffect } from 'react'
import firebaseApp from '../../firebase';

//create context outside of function
//export context and provier
export const TodoContext = createContext();

export const TodoProvider = (props) => {
    
    const db = firebaseApp.firestore();

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState(new Date(Date.now()));
    const [modifiedDate, setModifiedDate] = useState(new Date(Date.now()));
    const [dateDeadline, setDateDeadline] = useState(new Date(Date.now()));
    const [priorityLevel, setPriorityLevel] = useState(1);
    const [archive, setArchive] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {  
        //fires when app loads; take snapshot of database if something changes in 'todos' collection
        //can create collection if it does not exist in snapshot
        //sort by priority level
        db.collection('todos').orderBy('priorityLevel', 'desc').onSnapshot(snapshot => {
          //returns object with id, and todo
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
      }, [db]);

    return (
        <TodoContext.Provider value={
            { todos, setTodos, description, setDescription, title, setTitle, dateCreated, setDateCreated,
            modifiedDate, setModifiedDate, dateDeadline, setDateDeadline, priorityLevel, setPriorityLevel,
            archive, setArchive, isButtonDisabled, setIsButtonDisabled }
        }>
            {props.children}
        </TodoContext.Provider>
    )
}
