import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import firebase from 'firebase/app';
import 'firebase/functions';
import { withRouter } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/';
//import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//import logo from '../imgs/add.png';
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
      mode: 'view',
      potentialText: '',
      about: '',
    };
    
    this.getUserInfo = this.getUserInfo.bind(this);    
    this.changeMode = this.changeCheckMode.bind(this);
    this.changeMode = this.changeXMode.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
  }

  getUserInfo = () => {
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    var that = this;
    db.collection('users').doc(user.uid).get().then(function(doc) {
        if(doc.exists){
            console.log("Document data:", doc.data());
            that.setState({email: doc.data().Email});
            that.setState({name: doc.data().Username});
            that.setState({triggers: doc.data().Triggers});
            that.setState({about: doc.data().AboutMe});
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

  changeCheckMode = () => {
    var amb = document.getElementById('bio');
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    var that = this;
    db.collection('users').doc(user.uid).update({
        AboutMe: amb.value,
    })

    this.setState({about: amb.value});

    if(this.state.mode === 'edit')
        this.setState({mode: 'view'});
    else
        this.setState({mode: 'edit'});

  }

  changeXMode = () => {
    var that = this;
    if(that.state.mode === 'edit')
        that.setState({mode: 'view'});
    else
        that.setState({mode: 'edit'});
  }

  renderButtons() {
    var that = this;
    if (that.state.mode === 'edit') 
      return (
        <div className={this.props.classes.buttonLine}>
            <font id="saveBtn" color='green' size="5" onClick={that.changeCheckMode}>✔</font>
            &nbsp;&nbsp;&nbsp;
            <font id="discardBtn" color='red' size="5" onClick={that.changeXMode}>✘</font>
        </div>
      )
    else {
      return (
         <div className={this.props.classes.buttonLine}>
            <font id="editBtn" size="5" onClick={that.changeMode}>✎</font>
          </div>
       ) 
    }
  }

  renderTextField = () => {
    //var that = this;
    if (this.state.mode !== 'edit'){
        return(
            <p>About Me: {this.state.about}</p>
        );
    }
    return (
      <p>About Me: <TextField type='text' id='bio'></TextField></p>
    );
  }

  render() {

    return (
        <div>
            {this.renderButtons()}
            <div className={this.props.classes.container}>
                <Paper className={this.props.classes.paperQuarterTop}>
                    <div className={this.props.classes.imgbox}>
                        <img className={this.props.classes.profileimage} src={profilepic} alt="ProfilePic"/>
                    </div>
                    <div className={this.props.classes.info}>
                        <h1>{this.state.name}</h1>
                        <p>Email: {this.state.email}</p>
                        {this.renderTextField()}
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
        </div>
    );
  }
}

const Profile = compose(
  withRouter,
  //withFirebase,
)(ProfileBase);

const styles = theme => ({
  buttonLine: {
    marginRight: '3%',
    marginTop: '1%',
    display: 'flex',
    'justify-content': 'flex-end', 
    cursor: 'pointer',
  },
  container: {
    marginTop: 10,
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


/*

  renderTextField() {
    if (this.props.mode != 'edit') return null;
    return (
      <TextField type='text' floatingLabelText='Image URL' onChange={this.onImageUrlChange}></TextField>
    )
  }



  render() {

      return (
          <div className="single">
              <img src={this.state.recipe.imageURL} />
              <div className='recipeDetails'>
                  <h1>{this.state.recipe.name}</h1>
                  {this.renderTextField()}
                  <IngredientList onIngredientChange={this.onIngredientChange}
                      onDelete={this.onDelete}
                      ingredients={this.state.recipe.ingredients}
                      edit={this.props.edit}
                      addIngredient={this.addIngredient} />
                  {this.renderButtons()}
              </div>
          </div>
      );
  }
*/