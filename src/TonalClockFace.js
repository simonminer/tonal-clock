import React, { Component } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default class TonalClockFace extends Component {

  /**
   * A Date object representing the current date and time
   * according to this clock.
   */
  time;

  /**
   * Interval used to increment the clock;
   */
  interval;

  /**
   * Boolean value indicating whether musical note
   * names have been added to this clock.
   */
  hasNotes = false;

  constructor(props) {
    super(props);
    this.time = props.time !== undefined ? props.time : new Date();
  }

  /**
   * Adds musical note names to clock face.
   */
  addNotesToClock() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
    function addNotes () {
      const notes = ['C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B','C'];
      let numbers = document.getElementsByClassName("react-clock__mark__number");
      for (let i = 0; i < numbers.length; i++) {
        numbers.item(i).innerHTML = (i + 1) + '<br/><span class="clock-note">' + notes[i] + '</span>';
      }
    }
    addNotes();
    `;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }

  componentDidMount() {
    // Ensure the musical notes have been added to the clock face.
    if (!this.hasNotes) {
      this.addNotesToClock();
      this.hasNotes = true;
    }

    // Set and increment the clock time by one second.
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.forceUpdate();
    }, 1000 );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <Clock 
    value={this.time}
    size={500}
    renderNumbers={true}
    className="tonal-clock-face"
  />;
  }
}
