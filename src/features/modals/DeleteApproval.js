import React from 'react'
import '../../firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import{ Modal, Button, Typography } from '@material-ui/core';
import { toast } from "react-toastify";

function DeleteDialog(props) {
    const {isDeleteDialogOpen, setIsDeleteDialogOpen, handleCloseDeleteDialog, } = props;
    const db = firebase.firestore();

    const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    }));

    const classes = useStyles();

    //delete a task
    const deleteTodo = () => {
        db.collection('todos').doc(props.id).delete()
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
                <div 
                    className={classes.paper}
                    style={{    
                        width:'auto',        
                        position:'absolute',
                        top:'50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div 
                        className="deleteHeader"
                        style={{backgroundColor:'red'}}
                    >
                    <h2 id="simple-modal-title">Delete Confirmation</h2>
                    </div>
                    <Typography 
                        id="simple-modal-description"
                        style={{marginBottom:'10px'}}
                    >
                        Are you sure you want to permanently delete this task?
                    </Typography>
                <Button
                    onClick={deleteTodo}
                    >Yes
                </Button>
                <Button
                    onClick={handleCloseDeleteDialog}
                    >No
                </Button>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteDialog;
