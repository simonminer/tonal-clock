import { render, screen } from '@testing-library/react';
import ReferenceTone from './ReferenceTone.js';

jest.mock('howler');

it('creates ReferenceTone object', () => {
  const referenceTone = new ReferenceTone();
  expect(referenceTone instanceof ReferenceTone).toBe(true);
  expect(referenceTone.isPlaying).toBe(false);
});

it('renders reference tone', () => {
  const {container} = render(<ReferenceTone />);
  const referenceToneElement = screen.getByText(/Reference: C2/i);
  expect(referenceToneElement).toBeInTheDocument();
});

it('computes initial tone duration', () => {
  const referenceTone = new ReferenceTone();
  const time = new Date();
  for (let second = 0; second < 60; second++) {
    time.setSeconds(second);
    time.setMilliseconds(0);
    var initialToneSeconds = referenceTone.noteDuration - (time.getSeconds()  * 1000) % referenceTone.noteDuration;
    expect(referenceTone.computeInitialToneDuration(time)).toBe(initialToneSeconds);
    const miliseconds = Math.floor(Math.random() * 1000);
    time.setMilliseconds(miliseconds);
    initialToneSeconds -= miliseconds;
    expect(referenceTone.computeInitialToneDuration(time)).toBe(initialToneSeconds);
  }
});
