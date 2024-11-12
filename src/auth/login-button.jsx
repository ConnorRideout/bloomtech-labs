import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  return (
    <button
      onClick={() => loginWithRedirect({
        appState: { returnTo: location.pathname },
      })}
    >
      Log In
    </button>
  );
};
