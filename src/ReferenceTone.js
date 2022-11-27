import React, { Component } from 'react';
import Sample from './sample';
import {Howl} from 'howler';

export default class ReferenceTone extends Component {

  /**
   * Path/URI to the reference tone sample file.
   */
  samplePath = 'samples/reference/basses-sus-c2-PB-loop.wav';

  /**
   * Name of the reference note
   */
  noteName = 'C2';

  /**
   * The sound buffer containing the reference tone.
   */
  sound;

  constructor(props) {
    super(props);
    this.sound = new Howl({
      src: [this.samplePath],
      volume: 0.5
      //loop: true
    });
  }

  componentDidMount() {
    this.sound.play();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="reference-note">Reference: {this.noteName}</div>
    );
  }
}
