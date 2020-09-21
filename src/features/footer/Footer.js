import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './Footer.css'

function Footer() {
    return (
        <div className="footer">
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
            Do it!
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
      </div>
    );
  }

export default Footer
