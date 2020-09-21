import React, { useState } from 'react'
import firebase from '../../firebase';
import './EditForm.css'
import { Button, FormControl, TextField } from '@material-ui/core';
import 'firebase';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import DateAndTime from '../date/DateAndTime';
import PriorityLevel from '../priority/PriorityLevel';

function EditForm(props) {

    const db = firebase.firestore();

    const [updateTitle, setUpdateTitle] = useState(['']);
    const [updateDescription, setUpdateDescription] = useState(['']);
    const [updateDate, setUpdateDate] = useState([new Date(Date.now())]);
    const [updateDateDeadline, setUpdateDateDeadline] = useState([new Date(Date.now())]);
    const [updatePriorityLevel, setUpdatePriorityLevel] = useState([1]);

    const updateTodo = () => {
        //update todo with new input text
        db.collection('todos').doc(props.todo.id).set({
        todo: updateTitle,
        description: updateDescription
        //prevents from overiding in firebase
        }, { merge: true})
        props.history.push('/tasks')
    }
    
    return (
        <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <h1>Update</h1>
        <form>
          <FormControl>
              <TextField
                id="outlined-basic" 
                label="Title" 
                variant="outlined" 
                value={updateTitle}
                onChange={event => setUpdateTitle(event.target.value)}
                />
              <TextField 
                multiline={true}
                id="outlined-basic" 
                label="Description" 
                variant="outlined" 
                value={updateDescription}
                onChange={event => setUpdateDescription(event.target.value)}
              />    
          <DateAndTime 
            updateDateDeadline={updateDateDeadline}
            updateSetDateDeadline={setUpdateDateDeadline}
          />
          <PriorityLevel 
            updatePriorityLevel={updatePriorityLevel}
            setUpdatePriorityLevel={setUpdatePriorityLevel}
          />
          <Grid>
            <Button 
                disabled={!updateTitle} 
                type="submit" 
                onClick={updateTodo} 
                variant="contained" 
                color="primary">
                Update
            </Button>
            <Button 
                onClick={() => props.history.push('/tasks')} 
                variant="contained" 
                color="primary">
                Cancel
            </Button>
          </Grid>
        </FormControl>
      </form>
    </Grid>
    )
}

export default withRouter(EditForm)
       