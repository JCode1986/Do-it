import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, Button, Grid, Typography } from '@material-ui/core';
import { toast } from "react-toastify";
import firebase from 'firebase';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function ForgotPassword(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');

    function passwordResetEmail(Email) {
        firebase.auth().sendPasswordResetEmail(Email)
            .then(function (user) {
            toast.success(`Password Reset sent to ${email}`);
            props.setIsOpen(false);
            }).catch(function (e) {
            console.log(e)
        })
    }
    
    return (
        <Modal
          open={props.isOpen}
          onClose={() => props.setIsOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
            <FormControl           
                style={{position:"initial"}} 
                className={classes.paper}
            >
            <Typography
                variant="h5"
                >
                Password Reset
            </Typography>
                <TextField
                    type="email"
                    autoComplete="email"
                    autoFocus
                    multiline={true}
                    id="outlined-basic" 
                    label="Email Address" 
                    variant="outlined" 
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <Grid>
                    <Button 
                        style={{marginRight:'25px'}}
                        onClick={() => passwordResetEmail(email)}
                        variant="contained" 
                    >
                        Submit
                    </Button>
                    <Button 
                        onClick={() => props.setIsOpen(false)}
                        variant="contained" 
                    >
                        Cancel
                    </Button>
                </Grid>
            </FormControl>
        </Modal>
    )
}

export default ForgotPassword

