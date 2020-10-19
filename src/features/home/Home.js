import React from 'react'
import app from 'firebase';
import Hero from './Hero';
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom';

function Home(props) {
    return (
        <div style={{marginTop:'40px'}}>
            <h1>Welcome {app.auth().currentUser.displayName}</h1>
            <Hero/>
            <Button 
                style={{marginTop: '25px'}}
                className="CheckButton"
                color="primary"   
                variant="contained"  
                onClick={() => props.history.push('/form')}
            >
                    Create tasks or goals now!
                </Button>
        </div>
    )
}

export default withRouter(Home)
