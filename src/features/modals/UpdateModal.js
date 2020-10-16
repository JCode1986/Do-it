import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../authentication/Auth';
import './Modal.css'
import CancelIcon from '@material-ui/icons/Cancel';
import DateAndTime from '../date/DateAndTime';
import PriorityLevel from '../priority/PriorityLevel'
import fireBaseApp from '../../firebase';
import { toast } from "react-toastify";
import { 
  Grid, 
  FormControl, 
  Button, 
  TextField, 
  Modal,
  Divider
} from '@material-ui/core';

export default function EditForm(props) {
  const db = fireBaseApp.firestore();
  const { isButtonDisabled, setIsButtonDisabled, setIsNewPriorityLevel } = useContext(TodoContext);
  const { currentUser } = useContext(AuthContext);
  const { isModalOpen, handleCloseModal } = props;
  const { id, title, description, dateDeadline, priorityLevel } = props.todo
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentDateDeadline, setCurrentDateDeadline] = useState(dateDeadline.toDate());
  const [currentPriorityLevel, setCurrentPriorityLevel] = useState(priorityLevel);

  //loads the modal with values from database
  useEffect(() => {
    setCurrentTitle(title);
    setCurrentDescription(description);
    setCurrentDateDeadline(dateDeadline.toDate());
    setCurrentPriorityLevel(priorityLevel);
  }, [title, description, dateDeadline, priorityLevel]);

  //updates the current task
  const updateTodo = () => {
    db.collection('users').doc(currentUser.uid).collection('todos').doc(id).set({
      title: currentTitle,
      description: currentDescription,
      dateDeadline: currentDateDeadline,
      priorityLevel: currentPriorityLevel,
      modifiedDate: new Date(Date.now()),
    //prevents from overiding in firebase
    }, { merge: true}).then(() => {
      toast.success("Task Updated");
    }).catch(console.error)
    cancelAndRevertToCurrent();
  }

  //reverts back to previous value when user cancels out of an update, and a change was made
  const cancelAndRevertToCurrent = () => {  
    setCurrentTitle(title);
    setCurrentDescription(description);
    setCurrentDateDeadline(dateDeadline.toDate());
    setCurrentPriorityLevel(priorityLevel);  
    setIsButtonDisabled(false);
    setIsNewPriorityLevel(false);
    handleCloseModal();
  }

  //disables submit button if nothing was updated
  const checkIfDisabled = () => {
    return currentTitle === title && currentDescription === description && !isButtonDisabled
  }
  
  return (
    <div>
      <Modal    
        open={isModalOpen}
        onClose={cancelAndRevertToCurrent}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="InsideModal" style={{width:"45%"}} >
          <div className="ModalHeaderBackground" style={{backgroundColor:"#7ed957"}}>
            <CancelIcon 
              className="CancelIcon"
              onClick={() => cancelAndRevertToCurrent()}
            />
            <h1 className="ModalHeader">Update</h1>
          </div>
          <form>
          <Divider/>
            <FormControl>
                <TextField
                  required
                  inputProps={{ maxLength: 15 }}                  
                  id="outlined-basic" 
                  label="Title" 
                  variant="outlined" 
                  defaultValue={title}
                  onChange={event => setCurrentTitle(event.target.value)}
                  />
                <TextField 
                  multiline={true}
                  id="outlined-basic" 
                  label="Description" 
                  variant="outlined" 
                  defaultValue={description}
                  onChange={event => setCurrentDescription(event.target.value)}
                />    
                <DateAndTime 
                  currentDateDeadline={currentDateDeadline} 
                  setCurrentDateDeadline={setCurrentDateDeadline}
                  dateDeadline={dateDeadline}
                />
                <PriorityLevel 
                  currentPriorityLevel={currentPriorityLevel}
                  setCurrentPriorityLevel={setCurrentPriorityLevel}
                  priorityLevel={priorityLevel}
                />
                <Grid>
                  <Button
                      className="FormButtons"
                      disabled={checkIfDisabled()} 
                      type="submit" 
                      onClick={updateTodo} 
                      variant="contained" 
                      color="primary">
                      Submit
                  </Button>
                  <Button 
                    onClick={cancelAndRevertToCurrent}
                    variant="contained" 
                  >
                    Cancel
                  </Button>
                </Grid>
              </FormControl>
            </form>
          </div>
      </Modal>
    </div>
  );
}