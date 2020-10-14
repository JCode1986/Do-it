import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import InfoIcon from '@material-ui/icons/Info';
import StarRateIcon from '@material-ui/icons/StarRate';

function NavBarList(props) {
    const user = firebase.auth().currentUser;
    const { setIsVideoPlaying } = useContext(TodoContext);

    const logOut = () => {
        setIsVideoPlaying(false);
        firebase.auth().signOut()
        props.history.push('/login');
      }
    
      const playVideo = () => {
        setIsVideoPlaying(true);
        props.history.push('/do-it');
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
        <>
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
            {
            user ?
                <ListItem 
                button 
                onClick={playVideo}
                key="Need Motivation?">
                <ListItemIcon>
                    <StarRateIcon/>
                </ListItemIcon>
                <ListItemText primary="Need Motivation?"/>
                </ListItem>
            :
            null
            }
            </List>
        </>
    )
}

export default withRouter(NavBarList)
