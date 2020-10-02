import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
  
  export default function CircularIndeterminate() {
    const classes = useStyles();
  
    return (
      <Grid 
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{marginTop:'20%'}}
      className={classes.root}>
        Loading... <CircularProgress />
      </Grid>
    );
  }