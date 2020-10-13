import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const { 
    setIsButtonDisabled,
    setPriorityLevel,
    priorityLevel,
    setIsNewPriorityLevel,
    isNewPriorityLevel
  } = useContext(TodoContext)
  const { setCurrentPriorityLevel, currentPriorityLevel } = props
  const [updatedPriorityLevel, setUpdatedPriorityLevel] = useState(priorityLevel);

    useEffect(() => {
      setPriorityLevel(currentPriorityLevel);
      setIsNewPriorityLevel(false);
    }, [setPriorityLevel, setIsNewPriorityLevel, currentPriorityLevel])

    const handleChange = (event) => {
    //==========================================FIX THIS========================================//
    //just need to fix button enable on change if not the same as previous value
    //create form
    if(isNewPriorityLevel) {
      setPriorityLevel(event.target.value);
      console.log("Create")
      return;
    }

    if(!isNewPriorityLevel) {
      setCurrentPriorityLevel(event.target.value);
    }

    console.log(priorityLevel, "priority level")
    console.log(currentPriorityLevel, "current level")
    console.log(updatedPriorityLevel, "updated level")

    
    //for create form
    // setPriorityLevel(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={priorityLevel}
          onChange={handleChange}
          label="Priority"
        >
          <MenuItem style={{color:"green"}} value={1}>Low</MenuItem>
          <MenuItem style={{color:"orange"}} value={2}>Medium</MenuItem>
          <MenuItem style={{color:"red"}} value={3}>High</MenuItem>
        </Select>
        <FormHelperText>Priority Level</FormHelperText>
      </FormControl>
    </div>
  );
}
