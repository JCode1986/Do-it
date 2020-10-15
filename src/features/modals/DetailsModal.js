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
            backgroundColor: 'white'
            // backgroundColor: theme.palette.background.paper,
            // border: '2px solid #000',
            // boxShadow: theme.shadows[5],
        },
    }));

    const classes = useStyles();
    const priority = () => {
        if(props.priorityLevel === 1) return "Low";
        if(props.priorityLevel === 2) return "Medium";
        if(props.priorityLevel === 3) return "High";
    }

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
                    transform: 'translate(-50%, -50%)',
                    outline:'none',
                    borderRadius:'20px',
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
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
                    <div 
                        className='detailHeader'
                        style={{
                            textAlign:'center',                         
                            marginBottom: '10px !important',
                            paddingBottom: '1px',
                            marginTop: '0px',
                            paddingTop: '1px', 
                            color:'#49120D', 
                            backgroundColor:'lightblue',
                            borderTopLeftRadius:"20px", 
                            borderTopRightRadius:"20px"
                        }}
                    >
                        <h1
                            variant='h4'
                            style={{marginLeft: '20px',}}
                        >                 
                            {props.title}  
                        </h1>  
                        <Divider/>   
                    </div>
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
                    <div style={{marginBottom:'10px', marginTop:'10px', paddingLeft:'20px', paddingRight:'20px'}}>
                    {
                        !props.description || props.description === 0?
                        <Typography><strong><em>Details: </em> <br/></strong> No details provided...</Typography>
                        :
                        <Typography><strong><em>Details: </em> <br/></strong> {props.description}</Typography>
                    }
                    </div>
                    <Divider/>
                    <Typography style={{marginTop:'10px', marginBottom:'10px'}}>
                        <strong><em>Priority Level: </em> <br/></strong> {priority(props.priorityLevel)}
                    </Typography> 
                </div>
            </div> 
        </Modal>
      </div>
    );
}

export default Details

