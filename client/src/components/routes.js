import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ApplicationBar from "./appBar";
import LoginCard from "./auth/login";
import RegisterCard from "./auth/register";
import Posts from "./posts/Posts";
import Post from "./posts/post";
import Logout from "./auth/logout";
import AddPost from "./posts/addPost";

const Routes = () => (
    <BrowserRouter>
      <React.Fragment>
        <ApplicationBar/>
        <Switch>
          <Route exact path='/' component={Posts}/>
          <Route exact path='/posts' render={props => <Redirect to='/'/>}/>
          <Route path='/login' component={LoginCard}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/register' component={RegisterCard}/>
          <Route path='/posts/:slug' component={Post}/>}/>
          <Route path='/post/add' component={AddPost}/>
          <Route render={props => <div>404 Page Not Found</div>}/>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
);

export default Routes;

