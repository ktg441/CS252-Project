import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

});

class HomeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {

    return (
        <div>
            <Typography>HOME PAGE</Typography>
        </div>
    );
  }
}
const Home = compose(
  withRouter,
  //withFirebase,
)(HomeBase);

export default withStyles(styles)(Home);
