import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../services/types';
import { RouteProps } from 'react-router';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const user = useSelector((store: RootState) => store.userInfo.info);

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

export default ProtectedRoute;
