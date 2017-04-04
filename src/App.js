import React, { Component } from 'react';
import CurrentMax from './current-max/CurrentMax';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCurrentMaxChange = this.handleCurrentMaxChange.bind(this);
    this.handleCurrentMaxSubmit = this.handleCurrentMaxSubmit.bind(this);
    this.state = {
      currentMaxes: {
        benchPress: 0,
        deadlift: 0,
        overheadPress: 0,
        squat: 0,
      },
    };
  }

  handleCurrentMaxChange(lift, value) {
    this.setState({
      currentMaxes: Object.assign({}, this.state.currentMaxes, {
        [lift]: value,
      }),
    });
  }

  handleCurrentMaxSubmit(event) {
    event.preventDefault();
    console.log(this.state.currentMaxes);
  }

  render() {
    const { currentMaxes } = this.state;
    return (
      <div className="App">
        <CurrentMax
          currentMaxes={currentMaxes}
          handleChange={this.handleCurrentMaxChange}
          handleSubmit={this.handleCurrentMaxSubmit} />
      </div>
    );
  }
}

export default App;
