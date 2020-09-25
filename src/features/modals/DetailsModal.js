import React from 'react'
import { Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dateFormat from '../date/DateFormat';

function Details(props) {

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const level = (priority) => {
        if(priority === 1) {
            return 'Low';
        } else if (priority === 2) {
            return 'Medium';
        } else {
            return 'High';
        }
    }
    
    const classes = useStyles();

    return (
        <div>
            <Modal
                open={props.isDetailOpen}
                onClose={() => props.setIsDetailOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div 
                className={classes.paper}
                style={{    
                    width:'570px',  
                    maxWidth: 'auto',      
                    position:'absolute',
                    top:'50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >   
                <div>
                    <Typography style={{textAlign:'center'}}>
                        <h2>{props.todo}</h2> 
                    </Typography>
                    <Typography>
                        <em>Date Created: </em>{dateFormat(props.dateCreated.toDate().toString())}
                    </Typography>
                    {!props.modifiedDate ? 
                        <Typography>
                            <em>Date Modified: </em>N/A
                        </Typography> 
                        :
                        <Typography>
                            <em>Date Modified: </em>{dateFormat(props.modifiedDate.toDate().toString())}
                        </Typography> 
                    }
                    <Typography>
                        <em>Deadline: </em>{dateFormat(props.dateDeadline.toDate().toString())}
                    </Typography> 
                    <br/>
                    <Typography>
                    {
                        !props.description || props.description == 0?
                        <Typography><strong><em>Description: </em> <br/></strong> No details provided...</Typography>
                        :
                        <Typography><em>Description: </em> <br/> {props.description}</Typography>
                    }
                    </Typography>
                    <br/>
                    <Typography>
                        <strong><em>Priority Level: </em> <br/></strong> {level(props.priorityLevel)}
                    </Typography> 
                </div>
            </div> 
        </Modal>
      </div>
    );
}

export default Details

