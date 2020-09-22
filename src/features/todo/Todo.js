import React, { useState } from 'react'
import './Todo.css'
import firebaseApp  from '../../firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import dateFormat from '../date/DateFormat'
import WarningIcon from '@material-ui/icons/Warning';
import UpdateDateAndTime from '../date/UpdateDateAndTime';
import UpdatePriorityLevel from '../priority/UpdatePriorityLevel';
import { 
    Button, 
    FormControl, 
    TextField, 
    Paper, 
    Grid, 
    Typography, 
    ButtonBase, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Slide,
    DialogContentText
} from '@material-ui/core';

const db = firebaseApp.firestore();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'inline-block',
      borderRadius: '20px !important',
    },
    paper: {
      padding: theme.spacing(2),
      margin: '20px',
      maxWidth: 500,
      borderRadius: '20px',
    
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      }
  }));

function Todo(props) {

    const {todo, dateCreated, id, dateDeadline, priorityLevel} = props.todo;

    //access to use styles
    const classes = useStyles();

    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [updateDescription, setUpdateDescription] = useState(['']);
    const [updateTitle, setUpdateTitle] = useState(['']);
    const [updateDateDeadline, setUpdateDateDeadline] = useState([new Date(Date.now())]);
    const [updatePriorityLevel, setUpdatePriorityLevel] = useState(1);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }


    const updateTodo = () => {
        //update todo with new input text
        db.collection('todos').doc(props.todo.id).set({
        todo: updateTitle,
        description: updateDescription,
        dateDeadline: updateDateDeadline,
        priorityLevel: updatePriorityLevel,
        modifiedDate: firebase.firestore.FieldValue.serverTimestamp(),
        //prevents from overiding in firebase
        }, { merge: true})
        setModalIsOpen(false);
    }

    const deleteTodo = () => {
        db.collection('todos').doc(id).delete()
        setIsDeleteDialogOpen(false);
    }

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
{/* Update */}
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            >
                <form>
                    <FormControl>
                        <Dialog 
                            keepMounted
                            open={isModalOpen} 
                            onClose={handleCloseModal} 
                            aria-labelledby="form-dialog-title"
                            TransitionComponent={Transition}
                        >
                            <DialogTitle id="form-dialog-title">Update</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        required
                                        autoFocus
                                        input
                                        label="Title" 
                                        defaultValue={props.todo.todo}
                                        margin="dense"
                                        id="name"
                                        type="email"
                                        fullWidth
                                        value={updateTitle} 
                                        onChange={event => setUpdateTitle(event.target.value)} 
                                    />
                                    <TextField 
                                        multiline={true}
                                        id="outlined-basic" 
                                        label="Description" 
                                        variant="outlined" 
                                        value={updateDescription}
                                        onChange={event => setUpdateDescription(event.target.value)}
                                    />
                                           <UpdateDateAndTime 
                                                updateDateDeadline={updateDateDeadline}
                                                setUpdateDateDeadline={setUpdateDateDeadline}
                                            />
                                            <UpdatePriorityLevel 
                                                updatePriorityLevel={updatePriorityLevel}
                                                setUpdatePriorityLevel={setUpdatePriorityLevel}
                                            />    
                                </DialogContent>
                            <DialogActions>
                        <Button 
                            disabled={!updateTitle} 
                            type="submit" 
                            onClick={updateTodo} 
                            color="primary"
                            variant="contained" 
                            >
                            Update
                        </Button>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                        </Button>
                        </DialogActions>
                    </Dialog>
                </FormControl>
            </form>

{/* Delete */}
            <Dialog
                open={isDeleteDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to permanently delete this task?
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                <Button 
                    onClick={deleteTodo} 
                    color="primary"
                >
                    Yes
                </Button>
                <Button 
                    onClick={handleCloseDeleteDialog} 
                    color="primary"
                >
                    No
                </Button>
                </DialogActions>
            </Dialog>

{/* Todo List */}
        </Grid>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={1}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        {changeIconColor(priorityLevel)}
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={1}>
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
                                    onClick={handleOpenDeleteDialog}            
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
