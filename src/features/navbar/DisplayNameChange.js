import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import ClearIcon from '@material-ui/icons/Clear';
import { Modal, TextField, Button, Divider, Grid } from '@material-ui/core';
import app from '../../firebase';
import firebase from 'firebase';
import { toast } from "react-toastify";

function DisplayNameChange(props) {
    const db = app.firestore();
    const { width } = useContext(TodoContext);
    const { isOpen, cancel, updatedName, setUpdatedName, setIsOpen, setAnchorEl } = props;
    const user = firebase.auth().currentUser;
    const users = db.collection('users');

    const saveChangeDisplayName = (event) => {
        event.preventDefault();
        users.doc(user.uid).collection('displayName').doc('name').set({
            displayName: updatedName
        }, { merge: true}).then(() => {
                setUpdatedName(updatedName);
                setIsOpen(false);
                setAnchorEl(false);
                toast.success(`Display Name changed to ${updatedName}`);
            }).catch(console.error)
        }

    return (
        <div>
            <Modal    
                open={isOpen}
                onClose={cancel}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form onSubmit={saveChangeDisplayName}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                        className="InsideModal"
                        style={{ width: width < 500 ? "100%" : "25%" }}
                    >
                        <div 
                            className="ModalHeaderBackground"
                            style={{ backgroundColor:"lightblue" }}
                        >
                            <ClearIcon 
                                className="CancelIcon"
                                onClick={cancel}
                            />
                            <h2 id="simple-modal-title">Change Display Name</h2>
                            <Divider/>   
                        </div>
                        <TextField 
                            id="simple-modal-description"
                            autoComplete="false"
                            label="Name" 
                            type="name"
                            variant="outlined" 
                            value={updatedName}
                            style={{marginBottom:'15px', marginTop: '15px'}}
                            onChange={e => setUpdatedName(e.target.value)}
                        />
                        <Grid style={{marginBottom:"15px"}}>
                            <Button
                                style={{marginRight:'5px'}}
                                type="submit"
                                variant="contained"
                                color="primary"
                                >Yes
                            </Button>
                            <Button
                                variant="contained"
                                style={{marginLeft:'5px'}}
                                onClick={cancel}
                                >No
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </div>
    )
}

export default DisplayNameChange
