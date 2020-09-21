import React  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import firebase from "../../firebase"

const db = firebase.firestore()

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteApproval = (props) => {
  const { id } = props.todo

  const deleteToDo = (event) => {
    event.PreventDefault();
    db.collection('todos').doc(id).delete()  
  }

  return (
    <div>
      <Dialog
        open={props.showDeleteApproval}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setShowDeleteApproval(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to permanently delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteToDo} color="primary">
            Yes
          </Button>
          <Button onClick={() => props.setShowDeleteApproval(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteApproval;