import TimeTone from './time-tone.js';

describe('TimeTone tests', function() {
    it('constructs TimeTone objects for value notes', () => {
        for (let octave = 1; octave <= 8; octave++) {
            TimeTone.notes.forEach((note) => {
                const noteName = note + octave;
                const tone = new TimeTone({'note':noteName});
                expect(tone instanceof TimeTone).toBe(true);
                expect(tone.octave).toBe(octave);
                expect(tone.note).toBe(note);
                expect(tone.noteName()).toBe(noteName);
            });            
        }
    });
});