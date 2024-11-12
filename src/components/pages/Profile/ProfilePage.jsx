import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import '../../../styles/ProfilePage.less';

export default function ProfilePage() {
  const { user } = useAuth0();
  const { name, nickname, picture, email, email_verified } = user;

  return (
    <div id='profilePage'>
      <div className="profile-picture-container">
        <img
          className="profile-picture"
          src={picture}
          alt="Profile"
        />
        <h1>{name}</h1>
      </div>
      <div className="profile-text-container">
        <h2>Your Info</h2>
        <div>
          <p>Nickname: <h3>{nickname}</h3></p>
          <p>Email: <h3>{email}</h3></p>
          <p>Email Verified: <h3>{email_verified ? 'yes' : 'no'}</h3></p>
        </div>
      </div>
    </div>
  );
};