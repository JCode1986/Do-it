import React, { useState, createContext, useEffect } from 'react'

//create context outside of function
//export context and provier
export const TodoContext = createContext();

export const TodoProvider = (props) => {
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
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWidth(window.innerWidth)
          setHeight(window.innerHeight)
        }  
        // Add event listener
        window.addEventListener("resize", handleResize);   
        // Call handler right away so state gets updated with initial window size
        handleResize();   
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); // Empty array ensures that effect is only run on mount
  
    return (
        <TodoContext.Provider value={
            { todos, setTodos, description, setDescription, title, setTitle, dateCreated, setDateCreated,
            modifiedDate, setModifiedDate, dateDeadline, setDateDeadline, priorityLevel, setPriorityLevel,
            isButtonDisabled, setIsButtonDisabled, isNewPriorityLevel, setIsNewPriorityLevel, isPending, setIsPending,
            isVideoPlaying, setIsVideoPlaying, name, setName, width, setWidth, height, setHeight }
        }>
            {props.children}
        </TodoContext.Provider>
    )
}
