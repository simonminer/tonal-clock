import React, { Component } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default class TonalClockFace extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
    function addNotestoClock () {
      const notes = ['C#','D','D#','E','F','F#','G','G#','A','A#','B','C'];
      let numbers = document.getElementsByClassName("react-clock__mark__number");
      for (let i = 0; i < numbers.length; i++) {
        numbers.item(i).innerHTML = (i + 1) + '<br/>' + notes[i];
      }
    }
    addNotestoClock();
    `;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }

  render() {
    return <Clock 
    value={this.props.time}
    size={500}
    renderNumbers={true}
  />;
  }
}
