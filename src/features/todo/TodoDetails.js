import React, { useRef } from 'react'
import { changeIconColor, priorityToString } from '../priority/priorityFunctions';
import { makeStyles } from '@material-ui/core/styles';
import Countdown from '../date/Countdown';
import './TodoDetails.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import dateFormat from '../date/DateFormat'
import DoneIcon from '@material-ui/icons/Done';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 2,
    },
    paper: {
        padding: theme.spacing(2),
        width: 385,
        borderRadius: '20px',
        textAlign: 'center', 
        marginTop: '35px',
        marginLeft: '50px',
        marginRight: '50px',
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
    const iElement = useRef(null);
    
    const menu = () => {
        props.handleOpenModal();
        iElement.current.focus();
    }

    return (
        <Paper id="CardContainer" className={classes.paper}>
            <Grid container>
                <Grid item xs={1}>
                    <Tippy 
                        trigger="mouseenter"
                        content={priorityToString(props.priorityLevel)}
                    >
                        {changeIconColor(props.priorityLevel)}
                    </Tippy>
                </Grid>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                                <Typography
                                    variant="h5"
                                    className="title"
                                >
                                    <Tippy
                                        trigger="mouseenter" 
                                        content="Show Details"
                                    >
                                        <strong
                                            onClick={() => props.setIsDetailOpen(true)} 
                                            style={{ color:'#E94435', cursor:'pointer' }}
                                        >
                                            {props.title}
                                        </strong>
                                    </Tippy>
                                </Typography>
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
                        ref={iElement}
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
