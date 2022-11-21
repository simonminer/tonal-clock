import TimeTone from './time-tone.js';

describe('TimeTone tests', function() {

    it('constructs TimeTone objects for value notes', () => {
        for (let octave = 1; octave <= 8; octave++) {
            for (let clockNumber = 1; clockNumber <= TimeTone.notes.length; clockNumber++) {
                const tone = new TimeTone(clockNumber);
                expect(tone instanceof TimeTone).toBe(true);
                tone.octave = octave;
                const note = TimeTone.notes[clockNumber - 1];
                expect(tone.note).toBe(note);
                expect(tone.clockNumberToNote(clockNumber)).toBe(note);
                const noteName = tone.note + octave;
                expect(tone.noteName()).toBe(noteName);
            }          
        }
    });
});