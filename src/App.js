import React, { Component } from 'react';
import * as firebase from 'firebase';
import CurrentMax from './current-max/CurrentMax';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCurrentMaxChange = this.handleCurrentMaxChange.bind(this);
    this.handleCurrentMaxSubmit = this.handleCurrentMaxSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      currentMaxes: {
        benchPress: '',
        deadlift: '',
        overheadPress: '',
        squat: '',
      },
      cycles: null,
      unit: 'lb',
      user: null,
    };
  }

  authCheck() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        // No user is signed in.
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.authCheck();
  }

  calculateCycle(currentMax) {
    const cycle = [];
    const cycleBase = [0.65, 0.7, 0.75, 0.4];
    for (let i = 0; i < 4; i++) {
      cycle.push([
        { weight: Math.floor(currentMax * (cycleBase[i]) / 5) * 5 },
        { weight: Math.floor(currentMax * (cycleBase[i] + 0.1) / 5) * 5 },
        { weight: Math.floor(currentMax * (cycleBase[i] + 0.2) / 5 ) * 5 },
        { joker: true, weight: Math.floor(currentMax * (cycleBase[i] + 0.25) / 5 ) * 5 },
        { joker: true, weight: Math.floor(currentMax * (cycleBase[i] + 0.3) / 5 ) * 5 },
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

  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.authCheck();
    }).catch(error => {
      // An error happened.
    });
  }

  render() {
    const { signIn } = this.props;
    const { currentMaxes, cycles, user } = this.state;
    const reps = [5, 3, 1, 5];

    return (
      <div className="App">
        {user === null && <button onClick={signIn}>Sign in</button>}
        {user !== null && <h5>{user.displayName}</h5>}
        {user !== null && <button onClick={this.signOut}>Sign out</button>}
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
                  if (i === 2) {
                    let reps2 = 7;
                    return (
                      <div style={{ marginRight: '15px' }}>
                        <span>week {i + 1}</span>
                        {c.map((d, j) => {
                          if (j <= 2) { reps2 -= 2; }
                          return <div>{d.weight}x{reps2}</div>;
                        })}
                      </div>
                    );
                  }
                  return (
                    <div style={{ marginRight: '15px' }}>
                      <span>week {i + 1}</span>
                      {c.map(d => {
                        return <div>{d.weight}x{reps[i]}</div>;
                      })}
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
