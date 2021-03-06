import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '100px !important',
    margin: 'auto',
    'max-width': '400px',
    'max-height': '400px',
  },
  button: {
    color: 'white',
    marginTop: 20,
    margin: theme.spacing.unit,
  },
});

class NotFound extends React.Component {

  render() {
    return (
      <div className={this.props.classes.container}>
        <Paper className={this.props.classes.paper}>
        <Typography variant="h5">Page Not Found</Typography>
        <Button href="/" onClick={this.signUp} variant="contained" color="primary" className={this.props.classes.button}>Return Home</Button>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(NotFound);
