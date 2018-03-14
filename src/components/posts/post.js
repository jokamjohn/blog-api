import React from 'react';
import {connect} from 'react-redux';
import {deletePostFromAPI, getBlogPost} from "../../redux/actions/posts";
import PostCard from "./postCard";

class Post extends React.Component {

  componentDidMount() {
    const {match, dispatch} = this.props;
    dispatch(getBlogPost(match.params.slug));
  }

  handlePostDeletion = slug => {
    this.props.dispatch(deletePostFromAPI(slug))
        .then(() => this.props.history.push('/'));
  };

  render() {
    const {post, dispatch, match} = this.props;
    return (
        <React.Fragment>
          {post.body ?
              <PostCard post={post} dispatch={dispatch} slug={match.params.slug} onDelete={this.handlePostDeletion}/>
              :
              <div>Post cannot be Found</div>}
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => state.blog;

export default connect(mapStateToProps)(Post);
