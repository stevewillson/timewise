import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import TimeTrack from '../components/TimeTrack/TimeTrack';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
        <Header />
        <Route exact path="/" render={() => (
          <h1>Timewise time tracking</h1>
        )} />
        <Route exact path="/track" render={() => (
          <TimeTrack />
        )} />
        </div>
      </Router>
    );
  }
}

export default App;