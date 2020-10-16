import React from 'react'
import { Modal, Typography, Divider, Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import '../modals/Modal.css'

function CompletedDetails(props) {
    return (
        <Modal
        open={props.isModalOpen}
        onClose={() => props.setIsModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
         >
            <Grid 
                className="InsideModal"
                style={{ width:'30%' }}
            >  
             <div className="ModalHeaderBackground" style={{backgroundColor:"#7ed957"}}>
                <CancelIcon className="CancelIcon"
                    // style={{float:'right', cursor:'pointer', marginRight:'8px', marginTop:'8px'}}
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
