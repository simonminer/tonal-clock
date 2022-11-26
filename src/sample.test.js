import Sample from './sample.js';
import mockaudioContext from './mock-audio-context';

beforeEach(() => {
    window.AudioContext = mockaudioContext;
});
var sample;
var samplePath = '';
beforeEach(() => {
    sample = new Sample(samplePath, window.AudioContext);
});

describe('Sample tests', () => {
    it('creates a new sample objectt', () => {
        expect(sample instanceof Sample).toBe(true);
        expect(sample.path).toBe(samplePath);
        expect(sample.AudioContext).toBe(window.audioContext);
    });

    it('computes playback rate', () => {
        for (let pitchShift = -3; pitchShift <= 3; pitchShift++) {   
            if (pitchShift === 0) {
                continue;
            }
            const playbackRate = Math.pow(2, pitchShift / 12);
            expect(sample.computePlaybackRate(pitchShift)).toBe(playbackRate);
        }
    });
});