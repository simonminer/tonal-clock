export default class TimeTone {
    static notes = ['C#','D','D#','E','F','F#','G','G#','A','A#','B','C'];

    note = 'C';
    octave = 4;
    duration = -1;

    constructor(properties) {
        if (properties.note) {
            const noteData = properties.note.match(/^(\w[#b]?)(\d)$/);
            if (noteData && noteData instanceof Array && noteData.length === 3) {
                if (TimeTone.notes.includes(noteData[1])) {
                    this.note = noteData[1];
                }
                const octave = parseInt(noteData[2]);
                if (octave >= 1 && octave <= 8) {
                    this.octave = octave;
                }
            }
        }
    }

    noteName() {
        return this.note + this.octave;
    }
}
