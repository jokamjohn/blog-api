import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {addCommentToAPI} from "../../redux/actions/posts";

class AddComment extends React.Component {

  state = {
    comment: '',
    error: ''
  };

  handleChange = event => {
    const comment = event.target.value;
    this.setState({comment});
  };

  handleSubmit = () => {
    const comment = this.state.comment;
    if (!comment) return this.setState({error: 'Comment field cannot be empty'});
    const {dispatch, slug} = this.props;
    dispatch(addCommentToAPI(slug, {body: comment}))
        .then(() => this.setState({comment: '', error: ''}));
  };

  render() {
    return (
        <Card>
          <CardHeader title='Add comment'/>
          <CardText>
            <TextField
                hintText="Write the comment here"
                multiLine={true}
                rows={2}
                rowsMax={4}
                style={{width: "100%"}}
                name='comment'
                value={this.state.comment}
                errorText={this.state.error}
                onChange={this.handleChange}
            />
          </CardText>
          <CardActions>
            {this.props.isLoggedIn
                ? <FlatButton label="Save" onClick={this.handleSubmit}/>
                :
                <Link to='/login'><FlatButton label="Login"/></Link>
            }
          </CardActions>
        </Card>
    )
  }
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(AddComment);