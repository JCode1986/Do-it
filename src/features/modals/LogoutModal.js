import React, { useContext } from 'react'
import TodoContext from '../context/TodoContext';
import { Modal, Typography, Button, Divider, Grid } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

function LogoutModal(props) {

    const logOut = () => {
        firebase.auth().signOut()
        props.history.push('/login');
        props.setOpenLogOutModal(false);
    }

    return (
        <div>
        <Modal    
            open={props.openLogOutModal}
            onClose={() => props.setOpenLogOutModal(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                className="InsideModal"
                style={{ width: "400px" }}
            >
                <div 
                    className="ModalHeaderBackground"
                    style={{ backgroundColor:"lightblue" }}
                >
                    <ClearIcon 
                        className="CancelIcon"
                        onClick={() => props.setOpenLogOutModal(false)}
                    />
                    <h2 className="ModalHeader">Logging out</h2>
                    <Divider/>   
                </div>
                <Typography 
                    id="simple-modal-description"
                    style={{marginBottom:'15px', marginTop: '15px'}}
                >
                    Are you sure?
                </Typography>
                <Grid style={{marginBottom:"15px"}}>
                    <Button
                        style={{marginRight:'5px'}}
                        onClick={logOut}
                        variant="contained"
                        color="primary"
                        >Yes
                    </Button>
                    <Button
                        variant="contained"
                        style={{marginLeft:'5px'}}
                        onClick={() => props.setOpenLogOutModal(false)}
                        >No
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    </div>
    )
}

export default withRouter(LogoutModal)
