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
}
