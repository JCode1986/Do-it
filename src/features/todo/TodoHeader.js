import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { withRouter } from 'react-router-dom';

function TodoHeader(props) {
    return (
        <div>
        {!props.todos.length ? 
            <h1><strong>Nothing to do...</strong></h1> : 
            props.todos.length === 1 ? 
            <h1><strong>You have {props.todos.length} thing to do!</strong></h1> :
            <h1><strong>You have {props.todos.length} things to do!</strong></h1>
          } 
          <div>              
          <AddCircleOutlineIcon 
              style={{cursor:'pointer', marginTop:'20px'}}
              onClick={() => 
                props.history.push('/form')}
              className="addIcon" 
          />
          </div>
        </div>
    )
}

export default withRouter(TodoHeader)
