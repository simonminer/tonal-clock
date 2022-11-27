import { render, screen } from '@testing-library/react';
import App from './App';
import mockaudioContext from './mock-audio-context.js';

beforeEach(() => {
  window.AudioContext = mockaudioContext;
});

test('renders learn react link', () => {
  render(<App />);
  const headingElement = screen.getByText(/tonal clock/i);
  expect(headingElement).toBeInTheDocument();
});
