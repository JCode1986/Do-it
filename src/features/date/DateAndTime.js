import 'date-fns';
import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext'
import { Grid, TextField } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function DateAndTime(props) {
    const { setIsButtonDisabled, setDateDeadline, dateDeadline } = useContext(TodoContext)
    const { currentDateDeadline, setCurrentDateDeadline } = props;
    const [updatedDate, setUpdatedDate] = useState(currentDateDeadline);

    //starts date time picker with data from database
    useEffect(() => {
      setDateDeadline(currentDateDeadline);
    }, [currentDateDeadline, setDateDeadline])
      
    //Creates a date if there is nothing to update in create form
    //updates date if current date exists
    const handleDateChange = (date) => {
      if(!currentDateDeadline) {
        setDateDeadline(date._d);
        return;
      }
      if(updatedDate.toString() !== date._d.toString()) {
        console.log(currentDateDeadline.toString(), "date from database")
        console.log(date._d.toString(), "clicked date")
        setCurrentDateDeadline(date._d);
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
        setCurrentDateDeadline(updatedDate);
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