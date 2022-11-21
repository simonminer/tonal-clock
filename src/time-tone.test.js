import TimeTone from './time-tone.js';

describe('TimeTone tests', function() {

    it('constructs TimeTone objects for value notes', () => {
        for (let octave = 1; octave <= 8; octave++) {
            for (let clockNumber = 1; clockNumber <= TimeTone.notes.length; clockNumber++) {
                const tone = new TimeTone(clockNumber);
                expect(tone instanceof TimeTone).toBe(true);
                
                const index = clockNumber === 12 ? 0 : clockNumber;
                const note = TimeTone.notes[index];
                expect(tone.note).toBe(note);
                expect(tone.clockNumberToNote(clockNumber)).toBe(note);

                tone.octave = octave;
                const noteName = tone.note + octave;
                expect(tone.noteName()).toBe(noteName);

                const noteValue = octave * TimeTone.notes.length + TimeTone.notes.indexOf(note);
                expect(tone.noteValue(note, octave)).toBe(noteValue);

            }          
        }
    });
});