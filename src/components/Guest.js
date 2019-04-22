import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/add.png';
import logo1 from '../imgs/addB.png';
import logo2 from '../imgs/mov.png';

import Search from './Search';
import BookSearch from './BookSearch';

import {Dropdown} from 'semantic-ui-react';
import firebase from 'firebase/app';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Grid } from '@material-ui/core';
import ReactDOM from 'react-dom';
import "./CSSStuff.css"

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class HomeBase extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      triggers: [],
      movies: [],
      query: '',
      open: false,
      movieId: 'tt1442449', // default imdb id (Spartacus)
      title: '',
      movie: {},
      searchResults: [],
      isSearching: 'false',
      popupDisplay: 'none',
      bookDisplay: 'none',
      activeIndex: 0,
      dbMovies: [],
      userTrigs: [],
      timeCreated: '',
      dbBooks: '',
    };
    
  }
  
  movieSearch = () => {
    this.props.history.push('/movieSearch')
   };

   bookSearch = () => {
    this.props.history.push('/book')
   };

   searchBook = (event) => {
    var that = this
    this.setState({ title: event.target.value, isSearching: true })
    var books = require('google-books-search');
  
    books.search(this.state.title, function(error, results) {
        if ( ! error ) {
            console.log(results[1].title);
            var bookTitle = [];
            for(var i =0; i< 5; i ++){
              bookTitle[i] = results[i].title
            }
            for(var i =0; i< 5; i ++){
              console.log(bookTitle[i]);
            }
            
            that.setState({ searchResults: bookTitle });
            console.log(bookTitle.length)
  
        } else {
            console.log(error);
        }
    });
  }

  compTrigs = (arr) => {
    var trigs = this.state.userTrigs;
    for(var i = 0; i < trigs.length; i++){
      for(var j = 0; j < arr.length; j++){
        if(trigs[i] === arr[j]){
          return true;
        }
      }
    }
    return false;
  }

  componentDidMount() {
    //this.getUserTrigs();
    
    var that = this;
    this.collectMovies().then(function(value){
      that.setState({dbMovies: value});
      var movs = [];
      
      for(var i = 0; i < value.length; i++){
        if(that.compTrigs(value[i].Triggers) === false){
          const element = (
          <Grid item  className={that.props.classes.item} >
            <div className={that.props.classes.movieCard} >
            <div class="fadeIn">
              <Paper className={that.props.classes.paper} >
                <Typography><h1>{value[i].Name}</h1></Typography>
                <hr color="black" width="10%"/>
                <Typography><h3>Triggers:</h3></Typography>
                <Typography><h4>{value[i].Triggers}</h4></Typography>
              </Paper>
              </div>
            </div>
          </Grid>
        );
          
          movs.push(element);
        }
      }
       ReactDOM.render(movs, document.getElementById('moviePage'));
    });   
  }

  getUserTrigs = () => {
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    var that = this;
    db.collection('users').doc(user.uid).get().then(function(doc) {
        if(doc.exists){
            that.setState({userTrigs: doc.data().Triggers});
            that.setState({timeCreated: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        else {
            console.log("No info found!");
        }
    }).catch(function(error) {
        console.log("Error getting information:", error);
    });
  }

  async collectMovies() {
    const snapshot = await firebase.firestore().collection('Movies').get();
    return snapshot.docs.map(doc => doc.data());
  }

  async collectBooks() {
    const snapshot = await firebase.firestore().collection('Books').get();
    return snapshot.docs.map(doc => doc.data());
  }

  getBooks = () => {
    var that = this;
    this.collectBooks().then(function(value){
      that.setState({dbBooks: value});
      var book = [];
      
      for(var i = 0; i < value.length; i++){
        if(that.compTrigs(value[i].Triggers) === false){
          const element = (
          <Grid item  className={that.props.classes.item} >
            <div className={that.props.classes.movieCard} >
            <div class="fadeIn">
              <Paper className={that.props.classes.paper} >
                <Typography><h1>{value[i].Name}</h1></Typography>
                <hr color="black" width="10%"/>
                <Typography><h3>Triggers:</h3></Typography>
                <Typography><h4>{value[i].Triggers}</h4></Typography>
              </Paper>
              </div>
            </div>
          </Grid>
        );
          
          book.push(element);
        }
      }
      ReactDOM.render(book, document.getElementById('bookPage'));
    });
  }
// we use a timeout to prevent the api request to fire immediately as we type
timeout = null;

searchMovie = (event) => {
    this.setState({ title: event.target.value, isSearching: true })
    var that = this;
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
        axios.get(`https://www.omdbapi.com/?apikey=7abe36ea&s=${this.state.title}`)
            .then(response => {

                if (response.data.Search) {
                    const movies = response.data.Search.slice(0, 5);
                    var movie=[];
                    for( var i =0; i< 5; i++){
                      movie[i] = movies[i].Title
                    }
                    that.setState({ searchResults: movie });
                }
            })
            .catch(error => {
                console.log('Opps!', error.message);
            })
    }, 1000)
}


// event handler for a search result item that is clicked
itemClicked = (item) => {
    this.setState(
        {
            title: item
        }
    )
}
itemClick = (item) => {
  this.setState(
      {
          title: item
      }
  )
}


  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  };

  handleMultiChange = (event, {value}) => {
    this.setState({ triggers: value });
  }

  handleSubmit = () => {
    //add the stuff to database
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    db.collection('Movies').doc(this.state.title).set({
      Triggers: this.state.triggers,
      Name: this.state.title,
      DateAdded: this.state.timeCreated
    }).then(() => {
      this.handleClickOpen();
    }).catch({

    })
  }
  handleBookSubmit = () => {
    //add the stuff to database
    var user = firebase.auth().currentUser;
    let db = firebase.firestore();
    db.collection('Books').doc(this.state.title).set({
      Triggers: this.state.triggers,
      Name: this.state.title,
      DateAdded: this.state.timeCreated
    }).then(() => {
      this.handleClickOpen();
    }).catch({
      
    })
  }

  handleClose = () => {
    this.setState({ open: false });
    window.location.reload();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleTabChange = (_, activeIndex) => {
    this.setState({ activeIndex });
    //ReactDOM.render(this.state.movs1, document.getElementById('moviePage'));
    if(activeIndex === 0){
      this.componentDidMount();
    }else{
      this.getBooks();
    }
  }

  showTrigger = () => {
    this.setState({
      popupDisplay: 'block',
    });
  }

  hideTrigger = () => {
    this.setState({
      popupDisplay: 'none',
    });
  }

  sTrigger = () => {
    this.setState({
      bookDisplay: 'block',
    });
  }

  hTrigger = () => {
    this.setState({
      bookDisplay: 'none',
    });
  }

  render() {
    const { movies, query } = this.state;
    const isSearched = query => item => !query || item.title.toLowerCase().includes(query.toLowerCase());
    const { activeIndex } = this.state;

    const options = [
      {key: 'Anime', text: 'Anime', value: 'Anime '},
      {key: 'Shootings', text: 'Shootings', value: 'Shootings '},
      {key: 'Blood', text: 'Blood', value: 'Blood '},
      {key: 'Rape', text: 'Rape', value: 'Rape '},
      {key: 'War', text: 'War', value: 'War '},
      {key: 'Gang Violence', text: 'Gang Violence', value: 'Gang Violence '},
      {key: 'Suicide', text: 'Suicide', value: 'Suicide '},
      {key: 'Sharks', text: 'Sharks', value: 'Sharks '},
      {key: 'Ghosts', text: 'Ghosts', value: 'Ghosts '},
      {key: 'Spiders', text: 'Spiders', value: 'Spiders '},
      {key: 'Snakes', text: 'Snakes', value: 'Snakes '},
      {key: 'Dogs', text: 'Dogs', value: 'Dogs '},
      {key: 'Battery', text: 'Battery', value: 'Battery '},
      {key: 'Drugs', text: 'Drugs', value: 'Drugs '},
      {key: 'Flashing Lights', text: 'Flashing Lights', value: 'Flashing Lights '},
      {key: 'Kidnap', text: 'Kidnap', value: 'Kidnap '},
      {key: 'Sexual Assault', text: 'Sexual Assault', value: 'Sexual Assault '},
    ];

    //Stylesheet for the dropdown menu
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    return (
      <div className={this.props.classes.container}>
      <Paper className={this.props.classes.paper} style={{display: this.state.popupDisplay}}>
        <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
        <form id="loginForm" onSubmit = {this.handleSubmit} >
          <div onClick={() => this.setState({ isSearching: false })} >
          <Search
                    defaultTitle={this.state.title}
                    search={this.searchMovie}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />

            <Dropdown style={{width:"75%", margin: 'auto'}} placeholder="Triggers" fluid multiple selection options={options} onChange={this.handleMultiChange}/>
            {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
            <Button id="submitMovieclose" onClick={this.hideTrigger} variant="contained" color="secondary" className={this.props.classes.button}>CANCEL</Button>
            <Button id="submitMovie" onClick={this.handleSubmit} variant="contained" color="primary"  className={this.props.classes.button}>ENTER</Button>
          </div>
        </form>
        </Paper>
        
        <Paper className={this.props.classes.paper} style={{display: this.state.bookDisplay}}>
        <img className={this.props.classes.logo} src={logo1} alt="DodgeEm"/>
        <form id="login" onSubmit = {this.handleBookSubmit} >
          <div onClick={() => this.setState({ isSearching: false })} >
          
            <BookSearch
              defaultTitle={this.state.title}
              search={this.searchBook}
              results={this.state.searchResults}
              clicked={this.itemClick}
              searching={this.state.isSearching} />
          
            <Dropdown style={{width:"75%", margin: 'auto'}} placeholder="Triggers" fluid multiple selection options={options} onChange={this.handleMultiChange}/>
            {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
            <Button id="submitMovieclose" onClick={this.hTrigger} variant="contained" color="secondary" className={this.props.classes.button}>CANCEL</Button>
            <Button id="submitMovie" onClick={this.handleBookSubmit} variant="contained" color="primary"  className={this.props.classes.button}>ENTER</Button>
          </div>
        </form>
        </Paper>
      <div>
      <div className={this.props.classes.tabs}>
        {/*<div style={{ display: 'flex', backgroundColor: '#c2cad0', borderRadius: '5px', 'max-height':'800px', overflowY: 'scroll'}}>*/}
        <Grid direction="row">
        <Grid item className={this.props.classes.item}>
          <VerticalTabs value={activeIndex} onChange={this.handleTabChange}>
            <MyTab label='Movies/TV Shows' style={{fontWeight:'bold'}}/>
            <MyTab label='Books' style={{fontWeight:'bold'}}/>
          </VerticalTabs>
          </Grid>
          <Grid item className={this.props.classes.item}>
          <div style={{ display: 'flex', backgroundColor: '#c2cad0', borderRadius: '5px', 'max-height':'800px', overflowY: 'scroll'}}>
          { activeIndex === 0 &&
          
          <TabContainer>
            <Grid container direction="row" className={this.props.classes.cardGrid}>
              <Grid item className={this.props.classes.item}>
              <Button id="submitMovie" onClick={this.movieSearch} variant="contained" color="primary" className={this.props.classes.button}>Search Movie/TV Show</Button>
              </Grid>
              <Grid item className={this.props.classes.item}>
                <Button id="submitMovie" onClick={this.showTrigger} variant="contained" color="primary" className={this.props.classes.button}>Add Movie/TV Show Trigger</Button>
              </Grid>
            </Grid>
            <Grid container id="moviePage" direction="row" className={this.props.classes.cardGrid}>
            
            </Grid>
          </TabContainer>}
          { activeIndex === 1 && <TabContainer>
            <Grid container direction="row" className={this.props.classes.cardGrid}>
              <Grid item className={this.props.classes.item}>
              <Button id="submitBook" onClick={this.bookSearch} variant="contained" color="primary" className={this.props.classes.button}>Search Book</Button>
              </Grid>
              <Grid item className={this.props.classes.item}>
                <Button id="submitBook" onClick={this.sTrigger} variant="contained" color="primary" className={this.props.classes.button}>Add Book Trigger</Button>
              </Grid>
            </Grid>
            <Grid container id="bookPage" direction="row" className={this.props.classes.cardGrid}>
            
            </Grid>
          </TabContainer>  }
        </div>
        </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Successfully added the trigger!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Thanks for contributing!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </div>
      </div>
    );
  }
}
const Home = compose(
  withRouter,
  //withFirebase,
)(HomeBase);
const styles = theme => ({
  movieCard:{
    position: 'auto',
    marginTop: 10,
    margin: theme.spacing.unit,
    textAlign: 'center',
    'max-width': '200',
    'max-height': '200',
  },
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
    'max-width': '175px',
    'max-height': '175px',
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
  tabs: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '100px !important',
    margin: 'auto',
    'width': '80%',
    'height': '80%',
  },
  cardGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', 
  },
  item: {
    margin: 15,
    "align-content": "center",
    display: 'block',
    'marginLeft': 'auto',
    'marginRight': 'auto',
  },
});

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'row',
    position:'sticky',
    margin: 'auto',
    display: 'flex',
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

const MyTab = withStyles(theme => ({
  selected: {
    color: '#d6792c',
    borderBottom: '2px solid tomato'
  }
}))(Tab);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, margin: 'auto', }}>
      {props.children}
    </Typography>
  );
}

export default withStyles(styles)(Home);
