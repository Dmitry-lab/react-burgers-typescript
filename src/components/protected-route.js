import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, ...rest }) {
  const user = useSelector(store => store.userInfo.info);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.shape({
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool
  })
}

export default ProtectedRoute;
