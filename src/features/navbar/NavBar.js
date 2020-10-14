import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarRateIcon from '@material-ui/icons/StarRate';
import InfoIcon from '@material-ui/icons/Info';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import './NavBar.css'
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function PersistentDrawerLeft(props) {
  const user = firebase.auth().currentUser;
  const { setIsVideoPlaying } = useContext(TodoContext);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const logOut = () => {
    setIsVideoPlaying(false);
    firebase.auth().signOut()
    props.history.push('/login');
  }

  const playVideo = () => {
    setIsVideoPlaying(true);
    props.history.push('/do-it');
  }

  const doIt = () => {
    setIsVideoPlaying(false);
    props.history.push('/tasks');
  }

  const home = () => {
    setIsVideoPlaying(false);
    props.history.push('/');
  }

  const create = () => {
    setIsVideoPlaying(false);
    props.history.push('/form');
  }

  const tasks = () => {
    setIsVideoPlaying(false);
    props.history.push('/tasks');
  }

  const archive = () => {
    setIsVideoPlaying(false);
    props.history.push('/completed-tasks')
  }

  const about = () => {
    setIsVideoPlaying(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            onClose={handleDrawerClose}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
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
      </AppBar>
      <Drawer
        className={classes.drawer}
        style={{color:'#3589E9'}}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          {
            user? 
            <List>
              <ListItem 
                button 
                onClick={home}
                key="Home">
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItem>
              <ListItem 
                button
                onClick={create} 
                key="Create a task">
                <ListItemIcon>
                  <AddCircleOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary="Create a task"/>
              </ListItem>
              <ListItem 
                button 
                key="Tasks"
                onClick={tasks}
                >
                <ListItemIcon>
                  <ListIcon/>
                </ListItemIcon>
                <ListItemText primary="Tasks"/>
              </ListItem>
              <ListItem 
                button 
                key="Archive"
                onClick={archive}
                >
                <ListItemIcon>
                  <ArchiveIcon/>
                </ListItemIcon>
                <ListItemText primary="Archive"/>
              </ListItem>
            </List> 
            :
            null
          }
        <Divider />
        <List>
          {
            user ? 
            <ListItem 
            button 
            onClick={logOut}
            key="Log out">
            <ListItemIcon>
              <AccountCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Log out"/>
          </ListItem>
          :
          <ListItem 
            button 
            onClick={() => {props.history.push('/login')}}
            key="Log in">
            <ListItemIcon>
              <AccountCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Log in"/>
          </ListItem>
          }
          <ListItem button key="About">
            <ListItemIcon>
              <InfoIcon/>
            </ListItemIcon>
            <ListItemText primary="About"/>
          </ListItem>
          <Divider/>
          <ListItem 
            button 
            onClick={playVideo}
            key="Need Motivation?">
            <ListItemIcon>
              <StarRateIcon/>
            </ListItemIcon>
            <ListItemText primary="Need Motivation?"/>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        >
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft);