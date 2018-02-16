import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {NavLink} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';

class ApplicationBar extends Component {
  render() {
    return (
        <div style={{margin: -10}}>
          <AppBar
              title="Jokam Blog"
              iconElementRight={this.props.isLoggedIn ? <Logged/> : <Login/>}
              style={{margin: 0}}
          />
        </div>
    );
  }
}

/**
 * Component rendered in the app bar when a user is logged in.
 * @param props
 * @returns {*}
 * @constructor
 */
const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <NavLink to='/posts'><MenuItem primaryText="Posts"/></NavLink>
      <NavLink to='/login'><MenuItem primaryText="Sign out"/></NavLink>
    </IconMenu>
);

/**
 * Component to render in the app bar when a user is not logged in.
 */
class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
        <NavLink to='/login'><FlatButton {...this.props} label="Login" href='/login'/></NavLink>
    );
  }
}

Logged.muiName = 'IconMenu';

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(ApplicationBar);