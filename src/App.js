import React, { Component } from 'react';
import './App.css';
import TonalClockFace from './TonalClockFace';

export default class App extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Current Time</h1>
        <TonalClockFace />
      </div>
    );
  }
}