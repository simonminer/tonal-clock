import { render, screen } from '@testing-library/react';
import TonalClockFace from './TonalClockFace';
import SampleManager from './sample-manager';

test('renders tonal clock face', () => {
  render(<TonalClockFace />);
  SampleManager.notes.forEach((note) => {
    const noteElement = screen.getByText(note);
    expect(noteElement).toBeInTheDocument();
  });
});
