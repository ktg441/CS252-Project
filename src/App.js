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
import logo from './imgs/white.png';
import firebase from 'firebase/app';
import 'firebase/auth';
import PrivRoute from './components/routes/PrivRoute';
import LoginRoute from './components/routes/LoginRoute';
import HomeBase from './components/Home';
import Profile from './components/Profile';
import SignInRoute from './components/routes/SignInRoute';
import SignOutRoute from './components/routes/SignOutRoute';
import NotFound from './components/NotFound';
import MovieSearch from './components/MovieSearch';
import Guest from './components/Guest';



const styles = theme => ({
  logo: {
    color: 'black',
    'max-width': '175px',
    'max-height': '175px',
    margin: theme.spacing.unit,
    display: 'block',
  },
  links: {
    margin: '0 auto',
    'text-align': 'right',
    flexGrow: 1,
  },
  text:{
    color: 'black'
  }
});

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      color: 'black',
    }
  }

  listenScrollEvent = e => {
    if (window.scrollY > 20) {
      this.setState({color: '#d6792c'})
    } else {
      this.setState({color: 'black'})
    }
  }

  componentWillMount(){
    var that = this;
    window.addEventListener('scroll', this.listenScrollEvent);
    /*that.setState({
      loading: false,
    });*/
    firebase.auth().onAuthStateChanged(function(user) {
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
    });
  }
  render() {

    if (this.state.loading) {
      return <p></p>;
    }
    return (
      <BrowserRouter>
        <div className="App">
        <AppBar position="sticky" style={{backgroundColor: this.state.color }}>
            <Toolbar>
              <Link component={RouterLink} to='/'>
              <img className={this.props.classes.logo} src={logo} alt="DodgeEm" />
              </Link>
              <div className={this.props.classes.links}>
                {this.state.authenticated ? <SignInRoute/> : <SignOutRoute/>}
              </div>
            </Toolbar>
          </AppBar>
          <Switch>
            <div className={this.props.classes.text}>
          <PrivRoute exact
            path="/home"
            component={HomeBase}
            authenticated={this.state.authenticated}
          />
          <PrivRoute exact
            path="/movieSearch"
            component={MovieSearch}
            authenticated={this.state.authenticated}
          />
          <PrivRoute exact
            path="/logout"
            component={Logout}
            authenticated={this.state.authenticated}
          />
          <PrivRoute exact
            path="/profile"
            component={Profile}
            authenticated={this.state.authenticated}
          />

          <LoginRoute Route exact
            path={"/"}
            component={LandingPage}
            authenticated={this.state.authenticated}
          />
          <Route exact
            path={"/login"}
            component={() => <Login auth={this.state.authenticated} />}
          />
           <Route exact
            path={"/guest"}
            component={Guest}
            authenticated={this.state.authenticated}
          />
          <Route exact
            path={"/signup"}
            component={() => <SignUp auth={this.state.authenticated} />}
          />
        </div>
          <Route path="" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
