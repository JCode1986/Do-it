import React from 'react'
import { Button, FormControl, TextField, Grid } from '@material-ui/core';
import PriorityLevel from '../priority/PriorityLevel'
import DateAndTime from '../date/DateAndTime'
import firebaseApp from '../../firebase';
import firebase from 'firebase';
import './Form.css'
import { withRouter } from 'react-router-dom';

const db = firebaseApp.firestore();

const form = (props) => {  
  
  const {
    title, 
    description, 
    dateDeadline,
    dateCreated,  
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
        dateCreated: dateCreated,
        dateDeadline: dateDeadline,
        priorityLevel: priorityLevel
      })
      setTitle('');
      setDescription('');
      setDateDeadline(new Date(Date.now()));
      setPriorityLevel(1);
      props.history.push('/tasks');
    }

    const handleEnterKey = (e) => {
      if(e.key === 'Enter'){
        console.log("Hi")
      }
    }
    
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <h1>Create</h1>
        <form>
          <FormControl>
              <TextField
                inputProps={{ maxLength: 20 }}
                required
                id="outlined-basic" 
                label="Title" 
                variant="outlined" 
                helperText="Required: 20 chars max length"
                value={capitalizeFirstLetter(title)}
                onChange={event => setTitle(event.target.value)}
                />
              <TextField 
                multiline={true}
                onKeyDown={handleEnterKey}
                id="outlined-basic" 
                label="Description" 
                variant="outlined" 
                value={description}
                onChange={event => setDescription(event.target.value)}
                //onChange={(event) => setDescription(descSkipLine(event, event.target.value))}
              />    
          <DateAndTime 
            dateDeadline={dateDeadline}
            setDateDeadline={setDateDeadline}
          />
          <PriorityLevel 
            priorityLevel={priorityLevel}
            setPriorityLevel={setPriorityLevel}
          />
          <Grid>
            <Button
                className="FormButtons"
                disabled={!title} 
                type="submit" 
                onClick={addTodo} 
                variant="contained" 
                color="primary">
                Submit
            </Button>
            <Button 
                onClick={() => props.history.push('/tasks')} 
                variant="contained" 
                >
                Cancel
            </Button>
          </Grid>
        </FormControl>
      </form>
    </Grid>
    )
}

export default withRouter(form)
