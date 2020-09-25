import React, { useEffect } from 'react';
import UpdateDateAndTime from '../date/UpdateDateAndTime';
import UpdatePriorityLevel from '../priority/UpdatePriorityLevel'
import fireBaseApp from '../../firebase';

import { 
  Grid, 
  FormControl, 
  Button, 
  TextField, 
  Modal
} from '@material-ui/core';

export default function EditForm(props) {
  const db = fireBaseApp.firestore();

  const { 
    isModalOpen, 
    setModalIsOpen,  
    handleCloseModal,
    dateDeadline,
    updateTitle,
    updateDescription,
    updateDateDeadline,
    updatePriorityLevel,
    setUpdateTitle,
    setUpdateDescription,
    setUpdatePriorityLevel,
    setUpdateDateDeadline,
    priorityLevel,
    todo,
    description,
    id
  } = props;

  useEffect(() => {
    setUpdateTitle(todo)
    setUpdateDescription(description)
  }, [
      todo, 
      description, 
      dateDeadline,  
      setUpdateTitle, 
      setUpdateDescription, 
    ])

  //update a task
  const updateTodo = () => {
    db.collection('todos').doc(id).set({
      todo: updateTitle,
      description: updateDescription,
      dateDeadline: updateDateDeadline,
      priorityLevel: updatePriorityLevel,
      modifiedDate: new Date(Date.now()),
    //prevents from overiding in firebase
    }, { merge: true})
    setModalIsOpen(false);
  }

  return (
    <div>
      <Modal    
        open={isModalOpen}
        onClose={handleCloseModal}
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
            width:'60%',   
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'}}
        >
          <h1>Update</h1>
          <form>
            <FormControl>
                <TextField
                  required
                  id="outlined-basic" 
                  label="Title" 
                  variant="outlined" 
                  defaultValue={todo}
                  value={updateTitle}
                  onChange={event => setUpdateTitle(event.target.value)}
                  />
                <TextField 
                  multiline={true}
                  id="outlined-basic" 
                  label="Description" 
                  variant="outlined" 
                  defaultValue={description}
                  value={updateDescription}
                  onChange={event => setUpdateDescription(event.target.value)}
                />    
                <UpdateDateAndTime 
                  updateDateDeadline={updateDateDeadline}
                  setUpdateDateDeadline={setUpdateDateDeadline}
                  dateDeadline={dateDeadline}
                />
                <UpdatePriorityLevel 
                  updatePriorityLevel={updatePriorityLevel}
                  setUpdatePriorityLevel={setUpdatePriorityLevel}
                  priorityLevel={priorityLevel}
                />
                <Grid>
                  <Button
                      className="FormButtons"
                      disabled={!updateTitle} 
                      type="submit" 
                      onClick={updateTodo} 
                      variant="contained" 
                      color="primary">
                      Submit
                  </Button>
                  <Button 
                      onClick={handleCloseModal}
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