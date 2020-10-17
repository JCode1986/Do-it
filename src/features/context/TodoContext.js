import React, { useState, createContext } from 'react'
import firebase from 'firebase'

//create context outside of function
//export context and provier
export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const user = firebase.auth().currentUser
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState(new Date(Date.now()));
    const [modifiedDate, setModifiedDate] = useState(new Date(Date.now()));
    const [dateDeadline, setDateDeadline] = useState(new Date(Date.now()));
    const [priorityLevel, setPriorityLevel] = useState(1);
    const [isNewPriorityLevel, setIsNewPriorityLevel] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [name, setName] = useState('');
    
    return (
        <TodoContext.Provider value={
            { todos, setTodos, description, setDescription, title, setTitle, dateCreated, setDateCreated,
            modifiedDate, setModifiedDate, dateDeadline, setDateDeadline, priorityLevel, setPriorityLevel,
            isButtonDisabled, setIsButtonDisabled, isNewPriorityLevel, setIsNewPriorityLevel, isPending, setIsPending,
            isVideoPlaying, setIsVideoPlaying, name, setName }
        }>
            {props.children}
        </TodoContext.Provider>
    )
}
