import React, { Component } from 'react';
import CurrentMax from './current-max/CurrentMax';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrentMax />
      </div>
    );
  }
}

export default App;
