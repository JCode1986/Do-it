import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DisplayNameChange from './DisplayNameChange';

function ProfileMenu(props) {
    const { setIsVideoPlaying, name } = useContext(TodoContext)
    const { anchorEl, handleClose, setAnchorEl, setUpdatedName } = props;
    const [isOpen, setIsOpen] = useState(false);

    const logOut = () => {
        setIsVideoPlaying(false);
        firebase.auth().signOut()
        handleClose();
        props.history.push('/login');
      }

    const cancel = () => {
      setIsOpen(false);
      setAnchorEl(false);
      setUpdatedName(name);
    }

  return (
    <div>  
      <DisplayNameChange
        isOpen={isOpen}
        cancel={cancel}
        setIsOpen={setIsOpen}
        setAnchorEl={setAnchorEl}
        updatedName={props.updatedName}
        setUpdatedName={props.setUpdatedName}
      />  
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(false)}
        style={{marginTop:'40px', marginLeft:'20px'}}
      >
        <MenuItem onClick={() => setIsOpen(true)}>Change Display Name</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(ProfileMenu);