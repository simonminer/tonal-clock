import React, { Component } from 'react';
import {Howl} from 'howler';
import { FormControlLabel, Switch } from '@mui/material';


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

  /**
   * Boolean flag indicating whether or not the reference ton is currently playing.
   */
  isPlaying = false;

  constructor(props) {
    super(props);
    this.sound = new Howl({
      src: [this.samplePath],
      volume: 0.5,
      //loop: true,
      sprite: {
        reference: [0, 4000, true]
      }
    });
  }

  componentDidMount() {
    this.sound.play('reference');
    this.isPlaying = true;
  }

  componentWillUnmount() {
    if (this.isPlaying) {
      this.sound.stop('reference');
      this.isPlaying = false;
    }
  }
  toggleReferenceTone(event) {
    if (event.target.checked) {
      this.sound.play('reference');
    }
    else {
      this.sound.stop();
    }
    this.isPlaying = !this.IsPlaying;
  }

  render() {
    const label = `Reference: ${this.noteName}`;
    return (
      <div id="reference-note">
        <FormControlLabel control={<Switch defaultChecked onChange={(e) => {this.toggleReferenceTone(e)}} />} label={label} />
      </div>
    );
  }
}