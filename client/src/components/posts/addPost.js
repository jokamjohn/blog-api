import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import gravatar from "gravatar";
import {addPostToAPI} from "../../redux/actions/posts";
import {getEmail, getUsername} from "../../utils/authService";


class AddPost extends React.Component {

  state = {
    title: '',
    body: '',
    errorTitle: '',
    errorBody: ''
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  };

  handleSubmit = () => {
    const {title, body} = this.state;
    const {dispatch, history} = this.props;
    if (!title) return this.setState({errorTitle: 'Title cannot be empty'});
    if (!body) return this.setState({errorBody: 'Body cannot be empty'});
    dispatch(addPostToAPI({title: title, body: body}))
        .then(() => this.setState({errorTitle: '', errorBody: ''}))
        .then(() => history.push('/'));
  };

  render() {
    const {title, body} = this.props;
    const {errorTitle, errorBody} = this.state;
    return (
        <div style={{
          display: "flex",
          alignItems: "center",
          minHeight: "24em",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          <div style={{width: "50%", marginTop: "20px", marginBottom: "10px"}}>
            <Card>
              <CardHeader
                  title={getUsername()}
                  avatar={gravatar.url(getEmail(), {s: '100', r: 'x', d: 'retro'}, true)}
              />
              <CardText>
                <TextField
                    floatingLabelText="Title"
                    name='title'
                    style={{width: "100%"}}
                    onChange={this.handleChange}
                    value={title}
                    errorText={errorTitle}
                    required
                />
                <br/>
                <TextField
                    floatingLabelText="Body"
                    name='body'
                    multiLine={true}
                    rows={15}
                    rowsMax={50}
                    style={{width: "100%"}}
                    onChange={this.handleChange}
                    errorText={errorBody}
                    value={body}
                />
              </CardText>
              <CardActions>
                <FlatButton label="save" onClick={this.handleSubmit}/>
              </CardActions>
            </Card>
          </div>
        </div>
    );
  }
}

export default connect()(AddPost);