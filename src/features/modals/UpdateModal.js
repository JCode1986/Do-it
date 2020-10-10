import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import DateAndTime from '../date/DateAndTime';
import UpdatePriorityLevel from '../priority/UpdatePriorityLevel'
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
  const { isButtonDisabled } = useContext(TodoContext);
  const { isModalOpen, handleCloseModal } = props;
  const { id,  } = props.todo
  const [title, setTitle] = useState(props.todo.title);
  const [description, setDescription] = useState(props.todo.description);
  const [dateDeadline, setDateDeadline] = useState(props.todo.dateDeadline.toDate());
  const [priorityLevel, setPriorityLevel] = useState(props.todo.priorityLevel);
  
  const updateTodo = () => {
    db.collection('todos').doc(id).set({
      title,
      description,
      dateDeadline,
      priorityLevel,
      modifiedDate: new Date(Date.now()),
    //prevents from overiding in firebase
    }, { merge: true}).then(() => {
      toast.success("Task Updated");
    }).catch(console.error)
    cancelAndRevertToCurrent();
    console.log('hi');
  }

  const cancelAndRevertToCurrent = () => {
    setTitle(props.todo.title);
    setDescription(props.todo.description);
    setDateDeadline(props.todo.dateDeadline.toDate());
    setPriorityLevel(props.todo.priorityLevel);
    handleCloseModal();
  }

  const checkIfDisabled = () => {
    return title === props.todo.title && description === props.todo.description && !isButtonDisabled
  }
  
  return (
    <div>
      <Modal    
        open={isModalOpen}
        onClose={cancelAndRevertToCurrent}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          style={{
            backgroundColor:'white', 
            width:'40%',   
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'}}
        >
          <div style={{backgroundColor:"lightblue", width:' -webkit-fill-available', border: '1px solid'}}>
            <h1
                className="updateHeader"         
              >Update
            </h1>
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
                  onChange={event => setTitle(event.target.value)}
                  />
                <TextField 
                  multiline={true}
                  id="outlined-basic" 
                  label="Description" 
                  variant="outlined" 
                  defaultValue={description}
                  onChange={event => setDescription(event.target.value)}
                />    
                <DateAndTime 
                  dateDeadline={dateDeadline} 
                  setDateDeadline={setDateDeadline}
                />
                {/* <UpdatePriorityLevel 
                  updatePriorityLevel={updatePriorityLevel}
                  setUpdatePriorityLevel={setUpdatePriorityLevel}
                  priorityLevel={priorityLevel}
                /> */}
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
          </Grid>
      </Modal>
    </div>
  );
}