import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import gravatar from "gravatar";
import {userCanEditORDeleteComment} from "../../utils/authService";
import {deleteCommentFromAPI} from "../../redux/actions/posts";

const Comment = ({comment, postOwnerId, slug, dispatch}) => (
    <div style={{marginBottom: "10px"}}>
      <Card>
        <CardHeader
            title={comment.author.name}
            avatar={gravatar.url(comment.author.email, {s: '100', r: 'x', d: 'retro'}, true)}
        />
        <CardText>
          {comment.body}
        </CardText>
        {userCanEditORDeleteComment(postOwnerId, comment.author.id)
        &&
        <CardActions>
          <FlatButton label="Edit"/>
          <FlatButton label="Delete" onClick={() => dispatch(deleteCommentFromAPI(slug, comment._id))}/>
        </CardActions>
        }
      </Card>
    </div>
);

export default Comment;