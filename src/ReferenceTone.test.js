import { render, screen } from '@testing-library/react';
import ReferenceTone from './ReferenceTone.js';

jest.mock('howler');

it('renders reference tone', () => {
  const {container} = render(<ReferenceTone />);
  const referenceToneElement = screen.getByText(/Reference: C2/i);
  expect(referenceToneElement).toBeInTheDocument();
});

it('computes lead in duration', () => {
  const referenceTone = new ReferenceTone();
  const time = new Date();
  for (let second = 0; second < 60; second++) {
    time.setSeconds(second);
    time.setMilliseconds(0);
    var leadinSeconds = referenceTone.noteDuration - ((time.getSeconds() % referenceTone.noteDuration) * 1000);
    expect(referenceTone.computeLeadInDuration(time)).toBe(leadinSeconds);
    const miliseconds = Math.floor(Math.random() * 1000);
    time.setMilliseconds(miliseconds);
    leadinSeconds -= miliseconds;
    expect(referenceTone.computeLeadInDuration(time)).toBe(leadinSeconds);
  }
});
