import React, { Component } from 'react';

export default class TonalClockFace extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `
    let notesAdded = false;
    if (!notesAdded) {
      const notes = ['C#','D','D#','E','F','F#','G','G#','A','A#','B','C'];
      let numbers = document.getElementsByClassName("react-clock__mark__number");
      for (let i = 0; i < numbers.length; i++) {
        numbers.item(i).innerHTML = (i + 1) + '<br/>' + notes[i];
      }
      notesAdded = true;
    }    
    `;
    this.instance.appendChild(s);
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }
}
