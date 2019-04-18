import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/movie.png';
import Search from './Search';
import firebase from 'firebase/app';
import axios from 'axios';
import ReactDOM from 'react-dom';

class MovieSearch extends React.Component{
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
    var that = this;
    db.collection('Movies').doc(that.state.title).get().then(function(doc) {
      if(doc.exists){
          that.setState({trigger: doc.data().Triggers});
          console.log("Triggers: ", doc.data().Triggers);

        const moviePage = (<Paper className={that.props.classes.paper}>
          <Typography><h1>{that.state.title}</h1></Typography>
          <hr color="black" width="10%"/>
          <Typography><h3>Triggers:</h3></Typography>
          <Typography><h4>{that.state.trigger}</h4></Typography>
          </Paper>);
          ReactDOM.render(moviePage, document.getElementById('movieTrigs'));
      }
      else {
          console.log("No info found!");
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
    this.props.history.push('/home');
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
                {/*<TextField
                  id="movie"
                  type="movie"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                  label="Search for a Movie"
                  fullWidth
                  className={this.props.classes.field}
                  variant="outlined"
                />*/}
                <Search
                    defaultTitle={this.state.title}
                    search={this.searchMovie}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />
                {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
                <Button id="loginBtn" onClick={this.goBack} variant="contained" color="secondary" form="loginForm" className={this.props.classes.button}>GO BACK</Button>
                <Button id="loginBtn" onClick={this.handleSubmit} variant="contained" color="primary" form="loginForm" className={this.props.classes.button}>SEARCH</Button>
              </form>
            </Paper>

            <div id="movieTrigs">

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
  export default withStyles(styles)(MovieSearch);