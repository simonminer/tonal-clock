export default class TimeTone {
    static notes = ['C#','D','D#','E','F','F#','G','G#','A','A#','B','C'];

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
            note = TimeTone.notes[number - 1];
        }
        return note;
    }
}
