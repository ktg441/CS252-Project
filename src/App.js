import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import { Link as RouterLink, Route } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Logout from './components/Logout';
import SignUp from './components/Signup';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import logo from './img/white_logo.png';
//import firebase from 'firebase/app';
//import 'firebase/auth';
import PrivRoute from './components/routes/PrivRoute';
import LoginRoute from './components/routes/LoginRoute';
import Home from './components/Home';
//import Profile from './components/Profile';
import SignInRoute from './components/routes/SignInRoute';
import SignOutRoute from './components/routes/SignOutRoute';
import NotFound from './components/NotFound';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  logo: {
    color: 'white',
    'max-width': '100px',
    'max-height': '100px',
    margin: theme.spacing.unit,
    display: 'block',
  },
  links: {
    margin: '0 auto',
    'text-align': 'right',
    flexGrow: 1,
  }
});

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount(){
    var that = this;
    that.setState({
      loading: false,
    });
    /*firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          that.setState({
            authenticated: true,
            currentUser: user,
            loading: false
          });
        }
        else {
          that.setState({
            authenticated: false,
            currentUser: null,
            loading: false
          });
        }
    });*/
  }
  render() {

    if (this.state.loading) {
      return <p></p>;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar color="primary">
            <Toolbar>
              <Link component={RouterLink} to='/'>
                <Typography>DodgeEm</Typography>
              </Link>
              <div className={this.props.classes.links}>
                {this.state.authenticated ? <SignInRoute/> : <SignOutRoute/>}
              </div>
            </Toolbar>
          </AppBar>
          <Switch>
          <PrivRoute exact
            path="/home"
            component={Home}
            authenticated={this.state.authenticated}
          />
          <PrivRoute exact
            path="/logout"
            component={Logout}
            authenticated={this.state.authenticated}
          />

          <LandingPage Route exact
            path={"/"}
            component={LandingPage}
            authenticated={this.state.authenticated}
          />
          <Route exact
            path={"/login"}
            component={() => <Login auth={this.state.authenticated} />}
          />
          <Route exact
            path={"/signup"}
            component={() => <SignUp auth={this.state.authenticated} />}
          />

          <Route path="" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
