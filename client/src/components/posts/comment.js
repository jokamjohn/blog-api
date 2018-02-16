import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import gravatar from "gravatar";

const Comment = ({comment}) => (
    <div style={{marginBottom: "10px"}}>
      <Card>
        <CardHeader
            title={comment.author.name}
            avatar={gravatar.url(comment.author.email, {s: '100', r: 'x', d: 'retro'}, true)}
        />
        <CardText>
          {comment.body}
        </CardText>
        <CardActions>
          <FlatButton label="Edit"/>
          <FlatButton label="Delete"/>
        </CardActions>
      </Card>
    </div>
);

export default Comment;