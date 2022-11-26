export default class Sample {

    /**
     * Path to file containing the audio sample.
     */
    path;

    /**
     * AudioContext to manage audio buffer manipulation and playback.
     */
    audioContext;

    /**
     * Raw binary data from the sample audio file.
     */
    buffer;

    constructor(path, audioContext) {
        this.path = path;
        this.audioContext = audioContext;
    }

    /**
     * Fetches a buffer of data for the specified sample file.
     * @param {String} path Path/UL to the sample file to be retrieved
     * @returns ArrayBuffer
     */
    get(path) {
        if (this.buffer) {
            return this.buffer;
        }
        else {
            return fetch(this.path)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    this.buffer = this.audioContext.decodeAudioData(arrayBuffer);
                    return this.buffer;
                });
        }
    }

    /**
     * Determine the playback rate for the sample based on the specified
     * pitch shift (semitone count).
     * @param {int} pitchShift 
     * @returns float
     */
    computePlaybackRate(pitchShift) {
        const playbackRate = Math.pow(2, pitchShift / 12);
        return playbackRate;
    }

    /**
     * Plays the sample with the specified pitch shift (if any).
     * @param {int} pitchShift Number of semitones to shift the sample's pitch up or down
     */
    play(pitchShift = 0) {
        this.get(this.path)
            .then(audioBuffer => {
                let sourceNode = this.audioContext.createBufferSource();
                sourceNode.buffer = audioBuffer;
                if (pitchShift) {
                    sourceNode.playbackRate.value = this.computePlaybackRate(pitchShift);
                }
                sourceNode.connect(this.audioContext.destination);
                sourceNode.start(0,0,0.25);
            });
    }
}