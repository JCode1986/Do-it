import 'date-fns';
import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext'
import { Grid, TextField } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function DateAndTime(props) {
    const { setIsButtonDisabled } = useContext(TodoContext)
    const { dateDeadline, setDateDeadline } = props;
    const [ currentDateDeadline, setCurrentDateDeadline ] = useState(dateDeadline)

    const handleDateChange = (date) => {
      if (currentDateDeadline.toString() !== date._d.toString()){
          setDateDeadline(date._d);
          setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
        setDateDeadline(date._d);
      }
    }

    const TextFieldComponent = (props) => {
      return <TextField {...props} disabled={true} />
    }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="center">
            <KeyboardDatePicker
                disableToolbar
                helperText={'Deadline Date'}
                disablePast="true"
                animateYearScrolling="true"
                autoOk="true"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change date',}}
                TextFieldComponent={TextFieldComponent}
            />
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                disablePast="true"
                helperText={"Deadline Time"}
                value={dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
                TextFieldComponent={TextFieldComponent}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}