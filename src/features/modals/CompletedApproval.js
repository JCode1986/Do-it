import React, { useContext } from 'react'
import { AuthContext } from '../authentication/Auth';
import { Modal, Typography, Button, Divider, Grid } from '@material-ui/core'
import { toast } from "react-toastify";
import '../../firebase';
import './Modal.css'
import CancelIcon from '@material-ui/icons/Cancel';
import firebase from 'firebase';

function CompletedApproval(props) {
    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext)
    const userData = db.collection('users').doc(currentUser.uid);
    const userArchive = userData.collection('archive');
    const userTasks = userData.collection('todos');

    const addToArchive = (event) => {
        //stop refresh
        event.preventDefault();
        //add to db; no need for spread since a new snapshot will trigger the map in use effect
        userArchive.add({
            archivedTodo: props.title,
            archivedDescription: props.description,
            archivedDateCreated: props.dateCreated,
            archivedDateDeadline: props.dateDeadline,
            archivedModifiedDate: !props.modifiedDate ? "N/A" : props.modifiedDate,
            archivedCompleted: new Date(Date.now()),
            archivedPriorityLevel: props.priorityLevel
        }).then(() => {
            deleteTodo(); 
            toast.success("Task Completed and archived")
        }).catch(console.error)
    }

    const deleteTodo = () => {
        userTasks.doc(props.id).delete();
        props.setIsArchiveOpen(false);
    }

    const closeMenu = () => {
        props.handleClose();
        props.setIsArchiveOpen(false);
    }

    return (
        <div>
            <Modal    
                open={props.isArchiveOpen}
                onClose={closeMenu}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    className="InsideModal"
                    style={{ width:"25%" }}
                >
                    <div 
                        className="ModalHeaderBackground"
                        style={{ backgroundColor:"lightblue" }}
                    >
                        <CancelIcon 
                            className="CancelIcon"
                            onClick={() => closeMenu()}
                        />
                        <h2 id="simple-modal-title">Complete Confirmation</h2>
                        <Divider/>   
                    </div>
                    <Typography 
                        id="simple-modal-description"
                        style={{marginBottom:'15px', marginTop: '15px'}}
                    >
                        Completed task?
                    </Typography>
                    <Grid style={{marginBottom:"15px"}}>
                        <Button
                            style={{marginRight:'5px'}}
                            onClick={addToArchive}
                            variant="contained"
                            color="primary"
                            >Yes
                        </Button>
                        <Button
                            variant="contained"
                            style={{marginLeft:'5px'}}
                            onClick={closeMenu}
                            >No
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    )
}

export default CompletedApproval
