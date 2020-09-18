import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>My amazing app!</h1>
            <h3>Go to <Link to='/tasks'>Tasks</Link></h3>
        </div>
    )
}

export default Home
