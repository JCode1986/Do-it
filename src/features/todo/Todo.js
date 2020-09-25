import React, { useState } from 'react'
import './Todo.css'
import 'firebase';
import DeleteApproval from '../modals/DeleteApproval'
import DetailsModal from '../modals/DetailsModal'
import UpdateModal from '../modals/UpdateModal';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import dateFormat from '../date/DateFormat'
import WarningIcon from '@material-ui/icons/Warning';
import { withRouter } from 'react-router-dom';
import { 
    Paper, 
    Grid, 
    Typography, 
    ButtonBase, 
} from '@material-ui/core';
  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        width: 445,
        borderRadius: '20px',
        textAlign: 'center', 
        margin: 'auto',
        marginTop: '35px',
    },
    image: {
      width: 50,
      height: 50,
    },
    img: {
      margin: 'auto',
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

    const {todo, dateCreated, id, dateDeadline, priorityLevel, description, modifiedDate } = props.todo;

    //access to use styles
    const classes = useStyles();

    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
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

    //changes priority icon color depending on level
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
            />

{/* Todo List */}
            <div className={classes.root}>
                <Paper className={classes.paper} style={{display: 'inline', float: 'left', marginLeft: '4.3%'}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm container>
                            <Grid item>
                                <ButtonBase 
                                    className={classes.image}
                                    onClick={() => setIsDetailOpen(true)}
                                >
                                {changeIconColor(priorityLevel)}
                                </ButtonBase>
                            </Grid>
                                <Grid item xs container direction="column" spacing={1}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        <strong>{todo}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom color="textSecondary">
                                        <em><strong>Created:</strong> {dateFormat(dateCreated.toDate().toString())}</em>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                    <em><strong>Deadline:</strong> {dateFormat(dateDeadline.toDate().toString())}</em>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </>
    )
}

export default withRouter(Todo);
