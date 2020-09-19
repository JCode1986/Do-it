import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {

    const handleDateChange = (date) => {
      props.setDateDeadline(date._d);
    }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="center">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Deadline Date"
                value={props.dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change date',}}
            />
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Deadline Time"
                value={props.dateDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}