import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import { Typography, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase';

function NavBarToolBar(props) {
    const { setIsVideoPlaying } = useContext(TodoContext);
    const user = firebase.auth().currentUser;

    const doIt = () => {
        setIsVideoPlaying(false);
        props.history.push('/tasks');
    }
    
    return (
        <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          onClose={props.handleDrawerClose}
          edge="start"
        //   className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        {
          user?
            <img 
              src={require("./do-it-logo.png")} 
              alt="Do It!"
              style={{height:'60px', cursor:'pointer'}}
              onClick={doIt}           
            />
            :
            <img 
            src={require("./do-it-logo.png")} 
            style={{height:'60px'}}
            alt="Do It!"
            />
        }
      <div style={{marginLeft:"auto"}}>
        {
          !user ?
          <Typography>
            Not logged in
          </Typography>
          :
          user.displayName ?
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <img className="userPhoto"src={user.photoURL} alt={user.displayName} /> 
            <Typography>
            {user.displayName}
          </Typography>
          </Grid>
          :
          <Typography>
            User: {user.email} 
          </Typography>
        }
      </div>
      </Toolbar>
    )
}

export default withRouter(NavBarToolBar);
