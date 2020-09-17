import React, { useState }  from 'react'
import { Button, FormControl, InputLabel, Input, TextField } from '@material-ui/core';

const form = (props) => {

    return (
        <form>
        <FormControl>
          <InputLabel>Write something here</InputLabel>
          <TextField id="outlined-basic" label="Write something here" variant="outlined" />
          <Input value={props.input} onChange={event => props.setInput(event.target.value)}/>
        </FormControl>
  
        <Button disabled={!props.input} type="submit" onClick={props.addTodo} variant="contained" color="primary">
              Add Todo
        </Button>
      </form>
    )
}

export default form
