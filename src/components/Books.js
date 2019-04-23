import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/searchb.png';
import Search from './Search';
import BookSearch from './BookSearch';

import firebase from 'firebase/app';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ListItem from '@material-ui/core/ListItem';


class Books extends React.Component{
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
      isSearching: false,
      popupDisplay: 'none',
      activeIndex: 0,
    };
    
    this.searchBook = this.searchBook.bind(this);

  }


// we use a timeout to prevent the api request to fire immediately as we type
timeout = null;
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
searchMovie = (event) => {
    this.setState({ title: event.target.value, isSearching: true })

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
        axios.get(`http://www.omdbapi.com/?apikey=7abe36ea&s=${this.state.title}`)
            .then(response => {

                if (response.data.Search) {
                    const movies = response.data.Search.slice(0, 5);
                    this.setState({ searchResults: movies });
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
    var that = this;
    var title = that.state.title;
    //console.log(this.state.title);
    db.collection('Books').doc(title).get().then(function(doc) {
      if(doc.exists){
          that.setState({triggers: doc.data().Triggers});
          //console.log("Triggers: ", doc.data().Triggers);

        const bookPage = (
          <div>
          <Paper className={that.props.classes.paper}>
          <Typography><h1>{that.state.title}</h1></Typography>
          <hr color="black" width="10%"/>
          <Typography><h3>Triggers:</h3></Typography>
          <Typography><h4>{that.state.triggers}</h4></Typography>
          </Paper>
          <br></br>
          <br></br>
          </div>
          );
          ReactDOM.render(bookPage, document.getElementById('bookTrigs'));
      }
      else {
          const moviePage = (<Paper className={that.props.classes.paper}>
            <Typography><h1>{that.state.title}</h1></Typography>
            <hr color="black" width="10%"/>
            <Typography><h3>Triggers:</h3></Typography>
            <Typography><h4>Currently don't have data on this book.</h4></Typography>
            </Paper>);
            ReactDOM.render(moviePage, document.getElementById('bookTrigs'));
      }
  }).catch(function(error) {
      console.log("Error getting information:", error);
  });
  }
  handleClose = () => {
    this.setState({ open: false });
    window.location.reload();
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleTabChange = (_, activeIndex) => this.setState({ activeIndex })
  showTrigger = () => {
    this.setState({
      popupDisplay: 'block',
    });
  }
  goBack = () =>{
    //this.props.history.push('/home');
    this.props.history.goBack() 
  }    
    render() {
      const { movies, query } = this.state;
      const isSearched = query => item => !query || item.title.toLowerCase().includes(query.toLowerCase());
      const { activeIndex } = this.state;
  
        return (
          <div className={this.props.classes.container}>
            <Paper className={this.props.classes.paper}>
              <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
              <form id="loginForm" onSubmit = {this.handleSubmit} >
            
                <BookSearch
                    defaultTitle={this.state.title}
                    search={this.searchBook}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />
            
                {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
                <Button id="loginBtn" onClick={this.goBack} variant="contained" color="secondary" form="loginForm" className={this.props.classes.button}>GO BACK</Button>
                <Button id="loginBtn" onClick={this.handleSubmit} variant="contained" color="primary" form="loginForm" className={this.props.classes.button}>SEARCH</Button>
              </form>
            </Paper>
            <div id="bookTrigs">
            </div>
            
            {/*<p> {this.state.title} </p>
            <p> {this.state.trigger} </p>*/}
          </div>
        );
      }
}
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
  });
  export default withStyles(styles)(Books);