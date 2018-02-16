import React from "react";
import {connect} from 'react-redux';
import {getBlogPosts} from "../../redux/actions/posts";
import HomePagePostCard from "./HomepagePostCard";

export class Posts extends React.Component {

  componentDidMount() {
    this.props.dispatch(getBlogPosts());
  }

  render() {
    const {posts} = this.props;
    return (
        <React.Fragment>
          <div style={{
            display: "flex",
            alignItems: "center",
            minHeight: "24em",
            justifyContent: "center",
            flexDirection: "column"
          }}>
            {posts ? posts.map(post => <HomePagePostCard key={post._id} post={post}/>)
                :
                <h3>No Blog Posts at the moment</h3>
            }
          </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => state.blog;

export default connect(mapStateToProps)(Posts);