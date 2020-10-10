import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './TodoHeader.css'
import { withRouter } from 'react-router-dom';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

function TodoHeader(props) {

  const { todos } = useContext(TodoContext);

    return (
        <div style={{marginTop:'50px' }}>
          {!todos.length ? 
              <h1 className="todoHeader"><strong>Nothing to do...</strong></h1> : 
              todos.length === 1 ? 
              <h1 className="todoHeader"><strong>You have {todos.length} thing to do!</strong></h1> :
              <h1 className="todoHeader"><strong>You have {todos.length} things to do!</strong></h1>
            } 
          <div>   
            <Tippy 
              trigger="mouseenter"
              content="Add Task"
            >      
            <AddCircleOutlineIcon 
                style={{cursor:'pointer', fontSize:"50px"}}
                onClick={() => 
                  props.history.push('/form')}
                className="addIcon" 
            />
          </Tippy>     
          </div>
        </div>
    )
}

export default withRouter(TodoHeader)
