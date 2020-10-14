import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './Footer.css'

function Footer() {
    const { setIsVideoPlaying } = useContext(TodoContext)
    return (
        <div className="footer">
        <Typography 
          variant="body2"  
          align="center"
          style={{marginTop:'20px', marginBottom:'20px'}}
          >
            {'Copyright © '}
            <Link 
              color="inherit" 
              onClick={() => setIsVideoPlaying(true)}
              style={{cursor:"pointer"}}
            >
            Do it!
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
      </div>
    );
  }

export default Footer
