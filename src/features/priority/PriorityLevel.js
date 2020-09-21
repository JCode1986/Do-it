import React, { useState }from 'react';
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
  
  let { priorityLevel, setPriorityLevel } = props

  const handleChange = (event) => {
    setPriorityLevel(event.target.value);
    console.log(event.target.value, "what is this?")
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
        <FormHelperText>Priority Level Required</FormHelperText>
      </FormControl>
    </div>
  );
}
