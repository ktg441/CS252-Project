import React from 'react';
import Paper from '@material-ui/core/Paper';
import logo from '../imgs/movie.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

class MovieSearch extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            movie: " "
        };
    }

    handleSubmit = event => {
        //query data from database and show the triggers
      };
    

    render() {
        return (
          <div className={this.props.classes.container}>
            <Paper className={this.props.classes.paper}>
              <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
              <form id="loginForm" onSubmit = {this.handleSubmit} >
                <TextField
                  id="movie"
                  type="movie"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                  label="Search for a Movie"
                  fullWidth
                  className={this.props.classes.field}
                  variant="outlined"
                />
                {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
                <Button id="loginBtn" onClick={this.handleLogin} variant="contained" color="primary" form="loginForm" className={this.props.classes.button}>SEARCH</Button>
              </form>
            </Paper>
          </div>
        );
      }
}
export default withStyles(styles)(MovieSearch);

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