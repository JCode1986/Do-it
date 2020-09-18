import React from 'react'
import { Button, FormControl, TextField, Grid } from '@material-ui/core';
import PriorityLevel from '../priority/PriorityLevel'
import Date from '../date/Date'
import db from '../../firebase';
import firebase from 'firebase';

const form = props => {  

    const {
      title, 
      description, 
      date, 
      dateDeadline, 
      timeDeadline, 
      priorityLevel,
      setTitle,
      setDescription,
      input,
      setPriorityLevel,
      setDateDeadline,
      setTimeDeadline
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
        date: date,
        //dateDeadline: dateDeadline,
        timeDeadline: timeDeadline,
        priorityLevel: priorityLevel
      })
      setTitle(''); //clear input
      setDescription('');
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
                value={input}
                onChange={event => setTitle(event.target.value)}
              />
              <TextField 
                id="outlined-basic" 
                label="Description" 
                variant="outlined" 
                value={input}
                onChange={event => setDescription(event.target.value)}
              />    
          <Date 
            timeDeadline={timeDeadline}
            dateDeadline={dateDeadline}
            setDateDeadline={setDateDeadline}
            setTimeDeadline={setTimeDeadline}
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

export default form
