import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import {Route} from 'react-router-dom'
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../authentication/Auth';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withRouter } from 'react-router-dom';
import './NavBar.css'
import NavBarToolBar from './NavBarToolbar';
import NavBarList from './NavBarList';
import TodoList from '../todo/TodoList';
import CompletedTasks from '../archives/CompletedTasks'

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

function PersistentDrawerLeft() {
  const classes = useStyles();
  // const classes = NavBarTransitions();
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const showList = () => !currentUser ? null : <Route exact path="/tasks" component={TodoList} />;
  const showArchives = () => !currentUser ? null : <Route exact path="/completed-tasks" component={CompletedTasks} />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <NavBarToolBar 
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      </AppBar>
      <Drawer
        className={classes.drawer}
        style={{color:'#3589E9'}}
        variant="persistent"
        anchor="left"
        open={openDrawer}
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
        <NavBarList/>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
        >
          {showList()}
          {showArchives()}
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft);