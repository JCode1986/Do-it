import React, { useState } from 'react'
import './Todo.css'
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal } from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Todo(props) {

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
            todo: input
            //prevents from overiding in firebase
            }, { merge: true})
            setModalIsOpen(false);
        }

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <h1>I am a model</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                    <Button onClick={updateTodo}>Update</Button>
                </div>
            </Modal>
            <List className="todo_list">
                <ListItem>
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Deadline"/>
                </ListItem>
                <button onClick={handleOpenModal}>Update</button>
                <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
            </List>
        </>
    )
}

export default Todo
