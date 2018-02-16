import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import decode from 'jwt-decode';

class RegisterCard extends React.Component {
  render() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTgwYjBkNDc1OWYyNTYzMGVjYTg3ZWEiLCJuYW1lIjoiSm9rYW1qb2huIiwiZW1haWwiOiJqb2thbWpvaG5AZ21haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MTg2NDQzOTIsImV4cCI6MTUxODczMDc5Mn0.Zw7NJzBaUNgLG3MWCt_b2NrF6D84f6jh0sJVjfT0Ap8";
    console.log('decode', decode(token));
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
                    floatingLabelText="Name"
                />
                <br/>
                <TextField
                    hintText='email'
                    floatingLabelText="Email Address"
                />
                <br/>
                <TextField
                    hintText='password'
                    type='password'
                    floatingLabelText="Password"
                />
                <br/>
                <TextField
                    hintText='password confirmation'
                    type='password'
                    floatingLabelText="Password Confirmation"
                />
                <br/>
                <RaisedButton
                    label='Submit'
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


export default RegisterCard;