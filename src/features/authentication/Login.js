import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from "react-router"
import { AuthContext } from "./Auth"
import app from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ForgotPassword from '../authentication/ForgotPassword';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ( {history} ) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = useCallback(async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch(error) {
        alert(error);
      }
    }, [history]);

    const { currentUser } = useContext(AuthContext)
    
    if (currentUser) {
        return <Redirect to="/" />
    }


    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        app.auth.GoogleAuthProvider.PROVIDER_ID,
        app.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  
  return (
    <Container component="main" maxWidth="xs">
      <ForgotPassword 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form 
            className={classes.form} 
            noValidate
            onSubmit={handleLogin}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"
                onClick={() => setIsOpen(true)}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Grid  
        container
        direction="row"
        justify="center"
        alignItems="center"
      > 
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={app.auth()}
          />  
      </Grid> 
    </Container>
  );
}

export default withRouter(Login);