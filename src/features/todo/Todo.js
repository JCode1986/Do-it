import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext} from '../authentication/Auth';
import './Todo.css'
import DeleteApproval from '../modals/DeleteApproval'
import DetailsModal from '../modals/DetailsModal'
import UpdateModal from '../modals/UpdateModal';
import CompletedApproval from '../modals/CompletedApproval'
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import dateFormat from '../date/DateFormat'
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';
import { withRouter } from 'react-router-dom';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { 
    Paper, 
    Grid, 
    Typography,  
    Divider,
} from '@material-ui/core';
  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        width: 445,
        borderRadius: '20px',
        textAlign: 'center', 
        marginTop: '35px',
    },
    img: {
      margin: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      marginRight: '3px',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      }
  }));

function Todo(props) {
    const {todo, dateCreated, id, dateDeadline, priorityLevel, description, modifiedDate } = props.todo;

    //access to use styles
    const classes = useStyles();

    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [updateDescription, setUpdateDescription] = useState(['']);
    const [updateTitle, setUpdateTitle] = useState(['']);
    const [updateDateDeadline, setUpdateDateDeadline] = useState([new Date(Date.now())]);
    const [updatePriorityLevel, setUpdatePriorityLevel] = useState(1);
    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const due = () => {
        if(dateDeadline.toDate() <= Date.now()){
            return '(Due)'
        }
    }

    //changes priority icon color depending on level
    const changeIconColor = (priorityLevel) => {
        switch(priorityLevel) {
            case 1:
                return ( <WarningIcon className={classes.img} style={{color:'green', fontSize:'35px'}} alt="complex"/> )
            case 2:
                return ( <WarningIcon className={classes.img} style={{color:'gold', fontSize:'35px'}} alt="complex"/> )
            case 3:
                return ( <WarningIcon className={classes.img} style={{color:'red', fontSize:'35px'}} alt="complex"/> )
            default:
                break;
        }
    }

    const priorityToString = (level) => {
        if (level === 1) return "Priority Level: Low";
        if (level === 2) return "Priority Level: Medium";
        if (level === 3) return "Priority Level: High";
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

{/* Todo List */}
            <Paper className={classes.paper} 
                style={{
                    flex: '1',
                    display: 'flex', 
                    float: 'left', 
                    flexDirection:"row",
                    marginLeft: '4.3%',
                }}
            >
                <Grid container>
                    <Grid item >
                        <Tippy 
                            trigger="mouseenter"
                            content={priorityToString(priorityLevel)}
                        >
                            {changeIconColor(priorityLevel)}
                        </Tippy>
                    </Grid>
                    <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs>
                            <Tippy
                                trigger="mouseenter" 
                                content="Show Details"
                            >
                                <Typography 
                                    gutterBottom variant="h5"
                                    onClick={() => setIsDetailOpen(true)} 
                                    style={{
                                        color:'#E94435', cursor:'pointer'
                                    }}>
                                    {
                                        !due() ? <strong>{todo}</strong>
                                        :
                                        <strong style={{color:'darkRed'}}>{todo}{due()}</strong>
                                    }
                                </Typography>
                            </Tippy>
                            <Divider/>
                            <Typography 
                                style={{marginTop:'10px'}}
                                variant="body2"
                            >
                                <em><strong style={{color:'#66B032'}}>Created:</strong> {dateFormat(dateCreated.toDate().toString())}</em>
                            </Typography>
                            <Typography variant="body2">
                            <em><strong style={{color:'#FE2712'}}>Deadline:</strong> {dateFormat(dateDeadline.toDate().toString())}</em>
                            </Typography>
                        </Grid>
                        <Tippy 
                            content="Options"
                            trigger="mouseenter"
                        >
                        <MoreHorizIcon
                            className="options"
                            style={{cursor:'pointer'}}
                            onClick={handleClick}
                            />
                        </Tippy>
                         <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleOpenModal}>
                                <EditIcon 
                                        style={{color:'darkblue', cursor:'pointer', marginRight:'10px', marginBottom:'5px'}}
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handleOpenModal}
                                    />
                                <Typography
                                    style={{float:'right'}}
                                    onClick={handleOpenModal}
                                >
                                    Edit
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleOpenDeleteDialog}>
                                <DeleteForeverIcon 
                                        className="deleteIcon"
                                        style={{color:'red', cursor:'pointer', marginRight:'10px', marginBottom:'5px'}} 
                                        onClick={handleOpenDeleteDialog}   
                                />

                                <Typography  
                                    onClick={handleOpenDeleteDialog}
                                >
                                    Delete
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => setIsArchiveOpen(true)}>
                                <DoneIcon
                                    className={classes.image}
                                    style={{cursor:'pointer', marginRight:'10px', marginBottom:'5px'}}
                                    onClick={() => setIsArchiveOpen(true)}
                                />
                                <Typography
                                    onClick={() => setIsArchiveOpen(true)}
                                >Completed</Typography> 
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default withRouter(Todo);
