import React, { useContext } from 'react'
import { AuthContext } from '../authentication/Auth';
import { Modal, Typography, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { toast } from "react-toastify";
import '../../firebase';
import './Modal.css'
import firebase from 'firebase';

function CompletedApproval(props) {
    const useStyles = makeStyles((theme) => ({
        paper: {
                position: 'absolute',
                width: 400,
                backgroundColor: theme.palette.background.paper,
                // boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
                // border: '2px solid #000',
                // boxShadow: theme.shadows[5],
                //border: '1px solid #000',
                //borderRadius:"20px"
            },
        }));

    const classes = useStyles();
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
                 <div 
                    className={classes.paper}
                    style={{           
                        position:'absolute',
                        top:'50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '330px',
                        height: '180px',
                        outline:'none',
                        borderRadius:'20px',
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
                    }}
                >
                    <div 
                        className="completeHeader"
                        style={{
                            backgroundColor:'lightblue',
                            margin:'0px',
                            paddingBottom:'1px',
                            paddingTop:'1px',
                            borderTopLeftRadius:"20px", 
                            borderTopRightRadius:"20px"
                        }}
                    >
                    <h2 id="simple-modal-title">Complete Confirmation</h2>
                    <Divider/>   
                    </div>
                    <Typography 
                        id="simple-modal-description"
                        style={{marginBottom:'15px', marginTop: '15px'}}
                    >
                        Completed task?
                    </Typography>
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
                </div>
            </Modal>
        </div>
    )
}

export default CompletedApproval
