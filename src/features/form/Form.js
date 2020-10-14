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
import { AuthContext } from '../authentication/Auth';

const Form = (props) => {  
  const { currentUser } = useContext(AuthContext);
  const db = firebaseApp.firestore();

  const { 
     title,
     description,
     dateCreated,
     dateDeadline,
     priorityLevel,
     setTitle,
     setDescription,
     setDateDeadline,
     setPriorityLevel,
     setIsNewPriorityLevel
    } = useContext(TodoContext);

    useEffect(() => {
      setTitle('');
      setDescription('');
      setDateDeadline(new Date(Date.now()));
      setPriorityLevel(1);
      setIsNewPriorityLevel(true);
    }, [setTitle, setDescription, setDateDeadline, setPriorityLevel, setIsNewPriorityLevel]);

    //add to do for user
    const addTodo = (event) => {
      //stop refresh
      event.preventDefault();
      //add to db; no need for spread since a new snapshot will trigger the map in use effect
      db.collection('users').doc(currentUser.uid).collection('todos').add({
        title,
        description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        dateCreated,
        dateDeadline,
        priorityLevel
      }).then(() => {
        toast.success("New Task Created");
        cancel();
      }).catch(console.error)
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
          <DateAndTime />
          <PriorityLevel />
          <Grid>
            <Button
                className="FormButtons"
                disabled={!title || title.split('').every(char => char === ' ')} 
                type="submit" 
                onClick={addTodo} 
                variant="contained" 
                color="primary"
              >
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
