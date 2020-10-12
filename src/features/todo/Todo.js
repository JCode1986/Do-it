import React, { useState, useContext } from 'react';
import './Todo.css';
import { TodoContext } from '../context/TodoContext';
import TodoDetails from '../todo/TodoDetails';
import DeleteApproval from '../modals/DeleteApproval'
import DetailsModal from '../modals/DetailsModal'
import UpdateModal from '../modals/UpdateModal';
import CompletedApproval from '../modals/CompletedApproval'
import { withRouter } from 'react-router-dom';

function Todo(props) {
    //const { setTitle, setDescription, setDateDeadline, setPriorityLevel } = useContext(TodoContext);
    const {title, dateCreated, id, dateDeadline, priorityLevel, description, modifiedDate } = props.todo;
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
        handleClose();
    }

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        handleClose();
    }

    return (
        <>
            <DetailsModal
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                title={title}
                description={description}
                dateDeadline={dateDeadline}
                priorityLevel={priorityLevel}
                modifiedDate={modifiedDate}
                dateCreated={dateCreated}
            />
            <DeleteApproval 
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                handleCloseDeleteDialog={handleCloseDeleteDialog}
                id={id}
            />
            <CompletedApproval 
                isArchiveOpen={isArchiveOpen}
                setIsArchiveOpen={setIsArchiveOpen}
                title={title}
                description={description}
                dateCreated={dateCreated}
                modifiedDate={modifiedDate}
                dateDeadline={dateDeadline}
                priorityLevel={priorityLevel}
                id={id}
                handleClose={handleClose}
            />
            <UpdateModal 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                todo={props.todo}
            />
            <TodoDetails
                priorityLevel={priorityLevel}
                setIsDetailOpen={setIsDetailOpen}
                title={title}
                dateCreated={dateCreated}
                dateDeadline={dateDeadline}
                handleClick={handleClick}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleOpenModal={handleOpenModal}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                setIsArchiveOpen={setIsArchiveOpen}
            />
        </>
    )
}

export default withRouter(Todo);
