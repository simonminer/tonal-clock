import { render, screen } from '@testing-library/react';
import App from './App';
import mockaudioContext from './mock-audio-context.js';

beforeEach(() => {
  window.AudioContext = mockaudioContext;
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/current time/i);
  expect(linkElement).toBeInTheDocument();
});
