import React, { Component } from 'react';
import './App.css';
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