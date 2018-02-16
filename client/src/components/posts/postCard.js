import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import gravatar from "gravatar";
import Comment from "./comment";
import AddComment from "./addComment";
import {date} from "../../utils/helper";
import {userCanEditOrDeletePost} from "../../utils/authService";

const PostCard = ({post, slug, dispatch}) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      minHeight: "24em",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <div style={{width: "50%", marginBottom: "10px", marginTop: "30px"}}>
        {post.body
        &&
        <Card>
          <CardHeader
              title={post.owner.name}
              avatar={gravatar.url(post.owner.email, {s: '100', r: 'x', d: 'retro'}, true)}
          />
          <CardTitle title={post.title} subtitle={date(post.createdAt)}/>
          <CardText>
            {post.body}
          </CardText>
          {userCanEditOrDeletePost(post.owner.id) &&
          <CardActions>
            <FlatButton label="Edit"/>
            <FlatButton label="Delete"/>
          </CardActions>
          }
        </Card>}
      </div>
      <div style={{width: "50%", marginTop: "10px"}}>
        <AddComment/>
      </div>
      <div style={{width: "50%", marginTop: "30px", marginBottom: "10px"}}>
        {post.comments && post.comments.map(comment =>
            <Comment key={comment._id} comment={comment} postOwnerId={post.owner.id} dispatch={dispatch} slug={slug}/>)
        }
      </div>
    </div>
);

export default PostCard;