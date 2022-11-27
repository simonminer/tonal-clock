import React, { Component } from 'react';
import Sample from './sample';

export default class ReferenceTone extends Component {

  /**
   * Path/URI to the reference tone sample file.
   */
  samplePath = 'samples/reference/basses-sus-c2-PB-loop.wav';

  /**
   * Name of the reference note
   */
  noteName = 'C2';


  constructor(props) {
    super(props);
    const audioContext = new AudioContext();
    this.sample = new Sample(this.samplePath, audioContext);
  }

  componentDidMount() {
    this.sample.play();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="reference-note">{this.noteName}</div>
    );
  }
}
