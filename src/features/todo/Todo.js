import React, { useState } from 'react'
import './Todo.css'
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal, FormControl } from '@material-ui/core';
import db from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

//from material ui; this is how to style in material ui
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      marginTop:'6%',
      marginLeft: '36%',
      marginRight: '33%',
      border: '1px solid',
      padding: '10px',
      boxShadow: '5px 10px 8px 10px darkgrey',
      borderRadius: '8px',
      display:'inline-block'
    },
  }));

function Todo(props) {
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
                        <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
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
            <List className="todo_list">
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Deadline Date"/>
                    <ListItemText primary={props.todo.description} />
                    {console.log(props.todo, 'what is this')}
                </ListItem>
                <EditIcon 
                    style={{color:'darkblue', cursor:'pointer'}}
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpenModal}
                />
                <DeleteForeverIcon 
                    style={{color:'red', cursor:'pointer'}}
                    onClick={event => db.collection('todos').doc(props.todo.id).delete()} 
                />
            </List>
        </>
    )
}

export default Todo
