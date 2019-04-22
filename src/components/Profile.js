import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {Dropdown} from 'semantic-ui-react';
//import { withFirebase } from './Firebase';
import firebase from 'firebase/app';
import 'firebase/functions';
import { withRouter } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//import logo from '../imgs/add.png';
import profilepic from '../imgs/Fav.png';
import { auth } from './FirebaseConfig/Fire';
import { storage } from './FirebaseConfig/Fire';
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
      picURL: '',
      multiTriggers: [],
      favMovs: [],
      favBooks: [],
      favTV: [],
    };
    
    this.getUserInfo = this.getUserInfo.bind(this);    
    this.changeMode = this.changeCheckMode.bind(this);
    this.changeMode = this.changeXMode.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
  }

  getUserInfo = () => {
    //var storage = {storage};
    /*var storage = firebase.storage();
    var ref = storage.refFromURL('gs://dodgeem-43d2c.appspot.com/images/Fav.png');
    console.log(ref);
    var url = ref.getDownloadURL();
    console.log("url " + url); */

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
            that.setState({picURL: doc.data().PicURL});
            that.setState({favMovs: doc.data().favMovs});
            that.setState({favBooks: doc.data().favBooks});
            that.setState({favTV: doc.data().favTV});
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
    var drop = document.getElementById('droptrigs');
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    var that = this;
    db.collection('users').doc(user.uid).update({
        AboutMe: amb.value,
        Triggers: that.state.multiTriggers,
    })

    this.setState({about: amb.value});
    this.setState({triggers: that.state.multiTriggers});
    //this.setState({multiTriggers: []});

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

  handleMultiChange = (event, {value}) => {
      this.setState({ multiTriggers: value });
  }

  populateTriggers() {
    var that = this;
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

    if (that.state.mode === 'edit'){
        return (
            <Dropdown id = 'droptrigs' style={{width:"75%", margin: 'auto'}} placeholder="Triggers"  defaultValue = {that.state.triggers} fluid multiple selection options={options} onChange={this.handleMultiChange}/>
        );
    }
    else {
        var trigHTML = that.state.triggers;
        return (
            <div>
                {trigHTML.map(function (n) {
                    return ([
                        <p key = {n}>{n}</p>
                    ])
                })}
            </div>
        );
    }
  }

  handleDelete = () => {
    var that = this;
    var user = firebase.auth().currentUser;
    user.delete().then(function(){
        that.props.push('/');
    }).catch(function(error){
        console.error(error);
    })
  }

  renderTextField = () => {
    //var that = this;
    if (this.state.mode !== 'edit'){
        return(
            <p>About Me: {this.state.about}</p>
        );
    }
    return (
      <div>
          <p>About Me: <TextField type='text' defaultValue={this.state.about} id='bio'></TextField></p>
          <br></br>
          <Button id="deleteAcc" onClick={this.handleDelete} variant="contained" color="primary" className={this.props.classes.button}>Delete Account</Button>
      </div>
    );
  }

  renderMovs(){
    var that = this;
    var movies = that.state.favMovs;
    if(movies === undefined){
        return(
            <p>You have no favorite movies!</p>
        );
    }
    else{
        return (
            <div>
                {movies.map(function (n) {
                    return ([
                        <p key = {n}>{n}</p>
                    ])
                })}
            </div>
        );
    }
  }

  renderBooks(){
    var that = this;
    var books = that.state.favBooks;
    if(books === undefined){
        return(
            <p>You have no favorite books!</p>
        );
    }
    else{
        return (
            <div>
                {books.map(function (n) {
                    return ([
                        <p key = {n}>{n}</p>
                    ])
                })}
            </div>
        );
    }
  }

  renderTV(){
    var that = this;
    var tv = that.state.favTV;
    if(tv === undefined){
        return(
            <p>You have no favorite TV shows!</p>
        );
    }
    else{
        return (
            <div>
                {tv.map(function (n) {
                    return ([
                        <p key = {n}>{n}</p>
                    ])
                })}
            </div>
        );
    }
  }

  render() {

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    return (
        <div>
            {this.renderButtons()}
            <div className={this.props.classes.container}>
                <Paper className={this.props.classes.paperQuarterTop}>
                    <div className={this.props.classes.imgbox}>
                        <img className={this.props.classes.profileimage} src={this.state.picURL} alt="ProfilePic"/>
                    </div>
                    <div className={this.props.classes.info}>
                        <h1>{this.state.name}</h1>
                        <p>Email: {this.state.email}</p>
                        {this.renderTextField()}
                    </div>
                </Paper>
                <Paper className={this.props.classes.paperQuarterBottom}>
                    <h2>Trigger List</h2>
                    {this.populateTriggers()}
                </Paper>
                <Paper className={this.props.classes.paperHalf}>
                    <h2>Favorite Media</h2>
                    <div className={this.props.classes.mediabox}>
                        <label className={this.props.classes.mediatype}>Movies</label>
                        <br></br>
                        {this.renderMovs()}
                    </div>
                    <br></br>
                    <div className={this.props.classes.mediabox}>
                        <label className={this.props.classes.mediatype}>Books</label>
                        <br></br>
                        {this.renderBooks()}
                    </div>
                    <br></br>
                    <div className={this.props.classes.mediabox}>
                        <label className={this.props.classes.mediatype}>TV Shows</label>
                        <br></br>
                        {this.renderTV()}
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
