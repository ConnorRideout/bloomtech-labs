import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';
import LoginButton from '../../auth/login-button';
import LogoutButton from '../../auth/logout-button';
import { useAuth0 } from '@auth0/auth0-react';

import '../../styles/Header.less';

const { primary_accent_color } = colors;

function HeaderContent() {
  const { isAuthenticated } = useAuth0();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <div>
        <Link to="/" style={{ color: '#E2F0F7', marginRight: '75px' }}>
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#E2F0F7', marginRight: '75px' }}>
          Graphs
        </Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        {isAuthenticated ? <Link to="/profile" style={{ color: '#E2F0F7', marginLeft: '75px' }}>
          Profile
        </Link> : ''}
      </div>
    </div>
  );
}

export { HeaderContent };
