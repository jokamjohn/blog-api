import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import gravatar from "gravatar";
import {userCanEditORDeleteComment} from "../../utils/authService";
import {deleteCommentFromAPI, editCommentOnAPI} from "../../redux/actions/posts";

class Comment extends React.Component {
  state = {
    isEditing: false,
    comment: this.props.comment
  };

  onEditing = () => this.setState({isEditing: true});

  onCancel = () => this.setState({isEditing: false});

  onSave = () => {
    const {slug, dispatch} = this.props;
    const {comment} = this.state;
    dispatch(editCommentOnAPI({body: comment.body}, slug, comment._id));
    this.setState({isEditing: false})
  };

  handleChange = event => {
    const body = event.target.value;
    this.setState({comment: {...this.state.comment, body}});
  };

  render() {
    const {postOwnerId, slug, dispatch} = this.props;
    const {comment} = this.state;
    const {isEditing} = this.state;
    return (
        <div style={{marginBottom: "10px"}}>
          <Card>
            <CardHeader
                title={comment.author.name}
                avatar={gravatar.url(comment.author.email, {s: '100', r: 'x', d: 'retro'}, true)}
            />
            {(isEditing && userCanEditORDeleteComment(postOwnerId, comment.author.id)) ?
                <CardText>
                  <TextField
                      hintText="Write the comment here"
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                      style={{width: "100%"}}
                      name='comment'
                      value={comment.body}
                      errorText={this.state.error}
                      onChange={this.handleChange}
                  />
                </CardText>
                :
                <CardText>
                  {comment.body}
                </CardText>
            }
            {userCanEditORDeleteComment(postOwnerId, comment.author.id)
            &&
            <CardActions>
              {isEditing ?
                  <div>
                    <FlatButton label="Save" onClick={this.onSave}/>
                    <FlatButton label="Cancel" onClick={this.onCancel}/>
                  </div>
                  :
                  <div>
                    <FlatButton label="Edit" onClick={this.onEditing}/>
                    <FlatButton label="Delete" onClick={() => dispatch(deleteCommentFromAPI(slug, comment._id))}/>
                  </div>}
            </CardActions>
            }
          </Card>
        </div>
    )
  }
}

export default Comment;