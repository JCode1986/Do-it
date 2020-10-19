import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import { Modal, Typography, Divider } from '@material-ui/core';
import dateFormat from '../date/DateFormat';
import ClearIcon from '@material-ui/icons/Clear';

function Details(props) {
    const { width } = useContext(TodoContext);
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
                className="InsideModal"
                style={{ width: width < 500 ? "100%" : "600px" }}
            >   
                <ClearIcon
                    className="CancelIcon"
                    onClick={() => props.setIsDetailOpen(false)}
                />
                <div>
                    <div 
                        className='ModalHeaderBackground'
                        style={{backgroundColor:"#7ed957"}}
                    >
                        <h1
                            variant='h4'
                            className="ModalHeader"
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

