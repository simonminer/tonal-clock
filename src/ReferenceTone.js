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
   * Duration of looped note (in miliseconds).
   */
  noteDuration = 4000;

  /**
   * Percentage of full volume the tone should play at.
   */
  volume = 0.5;

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
      volume: this.volume,
      sprite: {
        reference: [0, this.noteDuration, true]
      }
    });
  }

  /**
   * Determine how long the lead in sound should play for.
   * @param {Date} time The time tht the lead in sound should begin playing.
   * @return {int} Number of miliseconds that lead in sound should play.
   */
  computeInitialToneDuration(time) {
    const leadInDuration = this.noteDuration - (((time.getSeconds() * 1000) % this.noteDuration) + time.getMilliseconds());
    return leadInDuration;
  }

  /**
   * Play the reference tone so that
   * the looped tone (re)starts every
   * fourth second.
   */
  play() {
    // Play the tone just long enough for it to lock into
    // place when it begins looping.
    const initialToneDuration = this.computeInitialToneDuration(new Date());
    const initialSound = new Howl({
      src: [this.samplePath],
      volume: this.volume,
      sprite: {
        initial: [0, initialToneDuration, false]
      }
    });
    initialSound.play('initial');
    this.isPlaying = true;

    // Finish playing the initial tone before
    // starting the normal looping tone.
    setTimeout( () => {
      this.sound.play('reference');
    }, initialToneDuration);
  }

  /**
   * Stop playing the tone.
   */
  stop() {
    this.sound.stop('reference');
    this.isPlaying = false;
  }

  componentDidMount() {
    this.play('reference');
  }

  componentWillUnmount() {
    if (this.isPlaying) {
      this.stop();
    }
  }
  toggleReferenceTone(event) {
    if (event.target.checked) {
      this.play('reference');
    }
    else {
      this.sound.stop();
    }
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