export default class TimeTone {
    static notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

    note = '';
    octave = -1;
    duration = -1;
    unit = '';

    constructor(clockNumber) {
        this.note = this.clockNumberToNote(clockNumber);
    }

    noteName() {
        return this.note + this.octave;
    }

    clockNumberToNote(number) {
        let note = undefined;
        if (number > 0 && number <= TimeTone.notes.length) {
            const index = number === 12 ? 0 : number;
            note = TimeTone.notes[index];
        }
        return note;
    }

    noteValue(note = this.note, octave = this.octave) {
        return this.octave * TimeTone.notes.length + TimeTone.notes.indexOf(this.note);
    }

    computeNoteDistance(note1, octave1, note2, octave2) {
        return this.noteValue(note1, octave1) - this.noteValue(note2, octave2);
    }

    getNearestSample(sampleBank, note = this.note, octave = this.octave) {
        let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
          let distanceToA =
            Math.abs(this.computeNoteDistance(note, octave, sampleA.note, sampleA.octave));
          let distanceToB =
            Math.abs(this.computeNoteDistance(note, octave, sampleB.note, sampleB.octave));
          return distanceToA - distanceToB;
        });
        return sortedBank[0];
      }
}
