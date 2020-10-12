import React from 'react'
import { Modal, Typography, Button } from '@material-ui/core'
import '../../firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from "react-toastify";

function CompletedApproval(props) {
    const db = firebase.firestore();

    const useStyles = makeStyles((theme) => ({

        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
        },
        }));

        const classes = useStyles();
        const addToArchive = (event) => {
            //stop refresh
            event.preventDefault();
            //add to db; no need for spread since a new snapshot will trigger the map in use effect
            db.collection('archive').add({
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
        db.collection('todos').doc(props.id).delete();
        props.setIsArchiveOpen(false);
    }

    const closeMenu = () => {
        props.handleClose(false);
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
                        height: '180px'
                    }}
                >
                    <div 
                        className="completeHeader"
                        style={{
                            backgroundColor:'lightblue',
                            margin:'0px',
                            paddingBottom:'1px',
                            paddingTop:'1px',
                            borderBottom: '1px solid black'
                        }}
                    >
                    <h2 id="simple-modal-title">Complete Confirmation</h2>
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
