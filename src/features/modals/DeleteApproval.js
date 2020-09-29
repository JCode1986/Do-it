import React from 'react'
import '../../firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import{ Modal, Button, Typography, Grid } from '@material-ui/core';
import { toast } from "react-toastify";

function DeleteDialog(props) {
    const {isDeleteDialogOpen, setIsDeleteDialogOpen, handleCloseDeleteDialog, } = props;
    const db = firebase.firestore();

    const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
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
                        transform: 'translate(-50%, -50%)',
                        height: '180px',
                    }}
                >
                    <div 
                        className="deleteHeader"
                        style={{
                            backgroundColor:'lightcoral', 
                            width:'460px',
                            margin: '0',
                            paddingTop: '1px',
                            paddingBottom:'1px',
                            borderBottom: '1px solid black'
                        }}
                    >
                    <h2 id="simple-modal-title">Delete Confirmation</h2>
                    </div>
                    <Typography 
                        id="simple-modal-description"
                        style={{marginBottom:'10px', marginTop: '20px'}}
                    >
                        Are you sure you want to permanently delete this task?
                    </Typography>
                <Grid>
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
                </div>
            </Modal>
        </div>
    )
}

export default DeleteDialog;
