import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/movie.png';
import Search from './Search';
import firebase from 'firebase/app';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import GoodReads from 'react-goodreads';
import { Input } from '@material-ui/core';

const options = [
    { value: 'The Hunger Games', label: 'The Hunger Games' },
   
  ];

class BookSearch extends React.Component{
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
      value: ' ',
    };
    
}
  
  state = {
    selectedOption: null,
  }

  searchBook = (event) =>{
    this.setState({ title: event.target.value, isSearching: true })
      var books = require('google-books-search');
  
      books.search(this.state.title, function(error, results) {
          if ( ! error ) {
              console.log(results[1].title);
              var bookTitle = [];
              for(var i =0; i< 5; i ++){
                bookTitle[i] = results[i].title
              }
              this.setState({ searchResults: bookTitle });

  
          } else {
              console.log(error);
          }
      });
  
  }
  handleSubmit(event) {
      /*
    this.setState({ title: event.target.value, isSearching: true })
    var books = require('google-books-search');

    books.search(this.state.title, function(error, results) {
        if ( ! error ) {
            console.log(results[1].title);
            var bookTitle = [];
            for(var i =0; i< 5; i ++){
              bookTitle[i] = results[i].title
            }
            this.setState({ searchResults: bookTitle });


        } else {
            console.log(error);
        }
    });
    */
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleUp = (event) => {
    this.setState({value: event.target.value});

  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
 
    return (
        <body>
      <form onSubmit={this.handleSubmit}>
        <label>
            Look Up
          <input type="text" value={this.state.value} onChange={this.handleUp} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
      </body>
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
  export default withStyles(styles)(BookSearch);