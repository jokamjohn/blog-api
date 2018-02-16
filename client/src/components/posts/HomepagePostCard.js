import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import gravatar from "gravatar";
import {date, truncate} from "../../utils/helper";

const HomePagePostCard = ({post}) => (
    <div key={post._id} style={{width: "50%", marginTop: "20px", marginBottom: "10px"}}>
      <Card>
        <CardHeader
            title={post.owner.name}
            avatar={gravatar.url(post.owner.email, {s: '100', r: 'x', d: 'retro'}, true)}
        />
        <CardTitle title={post.title} subtitle={date(post.createdAt)}/>
        <CardText>
          {truncate(post.body)}
        </CardText>
        <CardActions>
          <Link to={`/posts/${post.slug}`}><FlatButton label="Read More"/></Link>
        </CardActions>
      </Card>
    </div>
);

export default HomePagePostCard;