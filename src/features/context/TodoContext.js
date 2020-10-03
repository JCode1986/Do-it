import React, { useState, createContext } from 'react'

//create context outside of function
//export context and provier
export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState(['']);
    const [title, setTitle] = useState(['']);
    const [dateCreated, setDateCreated] = useState([new Date(Date.now())]);
    const [modifiedDate, setModifiedDate] = useState([new Date(Date.now())]);
    const [dateDeadline, setDateDeadline] = useState([new Date(Date.now())]);
    const [priorityLevel, setPriorityLevel] = useState([1]);
    const [archive, setArchive] = useState([]);
    const [userId, setUserId] = useState('');
    return (
        <TodoContext.Provider value={[
            todos, setTodos, description, setDescription, title, setTitle, dateCreated, setDateCreated,
            modifiedDate, setModifiedDate, dateDeadline, setDateDeadline, priorityLevel, setPriorityLevel,
            archive, setArchive, userId, setUserId
        ]}>
            {props.children}
        </TodoContext.Provider>
    )
}
