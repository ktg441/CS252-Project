import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField/';


const Search = props => (
    <form className="search" onInput={event => props.onInput(event.target.value)}>
      <TextField
         id="movieString"
         type="movieString"
         required
         label="Movie"
         fullWidth
         variant="outlined"
         className = {props.field}
         textAlign= 'left'
         margin= 'auto'
         padding-bottom = '10'
         width= '75%'
      > 
      <input type="search" value={props.query} placeholder={props.placeholder} />
      </TextField>
    </form>
  );
  
  Search.propTypes = {
    query      : PropTypes.string.isRequired,
    onInput    : PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };
  export default Search
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
      'max-width': '100px',
      'max-height': '100px',
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