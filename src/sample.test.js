import Sample from './sample.js';
import mockaudioContext from './mock-audio-context';

beforeEach(() => {
    window.AudioContext = mockaudioContext;
});
var sample;
var samplePath = '';
beforeEach(() => {
    sample = new Sample(samplePath);
});

describe('Sample tests', () => {
    it('creates a new sample objectt', async () => {
        expect(sample instanceof Sample).toBe(true);
        expect(sample.path).toBe(samplePath);
        //expect(sample.data).toBeDefined();
    });
});