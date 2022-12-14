import React, { Component } from 'react';
import {Howl} from 'howler';
import { FormControlLabel, Switch } from '@mui/material';

export default class ReferenceTone extends Component {

  /**
   * Map of reference note name to its corresponding 
   * sample file path/URI.
   */
  samplePath = {
    C2: 'samples/reference/basses-sus-c2-PB-loop.wav'
  };

  /**
   * Name of the reference note
   */
  noteName = 'C2';

  /**
   * Duration of looped note (in milliseconds).
   */
  noteDuration = 4000;

  /**
   * Percentage of full volume the tone should play at.
   */
  volume = 0.5;

  /**
   * Time at which the tone shoudld being playing.
   */
  startTime = new Date();

  /**
   * The initial version of the reference tone when it starts playing.
   */
   initialSound;

  /**
   * Map of reference note name to its sound buffer containing its tone.
   */
  sound = {};

  /**
   * Boolean flag indicating whether or not the reference ton is currently playing.
   */
  isPlaying = false;

  constructor(props) {
    super(props);
    this.startTime = props && props.startTime !== undefined ? props.startTime : new Date();

    Object.keys(this.samplePath).forEach((noteName) => {
      this.sound[noteName] = new Howl({
        src: [this.samplePath[noteName]],
        volume: this.volume,
        sprite: {
          reference: [0, this.noteDuration, true]
        }
      });
    });
  }

  /**
   * Determine how long the lead in sound should play for.
   * @param {Date} time The time tht the lead in sound should begin playing.
   * @return {int} Number of milliseconds that lead in sound should play.
   */
  computeInitialToneDuration(time) {
    const leadInDuration = this.noteDuration - (((time.getSeconds() * 1000) % this.noteDuration) + time.getMilliseconds());
    return leadInDuration;
  }

  /**
   * Play the reference tone so that
   * the looped tone (re)starts every
   * fourth second.
   * @param {String} noteName The name of the note that should be played.
   */
  play(noteName = this.noteName) {

    // Make sure we have an up-to-date start time.
    if (!this.startTime) {
      this.startTime = new Date();
    }

    // Play the tone just long enough for it to lock into
    // place when it begins looping.
    const initialSoundDuration = this.computeInitialToneDuration(this.startTime);
    this.initialSound = new Howl({
      src: [this.samplePath[noteName]],
      volume: this.volume,
      sprite: {
        initial: [0, initialSoundDuration, false]
      }
    });
    this.initialSound.play('initial');
    this.isPlaying = true

    // Finish playing the initial tone before
    // starting the normal looping tone.
    setTimeout( () => {
      if (this.isPlaying) {
        this.sound[noteName].play('reference');
      }
    }, initialSoundDuration);
  }

  /**
   * Stop playing the tone.
   */
  stop() {
    this.initialSound.stop();
    Object.keys(this.sound).forEach((noteName) => {
      this.sound[noteName].stop();
    });
    this.isPlaying = false;
    this.startTime = undefined;
  }

  componentDidMount() {
    this.play(this.noteName);
  }

  componentWillUnmount() {
    this.stop();
  }

  toggleReferenceTone(event) {
    if (event.target.checked) {
      this.play();
    }
    else {
      this.stop();
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
