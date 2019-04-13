import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
    link: {
      margin: theme.spacing.unit,
      color: 'black',
    },
    list: {
      width: 250,
    },

});

class SignedInLinks extends React.Component {

  state = {
    width: window.innerWidth,
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    })
  }
  
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const sideList = (
      <div className={this.props.classes.list}>
        <List>
          <ListItem button component={RouterLink} to='/home'>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button component={RouterLink} to='/profile'>
            <ListItemText primary={"Profile"} />
          </ListItem>
          <ListItem button component={RouterLink} to='/logout'>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    );

    if (this.state.width > 900) {
      return (
        <div>
          <Link component={RouterLink} to='/home' className={this.props.classes.link}>
            Home
          </Link>
          <Link component={RouterLink} to='/profile' className={this.props.classes.link}>
            Profile
          </Link>
          <Link component={RouterLink} to='/logout' className={this.props.classes.link}>
            Logout
          </Link>
        </div>
      )
    }
    else {
      return (
      <div>
      <Button onClick={this.toggleDrawer('right', true)}><MenuIcon style={{color:'white'}}></MenuIcon></Button>
      <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
        </div>
      )
    }
  }
}

export default withStyles(styles)(SignedInLinks);
