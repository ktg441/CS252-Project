import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';


const Movie = props => (
  <div className="movie">
    <figure>
     {/* <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.poster_path}`} />*/}
      <figcaption>
        <h2 className="movie__title">{props.title}</h2>
      </figcaption>
    </figure>
  </div>
);

Movie.propTypes = {
  id         : PropTypes.number.isRequired,
  title      : PropTypes.string.isRequired,
  poster_path: PropTypes.string
};

const Movies = props => (
  <ul className="movies">
  <Select
            id="movie"
            type="movie"
            required
            label="Movie"
            fullWidth
            variant="outlined"
            className = {props.field}
            
  >
    {props.movies.map(movie => (
        <Movie {...movie} />
    ))}
     </Select>
  </ul>
 
);

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default Movies

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