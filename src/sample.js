export default class Sample {

    /**
     * Path to file containing the audio sample.
     */
    path;
    audioContext;
    data;

    constructor(path) {
        this.path = path;
    }

    get(path) {
        if (this.data) {
            return this.data;
        }
        else {
            return fetch(this.path)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    this.data = this.audioContext.decodeAudioData(arrayBuffer);
                    return this.data;
                });
        }
    }

    play() {
        this.get(this.path)
            .then(audioBuffer => {
                let sourceNode = this.audioContext.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.connect(this.audioContext.destination);
                //sourceNode.start(0,0,0.25);
            });
    }
}