import React from 'react'
import firebaseApp from "../../firebase"
import app from 'firebase';
import Button from '@material-ui/core/Button';

function Home() {
    console.log("User id:", app.auth().currentUser.uid)
    return (
        <div style={{marginTop:'40px'}}>
            <h1>Welcome {app.auth().currentUser.displayName}</h1>
            <Button
                variant="contained"
                color="primary" 
                onClick={() => firebaseApp.auth().signOut()}
            >
                Log out
            </Button>
        </div>
    )
}

export default Home
