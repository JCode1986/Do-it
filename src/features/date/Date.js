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

  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(Date.now());

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

    const handleDateChange = (date) => {
      props.setDateDeadline(props.dateDeadline);
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
                value={props.timeDeadline}
                onChange={handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}