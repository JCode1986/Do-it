import 'date-fns';
import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

function UpdateDateAndTime(props) {
    const {updateDateDeadline, setUpdateDateDeadline, dateDeadline } = props;

    useEffect(() => {
      setUpdateDateDeadline(dateDeadline.toDate());
    }, [setUpdateDateDeadline, dateDeadline])

    const handleUpdateDateChange = (date) => {
        setUpdateDateDeadline(date._d)
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
                variant="inline"
                disablePast="true"
                animateYearScrolling="true"
                autoOk="true"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                defaultValue={updateDateDeadline}
                value={updateDateDeadline}
                onChange={handleUpdateDateChange}
                KeyboardButtonProps={{'aria-label': 'change date',}}
                TextFieldComponent={TextFieldComponent}
            />
            <KeyboardTimePicker
                margin="normal"
                helperText={'Deadline Time'}
                id="time-picker"
                //defaultValue={updateDateDeadline}
                value={updateDateDeadline}
                onChange={handleUpdateDateChange}
                KeyboardButtonProps={{'aria-label': 'change time',}}
                TextFieldComponent={TextFieldComponent}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default UpdateDateAndTime
