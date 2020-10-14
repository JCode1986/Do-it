import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './Footer.css'

function Footer(props) {
    const { setIsVideoPlaying } = useContext(TodoContext);
    const playVideo = () => {
      setIsVideoPlaying(true);
      props.history.push("/do-it");
    }

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
              onClick={playVideo}
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

export default withRouter(Footer)
