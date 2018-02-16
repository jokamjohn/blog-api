import React from 'react';
import {connect} from 'react-redux';
import {getBlogPost} from "../../redux/actions/posts";
import PostCard from "./postCard";

class Post extends React.Component {

  componentDidMount() {
    const {match, dispatch} = this.props;
    dispatch(getBlogPost(match.params.slug));
  }

  render() {
    const {post, dispatch, match} = this.props;
    return (
        <React.Fragment>
          {post.body ? <PostCard post={post} dispatch={dispatch} slug={match.params.slug}/>
              :
              <div>Post cannot be Found</div>}
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => state.blog;

export default connect(mapStateToProps)(Post);
