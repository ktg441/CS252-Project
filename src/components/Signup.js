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
    marginTop: '12px !important',
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
    marginTop: '5px !important',
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
      email: '',
      password: '',
      password2: '',
      missingText: '',
      errorMessage: '',
      triggers: [],
      quest1: '',
      quest2: '',
      ans1: '',
      ans2: '',
      ans1encr: '',
      ans2encr: '',
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

  handleMultiChange = (event, {value}) => {
      this.setState({ triggers: value });
  }
  
  handleSingle1Change = (event, {value}) => {
    this.setState({ quest1: value });
  }

  handleSingle2Change = (event, {value}) => {
    this.setState({ quest2: value });
  }

  handleSubmit = (ev) => {
    var that = this;
    if (this.state.username === "") {
      this.setState({missingText: "Name field cannot be empty"});
      return;
    }
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
    that.encrChange('ans1encr', that.state.ans1);
    that.encrChange('ans2encr', that.state.ans2);
    ev.preventDefault()
    if (this.passwordsMatch()) {
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function () {
          app.auth().onAuthStateChanged(function (user){
            if(user){

              firebase.firestore().collection('users').doc(user.uid).set({
                Username: that.state.username,
                Email: that.state.email,
                Triggers: that.state.triggers,
                SecQuest1: that.state.quest1,
                Ans1: that.state.ans1encr,
                SecQuest2: that.state.quest2,
                Ans2: that.state.ans2encr,
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

  encrChange = (id, value) => {
    const Cryptr = require('cryptr');
    const key = new Cryptr('mouse'); //Hide later
    this.setState({ [id] : key.encrypt(value) })
  }

  render() {

    const options = [
      {key: 'Anime ', text: 'Anime ', value: 'Anime '},
      {key: 'Shootings ', text: 'Shootings ', value: 'Shootings '},
      {key: 'Blood ', text: 'Blood ', value: 'Blood '},
      {key: 'Rape ', text: 'Rape ', value: 'Rape '},
      {key: 'War ', text: 'War ', value: 'War '},
      {key: 'Gang Violence ', text: 'Gang Violence ', value: 'Gang Violence '},
      {key: 'Suicide ', text: 'Suicide ', value: 'Suicide '},
      {key: 'Sharks ', text: 'Sharks ', value: 'Sharks '},
      {key: 'Ghosts ', text: 'Ghosts ', value: 'Ghosts '},
      {key: 'Spiders ', text: 'Spiders ', value: 'Spiders '},
      {key: 'Snakes ', text: 'Snakes ', value: 'Snakes '},
      {key: 'Dogs ', text: 'Dogs ', value: 'Dogs '},
      {key: 'Battery ', text: 'Battery ', value: 'Battery '},
      {key: 'Drugs ', text: 'Drugs ', value: 'Drugs '},
      {key: 'Flashing Lights ', text: 'Flashing Lights ', value: 'Flashing Lights '},
      {key: 'Kidnap ', text: 'Kidnap ', value: 'Kidnap '},
      {key: 'Sexual Assault ', text: 'Sexual Assault ', value: 'Sexual Assault '},
    ];

    const secQuests = [
      {key: 'What was your childhood nickname?', text: 'What was your childhood nickname?', value: 'What was your childhood nickname?'},
      {key: 'In what city or town did your mother and father meet?', text: 'In what city or town did your mother and father meet?', value: 'In what city or town did your mother and father meet?'},
      {key: 'What is your favorite team?', text: 'What is your favorite team?', value: 'What is your favorite team?'},
      {key: 'What was your favorite sport in high school?', text: 'What was your favorite sport in high school?', value: 'What was your favorite sport in high school?'},
      {key: 'What is the first name of the boy or girl that you first kissed?', text: 'What is the first name of the boy or girl that you first kissed?', value: 'What is the first name of the boy or girl that you first kissed?'},
      {key: 'What was the name of the hospital where you were born?', text: 'What was the name of the hospital where you were born?', value: 'GWhat was the name of the hospital where you were born?'},
      {key: 'What school did you attend for sixth grade?', text: 'What school did you attend for sixth grade?', value: 'What school did you attend for sixth grade?'},
      {key: 'In what town was your first job?', text: 'In what town was your first job?', value: 'In what town was your first job?'},
    ];

    const SecQuests2 = [
      {key: 'What was the name of the company where you had your first job?', text: 'What was the name of the company where you had your first job?', value: 'What was the name of the company where you had your first job?'},
      {key: 'What was the last name of your third grade teacher?', text: 'What was the last name of your third grade teacher?', value: 'What was the last name of your third grade teacher?'},
      {key: 'Who is your childhood sports hero?', text: 'Who is your childhood sports hero?', value: 'Who is your childhood sports hero?'},
      {key: 'What was the make and model of your first car?', text: 'What was the make and model of your first car?', value: 'What was the make and model of your first car?'},
      {key: 'What was your favorite food as a child?', text: 'What was your favorite food as a child?', value: 'What was your favorite food as a child?'},
      {key: 'What is your favorite movie?', text: 'What is your favorite movie?', value: 'What is your favorite movie?'},
      {key: 'What is the middle name of your oldest child?', text: 'What is the middle name of your oldest child?', value: 'What is the middle name of your oldest child?'},
      {key: 'What is the name of your favorite childhood friend?', text: 'What is the name of your favorite childhood friend?', value: 'What is the name of your favorite childhood friend?'},
    ];
    //Stylesheet for the dropdown menu
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
              id="username"
              type="username"
              required
              value={this.state.username}
              onChange={this.handleChange}
              label="Name"
              fullWidth
              className={this.props.classes.field}
              variant="outlined"
            />

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
            <Dropdown id="quest1" style={{width:"75%", margin: 'auto'}} placeholder='Security Question 1' fluid selection options={secQuests} onChange={this.handleSingle1Change}/>
            <TextField id="ans1" type="ans1" required value={this.state.ans1} onChange={this.handleChange} label="First Answer" fullWidth className={this.props.classes.field} variant="outlined"/>
            <Dropdown id="quest2" style={{width:"75%", margin: 'auto'}} placeholder='Security Question 2' fluid selection options={SecQuests2} onChange={this.handleSingle2Change}/>
            <TextField id="ans2" type="ans2" required value={this.state.ans2} onChange={this.handleChange} label="Second Answer" fullWidth className={this.props.classes.field} variant="outlined"/>

            <Dropdown style={{width:"75%", margin: 'auto'}} placeholder="Triggers" fluid multiple selection options={options} onChange={this.handleMultiChange}/>
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
