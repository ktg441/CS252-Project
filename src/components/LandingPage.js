import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Hero, CallToAction, ScrollDownIndicator, Section
} from 'react-landing-page'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  });

class LandingPage extends React.Component {
  render() {
    return (
        <div>
            <Typography>Landing Page</Typography>
            <Section
               heading="DESCRIPTION HERE"
            />
        </div>
    )
  }
}

export default withStyles(styles)(LandingPage);
