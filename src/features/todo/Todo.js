import React, { useState } from 'react'
import './Todo.css'
import { Button, Modal, FormControl, TextField, Dialog } from '@material-ui/core';
import firebaseApp  from '../../firebase';
import 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import dateFormat from '../date/DateFormat'
import WarningIcon from '@material-ui/icons/Warning';
import DeleteApproval from "../modals/DeleteApproval"
import DateAndTime from '../date/DateAndTime';
import PriorityLevel from '../priority/PriorityLevel'
import Slide from '@material-ui/core/Slide';

const db = firebaseApp.firestore();

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'inline-block',
      borderRadius: '20px !important',
      transform: 'scale(1.03)',
      transitionDuration: 0.5,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '20px',
      maxWidth: 500,
      display: 'inline-block',
      borderRadius: '20px !important',
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
      fontSize: '90px',
    },
  }));

function Todo(props) {

    const {todo, dateCreated, id, dateDeadline, priorityLevel} = props.todo;

    //access to use styles
    const classes = useStyles();

    const [isModalOpen, setModalIsOpen] = useState(false);
    const [updateDescription, setUpdateDescription] = useState(['']);
    const [updateTitle, setUpdateTitle] = useState(['']);
    const [showDeleteApproval, setShowDeleteApproval] = useState(false);
    const [updateDate, setUpdateDate] = useState([new Date(Date.now())]);
    const [updateDateDeadline, setUpdateDateDeadline] = useState([new Date(Date.now())]);
    const [updatePriorityLevel, setUpdatePriorityLevel] = useState(1);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const updateTodo = () => {
        //update todo with new input text
        db.collection('todos').doc(props.todo.id).set({
        todo: updateTitle,
        description: updateDescription
        //prevents from overiding in firebase
        }, { merge: true})
        setModalIsOpen(false);
    }

    // const showDeleteDialogue = () => {
    //     setShowDeleteApproval(true);
    //     if(showDeleteApproval) {
    //         return <DeleteApproval
    //         showDeleteApproval={showDeleteApproval}
    //         setshowDeleteApproval={setShowDeleteApproval}
    //         todo={todo}
    //         />
    //     }
    // }

    console.log(showDeleteApproval, "dialogue")

    const changeIconColor = (priorityLevel) => {
        switch(priorityLevel) {
            case 1:
                return ( <WarningIcon className={classes.img} style={{color:'green'}} alt="complex"/> )
            case 2:
                return ( <WarningIcon className={classes.img} style={{color:'gold'}} alt="complex"/> )
            case 3:
                return ( <WarningIcon className={classes.img} style={{color:'red'}} alt="complex"/> )
            default:
                break;
        }
    }

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
                            value={updateTitle} 
                            onChange={event => setUpdateTitle(event.target.value)} 
                        />
                        <input 
                            placeholder={todo} 
                            value={updateDescription} 
                            onChange={event => setUpdateDescription(event.target.value)} 
                        />
                        <ul>
                            <li>
                                <Button 
                                    disabled={!updateTitle} 
                                    variant="contained" 
                                    type="submit" 
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
                        {changeIconColor(priorityLevel)}
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5">
                                <strong>{todo}</strong>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <em>Date created: {dateFormat(dateCreated.toDate().toString())}</em>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <em>Deadline: {dateFormat(dateDeadline.toDate().toString())}</em>
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
                                // onClick={() => {
                                //     setShowDeleteApproval(true);
                                //     if(showDeleteApproval) {
                                //         return <DeleteApproval
                                //         showDeleteApproval={showDeleteApproval}
                                //         setshowDeleteApproval={setShowDeleteApproval}
                                //         todo={todo}
                                //         />
                                //     }
                                // }}               
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
