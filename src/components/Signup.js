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
import { auth } from './FirebaseConfig/Fire'
import app from 'firebase/app';
import firebase from 'firebase/app'
import {Dropdown} from 'semantic-ui-react';
import 'firebase/functions';
require('firebase/firestore');


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
      email: '',
      password: '',
      password2: '',
      missingText: '',
      errorMessage: '',
      triggers: [],
    }
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  passChange = info => {
    this.setState({ password: info.password })
  }

  passwordsMatch = () => {
    if (this.state.password !== this.state.password2) {
      this.setState({ errorMessage: 'The passwords you entered do not match.' })
      return false
    }
    return true
  }

  handleMultiChange = (triggers) => {
    this.setState({ triggers: triggers })
  }
  

  handleSubmit = (ev) => {
    var that = this;
    if (this.state.email === "") {
      this.setState({missingText: "Email field cannot be empty"});
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
    ev.preventDefault()
    if (this.passwordsMatch()) {
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function () {
          app.auth().onAuthStateChanged(function (user){
            if(user){
              firebase.firestore().collection('users').doc(user.uid).set({
                Email: that.state.email,
              }).then(function (){
                console.log("WE DID IT");
              }).catch(function(error){
                console.log("Error: "+error);
              });
            }
          })
        }).then(() => {
          this.props.history.push('/home');
        }).catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {

    const { error } = this.state;

    const options = [
      {key: 'Anime', text: 'Anime', value: 'Anime'},
      {key: 'Shootings', text: 'Shootings', value: 'Shootings'},
      {key: 'Blood', text: 'Blood', value: 'Blood'},
      {key: 'Rape', text: 'Rape', value: 'Rape'},
      {key: 'War', text: 'War', value: 'War'},
      {key: 'Gang Violence', text: 'Gang Violence', value: 'Gang Violence'},
      {key: 'Suicide', text: 'Suicide', value: 'Suicide'},
      {key: 'Sharks', text: 'Sharks', value: 'Sharks'},
      {key: 'Ghosts', text: 'Ghosts', value: 'Ghosts'},
      {key: 'Spiders', text: 'Spiders', value: 'Spiders'},
      {key: 'Snakes', text: 'Snakes', value: 'Snakes'},
      {key: 'Dogs', text: 'Dogs', value: 'Dogs'},
      {key: 'Battery', text: 'Battery', value: 'Battery'},
      {key: 'Drugs', text: 'Drugs', value: 'Drugs'},
      {key: 'Flashing Lights', text: 'Flashing Lights', value: 'Flashing Lights'},
      {key: 'Kidnap', text: 'Kidnap', value: 'Kidnap'},
      {key: 'Sexual Assault', text: 'Sexual Assault', value: 'Sexual Assault'},
    ];

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    return (
      <div className={this.props.classes.container}>
        <Paper className={this.props.classes.paper}>
        <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
          <form id="loginForm" style={{paddingTop:'2%'}} onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
              label="Email"
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

            <Dropdown style={{width:"75%", margin: 'auto'}} placeholder="Triggers" fluid multiple selection options={options}/>
          </form>
          {<Typography className={this.props.classes.error}>{this.state.missingText}</Typography>}
          <Button id="signup" onClick={this.handleSubmit} variant="contained" color="primary" className={this.props.classes.button}>SIGN UP</Button>
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
