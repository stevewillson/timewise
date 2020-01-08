import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {

  const style = {
    margin: '0px',
    width: '100%',
  }

  const iconStyle = {
    float: 'left',
  }

  return (
    <header style={headerStyle}>
      <div style={style}>
        <img style={iconStyle} width="64" height="64" alt="" src="/favicon.png" />
        <h1><span>Timewise</span></h1>
      </div>
      <Link style={linkStyle} to="/">Home</Link>{' | '}
      <Link style={linkStyle} to="/track">TimeTrack</Link>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

export default header;
