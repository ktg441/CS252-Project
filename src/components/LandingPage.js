import React from 'react';
import Typography from '@material-ui/core/Typography';
//import logo from '../imgs/DodgeLogo.PNG';
import {
  Hero, CallToAction, ScrollDownIndicator, Section, Heading
} from 'react-landing-page'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  });

class LandingPage extends React.Component {
  render() {
    return (
        <div>
            <Hero
            color="white"
            bgOpacity={.5}
            backgroundImage="https://images.pond5.com/films-shine-footage-024728478_prevstill.jpeg"
            >
            <Heading><h1>Dodge 'Em</h1></Heading>
            <h2>Be safe while watching movies, tv shows, or reading, etc</h2>
            <ScrollDownIndicator/>
            </Hero>
            <Section
               heading="What We Do"
            >
            <hr color="black" width="20%"/>
            <div>
              
            </div>
            </Section>

            <Section
               heading="Who We Are"
            >
            <hr color="black" width="20%"/>
            <div>
              
            </div>
            </Section>
        </div>
    )
  }
}

export default withStyles(styles)(LandingPage);
