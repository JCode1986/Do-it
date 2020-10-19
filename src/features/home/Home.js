import React from 'react'
import Hero from './Hero';
import { Button, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom';

function Home(props) {
    return (
        <div style={{marginTop:'40px'}}>
            <h1>Welcome to Do It!</h1>
            <Typography style={{marginBottom:'10px'}}>A website where you can create tasks or goals that needs to done. A task gets saved to an archive section, upon completion. <br/>
                So do it now!
            </Typography>
            <Hero/>
            <Button 
                style={{marginTop: '15px'}}
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
