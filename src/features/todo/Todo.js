import React, { useState } from 'react'
import './Todo.css'
import { Button, Modal, FormControl } from '@material-ui/core';
import db from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import timeConverter from '../date/TimeConverter'

//from material ui; this is how to style in material ui
// const useStyles = makeStyles((theme) => ({
//     paper: {
//       position: 'absolute',
//       width: 400,
//       backgroundColor: theme.palette.background.paper,
//       border: '2px solid #000',
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//       marginTop:'6%',
//       marginLeft: '36%',
//       marginRight: '33%',
//       borderRadius: '8px',
//       display:'inline-block'
//     },
//   }));

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

function Todo(props) {

    const {todo, date, id, dateDeadline} = props.todo;

    //access to use styles
    const classes = useStyles();

    const [isModalOpen, setModalIsOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const updateTodo = () => {
        //update todo with new input text
        db.collection('todos').doc(props.todo.id).set({
        todo: input,
        description: input
        //prevents from overiding in firebase
        }, { merge: true})
        setModalIsOpen(false);
    }

    console.log(dateDeadline, "what is this")

    return (
        <>
            <Modal 
                className="Modal"
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form className={classes.paper}>
                    <FormControl>
                        <h1>I am a model</h1>
                        <input 
                            placeholder={todo} 
                            value={input} 
                            onChange={event => setInput(event.target.value)} 
                        />
                        <ul>
                            <li>
                                <Button 
                                    disabled={!input}
                                    variant="contained" 
                                    style={{color:'red'}} 
                                    onClick={updateTodo}
                                >Update</Button>
                            </li>
                            <li>
                                <Button 
                                    variant="contained" 
                                    onClick={handleCloseModal}
                                >Cancel</Button>
                            </li>
                        </ul>
                    </FormControl>
                </form>
            </Modal> 
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={1}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5">
                                <strong>{todo}</strong>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <em>Date created: {date}</em>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Deadline: {dateDeadline.nanoseconds}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <EditIcon 
                                style={{color:'darkblue', cursor:'pointer'}}
                                variant="contained" 
                                color="primary" 
                                onClick={handleOpenModal}
                            />
                            <DeleteForeverIcon 
                                style={{color:'red', cursor:'pointer'}}
                                onClick={event => db.collection('todos').doc(id).delete()} 
                            />
                        </Grid>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1">
                            <MoreHorizIcon/>
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
            </div>
        </>
    )
}

export default Todo
