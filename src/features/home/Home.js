import React from 'react'
import firebaseApp from "../../firebase"

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => firebaseApp.auth().signOut()}>Sign out</button>
        </div>
    )
}

export default Home
