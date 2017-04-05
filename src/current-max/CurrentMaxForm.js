import React from 'react';

const CurrentMaxForm = ({ currentMaxes = {}, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>Deadlift</label>
      <input
        id="deadlift"
        name="deadlift"
        onChange={event => onChange('deadlift', event.target.value)}
        placeholder="405"
        type="num"
        value={currentMaxes.deadlift} />
    </div>
    <div>
      <label>Squat</label>
      <input
        id="squat"
        name="squat"
        onChange={event => onChange('squat', event.target.value)}
        placeholder="315"
        type="num"
        value={currentMaxes.squat}/>
    </div>
    <div>
      <label>Bench Press</label>
      <input
        id="benchpress"
        name="benchpress"
        onChange={event => onChange('benchPress', event.target.value)}
        placeholder="225"
        type="num"
        value={currentMaxes.benchPress} />
    </div>
    <div>
      <label>Overhead Press</label>
      <input
        id="overheadpress"
        name="overheadpress"
        onChange={event => onChange('overheadPress', event.target.value)}
        placeholder="135"
        type="num"
        value={currentMaxes.overheadPress} />
    </div>
    <div>
      <button type="submit">Calculate</button>
    </div>
  </form>
);

export default CurrentMaxForm;
