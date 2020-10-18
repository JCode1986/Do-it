import React, { useContext } from 'react'
import { AuthContext } from '../authentication/Auth';
import { TodoContext } from '../context/TodoContext';
import{ Modal, Button, Typography, Grid, Divider } from '@material-ui/core';
import { toast } from "react-toastify";
import '../../firebase';
import './Modal.css'
import CancelIcon from '@material-ui/icons/Cancel';
import firebase from 'firebase';

function DeleteDialog(props) {
    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext);
    const { width } = useContext(TodoContext);
    const {isDeleteDialogOpen, setIsDeleteDialogOpen, handleCloseDeleteDialog, } = props;

    const deleteTodo = () => {
        db.collection('users').doc(currentUser.uid).collection('todos').doc(props.id).delete()
        setIsDeleteDialogOpen(false);
        toast.error("Task Deleted");
    }

    return (
        <div>
            <Modal
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="InsideModal" style={{width: width < 500 ? "100%" : "30%"}} >
                <div className="ModalHeaderBackground" style={{backgroundColor:"lightcoral"}}>
                <CancelIcon 
                    className="CancelIcon"
                    onClick={() => handleCloseDeleteDialog()}
                />
                    <h2 className="ModalHeader">Delete Confirmation</h2>
                </div>
                <Divider/>   
                <Typography 
                    id="simple-modal-description"
                    style={{marginBottom:'10px', marginTop: '20px'}}
                >
                    Are you sure you want to permanently delete this task?
                </Typography>
                <Grid style={{marginBottom:'15px'}}>
                    <Button
                        style={{marginRight:'5px'}}
                        onClick={deleteTodo}
                        variant="contained" 
                        color="secondary"
                        >Yes
                    </Button>
                    <Button
                        style={{marginLeft:'5px'}}
                        onClick={handleCloseDeleteDialog}
                        variant="contained"
                        >No
                    </Button>
                </Grid>
                {/* </div> */}
                </div>
            </Modal>
        </div>
    )
}

export default DeleteDialog;
