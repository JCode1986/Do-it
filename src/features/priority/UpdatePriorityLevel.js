import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormHelperText, FormControl, Select} from '@material-ui/core';

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
  
  let { updatePriorityLevel, setUpdatePriorityLevel } = props

  const handleChange = (event) => {
    setUpdatePriorityLevel(event.target.value);
  };

  

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={updatePriorityLevel}
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
