import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from '../components/common/Spinner';

export default function ProtectedRoute({ component, ...args }) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Spinner />,
      })}
      {...args}
    />
  );
}