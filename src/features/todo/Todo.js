import React, { useState } from 'react'
import './Todo.css'
import 'firebase';
import DeleteApproval from '../modals/DeleteApproval'
import DetailsModal from '../modals/DetailsModal'
import UpdateModal from '../modals/UpdateModal';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import dateFormat from '../date/DateFormat'
import ErrorIcon from '@material-ui/icons/Error';
import { withRouter } from 'react-router-dom';
import { 
    Paper, 
    Grid, 
    Typography, 
    ButtonBase, 
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
        //margin: 'auto',
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
      marginRight: '15px',
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

    console.log(dateDeadline.toDate() > Date.now(), "what is this?")

    const due = () => {
        if(dateDeadline.toDate() <= Date.now()){
            return '(Due)'
        }
    }

    //changes priority icon color depending on level
    const changeIconColor = (priorityLevel) => {
        switch(priorityLevel) {
            case 1:
                return ( <ErrorIcon className={classes.img} style={{color:'green'}} alt="complex"/> )
            case 2:
                return ( <ErrorIcon className={classes.img} style={{color:'gold'}} alt="complex"/> )
            case 3:
                return ( <ErrorIcon className={classes.img} style={{color:'red'}} alt="complex"/> )
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
                <Paper className={classes.paper} 
                style={{
                    flex: '1',
                    display: 'flex', 
                    float: 'left', 
                    marginLeft: '4.3%',
                    }}
                >
                        <Grid 
                            container 
                            spacing={24}                        
                        >
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
                                <Grid item>
                                    <EditIcon 
                                        style={{color:'darkblue', cursor:'pointer'}}
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handleOpenModal}
                                    />
                                    <DeleteForeverIcon 
                                        className="deleteIcon"
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
