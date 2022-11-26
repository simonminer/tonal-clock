import SampleManager from './sample-manager.js';
import mockaudioContext from './mock-audio-context.js';

var samples = [
  { note: 'C', octave: 3, url: 'Violas_c3.wav'},
  { note: 'D#', octave: 3, url: 'Violas_d#3.wav'},
  { note: 'F#', octave: 3, url: 'Violas_f#3.wav'},
  { note: 'A', octave: 3, url: 'Violas_a3.wav'},
  { note: 'C', octave: 4, url: 'Violas_c4.wav'},
];
var manager = undefined;
beforeAll(() => {
  manager = new SampleManager(samples, new mockaudioContext());
});

describe('SampleManager tests', () => {
  it('verifies octave notes and size are correct', () => {
    expect(SampleManager.notes.length).toBe(SampleManager.notesPerOctave);
    samples.forEach((sample) => {
      expect(SampleManager.notes.includes(sample.note)).toBe(true);
    });
    expect(SampleManager.maxOctave).toBeGreaterThan(0);
  });

  it('constructs a valid SampleManager object', () => {
    expect(manager instanceof SampleManager).toBe(true);
    expect(manager.samples).toBe(samples);
  });

  it('returns the expected note value', () => {
    for (var octave = 0; octave < SampleManager.maxOctave; octave++) {
      SampleManager.notes.forEach((note) => {
        const noteValue = octave * SampleManager.notesPerOctave + SampleManager.notes.indexOf(note);
        expect(manager.noteValue(note, octave)).toBe(noteValue);
      });
    }
    expect(manager.noteValue()).toBe(undefined);
    expect(manager.noteValue('H',3)).toBe(undefined);
    expect(manager.noteValue('C',9)).toBe(undefined);
  });

  it('computes the correct distance between notes', () => {
    const note1 = SampleManager.notes[0];
    for (var distance = 0; distance < SampleManager.notes.length; distance++) {
        const octave1 = 2;
        const note2 = SampleManager.notes[distance];
        expect(manager.computeNoteDistance(note1, octave1, note2, octave1)).toBe(0 - distance);
        expect(manager.computeNoteDistance(note2, octave1, note1, octave1)).toBe(distance);
        const octave2 = 3;
        expect(manager.computeNoteDistance(note1, octave1, note2, octave2)).toBe(0 - distance - SampleManager.notesPerOctave);
        expect(manager.computeNoteDistance(note2, octave2, note1, octave1)).toBe(distance + SampleManager.notesPerOctave);
    }
  });

  it('determines the closest sample', () => {
    expect(manager.getNearestSample('B', 2).note).toBe('C');

    expect(manager.getNearestSample('C', 3).note).toBe('C');
    expect(manager.getNearestSample('C#', 3).note).toBe('C');
    expect(manager.getNearestSample('D', 3).note).toBe('D#');
    expect(manager.getNearestSample('D#', 3).note).toBe('D#');
    expect(manager.getNearestSample('E', 3).note).toBe('D#');
    expect(manager.getNearestSample('F', 3).note).toBe('F#');
    expect(manager.getNearestSample('F#', 3).note).toBe('F#');
    expect(manager.getNearestSample('G', 3).note).toBe('F#');
    expect(manager.getNearestSample('G#', 3).note).toBe('A');
    expect(manager.getNearestSample('A', 3).note).toBe('A');
    expect(manager.getNearestSample('A#', 3).note).toBe('A');
    expect(manager.getNearestSample('B', 3).note).toBe('C');
    expect(manager.getNearestSample('C', 4).note).toBe('C');

    expect(manager.getNearestSample('C#', 4).note).toBe('C');

    expect(manager.getNearestSample('G', 7).note).toBe('C');
  });

});