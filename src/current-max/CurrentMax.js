import React, { Component } from 'react';
import CurrentMaxForm from './CurrentMaxForm';

class CurrentMax extends Component {
  render() {
    const { currentMaxes, handleChange, handleSubmit } = this.props;
    return (
      <div className="CurrentMax">
        <h1>Your current 1 rep maxes</h1>
        <CurrentMaxForm
          currentMaxes={currentMaxes}
          onChange={handleChange}
          onSubmit={handleSubmit} />
      </div>
    );
  }
}

export default CurrentMax;
