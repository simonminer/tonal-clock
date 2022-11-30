import React, { Component } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TonalClockFace from './TonalClockFace';
import ReferenceTone from './ReferenceTone';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    // Synchronize the start time of all components
    // to the start of the current second.
    var startTime = new Date();
    startTime.setMilliseconds(0);

    return (
      <div>
        <h1>Tonal Clock</h1>
        <ReferenceTone startTime={startTime} />
        <TonalClockFace time={startTime} />
      </div>
    );
  }
}