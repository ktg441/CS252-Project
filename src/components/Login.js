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
      open: false,
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
      resetEmail: '',
    });
  };

  /*handleReset = event => {
    var that = this;
    this.props.firebase.sendPasswordResetEmail(this.state.resetEmail).then(function () {
      //Email sent
      this.setState({ open: false, error: '' });

    }).catch(function (error) {
      console.log(error.code);
      let errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        that.setState({
          error: "Invalid email format"
        });
      }
      else if (errorCode === 'auth/user-not-found') {
        that.setState({
          error: "Email address not recognized"
        });
      }
      else if (errorCode != null) {
        that.setState({
          error: "Error: Please try again later."
        });
      }
      else if (errorCode == null) {
        that.setState({ open: false, error: '' });
      }
    })
  };*/

  handleLogin = event => {
    //Firebase login here
    var that = this;
    /*this.props.firebase.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (firebaseUser) {
        if (firebaseUser) {
          that.props.history.push('/home');
        }
      })
      .catch(function (error) {
        /*var errorCode = error.code;

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

        }*/
        console.log("BOOM");
      //});
  };

  signUp = () => {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <Paper className={this.props.classes.paper}>
          <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
          <form id="loginForm">
            <TextField
              id="username"
              type="username"
              required
              value={this.state.username}
              onChange={this.handleChange}
              label="Username"
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
      </div>
    );
  }
}

const Login = compose(
  withRouter,
  //withFirebase,
)(LoginBase);

export default withStyles(styles)(Login);
