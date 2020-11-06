import React from 'react';
import Header from '../components/layout/Header';
import TimeTrackLayout from '../components/TimeTrackLayout/TimeTrackLayout';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <TimeTrackLayout />
    </div>
  );
}

export default App;