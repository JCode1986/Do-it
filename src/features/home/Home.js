import React from 'react'

function Home(props) {
    console.log("hello", props);
    return (
        <div>
            <h1>My amazing app!{props.todos.todos}</h1>
    <p>{props.todos.todos}</p>
        </div>
    )
}

export default Home
