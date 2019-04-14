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
import { auth } from './FirebaseConfig/Fire'

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

class HomeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {

    return (
      <div className={this.props.classes.container}>
      <Paper className={this.props.classes.paper}>
        <img className={this.props.classes.logo} src={logo} alt="DodgeEm"/>
        <form id="loginForm" onSubmit = {this.handleLogin} >
          <TextField
            id="movie"
            type="movie"
            required
            value={this.state.username}
            onChange={this.handleChange}
            label="Movie"
            fullWidth
            className={this.props.classes.field}
            variant="outlined"
          />
          <TextField
            id="trigger"
            type="trigger"
            required
            value={this.state.password}
            onChange={this.handleChange}
            label="Trigger"
            fullWidth
            className={this.props.classes.field}
            variant="outlined"
          />
          {<Typography className={this.props.classes.error}>{this.state.error}</Typography>}
          <Button id="signupBtn" onClick={this.signUp} variant="contained" color="primary"  className={this.props.classes.button}>ENTER</Button>
        </form>
      </Paper>
    </div>
    );
  }
}
const Home = compose(
  withRouter,
  //withFirebase,
)(HomeBase);

export default withStyles(styles)(Home);
