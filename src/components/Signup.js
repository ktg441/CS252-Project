import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField/';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ReactPasswordStrength from 'react-password-strength';
import Typography from '@material-ui/core/Typography';
import logo from '../imgs/transLogo.png';

const styles = theme => ({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  social: {
    padding: 20,
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '100px !important',
    margin: 'auto',
    'max-width': '800px',
    'max-height': '800px',
  },
  field: {
    textAlign: 'left',
    margin: 'auto',
    paddingBottom: 10,
    width: '75%',
  },
  button: {
    marginTop: '10px !important',
  },
  error: {
    color: "red",
    marginTop: 10
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

class SignupBase extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.auth === true) {
      this.props.history.push('/home');
    }
    this.state = {
      username: '',
      password: '',
      password2: '',
      missingText: '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  passChange = info => {
    this.setState({ password: info.password })
  }


  signUp = event => {
    if (this.state.username === "") {
      this.setState({missingText: "Username field cannot be empty"});
      return;
    }
    if (this.state.password === "") {
      this.setState({missingText: "Password field cannot be empty"});
      return;
    }
    if (this.state.password2 === "") {
      this.setState({missingText: "Please confirm your password"});
      return;
    }
    if (this.state.password2 !== this.state.password) {
      this.setState({missingText: "Passwords do not match"});
      return;
    }
}

  render() {

    const { error } = this.state;

    return (
      <div className={this.props.classes.container}>
        <Paper className={this.props.classes.paper}>
        <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
          <form id="loginForm" style={{paddingTop:'2%'}} onSubmit={this.handleLogin}>
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

            <ReactPasswordStrength
              id="password"
              ref={ref => this.ReactPasswordStrength = ref}
              label="Password"
              minLength={6}
              minScore={3}
              scoreWords={['weak', 'weak', 'okay', 'good', 'strong']}
              inputProps={{ name: "password", placeholder: "Password*", autoComplete: "off" }}
              changeCallback={this.passChange}
              className={this.props.classes.field}
              style ={{marginBottom:10, borderRadius: 4, fontSize:'1rem'}}
            />

            <TextField
              id="password2"
              type="password"
              required
              value={this.state.password2}
              onChange={this.handleChange}
              label="Confirm Password"
              fullWidth
              className={this.props.classes.field}
              variant="outlined"
            />
          </form>
          {<Typography className={this.props.classes.error}>{this.state.missingText}</Typography>}
          <Button id="signup" onClick={this.signUp} variant="contained" color="primary" className={this.props.classes.button}>SIGN UP</Button>
        </Paper>
      </div>
    );
  }
}


const Signup = compose(
  withRouter,
  //withFirebase,
)(SignupBase);



export default withStyles(styles)(Signup);
