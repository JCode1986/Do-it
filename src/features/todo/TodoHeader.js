import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './TodoHeader.css'
import { Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom';

function TodoHeader(props) {
    return (
        <div style={{marginTop:'50px' }}>
          <div className="todoHeader">
          {!props.todos.length ? 
              <h1 style={{color:'#0D2949'}}><strong>Nothing to do...</strong></h1> : 
              props.todos.length === 1 ? 
              <h1><strong>You have {props.todos.length} thing to do!</strong></h1> :
              <h1><strong>You have {props.todos.length} things to do!</strong></h1>
            } 
          </div>
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
