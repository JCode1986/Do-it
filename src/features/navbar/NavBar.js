import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import NavBarTransitions from './NavBarTransitions';
import { useTheme } from '@material-ui/core/styles';
import { TodoContext } from '../context/TodoContext';
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

function PersistentDrawerLeft() {
  const classes = NavBarTransitions();
  const theme = useTheme();
  const { isList } = useContext(TodoContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
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
        <NavBarList/>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        >
          {isList ? <TodoList /> : null}
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft);