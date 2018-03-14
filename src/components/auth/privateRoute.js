import React from 'react';
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}/>
        )
    )}/>
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};