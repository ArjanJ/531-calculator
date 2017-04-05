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
        benchPress: '',
        deadlift: '',
        overheadPress: '',
        squat: '',
      },
      cycles: null,
      unit: 'lb',
    };
  }

  calculateCycle(currentMax) {
    const cycle = [];
    const cycleBase = [0.65, 0.7, 0.75, 0.4];
    for (let i = 0; i < 4; i++) {
      cycle.push([
        Math.floor(currentMax * (cycleBase[i]) / 5) * 5,
        Math.floor(currentMax * (cycleBase[i] + 0.1) / 5) * 5,
        Math.floor(currentMax * (cycleBase[i] + 0.2) / 5 ) * 5,
      ]);
    }
    return cycle;
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
    const { benchPress, deadlift, overheadPress, squat } = this.state.currentMaxes;
    this.setState({
      cycles: [
        { cycle: this.calculateCycle(deadlift) ,lift: 'Deadlift' },
        { cycle: this.calculateCycle(squat) ,lift: 'Squat' },
        { cycle: this.calculateCycle(benchPress) ,lift: 'Bench Press' },
        { cycle: this.calculateCycle(overheadPress) ,lift: 'Overhead Press' },
      ],
    });
  }

  render() {
    const { currentMaxes, cycles } = this.state;
    const reps = [5, 3, 1, 5];
    return (
      <div className="App">
        <CurrentMax
          currentMaxes={currentMaxes}
          handleChange={this.handleCurrentMaxChange}
          handleSubmit={this.handleCurrentMaxSubmit} />
        {cycles !== null && (
          cycles.map(cycle => {
            return (
              <div style={{ marginBottom: '30px' }}>
                <div>{cycle.lift}</div>
                <div style={{ display: 'flex' }}>{cycle.cycle.map((c, i) => {
                  return (
                    <div style={{ marginRight: '15px' }}>
                      <span>week {i + 1}</span>
                      {c.map(d => <div>{d}x{reps[i]}</div>)}
                    </div>
                  );
                })}</div>
              </div>
            )
          })
        )}
      </div>
    );
  }
}

export default App;
