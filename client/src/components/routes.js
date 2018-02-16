import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ApplicationBar from "./appBar";
import LoginCard from "./login";
import RegisterCard from "./register";
import Posts from "./posts/Posts";
import Post from "./posts/post";

const Routes = () => (
    <BrowserRouter>
      <React.Fragment>
        <ApplicationBar/>
        <Switch>
          <Route exact path='/' component={Posts}/>
          <Route exact path='/posts' render={props => <Redirect to='/'/>}/>
          <Route path='/login' component={LoginCard}/>
          <Route path='/logout' render={props => <div>logout Page</div>}/>
          <Route path='/register' component={RegisterCard}/>
          <Route path='/posts/:slug' component={Post}/>}/>
          <Route render={props => <div>404 Page Not Found</div>}/>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
);

export default Routes;

