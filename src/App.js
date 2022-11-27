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
    return (
      <div>
        <h1>Tonal Clock</h1>
        <ReferenceTone />
        <TonalClockFace />
      </div>
    );
  }
}