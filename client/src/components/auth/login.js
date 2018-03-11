import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {userLogin} from "../../redux/actions/auth";

class LoginCard extends React.Component {

  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  };

  handleFormSubmit = () => {
    const {email, password} = this.state;
    if (!email) return this.setState({emailError: "Email field cannot be empty"});
    if (!password) return this.setState({passwordError: "Password field cannot be empty"});
    this.props.dispatch(userLogin({email, password}))
  };

  onChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  };

  render() {
    const {from} = this.props.location.state || {from: {pathname: '/posts'}};
    if (this.props.isLoggedIn) return <Redirect to={from}/>;
    const {email, password, emailError, passwordError} = this.state;
    return (
        <React.Fragment>
          <div style={{
            display: "flex",
            alignItems: "center",
            minHeight: "24em",
            justifyContent: "center",
            padding: "100px"
          }}>
            <Card style={{padding: "50px"}}>
              <CardHeader
                  title='Login'
                  style={{textAlign: "center"}}
              />
              <CardText>
                <TextField
                    hintText='email'
                    floatingLabelText="Email Address"
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    errorText={emailError}
                    required
                />
                <br/>
                <TextField
                    hintText='password'
                    type='password'
                    name='password'
                    value={password}
                    floatingLabelText="Password"
                    onChange={this.onChange}
                    errorText={passwordError}
                    required
                />
                <br/>
                <RaisedButton
                    label='Submit'
                    onClick={this.handleFormSubmit}
                    primary={true}
                    style={{marginTop: "50px", marginLeft: "60px", width: "50%"}}
                />
              </CardText>
            </Card>
          </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(LoginCard);