import { render, screen } from '@testing-library/react';
import TonalClockFace from './TonalClockFace';
import SampleManager from './sample-manager';

test('renders tonal clock face', () => {
  const {container} = render(<TonalClockFace />);
  const noteElements = container.getElementsByClassName('clock-note');
  expect(noteElements.length).toBe(SampleManager.notesPerOctave);
  SampleManager.notes.forEach((note) => {
    const noteElement = screen.getByText(note.replace('#','♯'));
    expect(noteElement).toBeInTheDocument();
  });
});
