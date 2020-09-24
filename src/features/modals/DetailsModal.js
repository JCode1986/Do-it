import React from 'react'
import { Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
                width:'auto',        
                position:'absolute',
                top:'50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >   
                <Typography>
                    <h2>Details</h2>
                    <p>{!props.description ? "No details..." : props.description}</p>
                </Typography>
            </div> 
        </Modal>
      </div>
    );
}

export default Details

