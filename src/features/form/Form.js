import React from 'react'
import { Button, FormControl, TextField, Grid } from '@material-ui/core';
import PriorityLevel from '../priority/PriorityLevel'
import Date from '../date/Date'
import db from '../../firebase';
import firebase from 'firebase';
import './Form.css'
import timeConverter from '../date/TimeConverter'
import { withRouter } from 'react-router-dom';

const form = (props) => {  
  
  const {
    title, 
    description, 
    dateDeadline,  
    priorityLevel,
    setTitle,
    setDescription,
    setPriorityLevel,
    setDateDeadline,
  } = props;
  
    //add to do
    const addTodo = (event) => {
      //stop refresh
      event.preventDefault();
        //add to db; no need for spread since a new snapshot will trigger the map in use effect
      db.collection('todos').add({
        todo: title,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        date: timeConverter(),
        dateDeadline: dateDeadline,
        priorityLevel: priorityLevel
      })
      setTitle('');
      setDescription('');
      props.history.push('/tasks');
    }

    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <h1>Add Task</h1>
        <form>
          <FormControl>
              <TextField
                id="outlined-basic" 
                label="Title" 
                variant="outlined" 
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <TextField 
                multiline={true}
                id="outlined-basic" 
                label="Description" 
                variant="outlined" 
                value={description}
                onChange={event => setDescription(event.target.value)}
              />    
          <Date 
            dateDeadline={dateDeadline}
            setDateDeadline={setDateDeadline}
          />
          <PriorityLevel 
            priorityLevel={priorityLevel}
            setPriorityLevel={setPriorityLevel}
          />
          <Button 
            disabled={!title} 
            type="submit" 
            onClick={addTodo} 
            variant="contained" 
            color="primary">
            Submit
          </Button>
        </FormControl>
      </form>
    </Grid>
    )
}

export default withRouter(form)
