import 'date-fns';
import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function DateAndTime(props) {
    const {dateDeadline, setDateDeadline, dateCreated } = props;

    const handleDateChange = (date) => {
      if(date._d < dateCreated) return null;
      setDateDeadline(date._d);
      console.log(date._d)
    }

    const TextFieldComponent = (props) => {
      return <TextField {...props} disabled={true} />
    }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="center">
            <KeyboardDatePicker
                disableToolbar
                //disabled
                invalidDateMessage="Invalid Date Format"
                disablePast="true"
                animateYearScrolling="true"
                autoOk="true"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Deadline Date"
                value={dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change date',}}
                TextFieldComponent={TextFieldComponent}
            />
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                disablePast="true"
                label="Deadline Time"
                value={dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
                TextFieldComponent={TextFieldComponent}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}