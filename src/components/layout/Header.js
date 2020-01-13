import React from 'react';

const header = () => {

  return (
    <header style={headerStyle}>
        <h1><span>Timewise time tracking</span></h1>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
};

export default header;
