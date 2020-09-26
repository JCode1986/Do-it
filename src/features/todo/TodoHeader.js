import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './TodoHeader.css'
import { withRouter } from 'react-router-dom';

function TodoHeader(props) {
    return (
        <div style={{marginTop:'50px' }}>
          {!props.todos.length ? 
              <h1 className="todoHeader"><strong>Nothing to do...</strong></h1> : 
              props.todos.length === 1 ? 
              <h1 className="todoHeader"><strong>You have {props.todos.length} thing to do!</strong></h1> :
              <h1 className="todoHeader"><strong>You have {props.todos.length} things to do!</strong></h1>
            } 
          <div>              
          <AddCircleOutlineIcon 
              style={{cursor:'pointer', fontSize:"50px"}}
              onClick={() => 
                props.history.push('/form')}
              className="addIcon" 
          />
          </div>
        </div>
    )
}

export default withRouter(TodoHeader)
