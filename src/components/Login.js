import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
//import 'firebase/auth';
import Typography from '@material-ui/core/Typography';
import logo from '../imgs/transLogo.png';
import { auth } from './FirebaseConfig/Fire';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase/app';

const styles = theme => ({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    color: 'white',
    marginTop: 10,
    margin: theme.spacing.unit,
  },
  error: {
    color: "red",
    marginTop: 10
  },
  resetButton: {
    onClick: 'true',
    textAlign: 'center',
    color: '#2a7fff',
  },
  popup: {
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '100px !important',
    margin: 'auto',
    'max-width': '800px',
    'max-height': '800px',
  },
  logo: {
    color: 'black',
    'max-width': '100px',
    'max-height': '100px',
    margin: 'auto',
    display: 'block',
    position: 'center',
  },
  field: {
    textAlign: 'left',
    margin: 'auto',
    paddingBottom: 10,
    width: '75%',
  },
});

class LoginBase extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.auth === true) {
      this.props.history.push('/home');
    }

    this.state = {
      username: '',
      password: '',
      error: '',
      forgotPass: '',
      open: false,
      ans1: '',
      ans2: '',
      openSec: false,
    }

  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      error: '',
      forgotPass: '',
      openSec: false,
    });
  };


  handleQuestions = () => {
    this.handleClose();
    this.setState({
      openSec: true,
    })

    var users = this.collectUsers();

  }

  async collectUsers() {
    const snapshot = await firebase.firestore().collection('users').get();
    return snapshot.docs.map(doc => doc.data());
  }

  handleLogin = event => {
    //Firebase login here
    var that = this;
    auth.signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(function (firebaseUser) {
        if (firebaseUser) {
          that.props.history.push('/home');
        }
      })
      .catch(function (error) {
        var errorCode = error.code;

        switch (errorCode) {

          case ('auth/invalid-email'): {
            that.setState({
              error: "The email address you have entered is in the incorrect format."
            });
            break;
          }
          case ('auth/user-disabled'): {
            that.setState({
              error: "Your user account has been disabled. Please sign in with another account."
            });
            break;
          }
          case ('auth/user-not-found'): {
            that.setState({
              error: "A user account with that email does not exist. Please sign up."
            });
            break;
          }
          case ('auth/wrong-password'): {
            that.setState({
              error: "You have entered the incorrect password."
            });
            break;
          }
          default: {
            that.setState({
              error: "Login error. Please try again later."
            });
          }

        }
        console.log("BOOM");
      });
  };

  signUp = () => {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <Paper className={this.props.classes.paper}>
          <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
          <form id="loginForm" onSubmit = {this.handleLogin} >
            <TextField
              id="username"
              type="username"
              required
              value={this.state.username}
              onChange={this.handleChange}
              label="Email"
              fullWidth
              className={this.props.classes.field}
              variant="outlined"
            />
            <TextField
              id="password"
              type="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
              label="Password"
              fullWidth
              className={this.props.classes.field}
              variant="outlined"
            />
            {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
            <Button id="signupBtn" onClick={this.signUp} variant="contained" color="primary" style={{backgroundColor: 'grey'}} className={this.props.classes.button}>SIGN UP</Button>
            <Button id="loginBtn" onClick={this.handleLogin} variant="contained" color="primary" form="loginForm" className={this.props.classes.button}>LOGIN</Button>
            <div><Button id="forgotButton" onClick={this.handleClickOpen}>
              <Typography variant="caption" className={this.props.classes.resetButton}>Forgot Password?</Typography>
            </Button></div>
          </form>
        </Paper>

        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Password Security Questions"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ paddingBottom: "2%" }}>
                Please type the email associated with your account so we can retrieve your security questions.
              </DialogContentText>
              <TextField
                id="forgotPass"
                type="email"
                required
                value={this.state.forgotPass}
                onChange={this.handleChange}
                label="Email"
                fullWidth
                />
                {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
               <Button onClick={this.handleQuestions} color="primary">
                Next
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={this.state.openSec}
            onClose={this.handleSecClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Questions"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ paddingBottom: "2%" }}>
                
              </DialogContentText>
              <TextField
                id="ans1"
                type="answer"
                required
                value={this.state.ans1}
                onChange={this.handleChange}
                label="Answer 1"
                fullWidth
                />

              <DialogContentText id="alert-dialog-description" style={{ paddingBottom: "2%" }}>
                
              </DialogContentText>
                <TextField
                  id="ans2"
                  type="answer"
                  required
                  value={this.state.ans2}
                  onChange={this.handleChange}
                  label="Answer 2"
                  fullWidth
                  />
                {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
               <Button onClick={this.handleQuestions} color="primary">
                Next
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

const Login = compose(
  withRouter,
  //withFirebase,
)(LoginBase);

export default withStyles(styles)(Login);
