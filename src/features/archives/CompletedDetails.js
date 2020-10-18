import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import { Modal, Typography, Divider, Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import '../modals/Modal.css'

function CompletedDetails(props) {
    const { width } = useContext(TodoContext);
    return (
        <Modal
        open={props.isModalOpen}
        onClose={() => props.setIsModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
         >
            <Grid 
                className="InsideModal"
                style={{ width: width < 500 ? "100%" : "30%" }}
            >  
             <div className="ModalHeaderBackground" style={{backgroundColor:"#7ed957"}}>
                <CancelIcon className="CancelIcon"
                    onClick={() => props.setIsModalOpen(false)}
                />
                <Typography className="ModalHeader" style={{ marginBottom:"15px" }}variant="h5">
                    Details
                </Typography>
            </div>
            <Divider/>
            <Typography style={{marginTop:'20px', marginBottom:'20px'}}>
                {
                    !props.description || props.description === 0 ? <Typography>No details provided...</Typography> 
                    :
                    props.description
                }
            </Typography>
            </Grid>
        </Modal>
    )
}

export default CompletedDetails
