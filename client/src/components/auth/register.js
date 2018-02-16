import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {addUserToAPI} from "../../redux/actions/auth";

class RegisterCard extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errorPass: '',
    errorName: '',
    errorEmail: '',
    errorPassEmpty: '',
    errorPassEmpty2: '',
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  };

  handleSubmit = () => {
    const {name, email, password, password_confirmation} = this.state;
    const {dispatch, history} = this.props;
    if (!(password === password_confirmation)) return this.setState({errorPass: 'Passwords must match'});
    if (!name) return this.setState({errorName: 'Field cannot be empty'});
    if (!email) return this.setState({errorEmail: 'Field cannot be empty'});
    if (!password) return this.setState({errorPassEmpty: 'Field cannot be empty'});
    if (!password_confirmation) return this.setState({errorPassEmpty2: 'Field cannot be empty'});
    dispatch(addUserToAPI({name, email, password}))
        .then(() => this.setState({
          name: '', email: '', password: '', password_confirmation: '', errorPass: '',
          errorName: '', errorEmail: '', errorPassEmpty: '', errorPassEmpty2: '',
        }))
        .then(() => history.push('/login'));
  };

  render() {
    const {name, email, password, password_confirmation, errorPass, errorName, errorEmail} = this.state;
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
                  title='Register'
                  style={{textAlign: "center"}}
              />
              <CardText>
                <TextField
                    hintText='name'
                    name='name'
                    floatingLabelText="Name"
                    value={name}
                    errorText={errorName}
                    onChange={this.handleChange}
                />
                <br/>
                <TextField
                    hintText='email'
                    name='email'
                    value={email}
                    floatingLabelText="Email Address"
                    errorText={errorEmail}
                    onChange={this.handleChange}
                />
                <br/>
                <TextField
                    hintText='password'
                    type='password'
                    name='password'
                    value={password}
                    floatingLabelText="Password"
                    errorText={errorPass}
                    onChange={this.handleChange}
                />
                <br/>
                <TextField
                    hintText='password confirmation'
                    name='password_confirmation'
                    type='password'
                    value={password_confirmation}
                    floatingLabelText="Password Confirmation"
                    errorText={errorPass}
                    onChange={this.handleChange}
                />
                <br/>
                <RaisedButton
                    label='Submit'
                    primary={true}
                    onClick={this.handleSubmit}
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

export default connect(mapStateToProps)(RegisterCard);