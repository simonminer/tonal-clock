// Mock AudioContext; Inspired by
// https://javascript-haskell-purescript-mars.hashnode.dev/mocking-the-web-audio-api-in-jest

const mockConnect = jest.fn();
const mockcreateMediaElementSource = jest.fn(() => {
    return {
        connect: mockConnect
    }
});
const mockgetByteFrequencyData = jest.fn();
const mockcreateAnalyser = jest.fn(() => {
    return {
        connect: mockConnect,
        frequencyBinCount: [0, 1, 2],
        getByteFrequencyData: mockgetByteFrequencyData,
    }
});
const mockcreateOscillator = jest.fn(() => {
    return {
        channelCount: 2
    }
});
const mockChannelSplitterConnect = jest.fn(n => n);
const mockcreateChannelSplitter = jest.fn(() => {
    return {
        connect: mockChannelSplitterConnect
    }
});
const mockaudioContext = jest.fn(() => {
    return {
        createAnalyser: mockcreateAnalyser,
        createMediaElementSource: mockcreateMediaElementSource,
        createOscillator: mockcreateOscillator,
        createChannelSplitter: mockcreateChannelSplitter,
    }
});

module.exports = mockaudioContext;