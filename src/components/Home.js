import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/add.png';
import { auth } from './FirebaseConfig/Fire';
import PropTypes from 'prop-types';
import Search from './Search';
import {Dropdown} from 'semantic-ui-react';
import firebase from 'firebase/app';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';


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
      isSearching: false,
    };
    
    this.onInput = this.onInput.bind(this);
  }
  
  componentDidMount() {
    this.loadMovie()
}

componentDidUpdate(prevProps, prevState) {
    if (prevState.movieId !== this.state.movieId) {
        this.loadMovie()
    }
}

loadMovie() {
    axios.get(`http://www.omdbapi.com/?apikey=7abe36ea&i=${this.state.movieId}`)
        .then(response => {
            this.setState({ movie: response.data });
        })
        .catch(error => {
            console.log('Opps!', error.message);
        })
}

// we use a timeout to prevent the api request to fire immediately as we type
timeout = null;

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
            movieId: item.imdbID,
            isSearching: false,
            title: item.Title,
        }
    )
}

  onInput(query) {
    this.setState({
      query
    });
    
    this.searchMovie(query);
  }
  
  getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;
    
    fetch (url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results
        })
      });
  }
  
  searchMovie(query) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cfe422613b250f702980a3bbf9e90716`;
    
    fetch (url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results
        })
      });
  }
  
  componentDidMount() {
    this.getPopularMovies();
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
    db.collection('Movies').doc(this.state.movie).set({
      Triggers: this.state.triggers,
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


  render() {
    const { movies, query } = this.state;
    const isSearched = query => item => !query || item.title.toLowerCase().includes(query.toLowerCase());

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

    //Stylesheet for the dropdown menu
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    return (
      <div className={this.props.classes.container}>
      <Paper className={this.props.classes.paper}>
        <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
        <form id="loginForm" onSubmit = {this.handleSubmit} >
       {/*<Search query={query} onInput={this.onInput} placeholder="Search for Movie Title …" />
        <Movies movies={movies.filter(isSearched(query))} />*/}
        <div onClick={() => this.setState({ isSearching: false })}>
                <Search
                    defaultTitle={this.state.title}
                    search={this.searchMovie}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />
          <Dropdown style={{width:"75%", margin: 'auto'}} placeholder="Triggers" fluid multiple selection options={options} onChange={this.handleMultiChange}/>
          {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
          <Button id="submitMovie" onClick={this.handleSubmit} variant="contained" color="primary"  className={this.props.classes.button}>ENTER</Button>
          </div>
        </form>
      </Paper>

      <div>
      <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Successfully added a movie!"}
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
    );
  }
}
const Home = compose(
  withRouter,
  //withFirebase,
)(HomeBase);
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

export default withStyles(styles)(Home);
