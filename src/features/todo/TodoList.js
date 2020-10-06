import React, { useState } from 'react';
import './TodoList.css';
import TodoDetails from '../todo/TodoDetails';
import DeleteApproval from '../modals/DeleteApproval'
import DetailsModal from '../modals/DetailsModal'
import UpdateModal from '../modals/UpdateModal';
import CompletedApproval from '../modals/CompletedApproval'
import { withRouter } from 'react-router-dom';
  
function Todo(props) {
    
    const {todo, dateCreated, id, dateDeadline, priorityLevel, description, modifiedDate } = props.todo;
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [updateDescription, setUpdateDescription] = useState(['']);
    const [updateTitle, setUpdateTitle] = useState(['']);
    const [updateDateDeadline, setUpdateDateDeadline] = useState([new Date(Date.now())]);
    const [updatePriorityLevel, setUpdatePriorityLevel] = useState(1);
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
                todo={todo}
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
                todo={todo}
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
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                setModalIsOpen={setModalIsOpen}
                todo={todo}
                id={id}
                title={props.title}
                modifiedDate={props.modifiedDate}
                setModifiedDate={props.setModifiedDate}
                dateDeadline={dateDeadline}
                priorityLevel={priorityLevel}
                description={description}
                updateTitle={updateTitle}
                updateDescription={updateDescription}
                updateDateDeadline={updateDateDeadline}
                updatePriorityLevel={updatePriorityLevel}
                setUpdateTitle={setUpdateTitle}
                setUpdateDescription={setUpdateDescription}
                setUpdateDateDeadline={setUpdateDateDeadline}
                setUpdatePriorityLevel={setUpdatePriorityLevel}
                handleClose={handleClose}
            />

            <TodoDetails
                priorityLevel={priorityLevel}
                setIsDetailOpen={setIsDetailOpen}
                todo={todo}
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
