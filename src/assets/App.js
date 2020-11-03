import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TimeTrackLayout from '../components/TimeTrackLayout/TimeTrackLayout';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/timewise" render={() => (
            <TimeTrackLayout />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;