import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FaSave } from "react-icons/fa";
import { FaLifeRing } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { DiGithub } from "react-icons/di";
import { MdMailOutline } from "react-icons/md";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  Hero, CallToAction, ScrollDownIndicator, Section, Heading
} from 'react-landing-page'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cardGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', 
  },
  item: {
    margin: 15,
    "align-content": "center",
    display: 'block',
    'marginLeft': 'auto',
    'marginRight': 'auto',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '100px !important',
    margin: 'auto',
    'max-width': '400px',
    'max-height': '800px',
  },
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
            <CallToAction id='signUpBtn' href="/signup" bg='#f28a35' color='white' style={{borderRadius: 100}} mr={3}>Be Safe</CallToAction>
            <ScrollDownIndicator/>
            </Hero>
            <Section
               heading="What We Do"
            >
            <hr color="black" width="20%"/>
            <Grid container direction="row" className={this.props.classes.cardGrid}>
              <Grid item className={this.props.classes.item}>
                <Paper className={this.props.classes.paper}>
                <FaLifeRing color="#d6792c" style={{width:"200", height:"200"}}/>
                <div>
                  <Typography><h1>Keep You Safe</h1></Typography>
                  <hr color="black" width="10%"/>
                  <Typography><h3>We are here to make sure you can enjoy a movie, tv show, book, etc peacefully.</h3></Typography>
                </div>
                </Paper>
              </Grid>
              <Grid item className={this.props.classes.item}>
                <Paper className={this.props.classes.paper}>
                <FaSearch color="#d6792c" style={{width:"200", height:"200"}}/>
                <div>
                  <Typography><h1>Search</h1></Typography>
                  <hr color="black" width="10%"/>
                  <Typography><h3>We provide an easy to use search engine to help find a safe option.</h3></Typography>
                </div>
                </Paper>
              </Grid>
              <Grid item className={this.props.classes.item}>
                <Paper className={this.props.classes.paper}>
                <FaSave color="#d6792c" style={{width:"200", height:"200"}} />
                <div>
                  <Typography><h1>Save</h1></Typography>
                  <hr color="black" width="10%"/>
                  <Typography><h3>We save your safe choices, so you can have a list of them for later!</h3></Typography>
                </div>
                </Paper>
              </Grid>
            </Grid>
            </Section>

            <Section
               heading="Who We Are"
            >
            <hr color="black" width="20%"/>
            <Grid container direction="row" className={this.props.classes.cardGrid}>
              <Grid item className={this.props.classes.item}>
                <Paper className={this.props.classes.paper}>
                <div>
                  <Typography><h1>Keertana Kota</h1></Typography>
                  <hr color="black" width="10%"/>
                  <table>
                      <tbody>
                        <tr>
                          <td>
                            <DiGithub style={{width:"40", height:"40"}}/>
                          </td>
                          <td>
                            <Typography><h3>https://github.com/keerko2218</h3></Typography>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <MdMailOutline style={{width:"40", height:"40"}}/>
                          </td>
                          <td>
                            <Typography><h3>kota4@purdue.edu</h3></Typography>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                </Paper>
              </Grid>
              <Grid item className={this.props.classes.item}>
                <Paper className={this.props.classes.paper}>
                <div>
                  <Typography><h1>Kiran Goel</h1></Typography>
                  <hr color="black" width="10%"/>
                  <table>
                      <tbody>
                        <tr>
                          <td>
                            <DiGithub style={{width:"40", height:"40"}}/>
                          </td>
                          <td>
                            <Typography><h3>https://github.com/ktg441</h3></Typography>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <MdMailOutline style={{width:"40", height:"40"}}/>
                          </td>
                          <td>
                            <Typography><h3>payne77@purdue.edu</h3></Typography>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                </Paper>
              </Grid>
              <Grid item className={this.props.classes.item}>
                <Paper className={this.props.classes.paper}>
                <div>
                  <Typography><h1>Melissa Ruiz Ruiz</h1></Typography>
                  <hr color="black" width="10%"/>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <DiGithub style={{width:"40", height:"40"}}/>
                          </td>
                          <td>
                            <Typography><h3>https://github.com/MelyRz</h3></Typography>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <MdMailOutline style={{width:"40", height:"40"}}/>
                          </td>
                          <td>
                            <Typography><h3>mruizrui@purdue.edu</h3></Typography>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                </Paper>
              </Grid>
            </Grid>
            </Section>
        </div>
    )
  }
}

export default withStyles(styles)(LandingPage);
