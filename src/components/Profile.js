import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import firebase from 'firebase/app';
import 'firebase/functions';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/add.png';
import profilepic from '../imgs/Fav.png';
import { auth } from './FirebaseConfig/Fire'
import PropTypes from 'prop-types';
require('firebase/firestore');

class ProfileBase extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      triggers: [],
    };
    
    this.getUserInfo = this.getUserInfo.bind(this);    
  }

  getUserInfo = () => {
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    var that = this;
    db.collection('users').doc(user.uid).get().then(function(doc) {
        if(doc.exists){
            console.log("Document data:", doc.data());
            that.setState({email: doc.data().Email});
            //console.log("Email: ", that.state.doc.data().Email);
        }
        else {
            console.log("No info found!");
        }
    }).catch(function(error) {
        console.log("Error getting information:", error);
    });
  }

  componentDidMount(){
    this.getUserInfo();
  }

  render() {

    return (
        <div className={this.props.classes.container}>
            <Paper className={this.props.classes.paperQuarterTop}>
                <div className={this.props.classes.imgbox}>
                    <img className={this.props.classes.profileimage} src={profilepic} alt="ProfilePic"/>
                </div>
                <div className={this.props.classes.info}>
                    <h1>Your Name Here!</h1>
                    <p>Email: {this.state.email}</p>
                    <p>Birthday: 12/12/2000</p>
                    <p>About Me: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It is a long established fact that a reader will..</p>
                </div>
            </Paper>
            <Paper className={this.props.classes.paperQuarterBottom}>
                <h2>Trigger List</h2>
                <p>Trigger 1</p>
                <p>Trigger 2</p>
                <p>Trigger 3</p>
            </Paper>
            <Paper className={this.props.classes.paperHalf}>
                <h2>Favorite Media</h2>
                <div className={this.props.classes.mediabox}>
                    <label className={this.props.classes.mediatype}>Movies</label>
                    <br></br>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It is a long established fact that a reader will..</p>
                </div>
                <div className={this.props.classes.mediabox}>
                    <label className={this.props.classes.mediatype}>Books</label>
                    <br></br>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It is a long established fact that a reader will..</p>
                </div>
                <div className={this.props.classes.mediabox}>
                    <label className={this.props.classes.mediatype}>TV Shows</label>
                    <br></br>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It is a long established fact that a reader will..</p>
                </div>
            </Paper>
        </div>
    );
  }
}

const Profile = compose(
  withRouter,
  //withFirebase,
)(ProfileBase);

const styles = theme => ({
    container: {
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    display: 'grid',
    'grid-gap': '1.5%',
    'grid-template-columns': '48.5% 48.5%',
  },
  info: {
    position: 'relative',
  },
  imgbox: {
    position: 'relative',
    float: 'left',
  },
  mediabox: {
    'text-align': 'left',
  },
  mediatype: {
    'font-weight': 'bold',
    'text-decoration': 'underline',
  },
  paperQuarterTop: {
    'grid-column-start': 1,
    'grid-column-end' : 2,
    'grid-row-start': 1,
    'grid-row-end' : 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  paperQuarterBottom: {
    'grid-column-start': 1,
    'grid-column-end': 2,
    'grid-row-start' : 2,
    'grid-row-end' : 3,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  paperHalf: {
    'grid-column-start' : 2,
    'grid-column-end' : 3,
    'grid-row-start' : 1,
    'grid-row-end' : 3,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  profileimage: {
    color: 'black',
    'max-width': '260px',
    'max-height': '260px',
    margin: 'auto',
    position: 'relative',
    '-moz-box-shadow': '0px 6px 5px #ccc',
    '-webkit-box-shadow': '0px 6px 5px #ccc',
    'box-shadow': '0px 6px 5px #ccc',
    '-moz-border-radius': '260px',
    '-webkit-border-radius': '260px',
    'border-radius': '260px',
  },
});

export default withStyles(styles)(Profile);
