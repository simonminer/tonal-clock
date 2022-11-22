
// Inspired by https://teropa.info/blog/2016/07/28/javascript-systems-music.html#building-a-simple-sampler
export default class SampleManager {

  static notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  static notesPerOctave = SampleManager.notes.length;
  static maxOctave = 8;

  /**
   * Array of note sample data in which each element is a 
   * data structure of key/value pairs for note, octave,
   * and url of the sample.
   */
  samples = {};
  
  constructor(samples) {
    this.samples = samples;
  }

  /**
   * Generates a unique numeric id for a note name and octave number
   * to facilitate computing the distance between two notes.
   * @param {String} note Name of the note
   * @param {int} octave Octave number (1-8)
   * @returns int
   */
  noteValue(note, octave) {
    var noteValue = undefined;
    if (SampleManager.notes.includes(note) && octave >= 0 && octave <= SampleManager.maxOctave ) {
      noteValue = octave * SampleManager.notesPerOctave + SampleManager.notes.indexOf(note);    
    }
    return noteValue;
  }

  /**
   * Computes the distance from one note to another as
   * the number of semitones that seaprate them.
   * @param {String} note1 Name of the first note
   * @param {int} octave1 Octave number of the first note
   * @param {String} note2 Name of the second note
   * @param {int} octave2 Octoave number of the second note
   * @returns int
   */
  computeNoteDistance(note1, octave1, note2, octave2) {
    return this.noteValue(note1, octave1) - this.noteValue(note2, octave2);
  }

  /**
   * Returns the sample that is tonally cloest to the specified
   * note name and octave.
   * @param {String} note The name of the starting note
   * @param {int} octave  The octave number of the starting note
   * @returns Object
   */
  getNearestSample(note, octave) {
    let sortedSamples = this.samples.slice().sort((sampleA, sampleB) => {
      let distanceToA =
      Math.abs(this.computeNoteDistance(note, octave, sampleA.note, sampleA.octave));
      let distanceToB =
      Math.abs(this.computeNoteDistance(note, octave, sampleB.note, sampleB.octave));
      return distanceToA - distanceToB;
    });
    return sortedSamples[0];
  }
}
