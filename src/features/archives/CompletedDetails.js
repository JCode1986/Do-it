import React from 'react'
import { Modal, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

function CompletedDetails(props) {

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 2, 3),
        },
    }));

    const classes = useStyles();

    return (
        <Modal
        open={props.isModalOpen}
        onClose={() => props.setIsModalOpen(false)}
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
            <CancelIcon
                style={{float:'right', cursor:'pointer'}}
                onClick={() => props.setIsModalOpen(false)}
            />
            <Typography style={{marginBottom:'10px'}}variant="h5">
                Description
            </Typography>
            <Divider/>
            <Typography style={{marginTop:'20px'}}>
                {
                    !props.description || props.description == 0 ? <Typography>No details provided...</Typography> 
                    :
                    props.description
                }
            </Typography>
            </div>
        </Modal>
    )
}

export default CompletedDetails
