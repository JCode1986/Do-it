import React from 'react'
import { Modal, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dateFormat from '../date/DateFormat';
import CancelIcon from '@material-ui/icons/Cancel';

function Details(props) {

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            //padding: theme.spacing(2, 2, 3),
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
                <CancelIcon
                    style={{
                        float:'right', 
                        cursor:'pointer', 
                        marginTop:'5px',
                        marginRight: '5px'
                    }}
                    onClick={() => props.setIsDetailOpen(false)}
                />
                <div>
                    <Typography 
                        className='detailHeader'
                        style={{
                            textAlign:'center',                         
                            marginBottom: '10px !important',
                            marginTop: '0px',
                            paddingTop: '1px', 
                            color:'#49120D', 
                            backgroundColor:'lightblue',
                            borderBottom: '1px solid black',
                        }}
                    >
                        <h2 
                            style={{marginLeft: '20px',}}
                        >
                            {props.todo}       
                        </h2> 
                    </Typography>
                    <Typography style={{marginTop:'10px'}}>
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
                    <Typography style={{marginBottom:'10px'}}>
                        <em>Deadline: </em>{dateFormat(props.dateDeadline.toDate().toString())}
                    </Typography> 
                    <Divider/>
                    <Typography style={{marginBottom:'10px', marginTop:'10px', paddingLeft:'20px', paddingRight:'20px'}}>
                    {
                        !props.description || props.description == 0?
                        <Typography><strong><em>Description: </em> <br/></strong> No details provided...</Typography>
                        :
                        <Typography><strong><em>Description: </em> <br/></strong> {props.description}</Typography>
                    }
                    </Typography>
                    <Divider/>
                    <Typography style={{marginTop:'10px', marginBottom:'10px'}}>
                        <strong><em>Priority Level: </em> <br/></strong> {level(props.priorityLevel)}
                    </Typography> 
                </div>
            </div> 
        </Modal>
      </div>
    );
}

export default Details

