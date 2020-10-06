import React from 'react'
import { changeIconColor, priorityToString } from '../priority/priorityFunctions';
import Countdown from '../date/Countdown';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import dateFormat from '../date/DateFormat'
import DoneIcon from '@material-ui/icons/Done';
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

function TodoDetails(props) {

    const classes = useStyles();
    
    return (
        <Paper className={classes.paper} 
        style={{
            flex: '1',
            display: 'flex', 
            float: 'left', 
            flexDirection:"row",
            marginLeft: 0.041 * window.innerWidth
        }}
    >
        <Grid container>
            <Grid item >
                <Tippy 
                    trigger="mouseenter"
                    content={priorityToString(props.priorityLevel)}
                >
                    {changeIconColor(props.priorityLevel)}
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
                            onClick={() => props.setIsDetailOpen(true)} 
                            style={{
                                color:'#E94435', cursor:'pointer'
                            }}>
                            <strong>{props.todo}</strong>
                        </Typography>
                    </Tippy>
                    <Divider/>
                    <Typography 
                        style={{marginTop:'10px'}}
                        variant="body2"
                    >
                        <em><strong style={{color:'#66B032'}}>Created:</strong> {dateFormat(props.dateCreated.toDate().toString())}</em>
                    </Typography>
                    <Typography variant="body2">
                    <em><strong style={{color:'#FE2712'}}>Deadline:</strong> {dateFormat(props.dateDeadline.toDate().toString())}</em>
                    </Typography>
                    <Countdown 
                        dateDeadline={props.dateDeadline}
                    />
                </Grid>
                <Tippy 
                    content="Options"
                    trigger="mouseenter"
                >
                <MoreHorizIcon
                    className="options"
                    style={{cursor:'pointer'}}
                    onClick={props.handleClick}
                    />
                </Tippy>
                <Menu
                    id="simple-menu"
                    anchorEl={props.anchorEl}
                    keepMounted
                    open={Boolean(props.anchorEl)}
                    onClose={props.handleClose}
                >
                    <MenuItem onClick={props.handleOpenModal}>
                        <EditIcon 
                                style={{color:'darkblue', cursor:'pointer', marginRight:'10px', marginBottom:'5px'}}
                                variant="contained" 
                                color="primary" 
                                onClick={props.handleOpenModal}
                            />
                        <Typography
                            style={{float:'right'}}
                            onClick={props.handleOpenModal}
                        >
                            Edit
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={props.handleOpenDeleteDialog}>
                        <DeleteForeverIcon 
                                className="deleteIcon"
                                style={{color:'red', cursor:'pointer', marginRight:'10px', marginBottom:'5px'}} 
                                onClick={props.handleOpenDeleteDialog}   
                        />

                        <Typography  
                            onClick={props.handleOpenDeleteDialog}
                        >
                            Delete
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => props.setIsArchiveOpen(true)}>
                        <DoneIcon
                            className={classes.image}
                            style={{cursor:'pointer', marginRight:'10px', marginBottom:'5px'}}
                            onClick={() => props.setIsArchiveOpen(true)}
                        />
                        <Typography
                            onClick={() => props.setIsArchiveOpen(true)}
                        >Completed</Typography> 
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    </Paper>
    )
}

export default TodoDetails
