import React, { useContext, useEffect } from 'react';
import { Button, FormControl, TextField, Grid } from '@material-ui/core';
import { TodoContext } from '../context/TodoContext';
import PriorityLevel  from '../priority/PriorityLevel';
import DateAndTime from '../date/DateAndTime'
import firebaseApp from '../../firebase';
import firebase from 'firebase';
import './Form.css'
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

const db = firebaseApp.firestore();

const Form = (props) => {  

  const { 
     title,
     description,
     dateCreated,
     dateDeadline,
     priorityLevel,
     setTitle,
     setDescription,
     setDateDeadline,
     setPriorityLevel 
    } = useContext(TodoContext);

    useEffect(() => {
      setTitle('');
      setDescription('');
      setDateDeadline(new Date(Date.now()));
      setPriorityLevel(1);
    }, [setTitle, setDescription, setDateDeadline, setPriorityLevel])
    //add to do
    const addTodo = (event) => {
      //stop refresh
      event.preventDefault();
      //add to db; no need for spread since a new snapshot will trigger the map in use effect
      db.collection('todos').add({
        title: title,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        dateCreated: dateCreated,
        dateDeadline: dateDeadline,
        priorityLevel: priorityLevel
      })
      toast.success("New Task Created");
      cancel();
    }

    const cancel = () => {
      setTitle('');
      setDescription('');
      setDateDeadline(new Date(Date.now()));
      setPriorityLevel(1);
      props.history.push('/tasks');
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
        <h1 style={{marginTop:'40px', marginBottom:0}}>Create</h1>
        <form>
          <FormControl>
              <TextField
                inputProps={{ maxLength: 15 }}
                required
                id="outlined-basic" 
                label="Title" 
                variant="outlined" 
                helperText="Required: 15 chars max length"
                value={capitalizeFirstLetter(title)}
                onChange={event => setTitle(event.target.value)}
                />
              <TextField 
                multiline={true}
                id="outlined-basic" 
                label="Details" 
                variant="outlined" 
                value={description}
                onChange={event => setDescription(event.target.value)}
              />    
          <DateAndTime 
            dateDeadline={dateDeadline}
            setDateDeadline={setDateDeadline}
            dateCreated={dateCreated}
          />
          <PriorityLevel 
            priorityLevel={priorityLevel}
            setPriorityLevel={setPriorityLevel}
          />
          <Grid>
            <Button
                className="FormButtons"
                disabled={!title || title.split('').every(char => char === ' ')} 
                type="submit" 
                onClick={addTodo} 
                variant="contained" 
                color="primary">
                Submit
            </Button>
            <Button 
                onClick={cancel} 
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

export default withRouter(Form)
